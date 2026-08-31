import { expect, test } from "@playwright/test";
import { allModels, brands } from "../src/data/keyboards";

const sitePath = (path: string): string => `/web-collection${path}`;

const colorCount = allModels.reduce((total, model) => total + model.colors.length, 0);
const imageEntryCount: number = allModels.reduce(
  (modelTotal, model) =>
    modelTotal + model.colors.reduce((colorTotal, color) => colorTotal + color.images.length, 0),
  0,
);
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

const modelFor = (modelSlug: string) => {
  const model = allModels.find((candidate) => candidate.slug === modelSlug);
  if (model === undefined) throw new Error(`Missing catalog model: ${modelSlug}`);
  return model;
};

const featuredModel = modelFor("mchose-g98-v3");
const k99Model = modelFor("mchose-k99-v3");
const sknQinglongModel = modelFor("skn-qinglong-4");

test("matches the authoritative seven-model catalog inventory", () => {
  expect(brands).toHaveLength(4);
  expect(allModels).toHaveLength(7);
  expect(colorCount).toBe(42);
  expect(imageEntryCount).toBe(42);
  expect(brands.map(({ slug, name }) => ({ slug, name }))).toEqual([
    { slug: "mchose", name: "迈从 MCHOSE" },
    { slug: "skn", name: "SKN" },
    { slug: "vgn", name: "VGN" },
    { slug: "epomaker", name: "EPOMAKER" },
  ]);
  expect(allModels.map((model) => model.slug)).toEqual([
    "mchose-g98-v3",
    "mchose-k99-v3",
    "skn-qinglong-4",
    "skn-qinglong-jingtan",
    "vgn-v108",
    "vgn-v98-pro-v4",
    "epomaker-galaxy100",
  ]);
  expect(sknQinglongModel.colors.map((color) => color.name)).toEqual([
    "云",
    "电",
    "雷",
    "Ultra 绯",
    "Ultra 凝",
    "Ultra 韶",
    "Ultra 漪",
    "Ultra 青柠",
    "Ultra 桃叽",
    "曜",
    "雨",
  ]);

  for (const model of allModels) {
    for (const color of model.colors) expect(color.images).toHaveLength(1);
  }
});

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
    { path: "/", phrases: ["键盘收藏", "它们的外观与配色", "每一把都配有正面图"] },
    { path: "/gallery/", phrases: ["完整配色", "点击卡片", "每张产品正面图"] },
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
});
