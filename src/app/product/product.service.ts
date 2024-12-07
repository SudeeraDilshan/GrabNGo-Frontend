// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { Product } from './product.model'; 
// // @Injectable({
// //     providedIn: 'root'
// //   })
// //   export class ProductService {
  
// //     private apiUrl = '';
  
// //     constructor(private http: HttpClient) { }
  
// //     getProduct(id: number): Observable<Product> {
// //       return this.http.get<Product>(`${this.apiUrl}/${id}`);

// //     }
// //   }
// // exsist
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  fetchProductDetails(productId: number) {
    throw new Error('Method not implemented.');
  }
  getProducts() {
    throw new Error('Method not implemented.');
  }
  addProductToCart(product: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://backend-api-url/products';  

  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
 export { Product };

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Product } from './product.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   private baseUrl = 'http://172.104.165.74:8084';  

//   constructor(private http: HttpClient) {}

//   getProductById(productId: number): Observable<Product> {
//     return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
//   }
// }
