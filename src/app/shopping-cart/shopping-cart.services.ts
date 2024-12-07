import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<{ product: Product; quantity: number }[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private baseUrl = 'http://172.104.165.74:8085/api/v1/cart';

  constructor(private http: HttpClient) {}

  addToCart(product: Product, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((item) => item.product.productId === product.productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value.filter(
      (item) => item.product.productId !== productId || item.quantity > quantity
    );

    this.cartItemsSubject.next(currentItems);
  }

  sendCartToBackend(cartItems: { product: Product; quantity: number }[]): Observable<any> {
    const payload = cartItems.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
    }));

    return this.http.post(`${this.baseUrl}/cart`, payload);
  }
}
