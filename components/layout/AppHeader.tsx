"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import SiteHeader, { type ActiveNav } from "@/components/layout/SiteHeader";
import { ScrollTrigger } from "@/lib/gsap";

function resolveActive(pathname: string): ActiveNav | undefined {
  if (pathname.startsWith("/work")) {
    return "work";
  }

  if (pathname === "/about") {
    return "about";
  }

  if (pathname === "/contact") {
    return "contact";
  }

  return undefined;
}

export default function AppHeader() {
  const pathname = usePathname();
  const active = resolveActive(pathname);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return <SiteHeader active={active} lightHeader={pathname === "/contact"} />;
}
