export interface IBook {
  image: string;
  name: string;
  price: number;
  category: 'FICTION' | 'NON-FICTION' | 'SCIENCE' | 'TECHNOLOGY';
  model: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
