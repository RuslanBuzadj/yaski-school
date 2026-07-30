import "server-only";
import sharp from "sharp";

const DEFAULT_MAX_DIMENSION = 1200;
const DEFAULT_WEBP_QUALITY = 82;

type ToWebpOptions = {
  maxDimension?: number;
  quality?: number;
};

export async function toWebp(input: Buffer, options: ToWebpOptions = {}): Promise<Buffer> {
  const { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_WEBP_QUALITY } = options;

  return sharp(input)
    .rotate()
    .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
}
