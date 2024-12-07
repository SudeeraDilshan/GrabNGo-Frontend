export interface Product {
  
  CategoryId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  category: string; 
  imageUrl: string[];
  productQuantity: number;
  total: number;
  available:boolean;
active:boolean
}
export interface Category {
  id: number;
  name: string;
   
}