import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Panpan | Full Stack Developer",
  description:
    "Portfolio of Dev Panpan — Crafting Seamless Digital Experiences. Specializing in Node.js, React, and Scalable Architectures.",
  keywords: [
    "Dev Panpan",
    "Full Stack Developer",
    "Next.js Developer",
    "React",
    "Node.js",
    "Three.js",
    "TypeScript",
  ],
  authors: [{ name: "Dev Panpan" }],
  openGraph: {
    title: "Dev Panpan | Full Stack Developer",
    description: "Crafting Seamless Digital Experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} font-sans bg-[#050C0A] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
