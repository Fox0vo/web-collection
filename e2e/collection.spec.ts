import { expect, test } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

test("renders every static route with its editorial heading", async ({ page }) => {
  const routes = [
    { path: "/", heading: "键盘，按品牌归档。" },
    { path: "/gallery/", heading: "四个品牌，七组型号。" },
    { path: "/gallery/skn-qinglong-4/", heading: "SKN 青龙4.0" },
    { path: "/gallery/mchose-g98-pro-v2/", heading: "迈从 MCHOSE G98 Pro V2" },
    { path: "/gallery/epomaker-galaxy100/", heading: "EPOMAKER Galaxy100" },
    { path: "/gallery/vgn-v108/", heading: "VGN V108" },
    { path: "/showcase/", heading: "印刷规则构成的界面原件。" },
  ] as const;

  for (const route of routes) {
    await page.goto(sitePath(route.path));
    await expect(page.locator("main h1")).toHaveText(route.heading);
  }
});

test("starts with four collapsed brand accordions containing seven model links", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));

  const brandSections = page.locator("details[data-brand-section]");
  await expect(brandSections).toHaveCount(4);
  await expect(page.locator("[data-model-link]")).toHaveCount(7);
  await expect(page.getByRole("group", { name: /SKN/ })).toBeVisible();
  await expect(page.getByRole("group", { name: /迈从 MCHOSE/ })).toBeVisible();
  await expect(page.getByRole("group", { name: /EPOMAKER/ })).toBeVisible();
  await expect(page.getByRole("group", { name: /VGN/ })).toBeVisible();
  await expect
    .poll(() =>
      brandSections.evaluateAll((sections) =>
        sections.every((section) => section instanceof HTMLDetailsElement && !section.open),
      ),
    )
    .toBe(true);
});

test("expands only the selected brand model entries", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));

  const mchose = page.locator("#brand-mchose");
  await mchose.locator("summary").click();

  await expect(mchose).toHaveAttribute("open", "");
  await expect(mchose.locator("[data-model-link]:visible")).toHaveCount(3);
  await expect(page.locator("details[data-brand-section]:not([open]) [data-model-link]:visible")).toHaveCount(0);
});

test("opens model colors in place and returns focus after Escape", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));
  const catalogUrl = page.url();
  await page.locator("#brand-mchose > summary").click();
  const opener = page.getByRole("link", { name: /G98 Pro V2/ });

  await opener.click();

  const dialog = page.getByRole("dialog", { name: "型号配色一览" });
  const activePanel = dialog.locator("[data-model-dialog-panel]:not([hidden])");
  await expect(page).toHaveURL(catalogUrl);
  await expect(dialog).toBeVisible();
  await expect(activePanel.locator("[data-model-dialog-color]")).toHaveCount(7);
  for (const colorName of ["冰川渐变", "橙蓝", "灰蓝", "蓝色", "极夜黑", "黑莓粉", "黑紫"]) {
    await expect(activePanel.getByRole("heading", { name: colorName, exact: true })).toBeVisible();
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("keeps every model dialog linked to its canonical fallback page", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));
  await page.locator("#brand-mchose > summary").click();
  await page.getByRole("link", { name: /G98 Pro V2/ }).click();

  const dialog = page.getByRole("dialog", { name: "型号配色一览" });
  await expect(dialog.getByRole("link", { name: /完整型号页/ })).toHaveAttribute(
    "href",
    sitePath("/gallery/mchose-g98-pro-v2/"),
  );
  const activePanel = dialog.locator("[data-model-dialog-panel]:not([hidden])");
  const orangeBlue = activePanel.locator("[data-model-dialog-color]", { hasText: "橙蓝" });
  await expect(orangeBlue.getByText("雪虎轴", { exact: true })).toBeVisible();
  await expect(orangeBlue.getByText("烈焰橙轴", { exact: true })).toBeVisible();
});

test("opens a matching brand accordion from its hash", async ({ page }) => {
  await page.goto(sitePath("/gallery/#brand-mchose"));

  await expect(page.locator("#brand-mchose")).toHaveAttribute("open", "");
  await expect(page.locator("details[data-brand-section][open]")).toHaveCount(1);

  await page.locator("#brand-skn > summary").click();
  await page.evaluate(() => {
    window.location.hash = "#brand-vgn";
  });

  await expect(page.locator("#brand-vgn")).toHaveAttribute("open", "");
  await expect(page.locator("details[data-brand-section][open]")).toHaveCount(1);
});

test("labels every local variant in a multi-image color", async ({ page }) => {
  await page.goto(sitePath("/gallery/mchose-g98-pro-v2/#color-chenglan"));

  const color = page.locator("#color-chenglan");
  await expect(color.getByText("雪虎轴", { exact: true })).toBeVisible();
  await expect(color.getByText("烈焰橙轴", { exact: true })).toBeVisible();
  await expect(color.locator(".lightbox-trigger img")).toHaveCount(2);
});

test("loads every inline keyboard image after scrolling it into view", async ({ page }) => {
  const routes = [
    { path: "/gallery/", selector: "details[data-brand-section] .figure img" },
    { path: "/gallery/mchose-g98-pro-v2/", selector: ".lightbox-trigger img" },
  ] as const;

  for (const route of routes) {
    await page.goto(sitePath(route.path));
    if (route.path === "/gallery/") {
      const summaries = page.locator("details[data-brand-section] > summary");
      const summaryCount = await summaries.count();
      for (let index = 0; index < summaryCount; index += 1) await summaries.nth(index).click();
    }
    const images = page.locator(route.selector);
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    for (let index = 0; index < imageCount; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            image.evaluate(
              (element) =>
                element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
            ),
          { message: `${route.path} inline keyboard image ${index + 1} should load after scrolling` },
        )
        .toBe(true);
    }
  }
});

test("keeps desktop navigation available to assistive technology", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(sitePath("/"));

  const banner = page.getByRole("banner");
  const navigation = banner.getByRole("navigation", { name: "主导航" });
  await expect(banner).toBeVisible();
  await expect(navigation).toBeVisible();
  await expect(navigation).not.toHaveAttribute("hidden", "");
});

test("shows the TagList empty state in the component showcase", async ({ page }) => {
  await page.goto(sitePath("/showcase/"));

  await expect(page.getByText("暂无标签", { exact: true })).toBeVisible();
});

test("opens and closes mobile navigation with the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(sitePath("/"));

  const menuButton = page.getByRole("button", { name: "目录" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "主导航" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();
});

test("operates the model image browser by keyboard", async ({ page }) => {
  await page.goto(sitePath("/gallery/mchose-g98-pro-v2/#color-chenglan"));

  const trigger = page.getByRole("button", { name: /橙蓝 · 雪虎轴 · 放大查看/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "G98 Pro V2 图像浏览器" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".lightbox-panel:not([hidden]) img")).toHaveAttribute("alt", /雪虎轴/);

  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".lightbox-panel:not([hidden]) img")).toHaveAttribute("alt", /烈焰橙轴/);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
