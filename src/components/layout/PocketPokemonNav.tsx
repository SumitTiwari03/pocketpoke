"use client";

import Link from "next/link";
import { AppBar, Box,Chip, Button, Container, Toolbar, Typography } from "@mui/material";

const links = [
  { href: "/", label: "Home" },
  { href: "/search-poke", label: "Search" },
  { href: "/compare-poke", label: "Compare" },
  { href: "/all-type-poke", label: "Types" },
  { href: "/fav", label: "Fav" },
];

export function PocketPokemonNav() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
          <Chip label="Pokedex" size="small" color="primary" variant="outlined" />
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {links.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                size="small"
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