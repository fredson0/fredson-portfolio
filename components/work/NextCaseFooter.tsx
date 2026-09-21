"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Project } from "@/lib/projects";

function NextCasePreviewCard({ project }: { project: Project }) {
  return (
    <div
      className="next-case-card absolute inset-0 overflow-hidden shadow-[0_28px_70px_-24px_rgba(0,0,0,0.35)]"
      style={{ backgroundColor: project.hoverBg ?? "#2f2f2f" }}
    >
      {project.hoverBgImage ? (
        <img
          src={project.hoverBgImage}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          draggable={false}
        />
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center p-[10%]">
        <img
          src={project.imageSrc}
          alt=""
          className="h-full w-full rounded-[10px] object-cover shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

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
                className="next-case-btn group relative mt-6 inline-flex w-full flex-col items-center max-md:pb-[13em] sm:mt-8"
              >
                <span className="next-case-title relative z-10 text-5xl font-medium tracking-[-0.04em] transition-[transform,opacity] duration-500 group-hover:-translate-y-1 max-md:group-hover:translate-y-0 sm:text-6xl md:text-7xl md:group-hover:translate-y-0 lg:text-8xl">
                  {nextProject.title}
                </span>

                <span className="next-case-tile md:hidden" aria-hidden="true">
                  <span className="next-case-tile-image">
                    <span
                      className="next-case-tile-media"
                      style={{ backgroundImage: `url(${nextProject.imageSrc})` }}
                    />
                  </span>
                </span>
                <span className="next-case-stripe md:hidden" aria-hidden="true" />

                <span className="next-case-tile-desktop hidden md:block" aria-hidden="true">
                  <span className="next-case-tile-image-desktop">
                    <span className="absolute inset-0">
                      <NextCasePreviewCard project={nextProject} />
                    </span>
                  </span>
                </span>
              </Link>

              <div
                className="next-case-stripe-row hidden w-full md:block"
                aria-hidden="true"
              />
            </>
          ) : null}

          <Link
            href="/work"
            className="btn-pill group relative mt-10 inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-white/35 px-8 py-3 text-sm font-light tracking-[-0.02em] text-white transition-[border-color] duration-500 hover:border-transparent focus-visible:border-transparent md:mt-12 sm:px-10 sm:py-3.5 sm:text-base md:w-auto"
          >
            <span className="btn-pill-fill" aria-hidden="true" />
            <span className="relative z-10">All work</span>
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
