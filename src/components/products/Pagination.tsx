type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
      <button
        type="button"
        className="text-sm font-medium text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-zinc-400"
        onClick={() => onChange(page - 1)}
        disabled={!canPrev}
      >
        Anterior
      </button>

      <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
        <button
          type="button"
          className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => onChange(page - 1)}
          disabled={!canPrev}
          aria-label="Página anterior"
        >
          ‹
        </button>

        <span className="text-sm text-zinc-700">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => onChange(page + 1)}
          disabled={!canNext}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>

      <button
        type="button"
        className="text-sm font-medium text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-zinc-400"
        onClick={() => onChange(page + 1)}
        disabled={!canNext}
      >
        Próxima
      </button>
    </div>
  );
}
