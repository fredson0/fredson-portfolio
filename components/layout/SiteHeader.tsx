"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useMagnetic } from "@/components/layout/Magnetic";
import { ACCENT } from "@/lib/theme";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import { gsap, useGSAP } from "@/lib/gsap";

export type ActiveNav = "work" | "about" | "contact";

const navLinks: { id: ActiveNav; label: string; href: string }[] = [
  { id: "work", label: "Trabalho", href: "/work" },
  { id: "about", label: "Sobre", href: "/about" },
  { id: "contact", label: "Contato", href: "/contact" },
];

const overlayLinks = [
  { label: "Home", href: "/" },
  { label: "Trabalho", href: "/work" },
  { label: "Sobre", href: "/about" },
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
  /** Texto claro (branco) — ex.: página de contato */
  lightHeader?: boolean;
};

function HeaderNavLink({
  href,
  label,
  isActive,
  onNavigate,
  light,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
  light?: boolean;
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
        <span
          className={`nav-link-text inline-block text-sm font-light tracking-tight sm:text-base ${
            light ? "text-white" : "text-black"
          }`}
        >
          {label}
        </span>
        <span
          className={`h-2 w-2 rounded-full transition-all duration-300 ease-out ${
            light ? "bg-white" : "bg-black"
          } ${
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
        <span className="text-3xl font-light tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-6xl">
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
  const [isVisible, setIsVisible] = useState(open);

  useLayoutEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const label = labelRef.current;
      const links = linksRef.current;
      const socials = socialsRef.current;

      if (!isVisible || !overlay || !panel || !label || !links || !socials) {
        return;
      }

      const linkItems = links.querySelectorAll<HTMLElement>(".menu-overlay-link");

      if (open) {
        gsap.killTweensOf([overlay, panel, label, linkItems, socials]);

        gsap.set(overlay, { opacity: 0 });
        gsap.set(panel, { yPercent: -100 });
        gsap.set(label, { y: 20, opacity: 0 });
        gsap.set(linkItems, { y: 40, opacity: 0 });
        gsap.set(socials, { y: 24, opacity: 0 });

        const timeline = gsap.timeline();

        timeline
          .to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" })
          .to(panel, { yPercent: 0, duration: 0.65, ease: "power3.out" }, 0)
          .to(label, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, 0.12)
          .to(
            linkItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.18
          )
          .to(socials, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, 0.32);

        return () => {
          timeline.kill();
        };
      }

      const timeline = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      timeline
        .to(socials, { y: 24, opacity: 0, duration: 0.35, ease: "power3.in" }, 0)
        .to(
          linkItems,
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.in",
          },
          0.05
        )
        .to(label, { y: 20, opacity: 0, duration: 0.35, ease: "power3.in" }, 0.12)
        .to(panel, { yPercent: -100, duration: 0.6, ease: "power3.in" }, 0.16)
        .to(overlay, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.16);

      return () => {
        timeline.kill();
      };
    },
    { dependencies: [open, isVisible] }
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

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[10050] text-white ${open ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label="Fechar menu"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="relative z-10 flex h-[min(58vh,660px)] min-h-[440px] w-full flex-col overflow-hidden bg-[#141516] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="relative flex h-full flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-16">
          <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between pt-4 pb-6 sm:pt-6">
            <div>
              <p
                ref={labelRef}
                className="text-xs font-light uppercase tracking-tight text-white/45"
              >
                Navegação
              </p>
              <div className="mt-4 border-t border-white/15" />

              <ul
                ref={linksRef}
                className="menu-parallax-links mt-8 flex flex-col gap-1 will-change-transform sm:mt-10 sm:gap-2"
              >
                {overlayLinks.map((link) => {
                  const isActive =
                    (link.href === "/work" && active === "work") ||
                    (link.href === "/contact" && active === "contact") ||
                    (link.href === "/about" && active === "about");

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
                Redes
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                {socialLinks.map((link) => (
                  <OverlaySocialLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>
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

export default function SiteHeader({
  active,
  lightHeader = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);

  const brandShellRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const ballRef = useMagnetic<HTMLButtonElement>(0.55);
  const ballShellRef = useRef<HTMLDivElement>(null);
  const ballEverVisibleRef = useRef(false);

  const useLightStyle = lightHeader || overDarkSection;

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) {
      return;
    }

    ballEverVisibleRef.current = false;
    const shell = ballShellRef.current;
    if (shell) {
      gsap.set(shell, {
        scale: 0.12,
        opacity: 0,
        pointerEvents: "none",
        transformOrigin: "center center",
      });
    }
  }, [isMounted, pathname]);

  useEffect(() => {
    const updateScrolled = (scrollY: number) => {
      setScrolled(scrollY > 40);
    };

    updateScrolled(lenis ? lenis.scroll : window.scrollY);

    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => {
        updateScrolled(scroll);
      };

      lenis.on("scroll", onLenisScroll);

      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    }

    const onWindowScroll = () => {
      updateScrolled(window.scrollY);
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis, pathname]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (lightHeader) {
      setOverDarkSection(false);
      return;
    }

    setOverDarkSection(false);

    const darkSections = document.querySelectorAll("[data-header-dark]");

    if (!darkSections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isOverDark = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0
        );
        setOverDarkSection(isOverDark);
      },
      {
        root: null,
        rootMargin: "-72px 0px 0px 0px",
        threshold: [0, 0.05, 0.15],
      }
    );

    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMounted, lightHeader, pathname]);

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
  const showBall = scrolled;
  const showBrand = !scrolled && !menuOpen;

  useGSAP(
    () => {
      const shell = brandShellRef.current;
      if (!shell) {
        return;
      }

      if (showBrand) {
        gsap.killTweensOf(shell);
        gsap.set(shell, { pointerEvents: "auto" });
        gsap.fromTo(
          shell,
          { opacity: 0, y: -8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          }
        );
      } else {
        gsap.killTweensOf(shell);

        const opacity = gsap.getProperty(shell, "opacity") as number;
        if (opacity > 0.35) {
          gsap.to(shell, {
            opacity: 0,
            y: -8,
            duration: 0.35,
            ease: "power3.in",
            overwrite: true,
            onComplete: () => {
              gsap.set(shell, { pointerEvents: "none" });
            },
          });
        } else {
          gsap.set(shell, {
            opacity: 0,
            y: -8,
            pointerEvents: "none",
          });
        }
      }
    },
    { dependencies: [showBrand, isMounted] }
  );

  useGSAP(
    () => {
      const shell = ballShellRef.current;
      if (!shell) {
        return;
      }

      if (showBall) {
        ballEverVisibleRef.current = true;
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

        if (ballEverVisibleRef.current) {
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
        } else {
          gsap.set(shell, {
            scale: 0.12,
            opacity: 0,
            pointerEvents: "none",
          });
        }
      }
    },
    { dependencies: [showBall, isMounted] }
  );

  const openMenu = () => {
    setMenuOpen(true);
  };

  const headerMarkup = (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[9999]">
      <div
        ref={brandShellRef}
        className="pointer-events-auto fixed left-6 top-6 will-change-transform max-md:max-w-[calc(100%-5.5rem)] sm:left-10 lg:left-16"
        style={{ pointerEvents: "none" }}
      >
        <Link
          ref={brandRef}
          href="/"
          className="inline-block text-sm font-light tracking-tight transition-opacity max-md:text-xs hover:opacity-70"
          style={{ color: useLightStyle ? "#ffffff" : "#000000" }}
        >
          Fredson Santana
        </Link>
      </div>

      <div
        className={`pointer-events-auto fixed right-6 top-6 md:hidden ${
          menuOpen ? "z-[10060]" : ""
        }`}
      >
        <button
          type="button"
          onClick={menuOpen ? () => setMenuOpen(false) : openMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1d20] text-white"
        >
          {menuOpen ? (
            <span className="text-2xl font-light leading-none" aria-hidden="true">
              ×
            </span>
          ) : (
            <span className="flex flex-col gap-2" aria-hidden="true">
              <span className="block h-px w-5 bg-white/90" />
              <span className="block h-px w-5 bg-white/90" />
            </span>
          )}
        </button>
      </div>

      <div
        className={`pointer-events-auto fixed right-6 top-6 hidden sm:right-10 lg:right-16 md:block ${
          menuOpen ? "z-[10060]" : ""
        }`}
      >
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
                  light={useLightStyle}
                />
              ))}
            </ul>
          </nav>

          <div
            ref={ballShellRef}
            className="absolute right-0 top-0 flex h-[7.65rem] w-[7.65rem] origin-center items-center justify-center opacity-0 will-change-transform sm:h-[8.5rem] sm:w-[8.5rem]"
            style={{ pointerEvents: "none", transform: "scale(0.12)" }}
          >
            <button
              ref={ballRef}
              type="button"
              onClick={menuOpen ? () => setMenuOpen(false) : openMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="relative z-10 flex h-[7.65rem] w-[7.65rem] shrink-0 items-center justify-center rounded-full bg-[#1c1d20] text-white will-change-transform sm:h-[8.5rem] sm:w-[8.5rem]"
            >
              {menuOpen ? (
                <span className="text-3xl font-light leading-none" aria-hidden="true">
                  ×
                </span>
              ) : (
                <span className="flex flex-col gap-3" aria-hidden="true">
                  <span className="block h-px w-8 bg-white/90 sm:w-9" />
                  <span className="block h-px w-8 bg-white/90 sm:w-9" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <>
      {isMounted ? createPortal(headerMarkup, document.body) : null}

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
