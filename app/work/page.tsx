import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Trabalho — Fredson Santana",
  description:
    "Portfólio de projetos de Fredson Santana — desenvolvimento web, sistemas e interfaces.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader active="work" />

      <section className="px-6 pb-24 pt-28 sm:px-10 md:pt-36 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-light uppercase tracking-tight text-black/45 sm:text-sm">
            Portfólio
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
            Trabalho
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed tracking-[-0.02em] text-black/65 sm:text-lg">
            Projetos reais e estudos selecionados — do conceito à entrega.
          </p>

          <ul className="mt-16 border-t border-black/10">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={project.href ?? "#"}
                  className="group flex w-full items-center justify-between border-b border-black/10 py-10 transition-colors hover:bg-black/[0.02] md:py-12"
                >
                  <span className="text-2xl font-light tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl md:text-4xl lg:text-5xl">
                    {project.title}
                  </span>
                  <span className="text-right text-sm font-light tracking-[-0.02em] text-black/60 sm:text-base md:text-lg">
                    {project.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
