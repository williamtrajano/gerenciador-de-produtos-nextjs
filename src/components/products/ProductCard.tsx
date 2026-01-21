import Image from "next/image";
import type { Product } from "@/types/product";
import { formatBRL } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] w-full bg-zinc-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">
            {product.name}
          </h3>
          <span className="shrink-0 text-xs font-medium text-zinc-500">
            {product.category}
          </span>
        </div>

        <p className="text-sm font-semibold text-zinc-900">
          {formatBRL(product.price)}
        </p>

        <p className="line-clamp-3 text-sm text-zinc-600">{product.description}</p>
      </div>
    </article>
  );
}
