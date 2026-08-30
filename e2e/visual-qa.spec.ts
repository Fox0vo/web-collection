import { expect, test, type Page } from "@playwright/test";

const routes = [
  { slug: "home", path: "/" },
  { slug: "gallery", path: "/gallery/" },
  { slug: "skn-qinglong-4", path: "/gallery/skn-qinglong-4/" },
  { slug: "skn-qinglong-jingtan", path: "/gallery/skn-qinglong-jingtan/" },
  { slug: "mchose-g98-v3", path: "/gallery/mchose-g98-v3/" },
  { slug: "mchose-k99-v3", path: "/gallery/mchose-k99-v3/" },
  { slug: "epomaker-galaxy100", path: "/gallery/epomaker-galaxy100/" },
  { slug: "vgn-v108", path: "/gallery/vgn-v108/" },
  { slug: "vgn-v98-pro-v4", path: "/gallery/vgn-v98-pro-v4/" },
  { slug: "showcase", path: "/showcase/" },
] as const;

const viewports = [
  { width: 375, height: 800 },
  { width: 768, height: 900 },
  { width: 1280, height: 900 },
] as const;

const sitePath = (path: string): string => `/web-collection${path}`;

const preloadVisibleInlineImages = async (page: Page): Promise<void> => {
  const images = page.locator("main img:visible");
  const imageCount = await images.count();

  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await image.evaluate(async (element) => {
      if (element instanceof HTMLImageElement) await element.decode();
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
};

test("captures every page and required viewport", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(sitePath(route.path));
      await preloadVisibleInlineImages(page);
      await page.screenshot({
        path: `.omo/evidence/keyboard-catalog/${route.slug}-${viewport.width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});

test("captures expanded brand accordions at every required viewport", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(sitePath("/gallery/"));
    await page.locator("#brand-vgn > summary").click();
    await preloadVisibleInlineImages(page);
    await page.screenshot({
      path: `.omo/evidence/keyboard-catalog/gallery-${viewport.width}-accordion-expanded.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});

test("captures mobile menu, V98 dialog top and bottom, and showcase lightbox states", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "目录" }).click();
  await preloadVisibleInlineImages(page);
  await page.screenshot({ path: ".omo/evidence/keyboard-catalog/home-375-menu-open.png", fullPage: true });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(sitePath("/gallery/"));
  await page.locator("#brand-vgn > summary").click();
  await page.getByRole("link", { name: /V98 Pro V4/ }).click();
  await preloadVisibleInlineImages(page);
  const modelDialog = page.getByRole("dialog", { name: "型号配色一览" });
  await modelDialog.evaluate((element) => {
    if (element instanceof HTMLDialogElement) element.scrollTop = 0;
  });
  await expect(modelDialog.getByRole("button", { name: "关闭" })).toBeVisible();
  await page.screenshot({ path: ".omo/evidence/keyboard-catalog/gallery-1280-model-dialog.png" });

  await modelDialog.evaluate((element) => {
    if (element instanceof HTMLDialogElement) element.scrollTop = element.scrollHeight;
  });
  await expect
    .poll(() =>
      modelDialog.evaluate((element) =>
        element instanceof HTMLDialogElement ? element.scrollTop : 0,
      ),
    )
    .toBeGreaterThan(0);
  await page.screenshot({ path: ".omo/evidence/keyboard-catalog/gallery-1280-model-dialog-bottom.png" });

  await page.goto(sitePath("/showcase/"));
  await page
    .getByRole("button", { name: "星核白 · 正面图 · 放大查看", exact: true })
    .click();
  await preloadVisibleInlineImages(page);
  await page.screenshot({ path: ".omo/evidence/keyboard-catalog/showcase-1280-lightbox.png" });
});
