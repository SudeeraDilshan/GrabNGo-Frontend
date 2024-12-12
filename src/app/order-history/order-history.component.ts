import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
    isLoading: boolean = true;
    hasError: boolean = false;
    orders: any[] = [];

    // Add input parameters for userId and status
    userId: string = '8'; // Default user ID
    status: string = 'Accepted'; // Default status

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

        // Use the new method with userId and status
        this.orderService.getOrdersByUserAndStatus(this.userId, this.status).subscribe({
            next: (orders) => {
                const productRequests = orders.flatMap((order) =>
                    order.orderItems.map((item) =>
                        this.productService.getProductById(String(item.productId))
                    )
                );

                forkJoin(productRequests).subscribe({
                    next: (products) => {
                        this.orders = orders.map((order) => {
                            const enrichedOrderItems = order.orderItems.map((item) => {
                                const product = products.find(
                                    (p: any) => p.data.productId === item.productId
                                );
                                return {
                                    productName: product?.data?.productName || 'Unknown',
                                    size: 'N/A',
                                    quantity: item.quantity,
                                    price: item.sellPrice,
                                    imageUrl: product?.data?.imageUrl || '',
                                    date: new Date(order.createdDateTime).toLocaleDateString(),
                                };
                            });

                            return {
                                ...order,
                                orderItems: enrichedOrderItems,
                            };
                        });

                        this.isLoading = false;
                    },
                    error: () => {
                        this.isLoading = false;
                        this.hasError = true;
                    },
                });
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
