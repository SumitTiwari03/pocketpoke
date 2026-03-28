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
      {title && (
        <Typography variant="h6">
          {title}
        </Typography>
      )}

      {pokemon.length === 0 && (
        <Alert severity="info">
          {emptyMessage || "no pokemon"}
        </Alert>
      )}

      {pokemon.length > 0 && (
        <Grid container spacing={2}>
          {pokemon.map((entry) => (
            <Grid key={entry.id} item xs={12} sm={6} md={4}>
              <PocketPokemonCard pokemon={entry} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}