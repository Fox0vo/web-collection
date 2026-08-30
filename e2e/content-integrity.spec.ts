import { expect, test } from "@playwright/test";
import { allModels, brands } from "../src/data/keyboards";

const sitePath = (path: string): string => `/web-collection${path}`;

const colorCount = allModels.reduce((total, model) => total + model.colors.length, 0);
const modelImageCounts = allModels.reduce((counts, model) => {
  counts.set(
    model.slug,
    model.colors.reduce((total, color) => total + color.images.length, 0),
  );
  return counts;
}, new Map<string, number>());

const imageCountFor = (modelSlug: string): number => {
  const imageCount = modelImageCounts.get(modelSlug);
  if (imageCount === undefined) throw new Error(`Missing image count for model: ${modelSlug}`);
  return imageCount;
};

const featuredModel = brands[1].models[0];
const showcaseModel = brands[1].models[1];
const k99Model = brands[1].models[2];

test("reports catalog totals derived from the keyboard data", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page.locator(".hero-note")).toContainText(
    `${brands.length} 个品牌，${allModels.length} 组型号，${colorCount} 组配色`,
  );

  await page.goto(sitePath("/gallery/"));
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    new RegExp(`${allModels.length} 组键盘型号和 ${colorCount} 组真实配色`),
  );
});

test("keeps intentional semantic phrases intact within a 375px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  const routes = [
    { path: "/", phrases: ["键盘收藏", "它们的外观与配色", "每一把", "正面图"] },
    { path: "/gallery/", phrases: ["轴体版本", "每张产品正面图"] },
    { path: "/showcase/", phrases: ["长中文换行", "按钮状态与原生对话框交互", "自然换行"] },
  ];

  for (const route of routes) {
    await page.goto(sitePath(route.path));
    for (const phrase of route.phrases) {
      const phraseSpan = page.locator("span.nowrap", { hasText: phrase });
      await expect(phraseSpan).toHaveCount(1);
      await expect(phraseSpan).toHaveText(phrase);

      const bounds = await phraseSpan.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          clientRectCount: element.getClientRects().length,
          left: rect.left,
          right: rect.right,
          viewportWidth: window.innerWidth,
        };
      });
      expect(bounds.clientRectCount).toBe(1);
      expect(bounds.left).toBeGreaterThanOrEqual(0);
      expect(bounds.right).toBeLessThanOrEqual(bounds.viewportWidth);
    }
  }
});

test("states each featured model image total as a concise factual phrase", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page.locator('section[aria-labelledby="feature-title"] .story-copy > p:last-child')).toContainText(
    `${imageCountFor(featuredModel.slug)} 张正面图`,
  );

  await page.goto(sitePath(`/gallery/${k99Model.slug}/`));
  await expect(page.locator(".detail-subtitle")).toContainText(`${imageCountFor(k99Model.slug)} 张正面图`);

  await page.goto(sitePath("/showcase/"));
  await expect(page.locator('section[aria-labelledby="story-title"] .story-copy > p:last-child')).toContainText(
    `${imageCountFor(showcaseModel.slug)} 张正面图`,
  );
});
