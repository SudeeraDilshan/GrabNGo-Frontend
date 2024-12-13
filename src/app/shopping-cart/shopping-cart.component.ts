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

    constructor(private cartService: CartService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadCartItems();
    }

    loadCartItems(): void {
        this.cartService.cartItems$.subscribe((items) => {
            if (items.length === 0) {
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


    navigateToProductDetails(productId: number): void {
        this.router.navigate(['product', productId]);
    }


    getSelectedItems(): { product: Product; quantity: number }[] {
        return this.cartItems.filter((item) => item.selected);
    }


    checkout(): void {
        const selectedItems = this.getSelectedItems();
        if (selectedItems.length > 0) {
            alert(
                'Proceeding to checkout with the following items:\n' +
                selectedItems
                    .map((item) => `${item.product.productName} (x${item.quantity})`)
                    .join('\n')
            );

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

            if (this.cartItems.length === 0) {
                this.router.navigate(['cart']);
            }
        } else {
            alert('No items selected to remove.');
        }
    }

    getTotalPrice(item: { product: Product; quantity: number }): number {
        return item.product.productPrice * item.quantity;
    }
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from '../cart/cart.services';
// import { Product } from '../product/product.model';

// @Component({
//   selector: 'app-shopping-cart',
//   templateUrl: './shopping-cart.component.html',
//   styleUrls: ['./shopping-cart.component.css'],
// })
// export class ShoppingCartComponent implements OnInit {
//   cartItems: { product: Product; quantity: number; selected: boolean }[] = [];

//   constructor(private cartService: CartService, private router: Router) {}

//   ngOnInit(): void {
//     this.loadCartItems();
//   }

//   loadCartItems(): void {
//     this.cartService.cartItems$.subscribe((items) => {
//       if (items.length === 0) {
//         this.navigateToCart();
//       } else {
//         this.cartItems = items.map((item) => ({
//           ...item,
//           selected: false,
//         }));
//       }
//     });
//   }

//   navigateToCart(): void {
//     this.router.navigate(['cart']);
//   }

//   navigateToProductDetails(productId: number): void {
//     this.router.navigate(['product', productId]);
//   }

//   getSelectedItems(): { product: Product; quantity: number }[] {
//     return this.cartItems.filter((item) => item.selected);
//   }

//   checkout(): void {
//     const selectedItems = this.getSelectedItems();
//     if (selectedItems.length > 0) {
//       this.cartService.sendCartToBackend(selectedItems).subscribe({
//         next: (response: any) => {
//           alert('Checkout successful!');
//           console.log('Response from server:', response);
//         },
//         error: (err: any) => {
//           console.error('Error during checkout:', err);
//           alert('Checkout failed. Please try again.');
//         },
//       });
//     } else {
//       alert('Please select at least one product to checkout.');
//     }
//   }

//   cancelAll(): void {
//     const selectedItems = this.cartItems.filter((item) => item.selected);

//     if (selectedItems.length > 0) {
//       selectedItems.forEach((item) => {
//         this.cartService.removeFromCart(item.product.id, item.quantity);
//       });

//       this.cartItems = this.cartItems.filter((item) => !item.selected);

//       if (this.cartItems.length === 0) {
//         this.router.navigate(['cart']);
//       }
//     } else {
//       alert('No items selected to remove.');
//     }
//   }

//   getTotalPrice(item: { product: Product; quantity: number }): number {
//     return item.product.price * item.quantity;
//   }
// }
