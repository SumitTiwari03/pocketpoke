"use client";

import Link from "next/link";
import { AppBar, Box, Button, Chip, Container, Toolbar, Typography } from "@mui/material";

const links = [
  { href: "/", label: "Home" },
  { href: "/search-poke", label: "Search Poke" },
  { href: "/compare-poke", label: "Compare Poke" },
  { href: "/all-type-poke", label: "All Type Poke" },
  { href: "/fav", label: "Fav" },
];

export function PocketPokemonNav() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(13,148,136,0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, justifyContent: "space-between", py: 0.6 }}>
          <Box sx={{ display: "flex", gap: 1.25, alignItems: "center" }}>
            <Typography variant="h6" sx={{ letterSpacing: 0.8, fontWeight: 800 }}>
              PocketPokemon
            </Typography>
            <Chip label="Pokedex" size="small" color="primary" variant="outlined" />
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {links.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color="inherit"
                size="small"
                sx={{ borderRadius: 1.25, border: "1px solid transparent", "&:hover": { borderColor: "rgba(234,88,12,0.3)" } }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
