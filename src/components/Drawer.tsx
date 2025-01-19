"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLockBodyScroll, useMedia } from "react-use";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onClose, children } = props;

  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  useLockBodyScroll(isOpen);
  const isLargerThanSmall = useMedia("(min-width: 640px)");

  // Close drawer on route change
  useEffect(() => {
    if (pathname !== previousPathname.current && isOpen) {
      onClose();
    }
    previousPathname.current = pathname;
  }, [pathname, isOpen, onClose]);

  // Close drawer when screen size becomes larger than small breakpoint
  useEffect(() => {
    if (isLargerThanSmall && isOpen) {
      onClose();
    }
  }, [isLargerThanSmall, isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[var(--app-header-height)] bg-black z-40"
            transition={{ duration: 0.225, ease: [0, 0, 0.2, 1] }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.225, ease: [0, 0, 0.2, 1] }}
            className="fixed left-0 top-[var(--app-header-height)] h-full w-64 bg-white z-50 shadow-lg"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
