import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://172.104.165.74:8083'; 

  constructor(private http: HttpClient) {}

  // Fetch orders using the predefined API URL
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, order);
  }

  updateOrder(orderId: string, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/update/${orderId}`, { status });
  }
}
