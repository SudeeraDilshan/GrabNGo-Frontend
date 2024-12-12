import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from '../product/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private productBackendUrl = 'http://172.207.18.25:8084';
    private categoryBackendUrl = 'http://172.207.18.25:8086';

    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.productBackendUrl}/products`);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.categoryBackendUrl}/categories`);
    }
}
  