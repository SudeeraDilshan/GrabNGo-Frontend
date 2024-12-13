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
  Accepted = ACCEPTED;
  Delivered = DELIVERED;
  Cancelled = CANCELLED;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.hasError = false;
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        console.log('Fetched orders:', data);
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
    // Ensure status is a direct string
    const statusToSend = order.status;
    console.log(statusToSend);

    this.orderService.updateOrder(order.orderId.toString(), statusToSend).subscribe({
      next: (updatedOrder: Order) => {
        // Normalize the status if it's a JSON-serialized string
        try {
          const parsedStatus = JSON.parse(updatedOrder.status);
          updatedOrder.status = parsedStatus.status || updatedOrder.status;
        } catch (e) {
          console.warn('Failed to parse status, using raw value:', updatedOrder.status);
        }

        // Update the local orders list
        const index = this.orders.findIndex((o) => o.orderId === updatedOrder.orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }

        console.log('Order status updated successfully!', updatedOrder);

        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error updating order status:', error);
      },
    });
  }
}
