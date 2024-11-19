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

  const [byYear, rest] = partition(list, (doc) => /19\d{2}/.test(doc.title));

  const [byRegion, byNationality] = partition(rest, (doc) =>
    doc.slug.startsWith("женщины")
  );

  return (
    <section className="page-container">
      <div className="grid sm:grid-cols-3 py-16 gap-6">
        <h1 className="h1">Списки убитых</h1>
        <div>
          <h2 className="mb-5 font-semibold">Списки по национальностям</h2>
          <ListSection list={byNationality} />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-5 font-semibold">Списки по область</h2>
            <ListSection list={byRegion} />
          </div>
          <div>
            <h2 className="mb-5 font-semibold">Списки по годам</h2>
            <ListSection list={byYear} />
          </div>
        </div>
      </div>
    </section>
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
        <li key={doc.slug} className="mb-2">
          <Link
            href={`/lists/${doc.slug}`}
            prefetch={false}
            className="whitespace-nowrap hover:underline text-text-secondary"
          >
            {doc.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
