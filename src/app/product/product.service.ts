// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Product } from './product.model'; 
// @Injectable({
//     providedIn: 'root'
//   })
//   export class ProductService {
  
//     private apiUrl = '';
  
//     constructor(private http: HttpClient) { }
  
//     getProduct(id: number): Observable<Product> {
//       return this.http.get<Product>(`${this.apiUrl}/${id}`);

//     }
//   }
// exsist
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addProductToCart(product: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://backend-api-url/products';  

  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
