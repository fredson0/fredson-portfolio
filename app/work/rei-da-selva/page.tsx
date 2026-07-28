import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Rei da Selva — Fredson Santana",
  description:
    "Projeto freelance Rei da Selva: desenvolvimento web sob medida para presença digital e experiência de marca.",
};

export default function ReiDaSelvaPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader active="work" />

      <section className="px-6 pb-10 pt-28 sm:px-10 md:pt-36 lg:px-16 lg:pb-16">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-5xl font-light tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Rei da Selva
          </h1>

          <dl className="mt-16 grid gap-0 border-t border-black/10 sm:grid-cols-3">
            <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:py-10 sm:pr-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Role / Services
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                Design &amp; Development
              </dd>
            </div>
            <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:py-10 sm:px-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Credits
              </dt>
              <dd className="mt-3 space-y-1 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                <p>Design — Fredson Santana</p>
                <p>Development — Fredson Santana</p>
              </dd>
            </div>
            <div className="py-8 sm:py-10 sm:pl-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Location &amp; Year
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                Bahia, Brasil © 2025
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="relative px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="#"
            className="fixed bottom-8 right-6 z-40 flex h-28 w-28 items-center justify-center rounded-full bg-[#3457dc] text-center text-sm font-light leading-tight tracking-tight text-white transition-transform duration-300 hover:scale-105 sm:bottom-12 sm:right-10 sm:h-32 sm:w-32 sm:text-base"
          >
            Live site
            <br />
            <span aria-hidden="true">↗</span>
          </Link>

          <div className="overflow-hidden">
            <img
              src="/projects/rei-da-selva/reidaselva.webp"
              alt="Rei da Selva — preview do projeto"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
