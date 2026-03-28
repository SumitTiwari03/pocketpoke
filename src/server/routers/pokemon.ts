import { z } from "zod";
import { prisma } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const pokemonRouter = createTRPCRouter({
  // 🔹 get all names
  getNames: publicProcedure.query(async () => {
    const rows = await prisma.pokemon.findMany({
      orderBy: { name: "asc" },
      select: { name: true },
    });

    return rows.map((r) => r.name);
  }),

  // 🔹 single pokemon
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findFirst({
        where: {
          name: {
            equals: input.name,
            mode: "insensitive",
          },
        },
        include: {
          types: true,
          abilities: true,
        },
      });

      if (!pokemon) return null;

      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.spriteUrl,
        types: pokemon.types.map((t) => t.name),
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        specialAttack: pokemon.specialAttack,
        specialDefense: pokemon.specialDefense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities.map((a) => a.name),
      };
    }),

  // 🔹 multiple pokemon
  getByNames: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ input }) => {
      const rows = await prisma.pokemon.findMany({
        where: {
          name: {
            in: input.names,
          },
        },
        include: {
          types: true,
          abilities: true,
        },
      });

      return rows.map((p) => ({
        id: p.id,
        name: p.name,
        sprite: p.spriteUrl,
        types: p.types.map((t) => t.name),
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        abilities: p.abilities.map((a) => a.name),
      }));
    }),

  // 🔹 favorites by ids
  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const rows = await prisma.pokemon.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        include: {
          types: true,
          abilities: true,
        },
      });

      return rows.map((p) => ({
        id: p.id,
        name: p.name,
        sprite: p.spriteUrl,
        types: p.types.map((t) => t.name),
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        abilities: p.abilities.map((a) => a.name),
      }));
    }),

  // 🔹 all types
  getTypes: publicProcedure.query(async () => {
    const rows = await prisma.type.findMany({
      orderBy: { name: "asc" },
      select: { name: true },
    });

    return rows.map((t) => t.name.toLowerCase());
  }),

  // 🔹 filter + pagination
  getByType: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        page: z.number().default(1),
        pageSize: z.number().default(12),
      })
    )
    .query(async ({ input }) => {
      const skip = (input.page - 1) * input.pageSize;

      const where = input.type
        ? {
            types: {
              some: {
                name: input.type,
              },
            },
          }
        : {};

      const total = await prisma.pokemon.count({ where });

      const rows = await prisma.pokemon.findMany({
        where,
        skip,
        take: input.pageSize,
        include: {
          types: true,
          abilities: true,
        },
        orderBy: {
          pokedexNumber: "asc",
        },
      });

      return {
        items: rows.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.spriteUrl,
          types: p.types.map((t) => t.name),
          hp: p.hp,
          attack: p.attack,
          defense: p.defense,
          specialAttack: p.specialAttack,
          specialDefense: p.specialDefense,
          speed: p.speed,
          height: p.height,
          weight: p.weight,
          abilities: p.abilities.map((a) => a.name),
        })),
        total,
        page: input.page,
      };
    }),
});