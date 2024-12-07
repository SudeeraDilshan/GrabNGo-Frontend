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
  products: Product[] = [
    {
      productId: 1,
      productName: 'Men\'s Casual T-Shirt',
      productDescription: 'Comfortable cotton t-shirt, perfect for everyday wear',
      productPrice: 999,
      category: 'Clothing',
      CategoryId: 101,
      imageUrl: ['https://via.placeholder.com/150'],
      productQuantity: 0,
      total: 0,
      available: true,
      active: true
      
    },
    {
      productId: 2,
      productName: 'Women\'s Summer Dress',
      productDescription: 'Light and breezy dress, ideal for sunny days',
      productPrice: 1299,
      category: 'Clothing',
      CategoryId: 102, 
      imageUrl: ['https://via.placeholder.com/150'],
      productQuantity: 0,
      total: 0,
      available:true,
      active:true
    },
    {
      productId: 3,
      productName: 'Men\'s Slim Fit Jeans',
      productDescription: 'Stylish slim-fit jeans with a modern cut',
      productPrice: 1799,
      category: 'Clothing',
      CategoryId: 101,  
      imageUrl: ['https://via.placeholder.com/150'],
      productQuantity: 0,
      total: 0,
      available:true,
      active:true
    },
    {
      productId: 4,
      productName: 'Women\'s Floral Blouse',
      productDescription: 'Elegant floral blouse for casual or semi-formal occasions',
      productPrice: 1599,
      category: 'Clothing',
      CategoryId: 102,  
      imageUrl: ['https://via.placeholder.com/150'],
      productQuantity: 0,
      total: 0,
      available:true,
      active:true
    },
  ];

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
    const foundProduct = this.products.find(product => product.productId === id);
    if (foundProduct) {
      this.product = foundProduct;
    } else {
      console.error('Product not found');
    }
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
