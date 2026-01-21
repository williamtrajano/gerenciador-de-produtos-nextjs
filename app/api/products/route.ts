import { NextResponse } from "next/server";
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

export async function GET() {
  return NextResponse.json({ items: products });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<NewProductInput>;

  const name = (body.name ?? "").trim();
  const description = (body.description ?? "").trim();
  const imageUrl = (body.imageUrl ?? "").trim();
  const price = Number(body.price);

  if (!name) {
    return NextResponse.json({ message: "Nome é obrigatório." }, { status: 400 });
  }

  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json(
      { message: "Preço deve ser um número maior que zero." },
      { status: 400 }
    );
  }

  if (!description) {
    return NextResponse.json(
      { message: "Descrição é obrigatória." },
      { status: 400 }
    );
  }

  if (!imageUrl || !isValidUrl(imageUrl)) {
    return NextResponse.json(
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

  return NextResponse.json({ item: created }, { status: 201 });
}
