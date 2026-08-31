import { expect, test } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

test("renders every static route with its editorial heading", async ({ page }) => {
  const routes = [
    { path: "/", heading: "键盘，按品牌归档。" },
    { path: "/gallery/", heading: "挑选品牌，浏览每一款配色。" },
    { path: "/gallery/mchose-g98-v3/", heading: "迈从 MCHOSE G98 V3" },
    { path: "/gallery/mchose-k99-v3/", heading: "迈从 MCHOSE K99 V3" },
    { path: "/gallery/skn-qinglong-4/", heading: "SKN 青龙4.0" },
    { path: "/gallery/skn-qinglong-jingtan/", heading: "SKN 青龙惊碳" },
    { path: "/gallery/vgn-v108/", heading: "VGN V108" },
    { path: "/gallery/vgn-v98-pro-v4/", heading: "VGN V98 Pro V4" },
    { path: "/gallery/epomaker-galaxy100/", heading: "EPOMAKER Galaxy100" },
  ] as const;

  for (const route of routes) {
    await page.goto(sitePath(route.path));
    await expect(page.locator("main h1")).toHaveText(route.heading);
  }
});

test("starts with four collapsed brand accordions containing seven model links", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));

  await expect(page.locator(".page-intro .lead")).toHaveText(
    "展开品牌并选择型号，浏览完整配色；点击卡片即可查看每张产品正面图。",
  );
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

test("renders brand headings in the public catalog order", async ({ page }) => {
  // Given: the target public brand sequence.
  const targetBrandHeadings = ["迈从 MCHOSE", "SKN", "VGN", "EPOMAKER"] as const;

  // When: a visitor opens the public gallery catalog.
  await page.goto(sitePath("/gallery/"));

  // Then: headings expose that exact sequence in the rendered document.
  await expect(page.locator(".brand-summary-title")).toHaveText(targetBrandHeadings);
});

test("returns not found for the retired showcase route", async ({ request }) => {
  // Given: the former public showcase URL.
  const showcasePath = sitePath("/showcase/");

  // When: the retired route is requested directly.
  const response = await request.get(showcasePath);

  // Then: it is absent from the published site.
  expect(response.status()).toBe(404);
});

test("omits the retired showcase route from public footer navigation", async ({ page }) => {
  // Given: a public page that renders the shared footer.
  await page.goto(sitePath("/"));

  // When: footer destinations are inspected for the retired URL.
  const showcaseLinks = page
    .getByRole("contentinfo")
    .locator(`a[href="${sitePath("/showcase/")}"]`);

  // Then: no public footer link exposes that route.
  await expect(showcaseLinks).toHaveCount(0);
});

test("expands only the selected brand model entries", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));

  const mchose = page.locator("#brand-mchose");
  await mchose.locator("summary").click();

  await expect(mchose).toHaveAttribute("open", "");
  await expect(mchose.locator("[data-model-link]:visible")).toHaveCount(2);
  await expect(
    mchose.getByRole("link", { name: /K99 V3/ }).locator(".model-entry-summary"),
  ).toContainText("共 8 组配色，8 张产品正面图。");
  await expect(page.locator("details[data-brand-section]:not([open]) [data-model-link]:visible")).toHaveCount(0);
});

test("opens model colors in place and returns focus after Escape", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));
  const catalogUrl = page.url();
  await page.locator("#brand-vgn > summary").click();
  const opener = page.getByRole("link", { name: /V98 Pro V4/ });

  await opener.click();

  const dialog = page.getByRole("dialog", { name: "型号配色一览" });
  const activePanel = dialog.locator("[data-model-dialog-panel]:not([hidden])");
  await expect(page).toHaveURL(catalogUrl);
  await expect(dialog).toBeVisible();
  await expect(activePanel.locator("[data-model-dialog-color]")).toHaveCount(6);
  await expect(activePanel.locator(".model-dialog-header > p:last-child")).toHaveText(
    "共 6 组配色，6 张产品正面图。",
  );
  for (const colorName of ["云间白", "海盐", "珊瑚橙", "折影白", "暗夜", "极地限定"]) {
    await expect(activePanel.getByRole("heading", { name: colorName, exact: true })).toBeVisible();
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("opens a gallery color image in a nested Lightbox and restores focus by layer", async ({ page }) => {
  // Given: the V98 Pro V4 color-classification dialog is open from its gallery model link.
  await page.goto(sitePath("/gallery/"));
  await page.locator("#brand-vgn > summary").click();
  const modelOpener = page.getByRole("link", { name: /V98 Pro V4/ });
  await modelOpener.click();
  const modelDialog = page.getByRole("dialog", { name: "型号配色一览", exact: true });
  const imageTrigger = modelDialog.getByRole("button", {
    name: "云间白 · 正面图 · 放大查看",
    exact: true,
  });
  await expect(modelDialog).toBeVisible();
  await expect(imageTrigger).toBeVisible();

  // When: the color image opens its nested high-definition Lightbox.
  await imageTrigger.click();
  const lightbox = page.getByRole("dialog", { name: "V98 Pro V4 图像浏览器", exact: true });
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

  // Then: Escape dismisses only the active layer and restores each layer's opener.
  await page.keyboard.press("Escape");
  await expect(lightbox).toBeHidden();
  await expect(modelDialog).toBeVisible();
  await expect(imageTrigger).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(modelDialog).toBeHidden();
  await expect(modelOpener).toBeFocused();
});

test("keeps every model dialog linked to its canonical fallback page", async ({ page }) => {
  await page.goto(sitePath("/gallery/"));
  await page.locator("#brand-vgn > summary").click();
  await page.getByRole("link", { name: /V98 Pro V4/ }).click();

  const dialog = page.getByRole("dialog", { name: "型号配色一览" });
  await expect(dialog.getByRole("link", { name: /完整型号页/ })).toHaveAttribute(
    "href",
    sitePath("/gallery/vgn-v98-pro-v4/"),
  );
  const activePanel = dialog.locator("[data-model-dialog-panel]:not([hidden])");
  const cloudWhite = activePanel.locator("[data-model-dialog-color]", { hasText: "云间白" });
  await expect(cloudWhite.getByText("共 1 张产品正面图", { exact: true })).toBeVisible();
  await expect(
    cloudWhite.getByRole("button", { name: "云间白 · 正面图 · 放大查看", exact: true }),
  ).toBeVisible();
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

test("loads every inline keyboard image after scrolling it into view", async ({ page }) => {
  const routes = [
    { path: "/gallery/", selector: "details[data-brand-section] .figure img" },
    { path: "/gallery/vgn-v98-pro-v4/", selector: ".lightbox-trigger img" },
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
