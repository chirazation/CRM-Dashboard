// components/tunisiaselect.tsx
'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React from "react"

type Props = {
  value?: string
  onChange: (value: string) => void
}

export const TunisiaGovernorateSelect: React.FC<Props> = ({ value, onChange }) => {
  const governorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
    "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Kairouan",
    "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax",
    "Gafsa", "Tozeur", "Kebili", "Gabès", "Médenine", "Tataouine",
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2">
        <SelectValue placeholder="Select a governorate" />
      </SelectTrigger>
      <SelectContent>
        {governorates.map((gov) => (
          <SelectItem key={gov} value={gov}>
            {gov}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
