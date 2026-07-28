"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useMagnetic } from "@/components/layout/Magnetic";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import { gsap, useGSAP } from "@/lib/gsap";

export type ActiveNav = "work" | "about" | "contact";

const navLinks: { id: ActiveNav; label: string; href: string }[] = [
  { id: "work", label: "Trabalho", href: "/work" },
  { id: "about", label: "Sobre", href: "/#about" },
  { id: "contact", label: "Contato", href: "/contact" },
];

const overlayLinks = [
  { label: "Home", href: "/" },
  { label: "Trabalho", href: "/work" },
  { label: "Sobre", href: "/#about" },
  { label: "Contato", href: "/contact" },
] as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fredson-santana-machado-filho-912655329/",
  },
  {
    label: "GitHub",
    href: "https://github.com/fredson0",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fredson_machado/",
  },
] as const;

type SiteHeaderProps = {
  active?: ActiveNav;
};

function HeaderNavLink({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const linkRef = useMagnetic<HTMLAnchorElement>(0.5);

  return (
    <li>
      <Link
        ref={linkRef}
        href={href}
        onClick={onNavigate}
        className="group relative flex flex-col items-center gap-2.5 will-change-transform"
      >
        <span className="nav-link-text inline-block text-sm font-light tracking-tight text-black sm:text-base">
          {label}
        </span>
        <span
          className={`h-2 w-2 rounded-full bg-black transition-all duration-300 ease-out ${
            isActive
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

function OverlayNavLink({
  href,
  label,
  isActive,
  onClose,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClose: () => void;
}) {
  const linkRef = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <li className="menu-overlay-link overflow-hidden">
      <Link
        ref={linkRef}
        href={href}
        onClick={onClose}
        className="group inline-flex items-center gap-4 will-change-transform"
      >
        <span
          className={`h-2 w-2 rounded-full bg-white transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        />
        <span className="text-4xl font-light tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
          {label}
        </span>
      </Link>
    </li>
  );
}

function MenuOverlay({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active?: ActiveNav;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const closeRef = useMagnetic<HTMLButtonElement>(0.4);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const label = labelRef.current;
      const links = linksRef.current;
      const socials = socialsRef.current;
      const closeBtn = closeRef.current;

      if (!open || !overlay || !panel || !label || !links || !socials || !closeBtn) {
        return;
      }

      const linkItems = links.querySelectorAll<HTMLElement>(".menu-overlay-link");

      gsap.set(overlay, { opacity: 0 });
      gsap.set(panel, { y: 40 });
      gsap.set(label, { y: 30, opacity: 0 });
      gsap.set(linkItems, { y: 80, opacity: 0 });
      gsap.set(socials, { y: 40, opacity: 0 });
      gsap.set(closeBtn, { scale: 0.6, opacity: 0 });

      const timeline = gsap.timeline();

      timeline
        .to(overlay, { opacity: 1, duration: 0.45, ease: "power2.out" })
        .to(panel, { y: 0, duration: 0.7, ease: "power3.out" }, 0)
        .to(label, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.1)
        .to(
          linkItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.15
        )
        .to(socials, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.35)
        .to(closeBtn, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }, 0.2);

      return () => {
        timeline.kill();
      };
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (event.clientX - centerX) / centerX;
      const deltaY = (event.clientY - centerY) / centerY;

      gsap.to(panel.querySelector(".menu-parallax-links"), {
        x: deltaX * 18,
        y: deltaY * 12,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(panel.querySelector(".menu-parallax-socials"), {
        x: deltaX * 10,
        y: deltaY * 6,
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#141516] text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <div ref={panelRef} className="relative flex h-full flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute right-6 top-6 sm:right-10 sm:top-8 lg:right-16 lg:top-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-32 w-32 items-center justify-center rounded-full bg-[#3457dc] text-white will-change-transform sm:h-36 sm:w-36"
          >
            <span className="text-3xl font-light leading-none" aria-hidden="true">
              ×
            </span>
          </button>
        </div>

        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between pt-24 pb-10">
          <div>
            <p
              ref={labelRef}
              className="text-xs font-light uppercase tracking-tight text-white/45"
            >
              Navigation
            </p>
            <div className="mt-4 border-t border-white/15" />

            <ul
              ref={linksRef}
              className="menu-parallax-links mt-10 flex flex-col gap-2 will-change-transform sm:mt-14 sm:gap-4"
            >
              {overlayLinks.map((link) => {
                const isActive =
                  (link.href === "/work" && active === "work") ||
                  (link.href === "/contact" && active === "contact") ||
                  (link.href === "/#about" && active === "about");

                return (
                  <OverlayNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClose={onClose}
                  />
                );
              })}
            </ul>
          </div>

          <div ref={socialsRef} className="menu-parallax-socials will-change-transform">
            <p className="text-xs font-light uppercase tracking-tight text-white/45">
              Socials
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {socialLinks.map((link) => (
                <OverlaySocialLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlaySocialLink({ href, label }: { href: string; label: string }) {
  const linkRef = useMagnetic<HTMLAnchorElement>(0.35);

  return (
    <li>
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm font-light tracking-tight text-white/80 transition-colors hover:text-white will-change-transform sm:text-base"
      >
        {label}
      </a>
    </li>
  );
}

export default function SiteHeader({ active }: SiteHeaderProps) {
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const brandRef = useMagnetic<HTMLAnchorElement>(0.35);
  const ballRef = useMagnetic<HTMLButtonElement>(0.55);
  const ballShellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateScrolled = (scrollY: number) => {
      setScrolled(scrollY > 40);
    };

    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => {
        updateScrolled(scroll);
      };

      lenis.on("scroll", onLenisScroll);
      updateScrolled(lenis.scroll);

      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    }

    const onWindowScroll = () => {
      updateScrolled(window.scrollY);
    };

    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      lenis?.start();
      return;
    }

    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, lenis]);

  const showInlineNav = !scrolled && !menuOpen;
  const showBall = scrolled && !menuOpen;

  useGSAP(
    () => {
      const shell = ballShellRef.current;
      if (!shell) {
        return;
      }

      if (showBall) {
        gsap.killTweensOf(shell);
        gsap.set(shell, { pointerEvents: "auto" });
        gsap.fromTo(
          shell,
          { scale: 0.12, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            transformOrigin: "center center",
            overwrite: true,
          }
        );
      } else {
        gsap.killTweensOf(shell);
        gsap.to(shell, {
          scale: 0.12,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
          transformOrigin: "center center",
          overwrite: true,
          onComplete: () => {
            gsap.set(shell, { pointerEvents: "none" });
          },
        });
      }
    },
    { dependencies: [showBall] }
  );

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[150]">
        <div className="pointer-events-auto absolute left-6 top-6 sm:left-10 lg:left-16">
          <Link
            ref={brandRef}
            href="/"
            className="inline-block text-sm font-light tracking-tight text-black transition-colors will-change-transform hover:text-black/70"
          >
            © Code by Fredson
          </Link>
        </div>

        <div className="pointer-events-auto absolute right-6 top-6 sm:right-10 lg:right-16">
          <div className="relative flex h-[7.65rem] w-[7.65rem] items-center justify-end sm:h-[8.5rem] sm:w-[8.5rem]">
            <nav
              className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
                showInlineNav
                  ? "pointer-events-auto translate-y-[-50%] opacity-100"
                  : "pointer-events-none translate-y-[-40%] opacity-0"
              }`}
              aria-label="Navegação principal"
            >
              <ul className="flex items-center gap-10 sm:gap-14">
                {navLinks.map((link) => (
                  <HeaderNavLink
                    key={link.id}
                    href={link.href}
                    label={link.label}
                    isActive={active === link.id}
                    onNavigate={() => setMenuOpen(false)}
                  />
                ))}
              </ul>
            </nav>

            <div
              ref={ballShellRef}
              className="absolute right-0 top-0 flex h-[7.65rem] w-[7.65rem] origin-center items-center justify-center will-change-transform sm:h-[8.5rem] sm:w-[8.5rem]"
              style={{ pointerEvents: "none" }}
            >
              <button
                ref={ballRef}
                type="button"
                onClick={openMenu}
                aria-label="Abrir menu"
                aria-expanded={menuOpen}
                className="relative z-10 flex h-[7.65rem] w-[7.65rem] shrink-0 items-center justify-center rounded-full bg-[#1c1d20] text-white will-change-transform sm:h-[8.5rem] sm:w-[8.5rem]"
              >
                <span className="flex flex-col gap-3" aria-hidden="true">
                  <span className="block h-px w-8 bg-white/90 sm:w-9" />
                  <span className="block h-px w-8 bg-white/90 sm:w-9" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMounted &&
        createPortal(
          <MenuOverlay
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            active={active}
          />,
          document.body
        )}
    </>
  );
}
