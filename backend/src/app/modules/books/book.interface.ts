export interface IBook {
  title: string;
  author: string;
  price: number;
  category: 'FICTION' | 'NON-FICTION' | 'SCIENCE' | 'TECHNOLOGY';
  image: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
