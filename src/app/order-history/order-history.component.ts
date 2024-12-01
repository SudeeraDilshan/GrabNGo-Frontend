import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order-model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  isLoading: boolean = true; // Loading state
  hasError: boolean = false; // Error state
  orders: Order[] = []; // Array to store order history, using the Order model

  constructor() {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    // Simulate API call with a delay
    setTimeout(() => {
      try {
        // Simulating fetched data
        this.orders = [
          {
            productName: 'Wireless Earbuds',
            size: 'One Size',
            quantity: 1,
            price: 59.99,
            imageUrl: 'https://via.placeholder.com/80',
            date: '2024-11-28'
          },
          {
            productName: 'Running Shoes',
            size: '42',
            quantity: 1,
            price: 89.99,
            imageUrl: 'https://via.placeholder.com/80',
            date: '2024-11-20'
          },
          {
            productName: 'Smart Watch',
            size: 'One Size',
            quantity: 1,
            price: 199.99,
            imageUrl: 'https://via.placeholder.com/80',
            date: '2024-11-15'
          }
        ];
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.hasError = true;
      }
    }, 2000); // Simulate a delay
  }
}
