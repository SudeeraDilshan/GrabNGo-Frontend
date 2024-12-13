import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './shopping-cart.services';
import { CartItem, Product } from "../types";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
    cartItems: CartItem[] = [];
    cartItemsToDisplay: { product: Product, cartItem: CartItem, selected: boolean }[] = [];
    selectedItems: CartItem[] = [];

    constructor(private cartService: CartService, private router: Router, private productService: ProductService) {
    }

    ngOnInit(): void {
        const cart = this.cartService.getCartFromSessionStorage();
        this.cartService.getCardItemsByCartId(cart.cartId).subscribe({
            next: (cartItems: any) => {
                this.cartItems = cartItems;
                console.log(this.cartItems)
                if (this.cartItems.length === 0) {
                    this.navigateToCart();
                } else {
                    this.cartItems.forEach(item => {
                        this.productService.getProductById(item.productId.toString()).subscribe(response => {
                            this.cartItemsToDisplay.push({
                                product: response.data,
                                cartItem: item,
                                selected: false
                            });
                        });
                    });
                }
            },
            error: (err) => {
                console.error('Error fetching cart items:', err);
            },
        })
    }

    // loadCartItems(): void {
    //   const storedCart = localStorage.getItem('shoppingCart');
    //   if (storedCart) {
    //     this.cartItems = JSON.parse(storedCart).map((item: any) => ({
    //       ...item,
    //       selected: false,
    //     }));
    //   }
    //
    //   // Sync with cartService
    //   this.cartService.cartItems$.subscribe((items) => {
    //     if (items.length === 0 && !storedCart) {
    //       this.navigateToCart();
    //     } else {
    //       this.cartItems = items.map((item) => ({
    //         ...item,
    //         selected: false,
    //       }));
    //     }
    //   });
    // }

    navigateToCart(): void {
        this.router.navigate(['cart']);
    }

    navigateToProductDetails(productId: string): void {
        this.router.navigate(['product', productId]);
    }

    getSelectedItems(): { product: Product, cartItem: CartItem, selected: boolean}[] {
        return this.cartItemsToDisplay.filter((item) => item.selected);
    }

    checkout(): void {
        const selectedItems = this.getSelectedItems();
        if (selectedItems.length > 0) {
            sessionStorage.setItem("SELECTED_CART_ITEMS", JSON.stringify(selectedItems));
            this.router.navigate(['/checkout-address']);
        } else {
            alert('Please select at least one product to checkout.');
        }
    }

    cancelAll(): void {
        this.cartItemsToDisplay.forEach((item) => {
            if (item.selected) {
                this.cartService.removeFromCart(item.product.productId, item.cartItem.quantity, item.cartItem.cartItemId.toString()).subscribe({
                    next: (response) => {
                        console.log(response);
                        this.cartItemsToDisplay = this.cartItemsToDisplay.filter((cartItem) => cartItem.cartItem.cartItemId !== item.cartItem.cartItemId);
                    },
                    error: (err) => {
                        console.error('Error removing item from cart:', err);
                    },
                });
            }
        });
    }
}
