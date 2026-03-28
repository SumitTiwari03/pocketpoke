"use client";

import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { PocketPokemonCardGrid } from "@/components/pocketpokemon/PocketPokemonCardGrid";
import { trpc } from "@/trpc/react";

export default function PokemonComparePage() {
  const namesQuery = trpc.pokemon.getNames.useQuery();

  const [poke1, setpoke1] = useState<string | null>("Bulbasaur");
  const [poke2, setpoke2] = useState<string | null>("Charmander");
  const [submittedNames, setSubmittedNames] = useState<string[]>([
    "Bulbasaur",
    "Charmander",
  ]);

  const compareQuery = trpc.pokemon.getByNames.useQuery(
    { names: submittedNames },
    { enabled: submittedNames.length === 2 },
  );

  const compared = compareQuery.data ?? [];

  function handleCompare() {
    if (!poke1 || !poke2) return;

    console.log("compare:", poke1, poke2);
    setSubmittedNames([poke1, poke2]);
  }

  const stats =
    compared.length === 2
      ? [
          { label: "HP", left: compared[0].hp, right: compared[1].hp },
          {
            label: "Attack",
            left: compared[0].attack,
            right: compared[1].attack,
          },
          {
            label: "Defense",
            left: compared[0].defense,
            right: compared[1].defense,
          },
          {
            label: "Sp Attack",
            left: compared[0].specialAttack,
            right: compared[1].specialAttack,
          },
          {
            label: "Sp Defense",
            left: compared[0].specialDefense,
            right: compared[1].specialDefense,
          },
          { label: "Speed", left: compared[0].speed, right: compared[1].speed },
        ]
      : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={2.3}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Compare Pokemon
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 3 }}>  
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            <Autocomplete
              fullWidth
              options={namesQuery.data ?? []}
              value={poke1}
              onChange={(_, v) => setpoke1(v)}
              renderInput={(params) => <TextField {...params} label="Pokemon 1" size="small" />}
            />
            <Autocomplete
              fullWidth
              options={namesQuery.data ?? []}
              value={poke2}
              onChange={(_, v) => setpoke2(v)}
              renderInput={(params) => (
                <TextField {...params} label="Pokemon 2" size="small" />
              )}
            />
            <Button variant="contained" onClick={handleCompare}>
              <b>Compre</b>
            </Button>
          </Stack>
        </Paper>

        {compareQuery.error && (
          <Alert severity="error">Could not compare</Alert>
        )}

        <PocketPokemonCardGrid
          title="Selected Pokemon"
          pokemon={compared}
          emptyMessage="Pick two Pokemon"
        />

        {stats.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stat</TableCell>
                  <TableCell>{compared[0].name}</TableCell>
                  <TableCell>{compared[1].name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.map((s) => (
                  <TableRow key={s.label}>
                    <TableCell>{s.label}</TableCell>
                    <TableCell>{s.left}</TableCell>
                    <TableCell>{s.right}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}
