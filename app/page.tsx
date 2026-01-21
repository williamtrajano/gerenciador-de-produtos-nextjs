"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Pagination } from "@/components/products/Pagination";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductsToolbar } from "@/components/products/ProductsToolbar";
import { clampPage } from "@/lib/pagination";
import { parseSortValue } from "@/lib/sort";
import type { Product } from "@/types/product";
import { useProductsStore } from "@/store/productsStore";

function applyFiltersAndSort(
  items: Product[],
  {
    search,
    minPrice,
    maxPrice,
    sort,
  }: { search: string; minPrice: string; maxPrice: string; sort: string }
): Product[] {
  const q = search.trim().toLowerCase();

  const min = minPrice.trim() ? Number(minPrice) : null;
  const max = maxPrice.trim() ? Number(maxPrice) : null;

  const filtered = items.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (min !== null && Number.isFinite(min) && p.price < min) return false;
    if (max !== null && Number.isFinite(max) && p.price > max) return false;
    return true;
  });

  const { key, direction } = parseSortValue(sort);
  const dir = direction === "asc" ? 1 : -1;

  const sorted = [...filtered].sort((a, b) => {
    if (key === "createdAt") return a.createdAt.localeCompare(b.createdAt) * dir;
    if (key === "price") return (a.price - b.price) * dir;
    if (key === "category") return a.category.localeCompare(b.category) * dir;
    return a.name.localeCompare(b.name) * dir;
  });

  return sorted;
}

export default function Home() {
  const items = useProductsStore((s) => s.items);
  const isLoading = useProductsStore((s) => s.isLoading);
  const error = useProductsStore((s) => s.error);
  const fetchAll = useProductsStore((s) => s.fetchAll);
  const add = useProductsStore((s) => s.add);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const processed = useMemo(() => {
    return applyFiltersAndSort(items, { search, minPrice, maxPrice, sort });
  }, [items, search, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const safePage = clampPage(page, totalPages);

  useEffect(() => {
    if (safePage !== page) setPage(safePage);
  }, [page, safePage]);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return processed.slice(start, start + pageSize);
  }, [processed, safePage]);

  function resetToFirstPage() {
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Gerenciador de Produtos
            </h1>
            <p className="text-sm text-zinc-600">
              Next.js + TypeScript + Zustand + MSW + Tailwind
            </p>
          </div>

          <div className="hidden text-right text-sm text-zinc-600 sm:block">
            <div>
              Itens: <strong className="text-zinc-900">{processed.length}</strong>
            </div>
            <div>
              Página: <strong className="text-zinc-900">{safePage}</strong> /{" "}
              <strong className="text-zinc-900">{totalPages}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-1">
          <ProductForm
            isSubmitting={isLoading}
            onSubmit={async (input) => {
              await add(input);
              resetToFirstPage();
            }}
          />

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          ) : null}
        </section>

        <section className="space-y-4 lg:col-span-2">
          <ProductsToolbar
            search={search}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sort={sort}
            onSearchChange={(v) => {
              setSearch(v);
              resetToFirstPage();
            }}
            onMinPriceChange={(v) => {
              setMinPrice(v);
              resetToFirstPage();
            }}
            onMaxPriceChange={(v) => {
              setMaxPrice(v);
              resetToFirstPage();
            }}
            onSortChange={(v) => {
              setSort(v);
              resetToFirstPage();
            }}
          />

          {isLoading && items.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
              Carregando produtos...
            </div>
          ) : null}

          {!isLoading && processed.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-600">
              Nenhum produto encontrado para os filtros atuais.
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
          />
        </section>
      </main>
    </div>
  );
}
