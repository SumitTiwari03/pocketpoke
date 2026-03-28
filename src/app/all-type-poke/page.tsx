"use client";

import { useState } from "react";
import {
  Alert,
  Container,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { PocketPokemonTypeSelect } from "@/components/pocketpokemon/PocketPokemonTypeSelect";
import type { PocketPokemonListItem } from "@/types/pocketPokemon";
import { trpc } from "@/trpc/react";

export default function AllTypePokePage() {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);

  const typeQuery = trpc.pokemon.getTypes.useQuery();
  const pokemonQuery = trpc.pokemon.getByType.useQuery({
    type: selectedType,
    page,
    pageSize: 12,
  });

  function handleSelectType(type: string | undefined) {
    console.log("selected type:", selectedType);
    setSelectedType(type);
    setPage(1);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">All Type Poke</Typography>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid rgba(234,88,12,0.24)",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          <PocketPokemonTypeSelect
            selectedType={selectedType}
            selectType={handleSelectType}
            options={typeQuery.data ?? []}
          />
        </Paper>

        {pokemonQuery.error ? <p>Unable to load pokemon list</p> : null}

        <PocketPokemonCardGrid
          title={selectedType ? `Type: ${selectedType}` : "All Pokemon"}
          pokemon={pokemonQuery.data?.items ?? []}
          emptyMessage="No Pokemon found for this selection."
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="text.secondary" variant="body2">
            Page {pokemonQuery.data?.page ?? 1} of{" "}
            {pokemonQuery.data ? Math.ceil(pokemonQuery.data.total / 12) : 1}
          </Typography>
          <Pagination
            count={
              pokemonQuery.data ? Math.ceil(pokemonQuery.data.total / 12) : 1
            }
            page={page}
            color="primary"
            onChange={(_event, nextPage) => setPage(nextPage)}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
