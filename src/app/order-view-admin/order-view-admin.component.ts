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
  showSuccessMessage: boolean = false;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.hasError = false;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('Fetched orders:', data);
        // Normalize the status field
        this.orders = data.map(order => ({
          ...order,
          status: JSON.parse(order.status)?.status || order.status
        }));
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
  
  

  // fetchOrders(): void {
  //   this.isLoading = true;
  //   this.hasError = false;
  //   this.orderService.getOrders().subscribe({
  //     next: (data) => {
  //       console.log('Fetched orders:', data);
  //       this.orders = data;
  //       this.isLoading = false;
  //     },
  //     error: () => {
  //       this.hasError = true;
  //       this.isLoading = false;
  //     },
  //   });
  // }

  //   updateOrderStatus(order: any): void {
  //     console.log('Updating order:', order);
  //     console.log('Payload being sent:', { orderId: order.orderId, status: order.status });
  //     this.orderService.updateOrder(order.orderId, order.status).subscribe({
  //       next: (updatedOrder) => {
  //         console.log('Order updated successfully:', updatedOrder);
  //         const index = this.orders.findIndex((o) => o.orderId === updatedOrder.orderId);
  //         if (index !== -1) {
  //           this.orders[index] = updatedOrder;
  //         }
  //         alert('Order status updated successfully!');
  //       },
  //       error: (err) => {
  //         console.error('Failed to update order status:', err);
  //         alert('Failed to update order status.');
  //       },
  //     });
  //   }
  // }

  // updateOrderStatus(order: Order): void {
  //   this.orderService.updateOrder(order.orderId, order.status).subscribe({
  //     next: (updatedOrder) => {
  //       this.showSuccessMessage = true;
  //       console.log('Order updated successfully:', updatedOrder);
  //       setTimeout(() => {
  //         this.showSuccessMessage = false;
  //       }, 3000);
  //     },
  //     error: (err) => {
  //       console.error('Error updating order:', err);
  //     },
  //   });
  // }
  
  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, order.status).subscribe({
      next: (updatedOrder) => {
        const normalizedOrder = {
          ...updatedOrder,
          status: JSON.parse(updatedOrder.status)?.status || updatedOrder.status
        };
        this.orders = this.orders.map(o =>
          o.orderId === normalizedOrder.orderId ? normalizedOrder : o
        );
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating order:', err);
      },
    });
  }
  
}
