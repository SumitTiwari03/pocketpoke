"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { usePocketPokemonFavorites } from "@/components/providers/PocketPokemonFavoritesProvider";
import type { PocketPokemonListItem } from "@/types/pocketPokemon";

type PocketPokemonCardProps = {
  pokemon: PocketPokemonListItem;
};

function StatChip(props: { label: string; value: number }) {
  return (
    <Box
      sx={{
        px: 1.2,
        py: 0.8,
        borderRadius: 1,
        border: "1px solid rgba(249,115,22,0.24)",
        bgcolor: "rgba(255, 255, 255, 0.72)",
        minWidth: 66,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1 }}>
        {props.label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
        {props.value}
      </Typography>
    </Box>
  );
}

export function PocketPokemonCard({ pokemon }: PocketPokemonCardProps) {
  const { isFavorite, toggleFavorite } = usePocketPokemonFavorites();
  const favorite = isFavorite(pokemon.id);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderRadius: 1.5,
          border: "1px solid rgba(249,115,22,0.26)",
          boxShadow: "0 14px 22px rgba(249, 115, 22, 0.09)",
          bgcolor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent>
          <Stack spacing={1.6}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
              <Box>
                <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                  #{pokemon.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                  {pokemon.name}
                </Typography>
              </Box>
              <IconButton
                aria-label={favorite ? "remove favorite" : "add favorite"}
                onClick={() => toggleFavorite(pokemon.id)}
                size="small"
                color={favorite ? "secondary" : "default"}
                sx={{ border: "1px solid", borderColor: favorite ? "secondary.main" : "divider", borderRadius: 1 }}
              >
                <span aria-hidden="true">{favorite ? "★" : "☆"}</span>
              </IconButton>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "center", py: 0.5 }}>
              {pokemon.sprite ? <Image src={pokemon.sprite} alt={pokemon.name} width={112} height={112} /> : null}
            </Box>

            <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
              {pokemon.types.map((type) => (
                <Chip key={`${pokemon.id}-${type}`} label={type} color="primary" size="small" variant="outlined" />
              ))}
            </Stack>

            <Stack direction="row" spacing={0.9} useFlexGap flexWrap="wrap">
              <StatChip label="HP" value={pokemon.hp} />
              <StatChip label="ATK" value={pokemon.attack} />
              <StatChip label="DEF" value={pokemon.defense} />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <PocketPokemonDetailButton pokemon={pokemon} />
        </CardActions>
      </Card>
    </>
  );
}

function PocketPokemonDetailButton(props: { pokemon: PocketPokemonListItem }) {
  const { pokemon } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)} sx={{ borderRadius: 1 }} fullWidth>
        View details
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>{pokemon.name}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "center", minWidth: 128 }}>
                {pokemon.sprite ? <Image src={pokemon.sprite} alt={pokemon.name} width={128} height={128} /> : null}
              </Box>
              <Stack spacing={1.2} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {pokemon.types.map((type) => (
                    <Chip key={`${pokemon.id}-${type}-dialog`} label={type} size="small" color="primary" />
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Height: {pokemon.height ? `${pokemon.height} m` : "unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weight: {pokemon.weight ? `${pokemon.weight} kg` : "unknown"}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <StatChip label="HP" value={pokemon.hp} />
              <StatChip label="ATK" value={pokemon.attack} />
              <StatChip label="DEF" value={pokemon.defense} />
              <StatChip label="SpA" value={pokemon.specialAttack} />
              <StatChip label="SpD" value={pokemon.specialDefense} />
              <StatChip label="SPD" value={pokemon.speed} />
            </Stack>

            <Divider />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: 700 }}>
                Abilities
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {pokemon.abilities.map((ability) => (
                  <Chip key={`${pokemon.id}-${ability}`} label={ability} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
