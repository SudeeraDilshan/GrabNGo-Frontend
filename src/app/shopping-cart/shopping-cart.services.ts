import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, Product } from "../types";
import { HttpClient } from "@angular/common/http";

interface CartItem {
    cartItemId: number;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
    cartId: number;
    selected?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    
  clearCart(): void {
    this.cartItems$ = this.cartItemsSubject.asObservable();
    sessionStorage.removeItem('SELECTED_CART_ITEMS');  
  }
  
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();
    private apiUrl = "http://172.207.18.25:8080/api/v1/cart"

    constructor(private http: HttpClient) {

        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            this.cartItemsSubject.next(JSON.parse(storedCart));
        }
    }

    getCartItemCount(): number {
        return this.cartItemsSubject.value.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    getCardItemsByCartId(cartId: number): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.apiUrl}/${cartId}/item`);
    }

    getUserCart(userId: string): Observable<Cart> {
        return this.http.get<Cart>(`${this.apiUrl}/user/${userId}`);
    }

    storeCartInSessionStorage(cart: Cart): void {
        sessionStorage.setItem('CART', JSON.stringify(cart));
    }

    getCartFromSessionStorage(): Cart {
        const cart = sessionStorage.getItem('CART');
        return cart ? JSON.parse(cart) : [];
    }

    addToCart(product: Product, quantity: number, price: number, cartId: number): Observable<CartItem> {
        const currentCart = this.cartItemsSubject.value;
        const existingItemIndex = currentCart.findIndex(
            (item) => item.productId === product.productId
        );

        if (existingItemIndex > -1) {
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity: updatedCart[existingItemIndex].quantity + quantity,
            };
            this.cartItemsSubject.next(updatedCart);
        } else {
            this.cartItemsSubject.next([
                ...currentCart,
                {
                    cartItemId: Date.now(),
                    productId: product.productId,
                    product,
                    quantity,
                    price: product.productPrice,
                    cartId: 1,
                    selected: false,
                },
            ]);
        }

        return this.http.post<CartItem>(`${this.apiUrl}/item`, {
            productId: product.productId,
            quantity,
            price,
            cartId
        })
    }

    removeFromCart(productId: string, quantityToRemove: number, cartItemId: string): Observable<any> {
        const currentCart = this.cartItemsSubject.value;
        const existingItemIndex = currentCart.findIndex(
            (item) => item.productId === productId
        );

        if (existingItemIndex > -1) {
            const updatedCart = [...currentCart];
            const item = updatedCart[existingItemIndex];

            if (item.quantity > quantityToRemove) {
                updatedCart[existingItemIndex] = {
                    ...item,
                    quantity: item.quantity - quantityToRemove,
                };
            } else {
                updatedCart.splice(existingItemIndex, 1);
            }

            this.cartItemsSubject.next(updatedCart);

            localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
        }

        return this.http.delete(`${this.apiUrl}/item/${cartItemId}`);
    }
}
