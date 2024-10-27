"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/lists", label: "Списки Убитых" },
    { path: "/about", label: "От Aвтора" },
    { path: "/contact", label: "Cообщение" },
  ];

  function isActivePath(path: string) {
    // Exact match
    if (pathname === path) return true;
    // Check for nested routes
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  }

  return (
    <header className="flex border-b h-[var(--app-header-height)] fixed left-0 right-0 top-0 bg-background">
      <div className="page-container !max-w-7xl flex items-center gap-4 justify-between">
        <Link href="/" className="font-semibold">
          Казни женщин в России
        </Link>
        <nav>
          <ul className="flex sm:gap-x-2">
            {navItems.map((item) => (
              <li key={item.path} className="flex items-center">
                <Link
                  href={item.path}
                  className={clsx(
                    "relative flex btn text-center text-zinc-500 hover:text-foreground text-sm",
                    {
                      "text-foreground": isActivePath(item.path),
                    }
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
