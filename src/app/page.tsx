"use client";

import Image from "next/image";
import Link from "next/link";
import { Alert, Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";

import { trpc } from "@/trpc/react";

export default function Home() {
  const popularNames = ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Mewtwo"];
  const popularQuery = trpc.pokemon.getByNames.useQuery({ names: popularNames });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
      <Stack spacing={4}>
        <Stack
          spacing={2.2}
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 2,
            border: "1px solid rgba(234,88,12,0.28)",
            background: "linear-gradient(120deg, rgba(255,255,255,0.95), rgba(255,237,213,0.95))",
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: 1.2, color: "primary.main", fontWeight: 700 }}>
            Welcome Trainer
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, maxWidth: 800 }}>
            Pokedex: Discover, Search, Compare, and Favorite Pokemon
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            Browse popular Pokemon below, then jump into single search or comparison workflows.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <Button component={Link} href="/compare-poke" variant="contained" color="primary" size="large" sx={{ borderRadius: 1.25 }}>
              Compare your pokemons
            </Button>
            <Button component={Link} href="/search-poke" variant="outlined" color="primary" size="large" sx={{ borderRadius: 1.25 }}>
              Search pokemon
            </Button>
          </Stack>
        </Stack>

        <Typography variant="h4">Popular Pokemon</Typography>

        {popularQuery.isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : popularQuery.error ? (
          <Alert severity="error">Unable to load popular Pokemon right now.</Alert>
        ) : (
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {(popularQuery.data ?? []).map((pokemon) => (
              <Stack
                key={pokemon.id}
                spacing={1}
                alignItems="center"
                sx={{
                  minWidth: 130,
                  p: 1.2,
                  borderRadius: 2,
                  border: "1px solid rgba(234,88,12,0.24)",
                  bgcolor: "rgba(255,255,255,0.88)",
                }}
              >
                {pokemon.sprite ? <Image src={pokemon.sprite} alt={pokemon.name} width={90} height={90} /> : null}
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {pokemon.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
