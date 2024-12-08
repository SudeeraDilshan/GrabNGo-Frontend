import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order-model';

@Component({
  selector: 'app-order-view-admin',
  templateUrl: './order-view-admin.component.html',
  styleUrls: ['./order-view-admin.component.css'],
})
export class OrderViewAdminComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.hasError = false;

    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId.toString(), order.status).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex((o) => o.orderId === updatedOrder.orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        alert('Order status updated successfully!');
      },
      error: () => {
        alert('Failed to update order status.');
      },
    });
  }
}
