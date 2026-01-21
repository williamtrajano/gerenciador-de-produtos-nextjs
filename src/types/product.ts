export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export type NewProductInput = {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};
