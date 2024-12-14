import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'http://172.207.18.25:8080/api/v1/order'; 

  constructor(private http: HttpClient) {}

   
  submitCheckout(payload: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };  
    return this.http.post(this.apiUrl, payload, { headers });

  }
  
  
}
