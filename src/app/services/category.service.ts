import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Category } from '../category-view-admin/category-view-admin.component';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private apiUrl = 'http://localhost:8083/api/v1/categories'; 

  constructor(private http: HttpClient) {}

  addCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  getCategoryById(categoryId: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${categoryId}`);
  }

  updateCategory(categoryId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, updatedData);
  }

  deleteCategory(categoryId: string, category:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, category);
  }
}