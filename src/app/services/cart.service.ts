import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartApiUrl = 'http://172.207.18.25:8085'; // Replace with your actual API endpoint

    constructor(private http: HttpClient) {
    }

    // Fetch all cart items
    getCartItems(): Observable<any[]> {
        return this.http.get<any[]>(this.cartApiUrl);
    }

    // Remove a specific item from the cart
    removeCartItem(itemId: string): Observable<any> {
        return this.http.delete(`${this.cartApiUrl}/${itemId}`);
    }

    // Add or update a cart item (if needed)
    addOrUpdateCartItem(item: any): Observable<any> {
        return this.http.post(this.cartApiUrl, item);
    }
}
