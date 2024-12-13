import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Env } from "../types";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private env = environment as Env;
    private apiUrl = this.env.cartApi;

    constructor(private http: HttpClient) {
    }

    // Fetch all cart items
    getCartItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Remove a specific item from the cart
    removeCartItem(itemId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${itemId}`);
    }

    // Add or update a cart item (if needed)
    addOrUpdateCartItem(item: any): Observable<any> {
        return this.http.post(this.apiUrl, item);
    }
}
