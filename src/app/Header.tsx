"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/lists", label: "Списки" },
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
    <header className="flex border-b h-[var(--app-header-height)] sm:fixed left-0 right-0 top-0">
      <div className="page-container sm:flex items-center gap-4">
        <nav>
          <ul className="flex md:gap-x-2">
            {navItems.map((item) => (
              <li
                key={item.path}
                className="flex items-center max-sm:flex-1 max-sm:justify-center"
              >
                <Link
                  href={item.path}
                  className={clsx(
                    "relative flex btn text-center text-text-secondary hover:text-foreground text-sm whitespace-nowrap",
                    {
                      "!text-foreground": isActivePath(item.path),
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
