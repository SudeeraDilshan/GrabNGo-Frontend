import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'http://172.207.18.25:8080/api/v1/order'; 

  constructor(private http: HttpClient) {}

  // Send form data to backend
  submitCheckout(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
