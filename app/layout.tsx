import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full font-sans`}>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <AppHeader />
            <div id="site-root" className="relative min-h-full">
              {children}
            </div>
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
