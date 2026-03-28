"use client";

import { Alert, Grid, Stack, Typography } from "@mui/material";

import { PocketPokemonCard } from "@/components/pocketpokemon/PocketPokemonCard";
import type { PocketPokemonListItem } from "@/types/pocketPokemon";

type PocketPokemonCardGridProps = {
  title?: string;
  pokemon: PocketPokemonListItem[];
  emptyMessage?: string;
};

export function PocketPokemonCardGrid({ title, pokemon, emptyMessage }: PocketPokemonCardGridProps) {
  return (
    <Stack spacing={2}>
      {title ? (
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      ) : null}
      {pokemon.length === 0 ? (
        <Alert severity="info">{emptyMessage ?? "No Pokemon to display."}</Alert>
      ) : (
        <Grid container spacing={2}>
          {pokemon.map((entry) => (
            <Grid key={entry.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <PocketPokemonCard pokemon={entry} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
