import type { Metadata } from "next";

import ProjectListItem from "@/components/work/ProjectListItem";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Trabalho — Fredson Santana",
  description:
    "Portfólio de projetos de Fredson Santana — desenvolvimento web, sistemas e interfaces.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-black">
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

          <ul className="mt-8 md:mt-16 md:border-t md:border-black/10">
            {projects.map((project) => (
              <ProjectListItem key={project.id} project={project} variant="page" />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
