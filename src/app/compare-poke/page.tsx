"use client";

import { useMemo, useState } from "react";
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
import type { PocketPokemonListItem } from "@/types/pocketPokemon";
import { trpc } from "@/trpc/react";

export default function ComparePokePage() {
  const namesQuery = trpc.pokemon.getNames.useQuery();

  const [leftName, setLeftName] = useState<string | null>("Bulbasaur");
  const [rightName, setRightName] = useState<string | null>("Charmander");
  const [submittedNames, setSubmittedNames] = useState<string[]>(["Bulbasaur", "Charmander"]);

  const compareQuery = trpc.pokemon.getByNames.useQuery(
    { names: submittedNames },
    {
      enabled: submittedNames.length === 2,
    },
  );

  const compared = useMemo(() => (compareQuery.data ?? []) as PocketPokemonListItem[], [compareQuery.data]);

  function handleCompare() {
    if (!leftName || !rightName) {
      return;
    }

    setSubmittedNames([leftName, rightName]);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">Compare Poke</Typography>

        <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid rgba(234,88,12,0.24)", background: "rgba(255,255,255,0.9)" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.2} alignItems={{ xs: "stretch", md: "center" }}>
            <Autocomplete
              fullWidth
              options={namesQuery.data ?? []}
              value={leftName}
              onChange={(_event, value) => setLeftName(value)}
              renderInput={(params) => <TextField {...params} label="Pokemon 1" placeholder="Search pokemon" />}
            />
            <Autocomplete
              fullWidth
              options={namesQuery.data ?? []}
              value={rightName}
              onChange={(_event, value) => setRightName(value)}
              renderInput={(params) => <TextField {...params} label="Pokemon 2" placeholder="Search pokemon" />}
            />
            <Button variant="contained" color="primary" onClick={handleCompare} sx={{ borderRadius: 1.25 }}>
              Compare
            </Button>
          </Stack>
        </Paper>

        {compareQuery.error ? <Alert severity="error">Could not compare selected Pokemon.</Alert> : null}

        <PocketPokemonCardGrid
          title="Selected Pokemon"
          pokemon={compared}
          emptyMessage="Choose two Pokemon and click compare."
        />

        {compared.length === 2 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2, border: "1px solid rgba(234,88,12,0.24)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stat</TableCell>
                  <TableCell>{compared[0].name}</TableCell>
                  <TableCell>{compared[1].name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["HP", compared[0].hp, compared[1].hp],
                  ["Attack", compared[0].attack, compared[1].attack],
                  ["Defense", compared[0].defense, compared[1].defense],
                  ["Sp. Attack", compared[0].specialAttack, compared[1].specialAttack],
                  ["Sp. Defense", compared[0].specialDefense, compared[1].specialDefense],
                  ["Speed", compared[0].speed, compared[1].speed],
                ].map(([label, left, right]) => (
                  <TableRow key={String(label)}>
                    <TableCell sx={{ fontWeight: 700 }}>{label}</TableCell>
                    <TableCell sx={{ color: Number(left) >= Number(right) ? "primary.main" : "text.primary", fontWeight: 700 }}>
                      {left}
                    </TableCell>
                    <TableCell sx={{ color: Number(right) >= Number(left) ? "primary.main" : "text.primary", fontWeight: 700 }}>
                      {right}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Stack>
    </Container>
  );
}
