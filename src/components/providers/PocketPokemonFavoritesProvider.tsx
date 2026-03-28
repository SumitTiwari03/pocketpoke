"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type PocketPokemonFavoritesContextValue = {
  favoriteIds: number[];
  isFavorite: (pokemonId: number) => boolean;
  toggleFavorite: (pokemonId: number) => void;
  clearFavorites: () => void;
};

const FAVORITES_STORAGE_KEY = "pocketpokemon:favorites";

const PocketPokemonFavoritesContext = createContext<PocketPokemonFavoritesContextValue | undefined>(undefined);

export function PocketPokemonFavoritesProvider(props: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as unknown;

      if (!Array.isArray(parsed)) {
        return [];
      }

      return [...new Set(parsed.filter((value): value is number => typeof value === "number"))];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const value = useMemo<PocketPokemonFavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (pokemonId: number) => favoriteIds.includes(pokemonId),
      toggleFavorite: (pokemonId: number) => {
        setFavoriteIds((current) =>
          current.includes(pokemonId)
            ? current.filter((id) => id !== pokemonId)
            : [...current, pokemonId],
        );
      },
      clearFavorites: () => setFavoriteIds([]),
    }),
    [favoriteIds],
  );

  return <PocketPokemonFavoritesContext.Provider value={value}>{props.children}</PocketPokemonFavoritesContext.Provider>;
}

export function usePocketPokemonFavorites() {
  const context = useContext(PocketPokemonFavoritesContext);

  if (!context) {
    throw new Error("usePocketPokemonFavorites must be used within PocketPokemonFavoritesProvider");
  }

  return context;
}
