import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider, ThemeProvider } from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cubos Movie App",
  description: "Descubra e explore filmes com a melhor experiência de cinema digital",
  keywords: ["filmes", "cinema", "TMDB", "movies", "entertainment"],
  authors: [{ name: "Cubos Academy" }],
  openGraph: {
    title: "Cubos Movie App",
    description: "Descubra e explore filmes com a melhor experiência de cinema digital",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <QueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
