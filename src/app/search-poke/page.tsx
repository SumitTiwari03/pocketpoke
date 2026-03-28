"use client";

import { FormEvent, useMemo, useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { trpc } from "@/trpc/react";

export default function SearchPokePage() {
  const [input, setInput] = useState("Bulbasaur");
  const [submittedName, setSubmittedName] = useState("Bulbasaur");

  const pokemonQuery = trpc.pokemon.getByName.useQuery(
    { name: submittedName },
    {
      enabled: submittedName.length > 0,
    },
  );

  const singlePokemon = useMemo(() => (pokemonQuery.data ? [pokemonQuery.data] : []), [pokemonQuery.data]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmittedName(input.trim());
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">Search Poke</Typography>
        <Paper
          component="form"
          onSubmit={onSubmit}
          sx={{ p: 2, borderRadius: 2, border: "1px solid rgba(234,88,12,0.24)", background: "rgba(255,255,255,0.9)" }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <TextField
              fullWidth
              label="Pokemon Name"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Bulbasaur"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 1.25 }}>
              Search
            </Button>
          </Stack>
        </Paper>

        {pokemonQuery.error ? (
          <Alert severity="error">Unable to fetch Pokemon.</Alert>
        ) : (
          <PocketPokemonCardGrid pokemon={singlePokemon} emptyMessage="No Pokemon found with that name." />
        )}
      </Stack>
    </Container>
  );
}
