"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useMagnetic } from "@/components/layout/Magnetic";
import {
  CONTACT_API_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LIGHT_SECTION,
  socialLinks,
} from "@/lib/contact/constants";
import { ACCENT_MUTED, DARK_BACKGROUND } from "@/lib/theme";
import type { ContactFormInput } from "@/lib/contact/schema";
import { gsap, useGSAP } from "@/lib/gsap";

const profilePhotoSrc = "/about/perfil.jpeg";

const initialForm: ContactFormInput = {
  name: "",
  email: "",
  organization: "",
  services: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof ContactFormInput, string[]>>;

function FormField({
  index,
  label,
  name,
  value,
  placeholder,
  required,
  onChange,
  error,
  multiline = false,
}: {
  index: string;
  label: string;
  name: keyof ContactFormInput;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (name: keyof ContactFormInput, value: string) => void;
  error?: string;
  multiline?: boolean;
}) {
  const inputClassName =
    "mt-5 w-full border-0 border-b border-white/20 bg-transparent pb-5 text-xl font-light tracking-[-0.02em] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/60 sm:text-2xl md:text-[1.65rem] md:leading-tight";

  return (
    <div className="border-t border-white/12 py-12 md:py-14">
      <div className="flex gap-8 md:gap-12">
        <span className="w-10 shrink-0 pt-2 text-sm font-light text-white/35 sm:text-base">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <label
            htmlFor={name}
            className="block text-2xl font-light tracking-[-0.02em] text-white sm:text-3xl md:text-4xl md:leading-[1.1]"
          >
            {label}
            {required ? " *" : ""}
          </label>
          {multiline ? (
            <textarea
              id={name}
              name={name}
              rows={3}
              value={value}
              placeholder={placeholder}
              onChange={(event) => onChange(name, event.target.value)}
              className={`${inputClassName} min-h-[120px] resize-none md:min-h-[100px]`}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={name === "email" ? "email" : "text"}
              value={value}
              placeholder={placeholder}
              onChange={(event) => onChange(name, event.target.value)}
              className={inputClassName}
              autoComplete={
                name === "email"
                  ? "email"
                  : name === "name"
                    ? "name"
                    : "organization"
              }
            />
          )}
          {error ? (
            <p className="mt-3 text-sm font-light text-red-100/90">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Bahia",
        timeZoneName: "shortOffset",
      }).format(new Date());

    setTime(format());
    const interval = window.setInterval(() => setTime(format()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitSectionRef = useRef<HTMLDivElement | null>(null);
  const submitButtonRef = useMagnetic<HTMLButtonElement>(0.35);

  const year = useMemo(() => new Date().getFullYear(), []);

  useGSAP(
    () => {
      const button = submitButtonRef.current;
      if (!button) {
        return;
      }

      const fill = button.querySelector<HTMLElement>(".contact-fill-bg");
      if (!fill) {
        return;
      }

      gsap.set(fill, { scale: 0, transformOrigin: "center center" });

      const onEnter = () => {
        gsap.to(fill, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const onLeave = () => {
        gsap.to(fill, {
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      };

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);

      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [] }
  );

  const updateField = (name: keyof ContactFormInput, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        if (payload.fieldErrors) {
          setFieldErrors(payload.fieldErrors);
        }
        setFormError(payload.error ?? "Não foi possível enviar sua mensagem.");
        return;
      }

      setIsSuccess(true);
      setForm(initialForm);
    } catch {
      setFormError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-white">
      <form onSubmit={handleSubmit} noValidate>
        <section
          className="px-6 pb-0 pt-28 sm:px-10 md:pt-36 lg:px-16"
          style={{ backgroundColor: LIGHT_SECTION }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-12 border-b border-white/12 pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
              <h1 className="max-w-4xl text-[2.75rem] font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                Vamos começar
                <br />
                um projeto juntos
              </h1>

              <div className="flex items-center gap-6 lg:mb-2">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white/10 ring-2 ring-white/15 sm:h-[88px] sm:w-[88px]">
                  <Image
                    src={profilePhotoSrc}
                    alt="Fredson Santana"
                    fill
                    className="object-cover"
                    sizes="88px"
                    priority
                  />
                </div>
                <span
                  className="text-4xl font-light text-white/60 sm:text-5xl"
                  aria-hidden="true"
                >
                  ↘
                </span>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0">
                <FormField
                  index="01"
                  label="Qual é o seu nome?"
                  name="name"
                  value={form.name}
                  placeholder="Seu nome *"
                  required
                  onChange={updateField}
                  error={fieldErrors.name?.[0]}
                />
                <FormField
                  index="02"
                  label="Qual é o seu e-mail?"
                  name="email"
                  value={form.email}
                  placeholder="seu@email.com *"
                  required
                  onChange={updateField}
                  error={fieldErrors.email?.[0]}
                />
                <FormField
                  index="03"
                  label="Qual o nome da sua organização?"
                  name="organization"
                  value={form.organization ?? ""}
                  placeholder="Empresa ou projeto (opcional)"
                  onChange={updateField}
                  error={fieldErrors.organization?.[0]}
                />
                <FormField
                  index="04"
                  label="Que serviços você busca?"
                  name="services"
                  value={form.services}
                  placeholder="Web Design, Desenvolvimento Web ..."
                  required
                  onChange={updateField}
                  error={fieldErrors.services?.[0]}
                />
                <FormField
                  index="05"
                  label="Sua mensagem"
                  name="message"
                  value={form.message}
                  placeholder="Olá Fredson, preciso de ajuda com ... *"
                  required
                  onChange={updateField}
                  error={fieldErrors.message?.[0]}
                  multiline
                />
              </div>

              <aside className="border-t border-white/12 py-12 lg:hidden">
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-light uppercase tracking-tight text-white/40">
                      Detalhes de contato
                    </p>
                    <ul className="mt-4 space-y-2 text-sm font-light text-white/85">
                      <li>
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                      </li>
                      <li>
                        <a href="tel:+5571991407870">{CONTACT_PHONE}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              <aside className="hidden border-t border-white/12 pt-12 lg:block lg:border-t-0 lg:pl-10 xl:pl-16">
                <div className="sticky top-36 space-y-12">
                  <div>
                    <p className="text-xs font-light uppercase tracking-tight text-white/40">
                      Detalhes de contato
                    </p>
                    <ul className="mt-5 space-y-2 text-sm font-light tracking-[-0.02em] text-white/85 sm:text-base">
                      <li>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="transition-colors hover:text-white"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </li>
                      <li>
                        <a
                          href="tel:+5571991407870"
                          className="transition-colors hover:text-white"
                        >
                          {CONTACT_PHONE}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-light uppercase tracking-tight text-white/40">
                      Localização
                    </p>
                    <p className="mt-5 text-sm font-light tracking-[-0.02em] text-white/75 sm:text-base">
                      Salvador, Bahia — Brasil
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-light uppercase tracking-tight text-white/40">
                      Redes
                    </p>
                    <ul className="mt-5 space-y-2">
                      {socialLinks.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-light tracking-[-0.02em] text-white/80 transition-colors hover:text-white sm:text-base"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="px-6 pb-10 pt-0 sm:px-10 lg:px-16 lg:pb-12"
          style={{ backgroundColor: DARK_BACKGROUND }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              ref={submitSectionRef}
              className="relative border-t border-zinc-700 py-20 md:py-24"
            >
              <div className="relative flex justify-center">
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="contact-interactive relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-zinc-600 bg-[#141516] text-center will-change-transform transition-opacity disabled:cursor-not-allowed disabled:opacity-70 md:h-44 md:w-44"
                >
                  <div
                    className="contact-fill-bg pointer-events-none absolute inset-0 z-0 rounded-full"
                    style={{ backgroundColor: ACCENT_MUTED }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 text-sm font-light leading-tight tracking-[-0.02em] md:text-base">
                    {isSubmitting ? (
                      "Enviando..."
                    ) : isSuccess ? (
                      <>
                        Enviado!
                        <br />
                        Obrigado
                      </>
                    ) : (
                      <>
                        Enviar
                        <br />
                        mensagem
                      </>
                    )}
                  </span>
                </button>
              </div>

              {formError ? (
                <p className="mt-8 text-center text-sm font-light text-red-300/90">
                  {formError}
                </p>
              ) : null}

              {isSuccess ? (
                <p className="mt-4 text-center text-sm font-light text-white/60">
                  Recebi sua mensagem e retorno o mais rápido possível.
                </p>
              ) : null}
            </div>

            <footer className="grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-6">
              <div>
                <p className="text-xs font-light uppercase tracking-tight text-white/40">
                  Versão
                </p>
                <p className="mt-2 text-sm font-light tracking-[-0.02em] text-white/70">
                  {year} © Edition
                </p>
              </div>
              <div>
                <p className="text-xs font-light uppercase tracking-tight text-white/40">
                  Horário local
                </p>
                <p className="mt-2 text-sm font-light tracking-[-0.02em] text-white/70">
                  <LocalTime />
                </p>
              </div>
              <div>
                <p className="text-xs font-light uppercase tracking-tight text-white/40">
                  Redes
                </p>
                <ul className="mt-2 space-y-1">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-light tracking-[-0.02em] text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </footer>
          </div>
        </section>
      </form>
    </main>
  );
}
