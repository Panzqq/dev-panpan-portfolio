import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev panpan | Full Stack Developer",
  description:
    "Portfolio of Dev panpan — a passionate full-stack developer building seamless digital experiences with modern web technologies.",
  keywords: [
    "Dev panpan",
    "full stack developer",
    "web developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Dev panpan" }],
  openGraph: {
    title: "Dev panpan | Full Stack Developer",
    description:
      "Portfolio of Dev panpan — building seamless digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev panpan | Full Stack Developer",
    description: "Building seamless digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#050A14] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
