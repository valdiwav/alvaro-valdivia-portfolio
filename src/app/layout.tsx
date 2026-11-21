import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Implementación de software, automatización de procesos e IA aplicada. Analista de Implementación en ADP e Ingeniero de Ejecución en Informática (PUCV).";

export const metadata: Metadata = {
  title: "Álvaro Valdivia · Implementación de Software e IA Aplicada",
  description,
  openGraph: {
    title: "Álvaro Valdivia · Implementación de Software e IA Aplicada",
    description,
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
