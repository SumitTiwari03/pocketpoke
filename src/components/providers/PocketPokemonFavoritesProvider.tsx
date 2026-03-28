"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "favorites";

export function PocketPokemonFavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // load once
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavoriteIds(JSON.parse(saved));
      } catch {
        console.log("failed to parse favorites");
      }
    }
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function toggleFavorite(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function isFavorite(id: number) {
    return favoriteIds.includes(id);
  }

  function clearFavorites() {
    setFavoriteIds([]);
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function usePocketPokemonFavorites() {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error("FavoritesProvider missing");
  }

  return ctx;
}