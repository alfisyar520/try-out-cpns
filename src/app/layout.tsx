import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Try Out CPNS — Simulasi SKD",
  description: "Try out TWK, TIU, dan TKP — latihan mandiri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-dvh flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
