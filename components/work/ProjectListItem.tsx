import Link from "next/link";

import type { Project } from "@/lib/projects";

type ProjectListItemProps = {
  project: Project;
  variant?: "section" | "page";
};

export default function ProjectListItem({
  project,
  variant = "section",
}: ProjectListItemProps) {
  const href = project.href ?? "#";
  const isSection = variant === "section";

  return (
    <li>
      <Link href={href} className="group block">
        <article className="pb-16 last:pb-0 md:hidden">
          <div className="flex items-center justify-center bg-[#e9e9e9] px-6 py-10 sm:px-8 sm:py-12">
            <img
              src={project.imageSrc}
              alt=""
              className="h-auto max-h-[min(42vw,220px)] w-auto max-w-full object-contain"
              draggable={false}
            />
          </div>

          <h2 className="mt-6 text-[2rem] font-light leading-tight tracking-[-0.03em] sm:text-[2.25rem]">
            {project.title}
          </h2>

          <div className="mt-5 border-t border-black/12" />

          <div className="mt-4 flex items-start justify-between gap-6 text-sm font-light tracking-[-0.02em] text-black/80">
            <span>{project.category}</span>
            <span className="shrink-0">{project.year}</span>
          </div>
        </article>

        {isSection ? (
          <div
            className="project-row hidden w-full cursor-pointer items-center justify-between border-b border-black/10 py-12 md:flex md:py-14 lg:py-16"
          >
            <span className="project-title inline-block text-3xl font-light tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {project.title}
            </span>
            <span className="project-category inline-block text-right text-sm font-light tracking-[-0.02em] text-black/70 sm:text-base md:text-lg">
              {project.category}
            </span>
          </div>
        ) : (
          <div
            className="hidden w-full items-center justify-between border-b border-black/10 py-10 transition-colors hover:bg-black/[0.02] md:flex md:py-12"
          >
            <span className="text-2xl font-light tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl md:text-4xl lg:text-5xl">
              {project.title}
            </span>
            <span className="text-right text-sm font-light tracking-[-0.02em] text-black/60 sm:text-base md:text-lg">
              {project.category}
            </span>
          </div>
        )}
      </Link>
    </li>
  );
}
