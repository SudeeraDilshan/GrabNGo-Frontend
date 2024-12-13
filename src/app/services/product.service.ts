import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Product } from "../types";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private apiUrl = "http://172.207.18.25:8080/api/v1/product";

    constructor(private http: HttpClient) {
    }

    getProductById(productId: string): Observable<ApiResponse<Product>> {
        return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${productId}`);
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
        console.log("Payload for update:", JSON.stringify(updatedProduct));
        return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedProduct, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    

    deleteProduct(productId: string, product: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${productId}`, product);
    }
}
