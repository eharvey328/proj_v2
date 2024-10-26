import Link from "next/link";

export function Header() {
  return (
    <header className="h-[var(--app-header-height)] flex items-center border-b px-4 gap-4 justify-between">
      <div>
        <Link href="/">Казни женщин в России</Link>
      </div>

      <ul className="flex gap-2">
        <li>
          <Link href="/lists">Списки Убитых</Link>
        </li>
        <li>
          <Link href="/docs">От Aвтора</Link>
        </li>
        <li>
          <Link href="/docs">Оставьте Cообщение</Link>
        </li>
      </ul>
    </header>
  );
}
