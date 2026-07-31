import AboutArchitectureScene from "@/components/about/narrative/AboutArchitectureScene";
import AboutReiDaSelvaScene from "@/components/about/narrative/AboutReiDaSelvaScene";
import AboutStackScene from "@/components/about/narrative/AboutStackScene";
import AboutStoryScene from "@/components/about/narrative/AboutStoryScene";
import AboutVerticalIntro from "@/components/about/narrative/AboutVerticalIntro";

export default function AboutNarrativeIntro() {
  return (
    <>
      <AboutVerticalIntro />
      <AboutStoryScene />
      <AboutStackScene />
      <AboutArchitectureScene />
      <AboutReiDaSelvaScene />
    </>
  );
}
