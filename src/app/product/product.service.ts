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
  getCategories() {
    throw new Error('Method not implemented.');
  }
  getProduct(id: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://172.104.165.74:8084/api/v1/product';   

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}

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
