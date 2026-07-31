import type { Metadata } from "next";

import AboutNarrativeIntro from "@/components/about/narrative/AboutNarrativeIntro";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Sobre — Fredson Santana",
  description:
    "Conheça Fredson Santana — desenvolvedor web full stack júnior em Salvador, focado em soluções web de qualidade.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <AboutNarrativeIntro />
      <Contact animatedEntrance={false} />
    </main>
  );
}
