import { expect, test } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

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
