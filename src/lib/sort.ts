export type SortKey = 'name' | 'price' | 'category' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export type SortOption = {
  key: SortKey;
  direction: SortDirection;
};

export const sortOptions: Array<{ value: string; label: string; option: SortOption }> = [
  { value: 'createdAt:desc', label: 'Mais recentes', option: { key: 'createdAt', direction: 'desc' } },
  { value: 'createdAt:asc', label: 'Mais antigos', option: { key: 'createdAt', direction: 'asc' } },
  { value: 'name:asc', label: 'Nome (A–Z)', option: { key: 'name', direction: 'asc' } },
  { value: 'name:desc', label: 'Nome (Z–A)', option: { key: 'name', direction: 'desc' } },
  { value: 'price:asc', label: 'Preço (menor → maior)', option: { key: 'price', direction: 'asc' } },
  { value: 'price:desc', label: 'Preço (maior → menor)', option: { key: 'price', direction: 'desc' } },
  { value: 'category:asc', label: 'Categoria (A–Z)', option: { key: 'category', direction: 'asc' } },
];

export function parseSortValue(value: string): SortOption {
  const [key, direction] = value.split(':');
  if (
    (key === 'name' || key === 'price' || key === 'category' || key === 'createdAt') &&
    (direction === 'asc' || direction === 'desc')
  ) {
    return { key, direction };
  }
  return { key: 'name', direction: 'asc' };
}
