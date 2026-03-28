import type { Metadata } from "next";
import { Inconsolata, Space_Grotesk } from "next/font/google";

import { PocketPokemonNav } from "@/components/layout/PocketPokemonNav";
import { PocketPokemonProviders } from "@/components/providers/PocketPokemonProviders";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketPokemon",
  description: "PocketPokemon  built with Next.js, Prisma, tRPC and Material UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inconsolata.variable}`}>
      <body>
        <PocketPokemonProviders>
          <PocketPokemonNav />
          {children}
        </PocketPokemonProviders>
      </body>
    </html>
  );
}
