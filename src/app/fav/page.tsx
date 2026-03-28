"use client";

import { Alert, Container, Stack, Typography } from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { usePocketPokemonFavorites } from "@/components/providers/PocketPokemonFavoritesProvider";
import { trpc } from "@/trpc/react";

export default function FavoritesPage() {
  const { favoriteIds } = usePocketPokemonFavorites();

  const favoritesQuery = trpc.pokemon.getByIds.useQuery(
    { ids: favoriteIds },
    { enabled: favoriteIds.length > 0 }
  );

  console.log("favorites:", favoriteIds);

  const data =
    favoriteIds.length === 0
      ? []
      : favoritesQuery.data ?? [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          favorites
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: 13 }}>
          saved locally in browser
        </Typography>

        {favoritesQuery.error && (
          <Alert severity="error">Failed to load favorites</Alert>
        )}

        <PocketPokemonCardGrid
          pokemon={data}
          emptyMessage="no favorites yet"
        />
      </Stack>
    </Container>
  );
}