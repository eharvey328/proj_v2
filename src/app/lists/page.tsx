import Link from "next/link";
import { getDocsList } from "@/lib/convertDocs";

export const dynamic = "force-static";

export function generateMetadata() {
  return {
    title: "Списки | Казни женщин в России ",
    description: ``,
  };
}

export default async function ListsPage() {
  const list = await getDocsList();

  return (
    <div className="page-container page-section">
      <h1 className="h1">Списки Убитых</h1>
      <ul className="sm:columns-2 lg:columns-3">
        {list.map((doc) => (
          <li key={doc.slug} className="mb-2">
            <Link
              href={`/lists/${doc.slug}`}
              prefetch={false}
              className="whitespace-nowrap hover:underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
