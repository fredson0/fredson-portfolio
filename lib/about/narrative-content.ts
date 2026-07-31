export type NarrativeImage = {
  src: string;
  alt: string;
  /** Tailwind classes for absolute position + size inside collage */
  layoutClassName: string;
  /** Initial Y offset (px) — rise animation */
  riseY: number;
  /** Seconds — lower = arrives faster */
  duration: number;
  /** Timeline offset (seconds) */
  delay: number;
};

export type NarrativeSceneContent = {
  id: string;
  titleLines: string[];
  body: string[];
  tags: string;
  images: NarrativeImage[];
};

export const aboutStoryScene: NarrativeSceneContent = {
  id: "about-story",
  titleLines: ["Sobre", "mim"],
  body: [
    "Sou desenvolvedor web full stack júnior, baseado em Salvador. Atuo como freelancer ajudando pessoas e negócios que buscam soluções web — do conceito à entrega.",
    "Estou na reta final da faculdade e venho construindo experiência prática com projetos reais: freelances entregues e projetos pessoais que em breve entram no portfólio.",
    "Gosto de colaborar de perto, entender o problema antes de codar e entregar com clareza. Busco crescer como desenvolvedor dentro de uma empresa, contribuindo com soluções que façam diferença no dia a dia.",
  ],
  tags: "DESENVOLVEDOR WEB · FULL STACK · SALVADOR",
  images: [
    {
      src: "/about/perfil3.jpg",
      alt: "Fredson Santana",
      layoutClassName:
        "left-[0%] top-[18%] z-10 w-[34%] sm:w-[30%] md:left-[2%] md:top-[12%] md:w-[28%]",
      riseY: 70,
      duration: 0.55,
      delay: 0,
    },
    {
      src: "/about/perfil2.jpg",
      alt: "Fredson Santana",
      layoutClassName:
        "left-[30%] top-[2%] z-30 w-[40%] sm:w-[36%] md:left-[26%] md:top-0 md:w-[34%]",
      riseY: 140,
      duration: 1.05,
      delay: 0.06,
    },
    {
      src: "/about/perfil4.jpg",
      alt: "Fredson Santana",
      layoutClassName:
        "left-[8%] top-[48%] z-20 w-[36%] sm:w-[32%] md:left-[10%] md:top-[44%] md:w-[30%]",
      riseY: 95,
      duration: 0.72,
      delay: 0.02,
    },
    {
      src: "/about/perfil.jpeg",
      alt: "Fredson Santana",
      layoutClassName:
        "left-[42%] top-[36%] z-40 w-[42%] sm:w-[38%] md:left-[38%] md:top-[32%] md:w-[36%]",
      riseY: 165,
      duration: 1.15,
      delay: 0.14,
    },
  ],
};
