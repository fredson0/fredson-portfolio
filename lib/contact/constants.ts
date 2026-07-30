export {
  DARK_BACKGROUND,
  HERO_BACKGROUND,
  LIGHT_SECTION,
} from "@/lib/theme";

export const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact";

export const CONTACT_EMAIL = "fredsonmachado02@gmail.com";
export const CONTACT_PHONE = "+55 71 99140-7870";

export const socialLinks = [
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
