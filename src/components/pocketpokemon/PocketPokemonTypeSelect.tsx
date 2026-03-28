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
    <FormControl fullWidth size="small">
      <InputLabel id="type-label">Type</InputLabel>

      <Select
        labelId="type-label"
        value={selectedType ?? ""}
        label="Type"
        onChange={(e) => selectType(e.target.value || undefined)}
      >
        <MenuItem value="">all</MenuItem>

        {options.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}