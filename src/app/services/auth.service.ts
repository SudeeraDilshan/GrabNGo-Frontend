import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://172.104.165.74:8086/api/v1/auth'; 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login User
  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginPayload)
      .pipe(
        map(user => {
          // Store user details in localStorage to keep the user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  // Register User
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

  // Logout User
  logout(): void {
    // Remove user from localStorage and reset current user observable
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Password Reset Request
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

  // Change Password
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

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
