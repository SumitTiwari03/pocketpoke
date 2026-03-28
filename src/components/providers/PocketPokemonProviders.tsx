"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { PocketPokemonFavoritesProvider } from "@/components/providers/PocketPokemonFavoritesProvider";
import { TRPCReactProvider } from "@/trpc/react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ea580c",
    },
    secondary: {
      main: "#c2410c",
    },
    background: {
      default: "#fffaf5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-space-grotesk), var(--font-inconsolata), sans-serif",
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
});

export function PocketPokemonProviders(props: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <PocketPokemonFavoritesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </PocketPokemonFavoritesProvider>
    </TRPCReactProvider>
  );
}
