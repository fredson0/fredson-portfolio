"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteHeader, { type ActiveNav } from "@/components/layout/SiteHeader";

function resolveActive(pathname: string): ActiveNav | undefined {
  if (pathname.startsWith("/work")) {
    return "work";
  }

  if (pathname === "/contact") {
    return "contact";
  }

  return undefined;
}

export default function AppHeader() {
  const pathname = usePathname();
  const active = resolveActive(pathname);

  return <SiteHeader active={active} />;
}
