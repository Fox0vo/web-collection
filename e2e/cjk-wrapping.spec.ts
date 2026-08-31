import { expect, test } from "@playwright/test";

const sitePath = (path: string): string => `/web-collection${path}`;

test("keeps the nested Lightbox phrase 正面图 on one line at 375px", async ({ page }) => {
  // Given: the V98 Pro V4 model dialog is open at the narrow mobile viewport.
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(sitePath("/gallery/"));
  await page.locator("#brand-vgn > summary").click();
  await page.getByRole("link", { name: /V98 Pro V4/ }).click();
  const modelDialog = page.getByRole("dialog", { name: "型号配色一览", exact: true });
  const imageTrigger = modelDialog.getByRole("button", {
    name: "云间白 · 正面图 · 放大查看",
    exact: true,
  });
  await expect(imageTrigger).toBeVisible();

  // When: the color image opens its nested Lightbox.
  await imageTrigger.click();
  const lightbox = page.getByRole("dialog", { name: "V98 Pro V4 图像浏览器", exact: true });
  await expect(lightbox).toBeVisible();

  // Then: every character in the semantic phrase occupies the same rendered line box.
  const phrase = "正面图";
  const roundedCharacterTops = await lightbox.evaluate((element, renderedPhrase) => {
    const noCharacterTops: readonly number[] = [];
    if (!(element instanceof HTMLDialogElement)) return noCharacterTops;
    const caption = element.querySelector(".lightbox-panel:not([hidden]) figcaption");
    if (!(caption instanceof HTMLElement)) return noCharacterTops;
    const textNode = caption.firstChild;
    if (!(textNode instanceof Text)) return noCharacterTops;
    const phraseStart = textNode.data.indexOf(renderedPhrase);
    if (phraseStart < 0) return noCharacterTops;

    const characterTops: number[] = [];
    for (let offset = 0; offset < renderedPhrase.length; offset += 1) {
      const range = document.createRange();
      range.setStart(textNode, phraseStart + offset);
      range.setEnd(textNode, phraseStart + offset + 1);
      const rectangle = range.getClientRects().item(0);
      if (!(rectangle instanceof DOMRect)) return noCharacterTops;
      characterTops.push(Math.round(rectangle.top));
    }
    return characterTops;
  }, phrase);

  expect(
    roundedCharacterTops,
    `Expected to locate all characters in "${phrase}"; rounded top positions: ${JSON.stringify(roundedCharacterTops)}`,
  ).toHaveLength(phrase.length);
  expect(
    new Set(roundedCharacterTops).size,
    `Expected "${phrase}" to stay on one line; rounded top positions for 正, 面, 图: ${JSON.stringify(roundedCharacterTops)}`,
  ).toBe(1);
});
