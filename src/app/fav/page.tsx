"use client";

import { Alert, Container, Stack, Typography } from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { usePocketPokemonFavorites } from "@/components/providers/PocketPokemonFavoritesProvider";
import type { PocketPokemonListItem } from "@/types/pocketPokemon";
import { trpc } from "@/trpc/react";

export default function FavPage() {
  const { favoriteIds } = usePocketPokemonFavorites();

  const favoritesQuery = trpc.pokemon.getByIds.useQuery(
    { ids: favoriteIds },
    {
      enabled: favoriteIds.length > 0,
    },
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">Fav</Typography>
        <Typography color="text.secondary">Your favorites are stored in this browser.</Typography>

        {favoritesQuery.error ? <Alert severity="error">Could not load favorite Pokemon.</Alert> : null}

        <PocketPokemonCardGrid
          pokemon={(favoriteIds.length === 0 ? [] : favoritesQuery.data ?? []) as PocketPokemonListItem[]}
          emptyMessage="No favorites yet. Add favorites from cards in Search or All Type pages."
        />
      </Stack>
    </Container>
  );
}
