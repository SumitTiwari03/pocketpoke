import { PrismaClient } from "@prisma/client";
import pokemonData from "./data/pokemon.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  for (const poke of pokemonData) {
    const types = poke.types?.connectOrCreate?.map((t: any) => ({
      where: { name: t.create?.name },
      create: { name: t.create?.name },
    })) || [];

    const abilities = poke.abilities?.connectOrCreate?.map((a: any) => ({
      where: { name: a.create?.name },
      create: { name: a.create?.name },
    })) || [];

    const baseTotal =
      poke.hp +
      poke.attack +
      poke.defense +
      poke.specialAttack +
      poke.specialDefense +
      poke.speed;

    console.log("Adding:", poke.name); 

    await prisma.pokemon.upsert({
      where: { pokedexNumber: poke.pokedexNumber },
      update: {
        hp: poke.hp,
        attack: poke.attack,
        defense: poke.defense,
      },
      create: {
        pokedexNumber: poke.pokedexNumber,
        name: poke.name,
        generation: poke.generation,
        isLegendary: poke.isLegendary ?? false,

        spriteUrl: poke.spriteUrl ?? null,

        hp: poke.hp,
        attack: poke.attack,
        defense: poke.defense,
        specialAttack: poke.specialAttack,
        specialDefense: poke.specialDefense,
        speed: poke.speed,

        height: poke.height ?? null,
        weight: poke.weight ?? null,
        baseTotal,

        types: {
          connectOrCreate: types,
        },

        abilities: {
          connectOrCreate: abilities,
        },
      },
    });
  }

  console.log("Done seeding");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });