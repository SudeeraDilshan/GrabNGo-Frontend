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
    const productId = +this.route.snapshot.params['id'];  
    this.loadProduct(productId);  
  }

 
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;   
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
 
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

   
  increaseQuantity(): void {
    this.quantity++;
  }
 
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);   
      console.log(`Added to cart: Rs.${(this.product.productPrice * this.quantity).toFixed(2)}`);
    }
  }
}
