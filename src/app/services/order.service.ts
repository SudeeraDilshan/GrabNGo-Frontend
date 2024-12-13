import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ApiResponse, Order } from "../types";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiUrl = "http://172.207.18.25:8080/api/v1/order";

    constructor(private http: HttpClient) {
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getProductById(productId: string): Observable<any> {
        console.log(`Attempting to fetch product with URL: ${this.apiUrl}/${productId}`);

        return this.http.get<any>(`${this.apiUrl}/${productId}`).pipe(
            catchError(error => {
                console.error('Error fetching product:', error);
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                console.error('Error details:', error);

                return throwError(() => new Error('Product fetch failed'));
            })
        );
    }

    getOrdersByUserAndStatus(userId: string, status: string): Observable<Order[]> {
        let params = new HttpParams().set('userId', userId);
        if (status !== '') {
            params = params.set('status', status);
        }
        return this.http.get<Order[]>(`${this.apiUrl}/filter`, {params});
    }

    // Create a new order
    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/create`, order);
    }

    // Update order status
    updateOrder(orderId: string, status: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/update/${orderId}`, {status});
    }

    // Optional: Get a single order by ID
    getOrderById(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
    }

    // Optional: Delete an order
    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${orderId}`);
    }

    // Optional: Get orders with pagination
    getOrdersWithPagination(page: number, pageSize: number): Observable<Order[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', pageSize.toString());

        return this.http.get<Order[]>(`${this.apiUrl}/paginated`, {params});
    }
}
