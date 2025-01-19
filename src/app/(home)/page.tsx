import { getImages } from "@/lib/getImages";
import { ImageGrid } from "./ImageGrid";
import clsx from "clsx";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "Главная | Казни женщин в России ",
    description: ``,
  };
}

export default async function Home() {
  const allImages = await getImages();
  return (
    <>
      <section className="bg-[#1b170f] grid md:grid-cols-2">
        <div className="text-layer px-4 sm:px-6 md:px-9 py-24">
          <div className="mb-1 text-sm text-background font-secondary">
            с 1918 по 1953 гг.
          </div>
          <h1 className="text-4xl mb-6 font-secondary">
            Казни женщин в России
          </h1>
          <p className="max-w-[500px]">
            This is some descriptive text about the site content. It will give
            visitors an idea of what to expect from this site.
          </p>
        </div>

        <ImageGrid images={allImages} />
      </section>

      <section>
        <div className="page-container py-24">
          <h2 className="text-2xl font-secondary pb-16">Section Title</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <HomeTile title="Списки убитых" href="/lists" />
            <HomeTile title="От автора" href="/about" />
            <HomeTile title="Оставьте сообщение" href="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}

type HomeTileProps = {
  title: string;
  href: string;
  className?: string;
};

function HomeTile(props: HomeTileProps) {
  const { title, href, className } = props;
  return (
    <Link className="text-foreground" href={href}>
      <div
        className={clsx(
          "w-full border min-h-[150px] lg:min-h-[250px]",
          className
        )}
      >
        {title}
      </div>
    </Link>
  );
}
