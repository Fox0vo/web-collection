import { expect, test } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4322/web-collection";
const pageUrl = (path: string): string => `${baseUrl}${path}`;

test("renders every static route with its editorial heading", async ({ page }) => {
  const routes = [
    { path: "/", heading: "物件，被认真观看。" },
    { path: "/gallery/", heading: "四件物品，四段安静的用途。" },
    { path: "/gallery/fold-lamp/", heading: "叠光灯" },
    { path: "/gallery/grain-radio/", heading: "粒波收音机" },
    { path: "/gallery/trace-chair/", heading: "回线椅" },
    { path: "/gallery/ink-clock/", heading: "墨刻钟" },
    { path: "/showcase/", heading: "印刷规则构成的界面原件。" },
  ] as const;

  for (const route of routes) {
    await page.goto(pageUrl(route.path));
    await expect(page.locator("main h1")).toHaveText(route.heading);
  }
});

test("keeps desktop navigation available to assistive technology", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(pageUrl("/"));

  const banner = page.getByRole("banner");
  const navigation = banner.getByRole("navigation", { name: "主导航" });
  await expect(banner).toBeVisible();
  await expect(navigation).toBeVisible();
  await expect(navigation).not.toHaveAttribute("hidden", "");
});

test("shows the TagList empty state in the component showcase", async ({ page }) => {
  await page.goto(pageUrl("/showcase/"));

  await expect(page.getByText("暂无标签", { exact: true })).toBeVisible();
});

test("opens mobile navigation and operates the image browser by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(pageUrl("/"));

  const menuButton = page.getByRole("button", { name: "目录" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "主导航" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await page.getByRole("link", { name: "阅读本期产品志" }).click();
  await expect(page).toHaveURL(pageUrl("/gallery/"));

  const trigger = page.getByRole("button", { name: /叠光灯 · 放大查看/ });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "产品图像浏览器" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".lightbox-panel:not([hidden]) img")).toHaveAttribute("alt", /黑色支架/);

  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".lightbox-panel:not([hidden]) img")).toHaveAttribute("alt", /橄榄绿色方形收音机/);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
