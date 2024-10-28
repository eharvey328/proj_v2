import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocsList, getDocBySlug } from "@/lib/convertDocs";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { HtmlRenderer } from "./HtmlRenderer";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const list = await getDocsList();
  return list.map(({ slug }) => ({
    slug:
      process.env.NODE_ENV === "production" ? slug : encodeURIComponent(slug), // production auto encodes
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const result = await getDocBySlug(slug);

  if (!result.document) {
    return {
      title: "Казни женщин в России",
    };
  }

  return {
    title: `${result.document.title} | Казни женщин в России`,
    description: "",
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const result = await getDocBySlug(slug);

  if (!result.document) {
    console.error(`Error loading document: ${result.error}`);
    notFound();
  }

  const { document } = result;

  return (
    <div className="page-container page-section">
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/lists"
          className="text-text-secondary hover:text-foreground transition-colors text-sm"
        >
          Списки
        </Link>
        <ArrowRight className="text-text-secondary" />
        <h1 className="text-sm">{document.title}</h1>
      </div>

      <HtmlRenderer html={document.content} className="flex flex-col gap-6" />
    </div>
  );
}
