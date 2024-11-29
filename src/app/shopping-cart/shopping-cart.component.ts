// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-shopping-cart',
//   templateUrl: './shopping-cart.component.html',
//   styleUrls: ['./shopping-cart.component.css']
// })
// export class ShoppingCartComponent {
//   products = [
//     { id: 1, name: 'Product 42', price: 2611.99, image: 'assets/product42.jpg', selected: false },
//     { id: 2, name: 'Product 33', price: 4299.99, image: 'assets/product33.jpg', selected: false },
//     { id: 3, name: 'Product 33', price: 4299.99, image: 'assets/product33.jpg', selected: false }
//   ];

//   checkout() {
//     const selectedProducts = this.products.filter(product => product.selected);
//     if (selectedProducts.length > 0) {
//       alert('Proceeding to checkout with selected products');
//     } else {
//       alert('Please select at least one product to checkout.');
//     }
//   }

//   cancelAll() {
//     this.products.forEach(product => (product.selected = false));
//     alert('All selections have been cleared.');
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.services';
import { Product } from '../product/product.model';

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
            .map((item) => `${item.product.name} (x${item.quantity})`)
            .join('\n')
      );
      
    } else {
      alert('Please select at least one product to checkout.');
    }
  }

  
  cancelAll(): void {
    this.cartItems.forEach((item) => (item.selected = false)); // Unselect all items
    alert('All selections have been cleared.');
  }

  getTotalPrice(item: { product: Product; quantity: number }): number {
    return item.product.price * item.quantity;
  }
}

