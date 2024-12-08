import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../product/product.model';  
@Injectable({
    providedIn: 'root',
  })
  export class ProductService {
    private productBackendUrl = 'http://172.104.165.74:8084';  
    private categoryBackendUrl = 'http://172.104.165.74:8086';  
  
    constructor(private http: HttpClient) {}
  
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.productBackendUrl}/products`);
    }
  
    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.categoryBackendUrl}/categories`);
    }
  }
  