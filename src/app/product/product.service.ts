import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
interface ProductApiResponse {
  msg: string;
  data: Product;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://172.104.165.74:8084/api/v1/product';

  constructor(private http: HttpClient) {}

  getProductById(productId: number): Observable<Product> {
    return this.http.get<ProductApiResponse>(`${this.apiUrl}/${productId}`).pipe(
      map((response) => response.data)  
    );
  }
}
