import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product-admin/product-admin.component';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private apiUrl = "http://172.207.18.25:8080/api/v1/product";

    constructor(private http: HttpClient) {
    }

    getProductById(productId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${productId}`);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}`);
    }

    addProduct(newProduct: FormData): Observable<any> {
        return this.http.post<any>(this.apiUrl, newProduct, {
            headers: {
                'enctype': 'multipart/form-data',
            },
        });
    }

    updateProduct(productId: string, updatedProduct: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedProduct);
    }

    deleteProduct(productId: string, product: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${productId}`, product);
    }
}
