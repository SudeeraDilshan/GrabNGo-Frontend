import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/product.model';

interface CartItem {
  cartItemId:number;
  productId:number;
  product:Product;
  quantity: number;
  price:number;
  cartId:number;

  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  sendCartToBackend(selectedItems: { product: Product; quantity: number; }[]) {
    throw new Error('Method not implemented.');
  }
  getCartItems() {
    throw new Error('Method not implemented.');
  }
  clearCart() {
    throw new Error('Method not implemented.');
  }
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const currentCart = this.cartItemsSubject.value;
     
    const existingItemIndex = currentCart.findIndex(
      item => item.productId === product.productId
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
        { cartItemId: Date.now(),  
          productId: product.productId, 
          product,   
          quantity, 
          price: product.productPrice, 
          cartId: 1 }
      ]);
    }
  }

  removeFromCart(productId: number, quantityToRemove: number = 1): void {
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
    }
  }


  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity, 
      0
    );
  }
}