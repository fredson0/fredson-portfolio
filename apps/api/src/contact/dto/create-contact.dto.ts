/**
 * TODO: substituir por class-validator + class-transformer
 * ou integrar Zod compartilhado de lib/contact/schema.ts
 */
export class CreateContactDto {
  name!: string;
  email!: string;
  organization?: string;
  services!: string;
  message!: string;
}
