import NarrativeScene from "@/components/about/narrative/NarrativeScene";
import { aboutStoryScene } from "@/lib/about/narrative-content";

export default function AboutStoryScene() {
  return <NarrativeScene content={aboutStoryScene} />;
}
