import type { Metadata } from "next";

import LaptopFrame from "@/components/ui/LaptopFrame";
import ParallaxBleedImage from "@/components/ui/ParallaxBleedImage";
import ParallaxCaseImage from "@/components/ui/ParallaxCaseImage";
import LiveSiteOrb from "@/components/work/LiveSiteOrb";
import NextCaseFooter from "@/components/work/NextCaseFooter";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Rei da Selva — Fredson Santana",
  description:
    "Projeto freelance Rei da Selva: desenvolvimento web sob medida para presença digital e experiência de marca.",
};

const LIVE_SITE_URL = "https://www.reidasselvas.com.br/";

const NEXT_PROJECT =
  projects.find((project) => project.id === "enem-ia") ?? projects[0];

export default function ReiDaSelvaPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-16 pt-28 sm:px-10 sm:pb-20 md:pt-36 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-5xl font-light tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Rei da Selva
          </h1>

          <dl className="mt-16 grid gap-0 border-t border-black/10 sm:grid-cols-3">
            <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:py-10 sm:pr-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Função / Serviços
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                Design e desenvolvimento
              </dd>
            </div>
            <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:py-10 sm:px-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Créditos
              </dt>
              <dd className="mt-3 space-y-1 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                <p>Design — Fredson Santana</p>
                <p>Desenvolvimento — Fredson Santana</p>
              </dd>
            </div>
            <div className="py-8 sm:py-10 sm:pl-8">
              <dt className="text-xs font-light uppercase tracking-tight text-black/45">
                Localização e ano
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed tracking-[-0.02em] sm:text-base">
                Bahia, Brasil © 2026
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="relative overflow-visible bg-[#f7f2e9] pb-24 pt-0 sm:pb-32 lg:pb-40">
        <div className="relative md:mx-auto md:max-w-[1400px] md:px-10 lg:px-16">
          <LiveSiteOrb href={LIVE_SITE_URL} />
          <ParallaxCaseImage
            src="/projects/rei-da-selva/reidaselva.webp"
            alt="Rei da Selva — preview do projeto"
          />
        </div>

        <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:mt-20 sm:px-10 lg:mt-28 lg:px-16">
          <LaptopFrame>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/projects/rei-da-selva/Reidaselvavideo.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Rei da Selva — vídeo do projeto"
            />
          </LaptopFrame>

          <div className="mt-16 overflow-hidden sm:mt-20 lg:mt-28">
            <video
              className="h-auto w-full object-cover"
              src="/projects/rei-da-selva/Aprendervideo.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Rei da Selva — seção Aprender"
            />
          </div>
        </div>
      </section>

      <ParallaxBleedImage
        src="/projects/rei-da-selva/fredsonrei.webp"
        alt="Rei da Selva — experiência na selva"
      />

      <section className="bg-[#e8e0d4] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden">
            <video
              className="h-auto w-full object-cover"
              src="/projects/rei-da-selva/Menusectionrei.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Rei da Selva — menu do projeto"
            />
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-28">
            <LaptopFrame>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/projects/rei-da-selva/Landinpage2rei.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Rei da Selva — landing page do projeto"
              />
            </LaptopFrame>
          </div>
        </div>
      </section>

      <ParallaxBleedImage
        src="/projects/rei-da-selva/navega%C3%A7%C3%A3oH.webp"
        alt="Rei da Selva — cena do projeto"
      />

      <section className="bg-white px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10 md:gap-16 lg:gap-20">
          {[
            {
              src: "/projects/rei-da-selva/reiV1.webp",
              alt: "Rei da Selva — tela mobile 1",
            },
            {
              src: "/projects/rei-da-selva/reiV2.webp",
              alt: "Rei da Selva — tela mobile 2",
            },
            {
              src: "/projects/rei-da-selva/reiV3.webp",
              alt: "Rei da Selva — tela mobile 3",
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
