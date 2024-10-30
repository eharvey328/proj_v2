import { getImages } from "@/lib/getImages";
import { ImageGrid } from "./ImageGrid";

export function generateMetadata() {
  return {
    title: "Главная | Казни женщин в России ",
    description: ``,
  };
}

export default async function Home() {
  const allImages = await getImages();
  return (
    <div className="relative">
      <ImageGrid images={allImages} />

      <div className="page-container absolute left-0 right-0 bottom-24">
        <h1 className="text-6xl font-bold mb-2 font-serif max-w-[500px]">
          Казни Женщин в России
        </h1>
        <span className="text-lg">с 1918 по 1953 гг.</span>
      </div>
    </div>
  );
}
