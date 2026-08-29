import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEV_PANPAN // Full-Stack Software Engineer & Digital Architect",
  description:
    "Cyberpunk Neobrutalist Portfolio of Dev panpan — Full-Stack Developer specializing in Next.js 14, TypeScript, Supabase, and Framer Motion.",
  keywords: [
    "Dev panpan",
    "Full Stack Developer",
    "Next.js Developer",
    "Neobrutalism Portfolio",
    "React Developer",
    "TypeScript",
  ],
  authors: [{ name: "Dev panpan" }],
  openGraph: {
    title: "DEV_PANPAN // Full-Stack Software Engineer",
    description: "Cyberpunk Neobrutalist Developer Portfolio & Interactive Terminal.",
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
      <body className={`${inter.variable} font-sans bg-brutal-bg text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
