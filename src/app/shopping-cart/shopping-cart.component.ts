import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  products = [
    { id: 1, name: 'Product 42', price: 2611.99, image: 'assets/product42.jpg', selected: false },
    { id: 2, name: 'Product 33', price: 4299.99, image: 'assets/product33.jpg', selected: false },
    { id: 3, name: 'Product 33', price: 4299.99, image: 'assets/product33.jpg', selected: false }
  ];

  checkout() {
    const selectedProducts = this.products.filter(product => product.selected);
    if (selectedProducts.length > 0) {
      alert('Proceeding to checkout with selected products');
    } else {
      alert('Please select at least one product to checkout.');
    }
  }

  cancelAll() {
    this.products.forEach(product => (product.selected = false));
    alert('All selections have been cleared.');
  }
}
