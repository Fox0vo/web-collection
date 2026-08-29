import type { ImageMetadata } from "astro";

const keyboardImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/keyboards/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export class MissingKeyboardAssetError extends Error {
  readonly assetPath: string;

  constructor(assetPath: string) {
    super(`Missing keyboard asset: ${assetPath}`);
    this.name = "MissingKeyboardAssetError";
    this.assetPath = assetPath;
  }
}

export const resolveImage = (assetPath: string): ImageMetadata => {
  const image = keyboardImages[`../assets/keyboards/${assetPath}`];
  if (!image) throw new MissingKeyboardAssetError(assetPath);
  return image.default;
};
