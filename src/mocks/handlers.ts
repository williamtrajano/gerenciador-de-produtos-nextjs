import { http, HttpResponse, delay } from "msw";
import type { NewProductInput, Product } from "@/types/product";
import { seedProducts } from "@/mocks/seed";

let products: Product[] = [...seedProducts];

function isValidUrl(value: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export const handlers = [
  http.get("/api/products", async () => {
    await delay(150);
    return HttpResponse.json({ items: products });
  }),

  http.post("/api/products", async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as Partial<NewProductInput>;

    const name = (body.name ?? "").trim();
    const description = (body.description ?? "").trim();
    const imageUrl = (body.imageUrl ?? "").trim();
    const price = Number(body.price);

    if (!name) {
      return HttpResponse.json(
        { message: "Nome é obrigatório." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return HttpResponse.json(
        { message: "Preço deve ser um número maior que zero." },
        { status: 400 }
      );
    }

    if (!description) {
      return HttpResponse.json(
        { message: "Descrição é obrigatória." },
        { status: 400 }
      );
    }

    if (!imageUrl || !isValidUrl(imageUrl)) {
      return HttpResponse.json(
        { message: "URL da imagem inválida." },
        { status: 400 }
      );
    }

    const created: Product = {
      id: `p_${Math.random().toString(16).slice(2)}`,
      name,
      category: "Personalizado",
      price,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    products = [created, ...products];

    return HttpResponse.json({ item: created }, { status: 201 });
  }),
];
