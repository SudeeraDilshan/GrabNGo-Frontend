import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const currentCart = this.cartItemsSubject.value;
    
     
    const existingItemIndex = currentCart.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
      this.cartItemsSubject.next(updatedCart);
    } else {
       
      this.cartItemsSubject.next([
        ...currentCart, 
        { product, quantity }
      ]);
    }
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity, 
      0
    );
  }
}