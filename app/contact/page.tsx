import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contato — Fredson Santana",
  description:
    "Entre em contato com Fredson Santana — desenvolvedor web full stack. Vamos começar um projeto juntos.",
};

export default function ContactPage() {
  return <ContactForm />;
}
