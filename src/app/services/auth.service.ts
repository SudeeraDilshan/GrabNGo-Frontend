import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, LoginResponse } from "../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://172.104.165.74:8082/api/v1/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const loginPayload = { emailAddress: email, password: password };
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, loginPayload)
      .pipe(
        map(user => {
          sessionStorage.setItem('ACCESS_TOKEN', user.data.accessToken);
          sessionStorage.setItem("ROLE", user.data.role);
          localStorage.setItem('REFRESH_TOKEN', user.data.refreshToken);
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  isLoggedIn(): boolean {
      return !!sessionStorage.getItem('ACCESS_TOKEN');
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  logout(): void {
    // Remove user from localStorage and reset current user observable
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { email })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Password reset request error:', error);
          throw error;
        })
      );
  }

  changePassword(newPassword: string, confirmPassword: string): Observable<any> {
    const passwordData = { newPassword, confirmPassword };
    return this.http.post<any>(`${this.apiUrl}/auth/change-password`, passwordData)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Change password error:', error);
          throw error;
        })
      );
  }

  // Verify Email
  verifyEmail(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-email`, { code })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Email verification error:', error);
          throw error;
        })
      );
  }

  getRole(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.role : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isUser(): boolean {
    return this.getRole() === 'User';
  }


  // Get current logged-in user
  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

}
