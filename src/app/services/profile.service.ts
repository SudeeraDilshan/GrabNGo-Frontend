import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
    providedIn: 'root'
})
export class ProfileService {
    private baseUrl = 'http://172.207.18.25:8082/api/v1';

    constructor(private http: HttpClient) {
    }

    getUserProfileByEmail(email: string): Observable<UserProfile> {
        return this.http
            .get<ApiResponse<UserProfile>>(`${this.baseUrl}/user/${encodeURIComponent(email)}`)
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw new Error(response.message || 'Failed to fetch user profile');
                    }
                    return response.data; // Extract the 'data' field.

                }),
                catchError((error) => {
                    console.error('Error fetching user profile:', error);
                    throw error;
                })
            );
    }

    updateUserProfile(profile: UserProfile): Observable<UserProfile> {
        return this.http.put<ApiResponse<UserProfile>>(`${this.baseUrl}/user/profile`, profile)
            .pipe(
                map(response => {
                    if (!response.status) {
                        throw new Error(response.message || 'Failed to update user profile');
                    }
                    return response.data;
                }),
                catchError(error => {
                    console.error('Error updating user profile:', error);
                    throw error;
                })
            );
    }
}
