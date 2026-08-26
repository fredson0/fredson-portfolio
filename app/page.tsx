"use client";

import LandingIntro from "@/components/providers/LandingIntro";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import ProjectGallery from "@/components/sections/ProjectGallery";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <LandingIntro>
      <Hero />
      <About />
      <Projects />
      <ProjectGallery />
      <Contact />
    </LandingIntro>
  );
}
