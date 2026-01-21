import { create } from "zustand";
import type { NewProductInput, Product } from "@/types/product";
import { createProduct, fetchProducts } from "@/lib/api/productsApi";

type ProductsState = {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  add: (input: NewProductInput) => Promise<void>;
};

export const useProductsStore = create<ProductsState>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await fetchProducts();
      set({ items, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      set({ error: message, isLoading: false });
    }
  },

  add: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const created = await createProduct(input);
      set((state) => ({ items: [created, ...state.items], isLoading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      set({ error: message, isLoading: false });
    }
  },
}));
