import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private apiUrl = 'http://localhost:8085/api/v1/categories'; 

  constructor(private http: HttpClient) {}

  addCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData);
  }

  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`);
  }

  updateCategory(categoryId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, updatedData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }
}
