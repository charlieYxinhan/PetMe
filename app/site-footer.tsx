"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteFooter({ children }: { children: ReactNode }) {
  return usePathname() === "/studio" ? null : <footer className="site-footer">{children}</footer>;
}
