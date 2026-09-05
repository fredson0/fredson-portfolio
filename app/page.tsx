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
      <div className="relative z-10">
        <Hero />
        <div className="relative bg-white">
          <About />
          <Projects />
          <ProjectGallery />
        </div>
      </div>
      <Contact />
    </LandingIntro>
  );
}
