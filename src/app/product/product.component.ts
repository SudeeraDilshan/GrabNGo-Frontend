// import { Component, OnInit } from '@angular/core';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   colors: string[];
//   sizes: string[];
//   modelHeight?: string;
//   images: string[];
// }

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   product: Product = {
//     id: 1,
//     name: 'Product 1',
//     price: 1999.00,
//     description: 'Revamp your style with the latest designer trends in men\'s clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.',
//     colors: ['#DEB887', '#000000'],
//     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
//     modelHeight: 'Height of model: 189 cm / 6\' 2" Size 41',
//     images: [
//       'assets/product-1.jpg',
//       'assets/product-2.jpg',
//       'assets/product-3.jpg',
//       'assets/product-4.jpg'
//     ]
//   };

//   selectedColor: string = this.product.colors[0];
//   selectedSize: string = '';
//   quantity: number = 1;

//   constructor() { }

//   ngOnInit(): void { }

//   selectColor(color: string): void {
//     this.selectedColor = color;
//   }

//   selectSize(size: string): void {
//     this.selectedSize = size;
//   }

//   decreaseQuantity(): void {
//     if (this.quantity > 1) {
//       this.quantity--;
//     }
//   }

//   increaseQuantity(): void {
//     this.quantity++;
//   }

//   addToCart(): void {
//     const totalPrice = this.product.price * this.quantity;
//     console.log(`Added to cart: Rs.${totalPrice.toFixed(2)}`);
    
//   }

// }

// exsist
// import { Component, OnInit } from '@angular/core';
// import { Product } from './product.model';
// import { ProductService } from './product.service';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// }) 
// export class ProductComponent implements OnInit {
//   product: Product | undefined;
//   selectedColor: string = '';
//   selectedSize: string = '';
//   quantity: number = 1;
  

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     const productId = 1; 
//     this.loadProduct(productId);
//   }

//   loadProduct(id: number): void {
//     this.productService.getProduct(id).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.selectedColor = data.colors[0]; 
//       },
//       error: (err) => console.error('Error loading product:', err)
//     });
//   }

//   selectColor(color: string): void {
//     this.selectedColor = color;
//   }

//   selectSize(size: string): void {
//     this.selectedSize = size;
//   }

//   decreaseQuantity(): void {
//     if (this.quantity > 1) {
//       this.quantity--;
//     }
//   }

//   increaseQuantity(): void {
//     this.quantity++;
//   }

//   addToCart(): void {
    
//     if (this.product) {
       
//       const totalPrice = this.product.price * this.quantity;
//       console.log(`Added to cart: Rs.${totalPrice.toFixed(2)}`);
//     }
//   } 
  
// }

import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.services';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
}) 
export class ProductComponent implements OnInit {
  product: Product | undefined;
//  product: Product = {
//     id: 1,
//     name: 'Mock Product',
//     description: 'This is a mock product description.',
//     price: 1500,
//     colors: ['#ff0000', '#00ff00', '#0000ff'],
//     sizes: ['S', 'M', 'L'],
//     images: [
//       'https://via.placeholder.com/150',
//       'https://via.placeholder.com/150',
//       'https://via.placeholder.com/150'
//     ],
//     modelHeight: 180
//   };
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  

  constructor(private productService: ProductService,
     private cartService: CartService ) {}

  ngOnInit(): void {
    const productId = 1; 
    this.loadProduct(productId);
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedColor = data.colors[0]; 
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
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