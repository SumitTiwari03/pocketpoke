import { z } from "zod";

import { prisma } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

type SelectedPokemon = {
  id: number;
  name: string;
  spriteUrl: string | null;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  height: number | null;
  weight: number | null;
  types: Array<{ name: string }>;
  abilities: Array<{ name: string }>;
};

type PokemonListItemResponse = ReturnType<typeof toPokemonListItem>;

const pokemonSelection = {
  id: true,
  name: true,
  spriteUrl: true,
  hp: true,
  attack: true,
  defense: true,
  specialAttack: true,
  specialDefense: true,
  speed: true,
  height: true,
  weight: true,
  types: {
    select: {
      name: true,
    },
  },
  abilities: {
    select: {
      name: true,
    },
  },
} as const;

function toPokemonListItem(pokemon: SelectedPokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((type) => type.name.toLowerCase()),
    sprite: pokemon.spriteUrl,
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    specialAttack: pokemon.specialAttack,
    specialDefense: pokemon.specialDefense,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    abilities: pokemon.abilities.map((ability) => ability.name),
  };
}

export const pokemonRouter = createTRPCRouter({
  getNames: publicProcedure.query(async () => {
    const names = await prisma.pokemon.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        name: true,
      },
    });

    return names.map((entry: { name: string }) => entry.name);
  }),

  getByName: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1),
      }),
    )
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findFirst({
        where: {
          name: {
            equals: input.name,
            mode: "insensitive",
          },
        },
        select: pokemonSelection,
      });

      if (!pokemon) {
        return null;
      }

      return toPokemonListItem(pokemon);
    }),

  getByNames: publicProcedure
    .input(
      z.object({
        names: z.array(z.string().trim().min(1)).min(1).max(50),
      }),
    )
    .query(async ({ input }) => {
      const names = [...new Set(input.names.map((name) => name.trim()))];

      const pokemon = await prisma.pokemon.findMany({
        where: {
          OR: names.map((name) => ({
            name: {
              equals: name,
              mode: "insensitive",
            },
          })),
        },
        select: pokemonSelection,
      });

      const byName = new Map(
        (pokemon as SelectedPokemon[]).map((entry) => [
          entry.name.toLowerCase(),
          toPokemonListItem(entry),
        ] as const),
      );

      return names
        .map((name) => byName.get(name.toLowerCase()))
        .filter((entry): entry is PokemonListItemResponse => Boolean(entry));
    }),

  getByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number().int().positive()).min(1).max(100),
      }),
    )
    .query(async ({ input }) => {
      const rows = await prisma.pokemon.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        select: pokemonSelection,
      });

      const byId = new Map((rows as SelectedPokemon[]).map((row) => [row.id, toPokemonListItem(row)]));

      return input.ids
        .map((id) => byId.get(id))
        .filter((entry): entry is PokemonListItemResponse => Boolean(entry));
    }),

  getTypes: publicProcedure.query(async () => {
    const types = await prisma.type.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        name: true,
      },
    });

    return (types as Array<{ name: string }>).map((type) => type.name.toLowerCase());
  }),

  getByType: publicProcedure
    .input(
      z.object({
        type: z.string().trim().min(1).optional(),
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(5).max(50).default(12),
      }),
    )
    .query(async ({ input }) => {
      const where = input.type
        ? {
            types: {
              some: {
                name: {
                  equals: input.type,
                  mode: "insensitive" as const,
                },
              },
            },
          }
        : undefined;

      const skip = (input.page - 1) * input.pageSize;

      const [total, rows] = await prisma.$transaction([
        prisma.pokemon.count({ where }),
        prisma.pokemon.findMany({
          where,
          skip,
          take: input.pageSize,
          orderBy: {
            pokedexNumber: "asc",
          },
          select: pokemonSelection,
        }),
      ]);

      const totalPages = Math.max(1, Math.ceil(total / input.pageSize));

      return {
        items: rows.map(toPokemonListItem),
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages,
      };
    }),
});
