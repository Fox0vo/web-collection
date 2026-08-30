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

const containmentViewports = [
  { width: 375, height: 800 },
  { width: 1280, height: 900 },
] as const;

test.use({ viewport: { width: 375, height: 800 }, deviceScaleFactor: 1 });

test("serves a bounded thumbnail without weakening the decoded lightbox image", async ({ page }) => {
  await page.goto(sitePath("/gallery/skn-qinglong-jingtan/"));

  const trigger = page.getByRole("button", {
    name: "黑武士 · 正面图 · 放大查看",
    exact: true,
  });
  const thumbnail = trigger.locator("img");
  await thumbnail.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      thumbnail.evaluate(async (element) => {
        if (!(element instanceof HTMLImageElement)) return false;
        await element.decode();
        return element.complete && element.naturalWidth > 0;
      }),
    )
    .toBe(true);

  const thumbnailMetrics = await thumbnail.evaluate((element) => {
    if (!(element instanceof HTMLImageElement)) {
      return { complete: false, naturalWidth: 0, renderedWidth: 0 };
    }
    return {
      complete: element.complete,
      naturalWidth: element.naturalWidth,
      renderedWidth: element.getBoundingClientRect().width,
    };
  });

  const postClickImageRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "image") postClickImageRequests.push(request.url());
  });

  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "青龙惊碳 图像浏览器" });
  const activeImage = dialog.locator(".lightbox-panel:not([hidden]) img");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      activeImage.evaluate(async (element) => {
        if (!(element instanceof HTMLImageElement)) return false;
        await element.decode();
        return element.complete && element.naturalWidth > 0;
      }),
    )
    .toBe(true);

  const activeMetrics = await activeImage.evaluate((element) => {
    if (!(element instanceof HTMLImageElement)) {
      return { complete: false, naturalWidth: 0, renderedWidth: 0 };
    }
    return {
      complete: element.complete,
      naturalWidth: element.naturalWidth,
      renderedWidth: element.getBoundingClientRect().width,
    };
  });
  expect(activeMetrics.complete).toBe(true);
  expect(activeMetrics.naturalWidth).toBeGreaterThan(0);
  expect(activeMetrics.renderedWidth).toBeGreaterThan(0);
  expect(activeMetrics.naturalWidth).toBeGreaterThanOrEqual(activeMetrics.renderedWidth);
  expect(postClickImageRequests).toEqual([]);

  expect(thumbnailMetrics.complete).toBe(true);
  expect(thumbnailMetrics.naturalWidth).toBeGreaterThan(0);
  expect(thumbnailMetrics.renderedWidth).toBeGreaterThan(0);
  expect(thumbnailMetrics.naturalWidth).toBeLessThanOrEqual(thumbnailMetrics.renderedWidth * 3);
});

test("prioritizes only the first model thumbnail", async ({ page }) => {
  await page.goto(sitePath("/gallery/vgn-v98-pro-v4/"));

  const thumbnails = page.locator(".lightbox-trigger img");
  const firstThumbnail = thumbnails.nth(0);
  const secondThumbnail = thumbnails.nth(1);

  await expect(firstThumbnail).toHaveAttribute("loading", "eager");
  await expect(firstThumbnail).toHaveAttribute("fetchpriority", "high");
  await expect(secondThumbnail).toHaveAttribute("loading", "lazy");
  await expect(secondThumbnail).toHaveAttribute("fetchpriority", "auto");
});

test.describe("desktop bitmap bounds", () => {
  test.use({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

  test("never paints the selected Qinglong 4 bitmap beyond its physical width", async ({ page }) => {
    await page.goto(sitePath("/gallery/skn-qinglong-4/"));

    const trigger = page.getByRole("button", {
      name: "云 · 正面图 · 放大查看",
      exact: true,
    });
    const thumbnail = trigger.locator("img");
    await expect
      .poll(() =>
        thumbnail.evaluate(async (element) => {
          if (!(element instanceof HTMLImageElement)) return false;
          await element.decode();
          return element.complete && element.naturalWidth > 0;
        }),
      )
      .toBe(true);
    const thumbnailMetrics = await measureSelectedBitmap(thumbnail);

    const postClickImageRequests: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "image") postClickImageRequests.push(request.url());
    });

    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "青龙4.0 图像浏览器" });
    const activeImage = dialog.locator(".lightbox-panel:not([hidden]) img");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        activeImage.evaluate(async (element) => {
          if (!(element instanceof HTMLImageElement)) return false;
          await element.decode();
          return element.complete && element.naturalWidth > 0;
        }),
      )
      .toBe(true);
    const activeMetrics = await measureSelectedBitmap(activeImage);

    expect.soft(postClickImageRequests).toEqual([]);
    expect.soft(thumbnailMetrics.paintedPhysicalWidth).toBeLessThanOrEqual(thumbnailMetrics.bitmapWidth);
    expect.soft(activeMetrics.paintedPhysicalWidth).toBeLessThanOrEqual(activeMetrics.bitmapWidth);
  });
});

for (const viewport of containmentViewports) {
  test.describe(`K99 thumbnail containment at ${viewport.width}px`, () => {
    test.use({ viewport, deviceScaleFactor: 1 });

    test("keeps the square transparent image inside its media wrapper", async ({ page }) => {
      await page.goto(sitePath("/gallery/mchose-k99-v3/"));

      const trigger = page.getByRole("button", {
        name: "星核白 · 正面图 · 放大查看",
        exact: true,
      });
      const media = trigger.locator(".lightbox-trigger-media");
      const image = trigger.locator("img");
      await expect
        .poll(() =>
          image.evaluate(async (element) => {
            if (!(element instanceof HTMLImageElement)) return false;
            await element.decode();
            return element.complete && element.naturalWidth > 0;
          }),
        )
        .toBe(true);

      const wrapperBounds = await media.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return { bottom: bounds.bottom, left: bounds.left, right: bounds.right, top: bounds.top };
      });
      const imageBounds = await image.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return { bottom: bounds.bottom, left: bounds.left, right: bounds.right, top: bounds.top };
      });
      const bitmapMetrics = await measureSelectedBitmap(image);
      const tolerance = 1;

      expect.soft(imageBounds.left, `${viewport.width}px image left edge`).toBeGreaterThanOrEqual(
        wrapperBounds.left - tolerance,
      );
      expect.soft(imageBounds.top, `${viewport.width}px image top edge`).toBeGreaterThanOrEqual(
        wrapperBounds.top - tolerance,
      );
      expect.soft(imageBounds.right, `${viewport.width}px image right edge`).toBeLessThanOrEqual(
        wrapperBounds.right + tolerance,
      );
      expect.soft(imageBounds.bottom, `${viewport.width}px image bottom edge`).toBeLessThanOrEqual(
        wrapperBounds.bottom + tolerance,
      );
      expect.soft(bitmapMetrics.paintedPhysicalWidth, `${viewport.width}px painted bitmap width`).toBeLessThanOrEqual(
        bitmapMetrics.bitmapWidth,
      );
      expect
        .soft(bitmapMetrics.paintedPhysicalHeight, `${viewport.width}px painted bitmap height`)
        .toBeLessThanOrEqual(bitmapMetrics.bitmapHeight);
    });
  });
}
