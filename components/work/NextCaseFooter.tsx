"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Project } from "@/lib/projects";

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

type NextCaseFooterProps = {
  nextProject?: Project;
  versionYear?: number;
};

function formatBahiaTime(date: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bahia",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${time} GMT-3`;
}

export default function NextCaseFooter({
  nextProject,
  versionYear = 2025,
}: NextCaseFooterProps) {
  const [localTime, setLocalTime] = useState(() => formatBahiaTime(new Date()));

  useEffect(() => {
    const tick = () => setLocalTime(formatBahiaTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#1c1d20] px-6 pb-10 pt-28 text-white sm:px-10 sm:pb-12 sm:pt-36 lg:px-16 lg:pb-14 lg:pt-44">
      <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {nextProject ? (
            <>
              <p className="text-xs font-light uppercase tracking-[0.08em] text-white/55 sm:text-sm">
                Next case
              </p>

              <Link
                href={nextProject.href ?? "/work"}
                className="next-case-btn group relative mt-6 inline-flex w-full flex-col items-center pb-[13em] sm:mt-8 md:pb-[9.5em]"
              >
                <span className="relative z-10 text-5xl font-medium tracking-[-0.04em] transition-opacity duration-500 md:group-hover:opacity-25 sm:text-6xl md:text-7xl lg:text-8xl">
                  {nextProject.title}
                </span>

                <span className="next-case-tile">
                  <span className="next-case-tile-image">
                    <img
                      src={nextProject.imageSrc}
                      alt=""
                      className="h-auto w-full object-cover"
                    />
                  </span>
                </span>
              </Link>
            </>
          ) : null}

          <Link
            href="/work"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-white/35 px-8 py-3 text-sm font-light tracking-[-0.02em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#1c1d20] sm:mt-12 sm:px-10 sm:py-3.5 sm:text-base"
          >
            All work
          </Link>
        </div>

        <div className="mt-24 flex flex-col gap-10 border-t border-white/10 pt-8 sm:mt-28 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:mt-32">
          <div className="flex flex-wrap gap-10 sm:gap-14 lg:gap-20">
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.14em] text-white/40">
                Version
              </p>
              <p className="mt-2 text-sm font-light tracking-[-0.02em] text-white/85 sm:text-base">
                {versionYear} © Edition
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.14em] text-white/40">
                Local time
              </p>
              <p className="mt-2 text-sm font-light tracking-[-0.02em] text-white/85 sm:text-base">
                {localTime}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-light uppercase tracking-[0.14em] text-white/40">
              Socials
            </p>
            <ul className="mt-2 flex flex-wrap gap-5 sm:gap-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light tracking-[-0.02em] text-white/85 transition-colors hover:text-white sm:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
