export type PocketPokemonListItem = {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  height: number | null;
  weight: number | null;
  abilities: string[];
};
