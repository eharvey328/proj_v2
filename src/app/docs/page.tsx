import Link from "next/link";
import { getDocsList } from "@/lib/convertDocs";

export const dynamic = "force-static";

export default async function Home() {
  const list = await getDocsList();

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">СПИСКИ УБИТЫХ</h1>
      <main className="grid">
        {list.map((doc) => (
          <Link
            href={`/docs/${doc.slug}`}
            key={doc.slug}
            className="no-underline"
            prefetch={false}
          >
            {doc.title}
          </Link>
        ))}
      </main>
    </div>
  );
}
