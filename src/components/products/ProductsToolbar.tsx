"use client";

import { Input } from "@/components/ui/Input";
import { sortOptions } from "@/lib/sort";

type Props = {
  search: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function ProductsToolbar({
  search,
  minPrice,
  maxPrice,
  sort,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
}: Props) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Input
          label="Buscar por nome"
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Digite para filtrar..."
        />

        <Input
          label="Preço mínimo"
          name="minPrice"
          inputMode="decimal"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          placeholder="Ex: 100"
        />

        <Input
          label="Preço máximo"
          name="maxPrice"
          inputMode="decimal"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          placeholder="Ex: 1000"
        />

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-700">
            Ordenação
          </span>
          <select
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
