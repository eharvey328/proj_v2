import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface ImageFile {
  filename: string;
  displayName: string;
  blurDataURL: string;
  width: number;
  height: number;
}

export async function getImages(): Promise<ImageFile[]> {
  const imageDir = path.join(process.cwd(), "public/img");
  const files = fs.readdirSync(imageDir);

  const imagePromises = files
    .filter((file) => /\.(jpg|jpeg)$/i.test(file))
    .map(async (filename) => {
      const fullPath = path.join(imageDir, filename);
      const [blurDataURL, dimensions] = await Promise.all([
        generateBlurPlaceholder(fullPath),
        getImageDimensions(fullPath),
      ]);

      return {
        filename,
        displayName: filename.replace(/\.[^/.]+$/, ""),
        blurDataURL,
        width: dimensions.width,
        height: dimensions.height,
      };
    });

  return Promise.all(imagePromises);
}

async function generateBlurPlaceholder(imagePath: string): Promise<string> {
  const imageBuffer = await sharp(imagePath)
    .resize(10, 10, { fit: "inside" })
    .jpeg({
      quality: 50,
      progressive: true,
      optimizeScans: true,
    })
    .blur(4)
    .toBuffer();

  return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
}

async function getImageDimensions(imagePath: string) {
  const metadata = await sharp(imagePath).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}
