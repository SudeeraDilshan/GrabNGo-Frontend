 import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];  // Get product ID from route parameters
    this.loadProduct(productId);  // Load the product details from the backend
  }

  // Load the product by ID
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;  // Assign the fetched product to the component
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  // Decrease the quantity in the cart
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Increase the quantity in the cart
  increaseQuantity(): void {
    this.quantity++;
  }

  // Add the product to the cart
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);  // Add product to cart service
      console.log(`Added to cart: Rs.${(this.product.productPrice * this.quantity).toFixed(2)}`);
    }
  }
}
