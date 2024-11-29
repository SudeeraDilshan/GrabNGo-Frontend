export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  colors: string[]; 
  sizes: string[];
  images: string[]; 
  modelHeight?: number; 
}
