"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ActiveNav = "work" | "about" | "contact";

const navLinks: { id: ActiveNav; label: string; href: string }[] = [
  { id: "work", label: "Trabalho", href: "/work" },
  { id: "about", label: "Sobre", href: "/#about" },
  { id: "contact", label: "Contato", href: "/contact" },
];

type SiteHeaderProps = {
  active?: ActiveNav;
};

function NavLinks({
  active,
  onNavigate,
  className = "",
}: {
  active?: ActiveNav;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Navegação principal">
      <ul className="flex items-center gap-8 sm:gap-10">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="group relative flex flex-col items-center gap-1.5 text-sm font-light tracking-tight text-black transition-colors hover:text-black/70"
            >
              <span>{link.label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full bg-black transition-opacity duration-300 ${
                  active === link.id ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function SiteHeader({ active }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      if (!isScrolled) {
        setMenuOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const showFullNav = !scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-6 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          className="text-sm font-light tracking-tight text-black transition-colors hover:text-black/70"
        >
          © Code by Fredson
        </Link>

        <div ref={menuRef} className="relative flex min-h-12 min-w-12 items-center justify-end">
          {/* Nav completo — visível no topo ou quando menu aberto após scroll */}
          <div
            className={`transition-all duration-300 ease-out ${
              showFullNav
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-0"
            }`}
          >
            <NavLinks
              active={active}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>

          {/* Bolinha — visível ao rolar, escondida quando menu aberto */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className={`absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1c1d20] text-white transition-all duration-300 ease-out ${
              scrolled && !menuOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-90 opacity-0"
            }`}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px w-4 bg-white/90" />
              <span className="block h-px w-4 bg-white/90" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
