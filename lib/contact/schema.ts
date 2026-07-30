import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(160, "E-mail muito longo."),
  organization: z.string().trim().max(160, "Nome da organização muito longo.").default(""),
  services: z
    .string()
    .trim()
    .min(3, "Descreva os serviços que você busca.")
    .max(300, "Descrição de serviços muito longa."),
  message: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(4000, "Mensagem muito longa."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactSubmission = ContactFormInput & {
  id: string;
  createdAt: string;
  read: boolean;
};
