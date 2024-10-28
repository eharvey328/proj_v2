import { getImages } from "@/lib/getImages";
import { ImageGrid } from "./ImageGrid";

export function generateMetadata() {
  return {
    title: "Главная | Казни женщин в России ",
    description: ``,
  };
}

export default async function Home() {
  const allImages = getImages();

  return (
    <div>
      {/* <h1 className="h1 text-center">Казни женщин в России 1918-1953</h1> */}
      <ImageGrid images={allImages} />
    </div>
  );
}
