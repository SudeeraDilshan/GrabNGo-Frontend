import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { forkJoin } from 'rxjs';
import { Order, OrderViewItem } from "../types";

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
    isLoading: boolean = true;
    hasError: boolean = false;
    orders: Order[] = [];
    orderList: OrderViewItem[] = [];

    // Add input parameters for userId and status
    userId: string = '1'; // Default user ID
    status: string = ''; // Default status

    constructor(
        private orderService: OrderService,
        private productService: ProductService
    ) {
    }

    ngOnInit(): void {
        this.fetchOrderHistory();
    }

    fetchOrderHistory(): void {
        this.isLoading = true;
        this.hasError = false;

        this.orderService.getOrdersByUserAndStatus(this.userId, this.status).subscribe({
            next: (response) => {
                console.log(response)
                this.orders = response;
                this.orders.forEach((order) => {
                    this.productService.getProductById(order.orderItems[0].productId).subscribe({
                        next: (productResponse) => {
                            const product = productResponse.data;
                            const orderViewItem: OrderViewItem = {
                                orderId: order.orderId,
                                quantity: order.orderItems[0].quantity,
                                productName: product.productName,
                                productImg: product.imageUrl,
                                status: order.status,
                                createdDateTime: order.createdDateTime,
                                unitPrice: order.orderItems[0].sellPrice,
                            }
                            this.orderList.push(orderViewItem);
                        },
                        error: (error) => {
                            console.error('Error fetching product:', error);
                        },
                    });
                })
                this.isLoading = false;
                this.hasError = false;
            },
            error: () => {
                this.isLoading = false;
                this.hasError = true;
            },
        });
    }

    // Optional: Method to allow dynamic filtering
    filterOrders(userId: string, status: string): void {
        this.userId = userId;
        this.status = status;
        this.fetchOrderHistory();
    }
}
