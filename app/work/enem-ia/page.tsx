import type { Metadata } from "next";

import LaptopFrame from "@/components/ui/LaptopFrame";
import NextCaseFooter from "@/components/work/NextCaseFooter";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "ENEM+IA — Fredson Santana",
  description:
    "ENEM+IA: plataforma de preparação adaptativa com tutor IA, simulados e trilha de estudos para o ENEM.",
};

const NEXT_PROJECT =
  projects.find((project) => project.id === "rei-da-selva") ?? projects[1];

export default function EnemIaPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-0 pt-28 sm:px-10 md:pt-36 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-5xl font-light tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            ENEM+IA
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
                Bahia, Brasil © 2026
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-[#f7f2e9] px-6 pb-24 pt-0 sm:px-10 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="relative mx-auto -mt-14 max-w-[1400px] sm:-mt-16">
          <div className="overflow-hidden">
            <img
              src="/projects/enem-ia/project.png"
              alt="ENEM+IA — preview do projeto"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-28">
            <LaptopFrame>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/projects/enem-ia/video-1.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="ENEM+IA — vídeo do tutor IA"
              />
            </LaptopFrame>
          </div>

          <div className="mt-16 overflow-hidden sm:mt-20 lg:mt-28">
            <video
              className="h-auto w-full object-cover"
              src="/projects/enem-ia/video-2.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="ENEM+IA — fluxo do produto"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#e8e0d4] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden">
            <video
              className="h-auto w-full object-cover"
              src="/projects/enem-ia/video-4.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="ENEM+IA — produto"
            />
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-28">
            <LaptopFrame>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/projects/enem-ia/video-5.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="ENEM+IA — tela do produto"
              />
            </LaptopFrame>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10 md:gap-16 lg:gap-20">
          {[
            {
              src: "/projects/enem-ia/cell1.png",
              alt: "ENEM+IA — tela mobile 1",
            },
            {
              src: "/projects/enem-ia/cell2.png",
              alt: "ENEM+IA — tela mobile 2",
            },
            {
              src: "/projects/enem-ia/cell3.png",
              alt: "ENEM+IA — tela mobile 3",
            },
          ].map((phone) => (
            <div
              key={phone.src}
              className="mx-auto w-full max-w-[340px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] sm:max-w-none"
            >
              <img
                src={phone.src}
                alt={phone.alt}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <NextCaseFooter nextProject={NEXT_PROJECT} versionYear={2026} />
    </main>
  );
}
