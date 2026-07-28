import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato — Fredson Santana",
  description:
    "Entre em contato com Fredson Santana — Freelance Developer & Systems Analyst.",
};

const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fredson-santana-machado-filho-912655329/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/fredson0",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/fredson_machado/",
  },
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-24 pt-28 sm:px-10 md:pt-36 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-light uppercase tracking-tight text-black/45 sm:text-sm">
            Contato
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
            Vamos trabalhar
            <br />
            juntos
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed tracking-[-0.02em] text-black/65 sm:text-lg">
            Tem um projeto em mente? Envie uma mensagem — respondo o mais rápido
            possível.
          </p>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="mailto:fredsonmachado02@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-8 py-4 text-sm font-light tracking-[-0.02em] transition-colors hover:border-black hover:bg-black hover:text-white sm:text-base"
            >
              fredsonmachado02@gmail.com
            </a>
            <a
              href="tel:+5571991407870"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-8 py-4 text-sm font-light tracking-[-0.02em] transition-colors hover:border-black hover:bg-black hover:text-white sm:text-base"
            >
              +55 71 99140-7870
            </a>
          </div>

          <nav className="mt-16 border-t border-black/10 pt-10" aria-label="Redes sociais">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light tracking-[-0.02em] text-black/60 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
