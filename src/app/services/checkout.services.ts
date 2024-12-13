import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'https://backend-api-url/checkout';  

  constructor(private http: HttpClient) {}

 
  sendCheckoutData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
 
    return this.http.post(this.apiUrl, data, { headers });
  }
}
