import type { NewProductInput, Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products", {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Falha ao buscar produtos (${response.status})`);
  }

  const data = (await response.json()) as { items: Product[] };
  return data.items;
}

export async function createProduct(
  input: NewProductInput
): Promise<Product> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const maybe = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    const message = maybe?.message ?? "Falha ao cadastrar produto";
    throw new Error(message);
  }

  const data = (await response.json()) as { item: Product };
  return data.item;
}
