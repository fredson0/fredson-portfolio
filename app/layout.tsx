import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fredson Santana — Freelance Developer & Systems Analyst",
  description:
    "Portfolio de Fredson Santana, Freelance Developer & Systems Analyst especializado em soluções robustas de software e interfaces premium.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col font-sans`}>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <AppHeader />
            {children}
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
