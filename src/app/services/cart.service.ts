import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addToCart(product: Product, quantity: number) {
    throw new Error('Method not implemented.');
  }
  private cartApiUrl = 'https://example.com/api/cart'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

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
