import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Product } from '../product-admin/product-admin.component';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'http://localhost:8085/api/v1/product';

  constructor(private http: HttpClient) {}

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newProduct);
  }

  updateProduct(productId: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedProduct);
  }

  deleteProduct(productId: string, product:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, product);
  }
}
