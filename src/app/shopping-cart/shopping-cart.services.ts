import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from "../types";

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
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();
    private apiUrl = "http://172.207.18.25:8080/api/v1/cart"

  constructor() {

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

  addToCart(product: Product, quantity: number = 1): void {
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

   
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItemsSubject.value));
  }

  removeFromCart(productId: string, quantityToRemove: number = 1): void {
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
  }
}
