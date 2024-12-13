import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './shopping-cart.services';
import { Product } from "../types";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product; quantity: number; selected: boolean }[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        selected: false,
      }));
    }

    this.cartService.cartItems$.subscribe((items) => {
      if (items.length === 0 && !storedCart) {
        this.navigateToCart();
      } else {
        this.cartItems = items.map((item) => ({
          ...item,
          selected: false,
        }));
      }
    });
  }

  navigateToCart(): void {
    this.router.navigate(['cart']);
  }

  navigateToProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }

  getSelectedItems(): { product: Product; quantity: number }[] {
    return this.cartItems.filter((item) => item.selected);
  }

  checkout(): void {
    const selectedItems = this.getSelectedItems();
    if (selectedItems.length > 0) {
      sessionStorage.setItem(
        'SELECTED_CART_ITEMS',
        JSON.stringify(selectedItems)
      );
      this.router.navigate(['/checkout-address']);
    } else {
      alert('Please select at least one product to checkout.');
    }
  }

  cancelAll(): void {
    const selectedItems = this.cartItems.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      selectedItems.forEach((item) => {
        this.cartService.removeFromCart(item.product.productId, item.quantity);
      });
      this.cartItems = this.cartItems.filter((item) => !item.selected);
      localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));

      if (this.cartItems.length === 0) {
        this.router.navigate(['cart']);
      }
    } else {
      alert('No items selected to remove.');
    }
  }
}
