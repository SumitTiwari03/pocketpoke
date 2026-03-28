"use client";

import { FormEvent, useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { trpc } from "@/trpc/react";

export default function PokemonSearchPage() {
  const [input, setInput] = useState("Bulbasaur");
  const [submittedName, setSubmittedName] = useState("Bulbasaur");

  const pokemonQuery = trpc.pokemon.getByName.useQuery(
    { name: submittedName },
    { enabled: submittedName.length > 0 }
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("search:", input);
    setSubmittedName(input.trim());
  }

  const data = pokemonQuery.data ? [pokemonQuery.data] : [];

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 1 }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Search Pokemon
        </Typography>

        <Paper component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              fullWidth
              label="Pokemon"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="bulbasaur"
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Search
            </Button>
          </Stack>
        </Paper>

        {pokemonQuery.error && (
          <Alert severity="error">error fetching pokemon</Alert>
        )}

        <PocketPokemonCardGrid
          pokemon={data}
          emptyMessage="no pokemon found"
        />
      </Stack>
    </Container>
  );
}