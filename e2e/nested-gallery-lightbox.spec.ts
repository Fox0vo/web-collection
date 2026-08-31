import { expect, test, type Locator } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

type SelectedBitmapMetrics = {
  readonly bitmapHeight: number;
  readonly bitmapWidth: number;
  readonly paintedPhysicalHeight: number;
  readonly paintedPhysicalWidth: number;
};

const measureSelectedBitmap = (image: Locator): Promise<SelectedBitmapMetrics> =>
  image.evaluate(async (element) => {
    if (!(element instanceof HTMLImageElement)) {
      return {
        bitmapHeight: 0,
        bitmapWidth: 0,
        paintedPhysicalHeight: 0,
        paintedPhysicalWidth: 0,
      };
    }

    const response = await fetch(element.currentSrc);
    const bitmap = await createImageBitmap(await response.blob());
    const bitmapHeight = bitmap.height;
    const bitmapWidth = bitmap.width;
    bitmap.close();
    const paintedBounds = element.getBoundingClientRect();
    return {
      bitmapHeight,
      bitmapWidth,
      paintedPhysicalHeight: paintedBounds.height * window.devicePixelRatio,
      paintedPhysicalWidth: paintedBounds.width * window.devicePixelRatio,
    };
  });

test.describe("desktop bitmap bounds", () => {
  test.use({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

  test("reuses the decoded SKN gallery image for a high-definition nested Lightbox", async ({ page }) => {
    // Given: the high-resolution Black Warrior image is visible in its gallery model dialog.
    await page.goto(sitePath("/gallery/"));
    await page.locator("#brand-skn > summary").click();
    await page.getByRole("link", { name: /青龙惊碳/ }).click();
    const modelDialog = page.getByRole("dialog", { name: "型号配色一览", exact: true });
    const trigger = modelDialog.getByRole("button", {
      name: "黑武士 · 正面图 · 放大查看",
      exact: true,
    });
    const thumbnail = trigger.locator("img");
    await expect(trigger).toBeVisible();
    await expect
      .poll(() =>
        thumbnail.evaluate(async (element) => {
          if (!(element instanceof HTMLImageElement)) return false;
          await element.decode();
          return element.complete && element.naturalWidth > 0;
        }),
      )
      .toBe(true);

    const largestResponsiveCandidate = await thumbnail.evaluate((element) => {
      if (!(element instanceof HTMLImageElement)) return 0;
      return Math.max(
        0,
        ...element.srcset.split(",").map((candidate) => {
          const descriptor = candidate.trim().split(/\s+/).at(-1);
          if (!descriptor?.endsWith("w")) return 0;
          const width = Number.parseInt(descriptor.slice(0, -1), 10);
          return Number.isFinite(width) ? width : 0;
        }),
      );
    });
    expect(largestResponsiveCandidate).toBeGreaterThanOrEqual(2240);
    const thumbnailCurrentSrc = await thumbnail.evaluate((element) =>
      element instanceof HTMLImageElement ? element.currentSrc : "",
    );
    const thumbnailMetrics = await measureSelectedBitmap(thumbnail);

    // When: the listener starts immediately before opening the nested Lightbox.
    const postClickImageRequests: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "image") postClickImageRequests.push(request.url());
    });
    await trigger.click();

    const lightbox = page.getByRole("dialog", { name: "青龙惊碳 图像浏览器", exact: true });
    const activeImage = lightbox.locator(".lightbox-panel:not([hidden]) img");
    await expect(lightbox).toBeVisible();
    await expect
      .poll(() =>
        activeImage.evaluate(async (element) => {
          if (!(element instanceof HTMLImageElement)) return false;
          await element.decode();
          return element.complete && element.naturalWidth > 0;
        }),
      )
      .toBe(true);

    // Then: the active image reuses the selected source without crop, overflow, or upscaling.
    const activeCurrentSrc = await activeImage.evaluate((element) =>
      element instanceof HTMLImageElement ? element.currentSrc : "",
    );
    const activeMetrics = await measureSelectedBitmap(activeImage);
    const containment = await activeImage.evaluate((element) => {
      if (!(element instanceof HTMLImageElement)) return null;
      const media = element.closest(".lightbox-dialog-media");
      if (!(media instanceof HTMLElement)) return null;
      const imageBounds = element.getBoundingClientRect();
      const mediaBounds = media.getBoundingClientRect();
      return {
        imageBottom: imageBounds.bottom,
        imageLeft: imageBounds.left,
        imageRight: imageBounds.right,
        imageTop: imageBounds.top,
        mediaBottom: mediaBounds.bottom,
        mediaLeft: mediaBounds.left,
        mediaRight: mediaBounds.right,
        mediaTop: mediaBounds.top,
        objectFit: getComputedStyle(element).objectFit,
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(containment).not.toBeNull();
    if (!containment) return;
    const tolerance = 1;
    expect(postClickImageRequests).toEqual([]);
    expect(activeCurrentSrc).toBe(thumbnailCurrentSrc);
    expect(thumbnailMetrics.paintedPhysicalWidth).toBeLessThanOrEqual(thumbnailMetrics.bitmapWidth);
    expect(thumbnailMetrics.paintedPhysicalHeight).toBeLessThanOrEqual(thumbnailMetrics.bitmapHeight);
    expect(activeMetrics.bitmapWidth).toBeGreaterThanOrEqual(activeMetrics.paintedPhysicalWidth);
    expect(activeMetrics.bitmapHeight).toBeGreaterThanOrEqual(activeMetrics.paintedPhysicalHeight);
    expect(containment.objectFit).toBe("contain");
    expect(containment.imageLeft).toBeGreaterThanOrEqual(containment.mediaLeft - tolerance);
    expect(containment.imageTop).toBeGreaterThanOrEqual(containment.mediaTop - tolerance);
    expect(containment.imageRight).toBeLessThanOrEqual(containment.mediaRight + tolerance);
    expect(containment.imageBottom).toBeLessThanOrEqual(containment.mediaBottom + tolerance);
    expect(containment.pageOverflow).toBeLessThanOrEqual(tolerance);
  });
});
