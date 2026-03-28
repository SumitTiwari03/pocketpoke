"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export type PocketPokemonTypeSelectProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  options: string[];
};

export function PocketPokemonTypeSelect({
  selectedType,
  selectType,
  options,
}: PocketPokemonTypeSelectProps) {
  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 1.5,
          backgroundColor: "rgba(255,255,255,0.68)",
          "& fieldset": {
            borderColor: "rgba(234,88,12,0.3)",
          },
        },
      }}
    >
      <InputLabel id="pocketpokemon-type-label">Pokemon Type</InputLabel>
      <Select
        labelId="pocketpokemon-type-label"
        value={selectedType ?? ""}
        label="Pokemon Type"
        onChange={(event) => selectType(event.target.value || undefined)}
      >
        <MenuItem value="">All types</MenuItem>
        {options.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
