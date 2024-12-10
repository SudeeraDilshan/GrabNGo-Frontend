import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export interface UserProfile {
  userId: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  nic: string;
  address: string;
  role: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors: any;
  
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://172.104.165.74:8082/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserProfileByEmail(email: string): Observable<UserProfile> {
    const token = this.authService.getAccessToken(); // Get the access token from the auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    const url = `${this.baseUrl}/user/${encodeURIComponent(email)}`;
  
    return this.http.get<UserProfile>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return throwError(error);
      })
    );
  }

  // Update user profile
  updateUserProfile(profile: UserProfile): Observable<UserProfile> {
    const url = `${this.baseUrl}/user/profile`;
    return this.http.put<ApiResponse<UserProfile>>(url, profile).pipe(
      map((response) => {
        if (!response.status) {
          throw new Error(response.message || 'Failed to update user profile');
        }
        return response.data;
      }),
      catchError((error) => {
        console.error('Error updating user profile:', error);
        return throwError(error);
      })
    );
  }
}
