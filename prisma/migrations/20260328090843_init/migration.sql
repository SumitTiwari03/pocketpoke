/*
  Warnings:

  - You are about to drop the column `sprite` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `Pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pokedexNumber]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generation` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokedexNumber` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialAttack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialDefense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pokemon_name_key";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "sprite",
DROP COLUMN "types",
ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "baseTotal" INTEGER,
ADD COLUMN     "classification" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "generation" INTEGER NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "hp" INTEGER NOT NULL,
ADD COLUMN     "isLegendary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pokedexNumber" INTEGER NOT NULL,
ADD COLUMN     "specialAttack" INTEGER NOT NULL,
ADD COLUMN     "specialDefense" INTEGER NOT NULL,
ADD COLUMN     "speed" INTEGER NOT NULL,
ADD COLUMN     "spriteUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Effectiveness" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "againstBug" DOUBLE PRECISION,
    "againstDark" DOUBLE PRECISION,
    "againstDragon" DOUBLE PRECISION,
    "againstElectric" DOUBLE PRECISION,
    "againstFairy" DOUBLE PRECISION,
    "againstFight" DOUBLE PRECISION,
    "againstFire" DOUBLE PRECISION,
    "againstFlying" DOUBLE PRECISION,
    "againstGhost" DOUBLE PRECISION,
    "againstGrass" DOUBLE PRECISION,
    "againstGround" DOUBLE PRECISION,
    "againstIce" DOUBLE PRECISION,
    "againstNormal" DOUBLE PRECISION,
    "againstPoison" DOUBLE PRECISION,
    "againstPsychic" DOUBLE PRECISION,
    "againstRock" DOUBLE PRECISION,
    "againstSteel" DOUBLE PRECISION,
    "againstWater" DOUBLE PRECISION,

    CONSTRAINT "Effectiveness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilityToPokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "Ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Effectiveness_pokemonId_key" ON "Effectiveness"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToType_AB_unique" ON "_PokemonToType"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToType_B_index" ON "_PokemonToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToPokemon_AB_unique" ON "_AbilityToPokemon"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToPokemon_B_index" ON "_AbilityToPokemon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_pokedexNumber_key" ON "Pokemon"("pokedexNumber");

-- CreateIndex
CREATE INDEX "Pokemon_name_idx" ON "Pokemon"("name");

-- AddForeignKey
ALTER TABLE "Effectiveness" ADD CONSTRAINT "Effectiveness_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToPokemon" ADD CONSTRAINT "_AbilityToPokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToPokemon" ADD CONSTRAINT "_AbilityToPokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
