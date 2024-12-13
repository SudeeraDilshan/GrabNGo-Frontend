export interface Product {
  
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  
  productQuantity: number;
  imageUrl: string[];
  categoryId: number; 
 //  category: string; 
   
  //total: number;
  available:true;
  active:true
}

export interface Category {
  categoryName: string;
  categoryId: number;
  id: number;
  name: string;
  imageUrl: string;
   
}
export interface ProductApiResponse {
  msg: string;
  data: Product;
  status: string;
}
