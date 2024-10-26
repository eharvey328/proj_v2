import Link from "next/link";
import { getDocsList } from "@/lib/convertDocs";

export const dynamic = "force-static";

export default async function Home() {
  const list = await getDocsList();

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-4">Списки Убитых</h1>
      <ul className="sm:columns-2 lg:columns-3">
        {list.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              prefetch={false}
              className="whitespace-nowrap"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
