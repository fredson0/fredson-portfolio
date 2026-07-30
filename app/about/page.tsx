import type { Metadata } from "next";
import Link from "next/link";

import { AboutProfilePhoto } from "@/components/about/AboutProfilePhoto";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Sobre — Fredson Santana",
  description:
    "Conheça Fredson Santana — desenvolvedor web full stack júnior em Salvador, focado em soluções web de qualidade.",
};

const bodyTextClassName =
  "text-base font-light leading-relaxed tracking-[-0.02em] text-black/65 sm:text-lg";

const sectionLabelClassName =
  "text-xs font-light uppercase tracking-tight text-black/45 sm:text-sm";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-20 pt-28 sm:px-10 md:pt-36 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <p className={sectionLabelClassName}>Sobre</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-light tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]">
            Ajudo pessoas a construir soluções de software e experiências
            digitais de qualidade.
          </h1>

          <hr className="mt-14 border-0 border-t border-black/10 sm:mt-16 md:mt-20" />

          <div className="mt-14 flex flex-col gap-12 sm:mt-16 md:mt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-20">
            <div className="flex-1 lg:max-w-xl xl:max-w-2xl">
              <h2 className={sectionLabelClassName}>Sobre mim</h2>
              <div className={`mt-6 flex flex-col gap-5 ${bodyTextClassName}`}>
                <p>
                  Sou Fredson Santana, desenvolvedor full stack júnior com cerca
                  de um ano de experiência, baseado em Salvador. Atuo como
                  freelancer ajudando pessoas e negócios que buscam soluções
                  web — do conceito à entrega.
                </p>
                <p>
                  Estou na reta final da faculdade — me formo ainda este ano —
                  e venho construindo experiência prática com projetos reais: já
                  realizei dois freelances e sigo desenvolvendo projetos
                  pessoais que em breve entram no portfólio.
                </p>
                <p>
                  Gosto de colaborar de perto, entender o problema antes de
                  codar e entregar com clareza e cuidado. Meu principal
                  objetivo neste momento é crescer como desenvolvedor web
                  dentro de uma empresa, contribuindo com soluções que façam
                  diferença no dia a dia.
                </p>
              </div>
            </div>

            <AboutProfilePhoto />
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-6 py-16 sm:px-10 sm:py-20 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <h2 className={sectionLabelClassName}>Experiência técnica</h2>
          <div className={`mt-6 max-w-3xl flex flex-col gap-5 ${bodyTextClassName}`}>
            <p>
              Trabalho com foco em desenvolvimento web, unindo front-end e
              back-end para entregar produtos completos. Tenho paixão por
              system design e arquitetura de software — acredito que uma
              estrutura bem pensada é o que sustenta entregas de alto nível
              e software de qualidade.
            </p>
            <p>
              Na faculdade, participei de projetos extracurriculares que me
              levaram a desenvolver uma solução real para uma empresa — uma
              experiência que reforçou minha capacidade de trabalhar em equipe,
              entender demandas reais e entregar com responsabilidade.
            </p>
            <p>
              Como freelancer, desenvolvi o{" "}
              <Link
                href="/work/rei-da-selva"
                className="text-black underline decoration-black/25 underline-offset-[6px] transition-colors hover:decoration-black/60"
              >
                Rei da Selva
              </Link>
              , site completo para um cliente real, cuidando de design e
              desenvolvimento do conceito ao deploy.
            </p>
            <p>
              Busco oportunidade como desenvolvedor web júnior — full stack
              ou backend — em uma empresa onde possa aprender com um time,
              colaborar em soluções reais e evoluir na prática.
            </p>
            <ul className="flex flex-col gap-2 pl-4 sm:pl-5">
              <li className="list-disc">
                Desenvolvimento web full stack com React, Next.js e
                TypeScript
              </li>
              <li className="list-disc">
                Projeto extracurricular na faculdade com entrega real para
                empresa
              </li>
              <li className="list-disc">
                Freelance Rei da Selva — cliente real, design e desenvolvimento
                ponta a ponta
              </li>
              <li className="list-disc">
                System design e arquitetura de software
              </li>
              <li className="list-disc">
                Projetos pessoais em andamento para ampliar o portfólio
              </li>
              <li className="list-disc">
                Foco em código organizado, manutenibilidade e boa experiência
                de uso
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Contact animatedEntrance={false} />
    </main>
  );
}
