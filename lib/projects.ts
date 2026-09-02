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
  {
    id: "faculty",
    title: "THE FACULTY",
    category: "Interaction & Development",
    year: "2024",
    imageSrc:
      "https://images.unsplash.com/photo-1558591710-4bfb4a27904a?w=900&h=1100&fit=crop&q=80",
    href: "#",
    hoverBg: "#3f3f3f",
  },
  {
    id: "nice",
    title: "NIC(T)E",
    category: "Web & Development",
    year: "2024",
    imageSrc:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&h=1100&fit=crop&q=80",
    href: "#",
    hoverBg: "#d6cfc4",
  },
  {
    id: "nexus",
    title: "NEXUS",
    category: "Systems Architecture",
    year: "2023",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=1100&fit=crop&q=80",
    href: "#",
    hoverBg: "#1c1d20",
  },
];
