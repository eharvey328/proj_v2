import { notFound } from "next/navigation";
import { getDocsList, getDocBySlug } from "@/lib/convertDocs";

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
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const result = await getDocBySlug(decodedSlug);

  if (!result.document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: result.document.title,
    description: `Information about ${result.document.title}`,
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const result = await getDocBySlug(resolvedParams.slug);

  if (!result.document) {
    console.error(`Error loading document: ${result.error}`);
    notFound();
  }

  const { document } = result;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1>{document.title}</h1>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
    </div>
  );
}
