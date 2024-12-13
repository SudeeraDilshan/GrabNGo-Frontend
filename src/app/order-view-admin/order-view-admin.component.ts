import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from "../types";
import { ACCEPTED, CANCELLED, DELIVERED } from '../constants';

@Component({
  selector: 'app-order-view-admin',
  templateUrl: './order-view-admin.component.html',
  styleUrls: ['./order-view-admin.component.css'],
})
export class OrderViewAdminComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  showSuccessMessage: boolean = false;
  accepted = ACCEPTED;
  delivered = DELIVERED;
  cancelled = CANCELLED;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.hasError = false;
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        // Explicitly type the parameter
        this.orders = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  updateOrderStatus(order: Order): void {
    this.orderService
      .updateOrder(order.orderId.toString(), order.status)
      .subscribe({
        next: (updatedOrder: Order) => {
          const index = this.orders.findIndex(
            (o) => o.orderId === updatedOrder.orderId
          );
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          alert('Order status updated successfully!');

          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.orderService
            .updateOrder(order.orderId.toString(), order.status)
            .subscribe({
              next: (updatedOrder) => {
                const normalizedOrder = {
                  ...updatedOrder,
                  status:
                    JSON.parse(updatedOrder.status)?.status ||
                    updatedOrder.status,
                };
                this.orders = this.orders.map((o) =>
                  o.orderId === normalizedOrder.orderId ? normalizedOrder : o
                );
                this.showSuccessMessage = true;
                setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 3000);
              },
              error: (error: any) => {
                console.error('Error updating order status:', error);
                alert('Failed to update order status.');
              },
            });
        },
      });
  }
}
