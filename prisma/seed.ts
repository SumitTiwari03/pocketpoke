import { PrismaClient } from '@prisma/client'
import pokemonData from './data/pokemon.json'

const prisma = new PrismaClient()

type ConnectOrCreateItem = {
  where?: { name?: string }
  create?: { name?: string }
}

function normalizeConnectOrCreate(input: unknown) {
  if (!Array.isArray(input)) {
    return []
  }

  return input
    .map((item) => {
      const entry = item as ConnectOrCreateItem
      const name = entry.create?.name ?? entry.where?.name

      if (!name) {
        return null
      }

      return {
        where: { name },
        create: { name }
      }
    })
    .filter((item): item is { where: { name: string }; create: { name: string } } => item !== null)
}

async function main() {
  console.log('Start seeding...')

  for (const p of pokemonData) {
    const types = normalizeConnectOrCreate((p as { types?: { connectOrCreate?: unknown[] } }).types?.connectOrCreate)

    const abilities = normalizeConnectOrCreate((p as { abilities?: { connectOrCreate?: unknown[] } }).abilities?.connectOrCreate)

    const baseTotal =
      p.hp +
      p.attack +
      p.defense +
      p.specialAttack +
      p.specialDefense +
      p.speed

    await prisma.pokemon.upsert({
      where: { pokedexNumber: p.pokedexNumber },
      update: {
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
        height: p.height ?? null,
        weight: p.weight ?? null,
        baseTotal,
        types: {
          connectOrCreate: types
        },
        abilities: {
          connectOrCreate: abilities
        }
      },
      create: {
        pokedexNumber: p.pokedexNumber,
        name: p.name,
        classification: p.classification ?? null,
        generation: p.generation,
        isLegendary: p.isLegendary ?? false,

        spriteUrl: p.spriteUrl ?? null,

        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,

        height: p.height ?? null,
        weight: p.weight ?? null,
        baseTotal,

        types: {
          connectOrCreate: types
        },

        abilities: {
          connectOrCreate: abilities
        }
      }
    })
  }

  console.log('Seeding complete.')
}

main()
.catch((e) => {
console.error(e)
})
.finally(async () => {
await prisma.$disconnect()
})
