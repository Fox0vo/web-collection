import { expect, test, type Locator, type Request } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

type Viewport = {
  readonly width: number;
  readonly height: number;
};

type PaintedImage = {
  readonly currentSrc: string;
  readonly paintedPhysicalHeight: number;
  readonly paintedPhysicalWidth: number;
  readonly paintedWidth: number;
};

type DecodedBitmap = {
  readonly height: number;
  readonly width: number;
};

type ActivePresentation = PaintedImage & {
  readonly imageBottom: number;
  readonly imageLeft: number;
  readonly imageRight: number;
  readonly imageTop: number;
  readonly mediaContentWidth: number;
  readonly mediaBottom: number;
  readonly mediaLeft: number;
  readonly mediaOverflowX: number;
  readonly mediaOverflowY: number;
  readonly mediaRight: number;
  readonly mediaTop: number;
  readonly objectFit: string;
  readonly pageOverflowX: number;
  readonly sourceWidth: number;
};

const viewports: readonly Viewport[] = [
  { width: 375, height: 800 },
  { width: 768, height: 900 },
  { width: 1280, height: 900 },
];

const awaitDecoded = (image: Locator): Promise<boolean> =>
  image.evaluate(async (element) => {
    if (!(element instanceof HTMLImageElement)) return false;
    await element.decode();
    return element.complete && element.naturalWidth > 0;
  });

const measurePaintedImage = (image: Locator): Promise<PaintedImage> =>
  image.evaluate((element) => {
    if (!(element instanceof HTMLImageElement)) {
      throw new TypeError("The measurement target must be an image");
    }
    const bounds = element.getBoundingClientRect();
    return {
      currentSrc: element.currentSrc,
      paintedPhysicalHeight: bounds.height * window.devicePixelRatio,
      paintedPhysicalWidth: bounds.width * window.devicePixelRatio,
      paintedWidth: bounds.width,
    };
  });

const decodeSelectedBitmap = (image: Locator): Promise<DecodedBitmap> =>
  image.evaluate(async (element) => {
    if (!(element instanceof HTMLImageElement)) {
      throw new TypeError("The decoded bitmap target must be an image");
    }
    const response = await fetch(element.currentSrc);
    const bitmap = await createImageBitmap(await response.blob());
    const dimensions = { height: bitmap.height, width: bitmap.width };
    bitmap.close();
    return dimensions;
  });

const measureActivePresentation = (image: Locator): Promise<ActivePresentation> =>
  image.evaluate((element) => {
    if (!(element instanceof HTMLImageElement)) {
      throw new TypeError("The active Lightbox target must be an image");
    }
    const media = element.closest(".lightbox-dialog-media");
    if (!(media instanceof HTMLElement)) {
      throw new TypeError("The active image must be inside Lightbox media");
    }

    const imageBounds = element.getBoundingClientRect();
    const mediaBounds = media.getBoundingClientRect();
    const imageStyle = getComputedStyle(element);
    const mediaStyle = getComputedStyle(media);
    const inlinePadding =
      Number.parseFloat(mediaStyle.paddingInlineStart) +
      Number.parseFloat(mediaStyle.paddingInlineEnd);

    return {
      currentSrc: element.currentSrc,
      imageBottom: imageBounds.bottom,
      imageLeft: imageBounds.left,
      imageRight: imageBounds.right,
      imageTop: imageBounds.top,
      mediaContentWidth: media.clientWidth - inlinePadding,
      mediaBottom: mediaBounds.bottom,
      mediaLeft: mediaBounds.left,
      mediaOverflowX: media.scrollWidth - media.clientWidth,
      mediaOverflowY: media.scrollHeight - media.clientHeight,
      mediaRight: mediaBounds.right,
      mediaTop: mediaBounds.top,
      objectFit: imageStyle.objectFit,
      pageOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      paintedPhysicalHeight: imageBounds.height * window.devicePixelRatio,
      paintedPhysicalWidth: imageBounds.width * window.devicePixelRatio,
      paintedWidth: imageBounds.width,
      sourceWidth: Number.parseFloat(imageStyle.getPropertyValue("--lightbox-source-width")),
    };
  });

test.use({ deviceScaleFactor: 1 });

for (const viewport of viewports) {
  test(`meaningfully enlarges V98 Pro V4 云间白 at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    // Given: the decoded Cloud White trigger is visible in the V98 Pro V4 model dialog.
    await page.setViewportSize(viewport);
    await page.goto(sitePath("/gallery/"));
    await page.locator("#brand-vgn > summary").click();
    await page.getByRole("link", { name: /V98 Pro V4/ }).click();
    const modelDialog = page.getByRole("dialog", { name: "型号配色一览", exact: true });
    const trigger = modelDialog.getByRole("button", {
      name: "云间白 · 正面图 · 放大查看",
      exact: true,
    });
    const triggerImage = trigger.locator("img");
    await expect(trigger).toBeVisible();
    await expect.poll(() => awaitDecoded(triggerImage)).toBe(true);
    const triggerPresentation = await measurePaintedImage(triggerImage);
    const decodedBitmap = await decodeSelectedBitmap(triggerImage);

    // When: the request listener starts immediately before the decoded node moves into the Lightbox.
    const postClickImageRequests: string[] = [];
    const collectImageRequest = (request: Request): void => {
      if (request.resourceType() === "image") postClickImageRequests.push(request.url());
    };
    page.on("request", collectImageRequest);
    await trigger.click();
    const lightbox = page.getByRole("dialog", { name: "V98 Pro V4 图像浏览器", exact: true });
    const activeImage = lightbox.locator(".lightbox-panel:not([hidden]) img");
    await expect(lightbox).toBeVisible();
    await expect.poll(() => awaitDecoded(activeImage)).toBe(true);
    const activePresentation = await measureActivePresentation(activeImage);
    page.off("request", collectImageRequest);

    // Then: enlargement reuses the decoded source and stays contained within its physical pixels.
    const tolerance = 1;
    expect(postClickImageRequests).toEqual([]);
    expect(activePresentation.currentSrc).toBe(triggerPresentation.currentSrc);
    expect(activePresentation.paintedWidth).toBeGreaterThan(triggerPresentation.paintedWidth);
    expect(triggerPresentation.paintedPhysicalWidth).toBeLessThanOrEqual(decodedBitmap.width);
    expect(triggerPresentation.paintedPhysicalHeight).toBeLessThanOrEqual(decodedBitmap.height);
    expect(activePresentation.paintedPhysicalWidth).toBeLessThanOrEqual(decodedBitmap.width);
    expect(activePresentation.paintedPhysicalHeight).toBeLessThanOrEqual(decodedBitmap.height);
    expect(activePresentation.objectFit).toBe("contain");
    expect(activePresentation.imageLeft).toBeGreaterThanOrEqual(activePresentation.mediaLeft - tolerance);
    expect(activePresentation.imageTop).toBeGreaterThanOrEqual(activePresentation.mediaTop - tolerance);
    expect(activePresentation.imageRight).toBeLessThanOrEqual(activePresentation.mediaRight + tolerance);
    expect(activePresentation.imageBottom).toBeLessThanOrEqual(activePresentation.mediaBottom + tolerance);
    expect(activePresentation.mediaOverflowX).toBeLessThanOrEqual(tolerance);
    expect(activePresentation.mediaOverflowY).toBeLessThanOrEqual(tolerance);
    expect(activePresentation.pageOverflowX).toBeLessThanOrEqual(tolerance);

    if (viewport.width === 1280) {
      expect(
        activePresentation.sourceWidth,
        `1280px viewport: --lightbox-source-width (${activePresentation.sourceWidth}px) must cover .lightbox-dialog-media content width (${activePresentation.mediaContentWidth}px)`,
      ).toBeGreaterThanOrEqual(activePresentation.mediaContentWidth);
    }
  });
}

test.describe("high-DPR nested Lightbox bitmap bounds", () => {
  test.use({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

  test("enlarges SKN 青龙4.0 云 without painting beyond its decoded bitmap", async ({ page }) => {
    // Given: the low-resolution wide Cloud image is decoded inside its model dialog trigger.
    await page.goto(sitePath("/gallery/"));
    await page.locator("#brand-skn > summary").click();
    await page.getByRole("link", { name: /青龙4\.0/ }).click();
    const modelDialog = page.getByRole("dialog", { name: "型号配色一览", exact: true });
    const trigger = modelDialog.getByRole("button", {
      name: "云 · 正面图 · 放大查看",
      exact: true,
    });
    const triggerImage = trigger.locator("img");
    await expect(trigger).toBeVisible();
    await expect.poll(() => awaitDecoded(triggerImage)).toBe(true);
    const triggerPresentation = await measurePaintedImage(triggerImage);
    const decodedBitmap = await decodeSelectedBitmap(triggerImage);
    const triggerNode = await triggerImage.elementHandle();
    expect(triggerNode).not.toBeNull();
    if (!triggerNode) throw new TypeError("The decoded trigger image must have a DOM node");

    // When: the existing image node moves into the nested Lightbox after request tracking starts.
    const postClickImageRequests: string[] = [];
    const collectImageRequest = (request: Request): void => {
      if (request.resourceType() === "image") postClickImageRequests.push(request.url());
    };
    page.on("request", collectImageRequest);
    await trigger.click();
    const lightbox = page.getByRole("dialog", { name: "青龙4.0 图像浏览器", exact: true });
    const activeImage = lightbox.locator(".lightbox-panel:not([hidden]) img");
    await expect(lightbox).toBeVisible();
    await expect.poll(() => awaitDecoded(activeImage)).toBe(true);
    const activePresentation = await measureActivePresentation(activeImage);
    const reusesTriggerNode = await activeImage.evaluate(
      (element, originalNode) => element === originalNode,
      triggerNode,
    );
    page.off("request", collectImageRequest);

    // Then: enlargement remains request-free, contained, and bounded by decoded physical pixels.
    const tolerance = 1;
    expect(postClickImageRequests).toEqual([]);
    expect(reusesTriggerNode).toBe(true);
    expect(activePresentation.currentSrc).toBe(triggerPresentation.currentSrc);
    expect(activePresentation.paintedWidth).toBeGreaterThan(triggerPresentation.paintedWidth);
    expect.soft(activePresentation.paintedPhysicalWidth, "painted physical width").toBeLessThanOrEqual(
      decodedBitmap.width,
    );
    expect.soft(activePresentation.paintedPhysicalHeight, "painted physical height").toBeLessThanOrEqual(
      decodedBitmap.height,
    );
    expect(activePresentation.objectFit).toBe("contain");
    expect(activePresentation.imageLeft).toBeGreaterThanOrEqual(activePresentation.mediaLeft - tolerance);
    expect(activePresentation.imageTop).toBeGreaterThanOrEqual(activePresentation.mediaTop - tolerance);
    expect(activePresentation.imageRight).toBeLessThanOrEqual(activePresentation.mediaRight + tolerance);
    expect(activePresentation.imageBottom).toBeLessThanOrEqual(activePresentation.mediaBottom + tolerance);
    expect(activePresentation.mediaOverflowX).toBeLessThanOrEqual(tolerance);
    expect(activePresentation.mediaOverflowY).toBeLessThanOrEqual(tolerance);
    expect(activePresentation.pageOverflowX).toBeLessThanOrEqual(tolerance);
  });
});
