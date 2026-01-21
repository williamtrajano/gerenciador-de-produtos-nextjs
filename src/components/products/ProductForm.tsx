"use client";

import { useMemo, useState } from "react";
import type { NewProductInput } from "@/types/product";
import { formatBRL } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Props = {
  isSubmitting: boolean;
  onSubmit: (input: NewProductInput) => Promise<void>;
};

export function ProductForm({ isSubmitting, onSubmit }: Props) {
  const [name, setName] = useState("");
  // Armazena apenas dígitos (centavos). Ex.: "1234" => R$ 12,34
  const [priceDigits, setPriceDigits] = useState<string>("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const priceNumber = useMemo(() => {
    if (!priceDigits) return NaN;
    const cents = Number(priceDigits);
    if (!Number.isFinite(cents)) return NaN;
    return cents / 100;
  }, [priceDigits]);

  const priceDisplay = useMemo(() => {
    if (!priceDigits) return "";
    if (!Number.isFinite(priceNumber)) return "";
    return formatBRL(priceNumber);
  }, [priceDigits, priceNumber]);

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) return false;
    if (!description.trim()) return false;
    if (!imageUrl.trim()) return false;
    return true;
  }, [name, priceNumber, description, imageUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canSubmit) return;

    await onSubmit({
      name: name.trim(),
      price: priceNumber,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });

    setName("");
    setPriceDigits("");
    setDescription("");
    setImageUrl("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900">
          Cadastrar produto
        </h2>
        <span className="text-xs text-zinc-500">* obrigatório</span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input
          label="Nome *"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Notebook"
        />

        <Input
          label="Preço (R$) *"
          name="price"
          inputMode="numeric"
          autoComplete="off"
          value={priceDisplay}
          onKeyDown={(e) => {
            // Permite navegação/edição e atalhos
            if (e.ctrlKey || e.metaKey) return;

            const allowedKeys = new Set([
              "Backspace",
              "Delete",
              "Tab",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
            ]);
            if (allowedKeys.has(e.key)) return;

            // Aceita somente dígitos
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setPriceDigits(digitsOnly);
          }}
          placeholder="Ex: R$ 1.999,90"
        />

        <div className="md:col-span-2">
          <Textarea
            label="Descrição *"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o produto..."
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="URL da Imagem *"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
