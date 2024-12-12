import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shopping-cart/shopping-cart.services';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    products: Product[] = [];
    product: Product | null = null;
    quantity: number = 1;
    productId!: number;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private router: Router
    ) {
    }

    ngOnInit(): void {

        this.productId = +this.route.snapshot.paramMap.get('productId')!;
        this.fetchProductDetails(this.productId);
    }

    fetchProductDetails(productId: number) {
        this.productService.getProductById(productId).subscribe({
            next: (product) => {
                this.product = product;
            },
            error: (err) => {
                console.error('Error fetching product details:', err);
            },
        });
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
