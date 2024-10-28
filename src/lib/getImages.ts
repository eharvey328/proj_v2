import fs from "fs";
import path from "path";

export type ImageFile = {
  filename: string;
  displayName: string;
};

export function getImages(): ImageFile[] {
  const imageDir = path.join(process.cwd(), "public/img");
  const files = fs.readdirSync(imageDir);

  return files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map((filename) => ({
      filename,
      displayName: filename.replace(/\.[^/.]+$/, ""),
    }));
}
