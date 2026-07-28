export type Project = {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  href?: string;
};

export const projects: Project[] = [
  {
    id: "rei-da-selva",
    title: "REI DA SELVA",
    category: "Freelance — Web & Development",
    imageSrc: "/projects/rei-da-selva/reidaselva.webp",
    href: "/work/rei-da-selva",
  },
  {
    id: "faculty",
    title: "THE FACULTY",
    category: "Interaction & Development",
    imageSrc:
      "https://images.unsplash.com/photo-1558591710-4bfb4a27904a?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
  {
    id: "nice",
    title: "NIC(T)E",
    category: "Web & Development",
    imageSrc:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
  {
    id: "nexus",
    title: "NEXUS",
    category: "Systems Architecture",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
];
