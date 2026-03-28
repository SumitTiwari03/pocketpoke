import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PocketPokemonNav } from "@/components/layout/PocketPokemonNav";
import { PocketPokemonProviders } from "@/components/providers/PocketPokemonProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketPokemon",
  description: "simple pokedex app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PocketPokemonProviders>
          <PocketPokemonNav />
          {children}
        </PocketPokemonProviders>
      </body>
    </html>
  );
}