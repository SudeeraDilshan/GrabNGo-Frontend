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
      id: 1,
      name: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt, perfect for everyday wear',
      price: 999,
      category: 'Clothing',
      images: [
        'https://via.placeholder.com/150',
      ],
      quantity: 0,
      total: 0
    },
    {
      id: 2,
      name: 'Women\'s Summer Dress',
      description: 'Light and breezy dress, ideal for sunny days',
      price: 1299,
      category: 'Clothing',
      images: [
        'https://via.placeholder.com/150' 
      ],
      quantity: 0,
      total: 0
    },
    {
      id: 3,
      name: 'Men\'s Slim Fit Jeans',
      description: 'Stylish slim-fit jeans with a modern cut',
      price: 1799,
      category: 'Clothing',
      images: [
        'https://via.placeholder.com/150' 
      ],
      quantity: 0,
      total: 0
    },
    {
      id: 4,
      name: 'Women\'s Floral Blouse',
      description: 'Elegant floral blouse for casual or semi-formal occasions',
      price: 1599,
      category: 'Clothing',
      images: [
        'https://via.placeholder.com/150',
      ],
      quantity: 0,
      total: 0
    },
  ];

  product: Product | null = null; // Set to null initially to handle product not found
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']; // Get product ID from the URL
    this.loadProduct(productId);
  }

  loadProduct(id: number): void {
    // Search for the product in the products array
    const foundProduct = this.products.find(product => product.id === id);
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
      console.log(`Added to cart: Rs.${(this.product.price * this.quantity).toFixed(2)}`);
    }
  }
}
