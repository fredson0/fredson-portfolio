export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  href?: string;
  hoverBg?: string;
  hoverBgImage?: string;
};

export const projects: Project[] = [
  {
    id: "enem-ia",
    title: "ENEM+IA",
    category: "EdTech — Web & AI",
    year: "2026",
    imageSrc: "/projects/enem-ia/project.png",
    href: "/work/enem-ia",
    hoverBg: "#2a2f38",
  },
  {
    id: "rei-da-selva",
    title: "REI DA SELVA",
    category: "Freelance — Web & Development",
    year: "2026",
    imageSrc: "/projects/rei-da-selva/reidaselva.webp",
    href: "/work/rei-da-selva",
    hoverBg: "#2c2a24",
    hoverBgImage: "/projects/rei-da-selva/fredsonrei.webp",
  },
];
