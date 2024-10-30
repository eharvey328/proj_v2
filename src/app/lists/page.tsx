import Link from "next/link";
import { DocumentInfo, getDocsList } from "@/lib/convertDocs";
import { partition } from "lodash-es";
import clsx from "clsx";

export const dynamic = "force-static";

export function generateMetadata() {
  return {
    title: "Списки | Казни женщин в России ",
    description: ``,
  };
}

export default async function ListsPage() {
  const list = await getDocsList();

  const [withYear, withoutYear] = partition(list, (doc) =>
    /19\d{2}/.test(doc.title)
  );

  return (
    <div className="page-container page-section">
      <h1 className="h1">Списки Убитых</h1>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="max-sm:border-b pb-4 sm:pb-0 sm:border-r">
          <h2 className="mb-2 font-bold font-serif">
            Списки по Национальности
          </h2>
          <ListSection list={withoutYear} />
        </div>
        <div>
          <h2 className="mb-2 font-bold font-serif">Списки по Годам</h2>
          <ListSection list={withYear} />
        </div>
      </div>
    </div>
  );
}

function ListSection({
  list,
  className,
}: {
  list: DocumentInfo[];
  className?: string;
}) {
  return (
    <ul className={clsx(className)}>
      {list.map((doc) => (
        <li key={doc.slug} className="mb-1">
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
  );
}
