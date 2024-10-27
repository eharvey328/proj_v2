import Link from "next/link";
import { getDocsList } from "@/lib/convertDocs";

export const dynamic = "force-static";

export default async function Home() {
  const list = await getDocsList();

  return (
    <div className="page-container">
      <h1 className="h1">Списки Убитых</h1>
      <ul className="sm:columns-2 md:columns-3">
        {list.map((doc) => (
          <li key={doc.slug} className="mb-2">
            <Link
              href={`/lists/${doc.slug}`}
              prefetch={false}
              className="whitespace-nowrap hover:underline text-primary"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
