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
  private userUrl='http://172.104.165.74:8082/api/v1/user';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginPayload = { emailAddress: email, password: password };
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, loginPayload)
      .pipe(
        map(response => {
          // Store access and refresh tokens in session and local storage
          sessionStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
          localStorage.setItem('REFRESH_TOKEN', response.data.refreshToken);

          // Store user data in local storage
          this.storeUserInLocalStorage(response.data);

          // Update the current user subject
          this.currentUserSubject.next(response.data);

          return response.data;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  private storeUserInLocalStorage(userData: LoginResponse): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  private getUserFromLocalStorage(): LoginResponse | null {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  updateProfile(profile: any): Observable<any> {
    const userId = profile.userId; 
    return this.http.put<any>(`${this.apiUrl}/user/${userId}`, profile);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('ACCESS_TOKEN');
  }


  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
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

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forget-password`, email)
      .pipe(
        map(response => {
          // Optionally store email in session for verification steps
          sessionStorage.setItem('resetPasswordEmail', email);
          return response;
        }),
        catchError(error => {
          console.error('Forget password error:', error);
          throw error;
        })
      );
  }

  verifyEmailAndCode(email: string, verificationCode: string): Observable<any> {
    const body = { email, verificationCode };
    return this.http.post<any>(`${this.apiUrl}/verify`, body)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Email and code verification error:', error);
          throw error;
        })
      );
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email })
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
    return this.http.post<any>(`${this.apiUrl}/change-password`, passwordData)
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
// In auth.service.ts
  resetPassword(resetData: { email: string, password: string, verificationCode: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, resetData)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Reset password error:', error);
          throw error;
        })
      );
  }

  // Verify Email
  verifyEmail(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-email`, { code })
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

  PasswordModification(oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const passwordData = { oldPassword, newPassword, confirmPassword };
    return this.http.post<any>(`${this.userUrl}/change-password`, passwordData)
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
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log('pasrsedDataaaa: ',parsedData);
      return new BehaviorSubject(parsedData).asObservable();
    } else {
      return new BehaviorSubject(null).asObservable();
    }
  }  

  getUserDetails(email: string): Observable<any> {
    const url = `${this.userUrl}/${encodeURIComponent(email)}`; 
    return this.http.get(url); // Returns the observable
  } 


  getResetPasswordEmail(): string {
    return sessionStorage.getItem('resetPasswordEmail') || '';
  }


  // In AuthService
  getUserEmail(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.email || null;
    }
    return null;
  }
  

  getAccessToken(): string | null {
    const userData = localStorage.getItem('userData');
    console.log("userdata is hereeee: ", userData);
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log('this is accesstokwn: ', parsedData.accessToken)
      return parsedData.accessToken;
    }
    return null;
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      map((response) => {
        localStorage.setItem('userData', JSON.stringify(response));
        return response.accessToken;
      })
    );
  }
  
  getRefreshToken(): string {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.refreshToken;
    }
    return '';
  }  
  

}