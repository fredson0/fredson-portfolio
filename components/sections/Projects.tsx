import ProjectHoverList from "@/components/work/ProjectHoverList";

export default function Projects() {
  return (
    <section
      id="work"
      className="projects-section relative bg-white pb-24 text-black lg:pb-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
        <div className="border-t border-black/10 pt-8 md:pt-10">
          <p className="text-xs font-light uppercase tracking-tight text-black/45 sm:text-sm">
            Trabalhos recentes
          </p>
        </div>

        <ProjectHoverList variant="section" listClassName="mt-2 md:border-t-0" />
      </div>
    </section>
  );
}
