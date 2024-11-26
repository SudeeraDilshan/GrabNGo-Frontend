import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8085'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get product by ID
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  // Add product
  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newProduct);
  }

  // Update product
  updateProduct(productId: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedProduct);
  }
}
