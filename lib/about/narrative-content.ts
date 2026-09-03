export type NarrativeImage = {
  src: string;
  alt: string;
  /** Tailwind classes for absolute position + size inside collage */
  layoutClassName: string;
  /** Optional img/video classes — defaults to object-cover photo crop */
  imageClassName?: string;
  /** card = screenshot; float = sem caixa; polaroid = moldura branca */
  surface?: "card" | "float" | "polaroid";
  mediaType?: "image" | "video";
  poster?: string;
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
  /** Optional override for collage container height/sizing */
  collageClassName?: string;
  collageMaxWidthClassName?: string;
  sectionClassName?: string;
  cta?: {
    label: string;
    href: string;
  };
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

const logoImageClassName = "h-full w-full object-contain";

export const aboutStackScene: NarrativeSceneContent = {
  id: "about-stack",
  titleLines: ["Stack", "tecnológica"],
  collageClassName:
    "h-[min(50vh,420px)] sm:h-[min(52vh,440px)] md:h-[min(56vh,480px)]",
  body: [
    "Trabalho como desenvolvedor web full stack com TypeScript no front e no back — interfaces com Next.js e APIs com NestJS em Node.js.",
    "No dia a dia uso PostgreSQL, MariaDB, MySQL e Supabase para dados; RabbitMQ e Kafka quando o fluxo pede filas e processamento assíncrono.",
    "A stack muda conforme o projeto, mas a base é sempre a mesma: código tipado, estrutura clara e ferramentas que escalam com o produto.",
  ],
  tags: "NODE · TYPESCRIPT · NESTJS · NEXT.JS · POSTGRESQL · SUPABASE · RABBITMQ · KAFKA",
  images: [
    {
      src: "/about/typescript.svg",
      alt: "TypeScript",
      surface: "float",
      layoutClassName:
        "left-[8%] top-[10%] z-30 aspect-square w-[17%] sm:w-[16%] md:left-[10%] md:top-[8%] md:w-[15%]",
      imageClassName: logoImageClassName,
      riseY: 72,
      duration: 0.55,
      delay: 0.02,
    },
    {
      src: "/about/react.svg",
      alt: "React",
      surface: "float",
      layoutClassName:
        "left-[20%] top-[6%] z-25 aspect-square w-[13%] sm:w-[12%] md:left-[22%] md:top-[5%] md:w-[12%]",
      imageClassName: logoImageClassName,
      riseY: 105,
      duration: 0.68,
      delay: 0.1,
    },
    {
      src: "/about/nextjs.svg",
      alt: "Next.js",
      surface: "float",
      layoutClassName:
        "left-[30%] top-[4%] z-40 aspect-square w-[15%] sm:w-[14%] md:left-[32%] md:top-[3%] md:w-[13%]",
      imageClassName: logoImageClassName,
      riseY: 128,
      duration: 0.92,
      delay: 0.06,
    },
    {
      src: "/about/nestjs.svg",
      alt: "NestJS",
      surface: "float",
      layoutClassName:
        "left-[42%] top-[8%] z-35 aspect-square w-[17%] sm:w-[16%] md:left-[44%] md:top-[7%] md:w-[15%]",
      imageClassName: logoImageClassName,
      riseY: 88,
      duration: 0.74,
      delay: 0,
    },
    {
      src: "/about/nodejs.svg",
      alt: "Node.js",
      surface: "float",
      layoutClassName:
        "left-[52%] top-[12%] z-28 aspect-square w-[14%] sm:w-[13%] md:left-[54%] md:top-[11%] md:w-[12%]",
      imageClassName: logoImageClassName,
      riseY: 142,
      duration: 1,
      delay: 0.12,
    },
    {
      src: "/about/postgresql.svg",
      alt: "PostgreSQL",
      surface: "float",
      layoutClassName:
        "left-[54%] top-[24%] z-32 aspect-square w-[16%] sm:w-[15%] md:left-[56%] md:top-[22%] md:w-[14%]",
      imageClassName: logoImageClassName,
      riseY: 115,
      duration: 0.82,
      delay: 0.04,
    },
    {
      src: "/about/supabase.svg",
      alt: "Supabase",
      surface: "float",
      layoutClassName:
        "left-[46%] top-[36%] z-38 aspect-square w-[15%] sm:w-[14%] md:left-[48%] md:top-[34%] md:w-[13%]",
      imageClassName: logoImageClassName,
      riseY: 158,
      duration: 1.08,
      delay: 0.14,
    },
    {
      src: "/about/rabbitmq.svg",
      alt: "RabbitMQ",
      surface: "float",
      layoutClassName:
        "left-[58%] top-[38%] z-42 aspect-square w-[13%] sm:w-[12%] md:left-[60%] md:top-[36%] md:w-[11%]",
      imageClassName: logoImageClassName,
      riseY: 125,
      duration: 0.76,
      delay: 0.08,
    },
    {
      src: "/about/kafka.svg",
      alt: "Apache Kafka",
      surface: "float",
      layoutClassName:
        "left-[64%] top-[48%] z-44 aspect-square w-[14%] sm:w-[13%] md:left-[66%] md:top-[46%] md:w-[12%]",
      imageClassName: logoImageClassName,
      riseY: 168,
      duration: 1.1,
      delay: 0.16,
    },
    {
      src: "/about/packagejson1.png",
      alt: "Dependências do projeto Rei da Selva no package.json",
      surface: "card",
      layoutClassName:
        "left-[14%] top-[32%] z-50 aspect-[16/11] w-[50%] sm:w-[48%] md:left-[16%] md:top-[30%] md:w-[44%]",
      imageClassName: "h-full w-full object-cover object-left-top",
      riseY: 180,
      duration: 1.14,
      delay: 0.18,
    },
  ],
};

export const aboutArchitectureScene: NarrativeSceneContent = {
  id: "about-architecture",
  titleLines: ["Arquitetura", "& engenharia"],
  collageClassName:
    "h-[min(50vh,420px)] sm:h-[min(52vh,440px)] md:h-[min(56vh,480px)]",
  body: [
    "Não paro na interface. Neste portfólio, a API de contato valida com Zod, limita requisições por IP, persiste em PostgreSQL via Supabase com RLS e notifica por e-mail — cada responsabilidade isolada em lib/contact, longe da rota HTTP.",
    "No Rei da Selva, a API em NestJS organiza módulos com Prisma, autenticação JWT e integrações de auth social — o mesmo rigor de separação que aplico em freelances e projetos de faculdade.",
    "Penso em system design desde o início: boundaries entre rota, serviço e infraestrutura; validação na entrada; sessões httpOnly no admin; secrets apenas no servidor.",
  ],
  tags: "SYSTEM DESIGN · ZOD · RATE LIMITING · RLS · NESTJS · API LAYERS",
  images: [
    {
      src: "/about/architecture-layers.svg",
      alt: "Diagrama de camadas da API de contato",
      surface: "card",
      layoutClassName:
        "left-[14%] top-[8%] z-40 aspect-[420/300] w-[52%] sm:w-[50%] md:left-[16%] md:top-[6%] md:w-[46%]",
      imageClassName: "h-full w-full object-cover",
      riseY: 95,
      duration: 0.82,
      delay: 0.04,
    },
    {
      src: "/about/architecture-zod.svg",
      alt: "Schema Zod de validação do formulário de contato",
      surface: "card",
      layoutClassName:
        "left-[8%] top-[42%] z-50 aspect-[320/200] w-[44%] sm:w-[42%] md:left-[10%] md:top-[40%] md:w-[38%]",
      imageClassName: "h-full w-full object-cover",
      riseY: 165,
      duration: 1.05,
      delay: 0.14,
    },
    {
      src: "/about/architecture-security.svg",
      alt: "Práticas de segurança aplicadas",
      surface: "card",
      layoutClassName:
        "left-[48%] top-[38%] z-[45] aspect-[360/280] w-[42%] sm:w-[40%] md:left-[50%] md:top-[36%] md:w-[36%]",
      imageClassName: "h-full w-full object-cover",
      riseY: 140,
      duration: 0.92,
      delay: 0.08,
    },
    {
      src: "/about/nestjs.svg",
      alt: "NestJS",
      surface: "float",
      layoutClassName:
        "left-[46%] top-[2%] z-35 aspect-square w-[17%] sm:w-[16%] md:left-[48%] md:top-[1%] md:w-[15%]",
      imageClassName: logoImageClassName,
      riseY: 105,
      duration: 0.7,
      delay: 0,
    },
    {
      src: "/about/supabase.svg",
      alt: "Supabase",
      surface: "float",
      layoutClassName:
        "left-[62%] top-[10%] z-28 aspect-square w-[15%] sm:w-[14%] md:left-[64%] md:top-[9%] md:w-[13%]",
      imageClassName: logoImageClassName,
      riseY: 118,
      duration: 0.76,
      delay: 0.1,
    },
    {
      src: "/about/prisma.svg",
      alt: "Prisma",
      surface: "float",
      layoutClassName:
        "left-[72%] top-[22%] z-32 aspect-square w-[14%] sm:w-[13%] md:left-[74%] md:top-[20%] md:w-[12%]",
      imageClassName: logoImageClassName,
      riseY: 132,
      duration: 0.88,
      delay: 0.12,
    },
    {
      src: "/about/packagejson1.png",
      alt: "Dependências da API NestJS do Rei da Selva",
      surface: "card",
      layoutClassName:
        "left-[52%] top-[52%] z-[55] aspect-[16/11] w-[44%] sm:w-[42%] md:left-[54%] md:top-[50%] md:w-[40%]",
      imageClassName: "h-full w-full object-cover object-left-top",
      riseY: 175,
      duration: 1.1,
      delay: 0.16,
    },
  ],
};

const reiMediaClassName = "h-full w-full object-cover";

export const aboutReiDaSelvaScene: NarrativeSceneContent = {
  id: "about-rei-da-selva",
  titleLines: ["Rei da", "Selva"],
  collageClassName:
    "h-[min(68vh,580px)] sm:h-[min(72vh,620px)] md:h-[min(76vh,680px)]",
  collageMaxWidthClassName: "md:max-w-[min(100%,920px)]",
  body: [
    "Freelance entregue em 2026 para um cliente real na Bahia: front em Next.js e TypeScript, API em NestJS com arquitetura hexagonal — domínio isolado, adapters de infraestrutura e contratos claros entre camadas.",
    "Integrações em produção: login com Google (OAuth), checkout e pagamentos com Mercado Pago — com idempotência nas operações de pagamento e webhooks para evitar cobranças duplicadas em retries — e fluxo de atendimento via WhatsApp, cada serviço com validação e tratamento de erros.",
    "Segurança e performance no fluxo: autenticação JWT, RBAC para permissões por papel, schemas tipados, proteção de rotas, rate limiting onde faz sentido, secrets em ambiente e otimização de assets, lazy loading e motion sem sacrificar a experiência mobile.",
    "Do design ao deploy: identidade visual, animações, responsividade e entrega ponta a ponta — um case que mostra como combino engenharia de software com produto digital real.",
  ],
  tags:
    "NEXT.JS · NESTJS · TYPESCRIPT · HEXAGONAL · RBAC · IDEMPOTENCY · MERCADO PAGO · GOOGLE AUTH · WHATSAPP · 2026",
  cta: {
    label: "Ver case completo",
    href: "/work/rei-da-selva",
  },
  images: [
    {
      src: "/projects/rei-da-selva/navega%C3%A7%C3%A3oH.webp",
      alt: "Rei da Selva — navegação horizontal",
      surface: "card",
      layoutClassName:
        "left-[2%] top-[54%] z-10 aspect-[21/9] w-[88%] md:left-[4%] md:top-[52%] md:w-[84%]",
      imageClassName: reiMediaClassName,
      riseY: 140,
      duration: 1,
      delay: 0.02,
    },
    {
      src: "/projects/rei-da-selva/reidaselva.webp",
      alt: "Rei da Selva — preview do site",
      surface: "card",
      layoutClassName:
        "left-[6%] top-[12%] z-25 aspect-[16/10] w-[48%] sm:w-[46%] md:left-[8%] md:top-[10%] md:w-[44%]",
      imageClassName: reiMediaClassName,
      riseY: 85,
      duration: 0.78,
      delay: 0.04,
    },
    {
      src: "/projects/rei-da-selva/Reidaselvavideo.webm",
      alt: "Rei da Selva — vídeo do site",
      surface: "card",
      mediaType: "video",
      poster: "/projects/rei-da-selva/reidaselva.webp",
      layoutClassName:
        "left-[44%] top-[6%] z-40 aspect-video w-[40%] sm:w-[38%] md:left-[46%] md:top-[5%] md:w-[36%] rotate-[2deg]",
      imageClassName: reiMediaClassName,
      riseY: 120,
      duration: 0.95,
      delay: 0.08,
    },
    {
      src: "/projects/rei-da-selva/Menusectionrei.webm",
      alt: "Rei da Selva — menu animado",
      surface: "card",
      mediaType: "video",
      poster: "/projects/rei-da-selva/reidaselva.webp",
      layoutClassName:
        "left-[4%] top-[40%] z-35 aspect-video w-[34%] sm:w-[32%] md:left-[6%] md:top-[38%] md:w-[30%] -rotate-[2deg]",
      imageClassName: reiMediaClassName,
      riseY: 155,
      duration: 0.88,
      delay: 0.1,
    },
    {
      src: "/projects/rei-da-selva/Landinpage2rei.webm",
      alt: "Rei da Selva — landing page",
      surface: "card",
      mediaType: "video",
      poster: "/projects/rei-da-selva/reidaselva.webp",
      layoutClassName:
        "left-[48%] top-[46%] z-[45] aspect-video w-[36%] sm:w-[34%] md:left-[50%] md:top-[44%] md:w-[32%] rotate-[1deg]",
      imageClassName: reiMediaClassName,
      riseY: 170,
      duration: 1.05,
      delay: 0.14,
    },
    {
      src: "/projects/rei-da-selva/Aprendervideo.webm",
      alt: "Rei da Selva — seção Aprender",
      surface: "card",
      mediaType: "video",
      poster: "/projects/rei-da-selva/reidaselva.webp",
      layoutClassName:
        "left-[28%] top-[28%] z-30 aspect-video w-[32%] sm:w-[30%] md:left-[30%] md:top-[26%] md:w-[28%] -rotate-[1deg]",
      imageClassName: reiMediaClassName,
      riseY: 110,
      duration: 0.82,
      delay: 0.06,
    },
    {
      src: "/projects/rei-da-selva/reiV1.webp",
      alt: "Rei da Selva — mobile 1",
      surface: "polaroid",
      layoutClassName:
        "left-[66%] top-[2%] z-50 aspect-[9/19] w-[17%] sm:w-[16%] md:left-[68%] md:top-[1%] md:w-[14%] rotate-[5deg]",
      imageClassName: reiMediaClassName,
      riseY: 95,
      duration: 0.72,
      delay: 0.12,
    },
    {
      src: "/projects/rei-da-selva/reiV2.webp",
      alt: "Rei da Selva — mobile 2",
      surface: "polaroid",
      layoutClassName:
        "left-[74%] top-[34%] z-[48] aspect-[9/19] w-[16%] sm:w-[15%] md:left-[76%] md:top-[32%] md:w-[13%] -rotate-[4deg]",
      imageClassName: reiMediaClassName,
      riseY: 130,
      duration: 0.9,
      delay: 0.16,
    },
    {
      src: "/projects/rei-da-selva/reiV3.webp",
      alt: "Rei da Selva — mobile 3",
      surface: "polaroid",
      layoutClassName:
        "left-[60%] top-[60%] z-[46] aspect-[9/19] w-[15%] sm:w-[14%] md:left-[62%] md:top-[58%] md:w-[12%] rotate-[3deg]",
      imageClassName: reiMediaClassName,
      riseY: 145,
      duration: 0.98,
      delay: 0.18,
    },
  ],
};

const enemMediaClassName = "h-full w-full object-cover";

export const aboutEnemIaScene: NarrativeSceneContent = {
  id: "about-enem-ia",
  titleLines: ["ENEM+", "IA"],
  collageClassName:
    "h-[min(68vh,580px)] sm:h-[min(72vh,620px)] md:h-[min(76vh,680px)]",
  collageMaxWidthClassName: "md:max-w-[min(100%,920px)]",
  body: [
    "Produto de preparação adaptativa para o ENEM: tutor com IA, simulados e trilha de estudos ajustados ao que o aluno ainda precisa dominar — não é um chat genérico, é foco de prova.",
    "A interface organiza conversa, progresso e treinos no mesmo fluxo: o aluno pergunta, revisa lacunas e marca etapas, com métricas que acompanham o que já foi coberto.",
    "Do design à implementação, o case mostra produto digital de ponta a ponta — visual escuro, motion e responsividade sem perder clareza no mobile.",
  ],
  tags: "NEXT.JS · EDTECH · TUTOR IA · SIMULADOS · TRILHA · PRODUTO · 2026",
  cta: {
    label: "Ver case completo",
    href: "/work/enem-ia",
  },
  images: [
    {
      src: "/projects/enem-ia/project.png",
      alt: "ENEM+IA — preview amplo",
      surface: "card",
      layoutClassName:
        "left-[2%] top-[54%] z-10 aspect-[21/9] w-[88%] md:left-[4%] md:top-[52%] md:w-[84%]",
      imageClassName: enemMediaClassName,
      riseY: 140,
      duration: 1,
      delay: 0.02,
    },
    {
      src: "/projects/enem-ia/project.png",
      alt: "ENEM+IA — preview do produto",
      surface: "card",
      layoutClassName:
        "left-[6%] top-[12%] z-25 aspect-[16/10] w-[48%] sm:w-[46%] md:left-[8%] md:top-[10%] md:w-[44%]",
      imageClassName: enemMediaClassName,
      riseY: 85,
      duration: 0.78,
      delay: 0.04,
    },
    {
      src: "/projects/enem-ia/hero-1.webm",
      alt: "ENEM+IA — hero",
      surface: "card",
      mediaType: "video",
      poster: "/projects/enem-ia/project.png",
      layoutClassName:
        "left-[44%] top-[6%] z-40 aspect-video w-[40%] sm:w-[38%] md:left-[46%] md:top-[5%] md:w-[36%] rotate-[2deg]",
      imageClassName: enemMediaClassName,
      riseY: 120,
      duration: 0.95,
      delay: 0.08,
    },
    {
      src: "/projects/enem-ia/hero-2.webm",
      alt: "ENEM+IA — hero 2",
      surface: "card",
      mediaType: "video",
      poster: "/projects/enem-ia/project.png",
      layoutClassName:
        "left-[4%] top-[40%] z-35 aspect-video w-[34%] sm:w-[32%] md:left-[6%] md:top-[38%] md:w-[30%] -rotate-[2deg]",
      imageClassName: enemMediaClassName,
      riseY: 155,
      duration: 0.88,
      delay: 0.1,
    },
    {
      src: "/projects/enem-ia/product-1.webm",
      alt: "ENEM+IA — produto",
      surface: "card",
      mediaType: "video",
      poster: "/projects/enem-ia/project.png",
      layoutClassName:
        "left-[48%] top-[46%] z-[45] aspect-video w-[36%] sm:w-[34%] md:left-[50%] md:top-[44%] md:w-[32%] rotate-[1deg]",
      imageClassName: enemMediaClassName,
      riseY: 170,
      duration: 1.05,
      delay: 0.14,
    },
    {
      src: "/projects/enem-ia/product-2.webm",
      alt: "ENEM+IA — produto 2",
      surface: "card",
      mediaType: "video",
      poster: "/projects/enem-ia/project.png",
      layoutClassName:
        "left-[28%] top-[28%] z-30 aspect-video w-[32%] sm:w-[30%] md:left-[30%] md:top-[26%] md:w-[28%] -rotate-[1deg]",
      imageClassName: enemMediaClassName,
      riseY: 110,
      duration: 0.82,
      delay: 0.06,
    },
    {
      src: "/projects/enem-ia/cell1.png",
      alt: "ENEM+IA — mobile 1",
      surface: "polaroid",
      layoutClassName:
        "left-[66%] top-[2%] z-50 aspect-[9/19] w-[17%] sm:w-[16%] md:left-[68%] md:top-[1%] md:w-[14%] rotate-[5deg]",
      imageClassName: enemMediaClassName,
      riseY: 95,
      duration: 0.72,
      delay: 0.12,
    },
    {
      src: "/projects/enem-ia/cell2.png",
      alt: "ENEM+IA — mobile 2",
      surface: "polaroid",
      layoutClassName:
        "left-[74%] top-[34%] z-[48] aspect-[9/19] w-[16%] sm:w-[15%] md:left-[76%] md:top-[32%] md:w-[13%] -rotate-[4deg]",
      imageClassName: enemMediaClassName,
      riseY: 130,
      duration: 0.9,
      delay: 0.16,
    },
    {
      src: "/projects/enem-ia/cell3.png",
      alt: "ENEM+IA — mobile 3",
      surface: "polaroid",
      layoutClassName:
        "left-[60%] top-[60%] z-[46] aspect-[9/19] w-[15%] sm:w-[14%] md:left-[62%] md:top-[58%] md:w-[12%] rotate-[3deg]",
      imageClassName: enemMediaClassName,
      riseY: 145,
      duration: 0.98,
      delay: 0.18,
    },
  ],
};
