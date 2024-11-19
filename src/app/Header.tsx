"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/lists", label: "Списки убитых" },
    { path: "/about", label: "От автора" },
    { path: "/contact", label: "Оставьте сообщение" },
  ];

  function isActivePath(path: string) {
    // Exact match
    if (pathname === path) return true;
    // Check for nested routes
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  }

  return (
    <header className="flex border-b h-[var(--app-header-height)] sm:fixed left-0 right-0 top-0 bg-layer">
      <div className="page-container">
        <nav className="h-full">
          <ul className="flex gap-x-5 h-full">
            {navItems.map((item) => (
              <li
                key={item.path}
                className="flex items-center max-sm:flex-1 max-sm:justify-center h-full"
              >
                <Link
                  href={item.path}
                  className={clsx(
                    "relative flex items-center text-center text-text-secondary hover:text-foreground text-sm whitespace-nowrap h-full font-semibold",
                    {
                      "!text-foreground": isActivePath(item.path),
                    }
                  )}
                >
                  {item.label}
                  {isActivePath(item.path) && (
                    <motion.div
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
