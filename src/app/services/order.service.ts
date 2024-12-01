// order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order-model'; // Import the Order model

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://your-api-url.com/orders'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  // Get order history from backend
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
