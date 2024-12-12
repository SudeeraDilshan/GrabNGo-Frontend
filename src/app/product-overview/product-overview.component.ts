import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../shopping-cart/shopping-cart.services';

//import { CartService } from '../cart/cart.services';

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.css'],
})
export class ProductOverviewComponent implements OnInit {
    product: any = {};
    images: string[] = [];
    currentIndex = 0;
    quantity: number = 1;

    constructor(private cartService: CartService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['product']) {
                this.product = JSON.parse(params['product']);
                this.quantity = this.product.quantity || 1;

                if (this.product.images && Array.isArray(this.product.images)) {
                    this.images = this.product.images;
                }
            }
        });
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    increaseQuantity(): void {
        this.quantity++;
    }

    scrollImages(direction: string) {
        if (direction === 'left') {
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0;
        } else if (direction === 'right') {
            this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : this.images.length - 1;
        }
    }

    get showLeftArrow(): boolean {
        return this.currentIndex > 0;
    }

    get showRightArrow(): boolean {
        return this.currentIndex < this.images.length - 1;
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product, this.quantity);
            console.log(`Added to cart: Rs.${(this.product.price * this.quantity).toFixed(2)}`);
        }
    }
}
