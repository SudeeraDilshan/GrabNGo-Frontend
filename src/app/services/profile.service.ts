import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, Env, UserProfile } from "../types";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private env = environment as Env;
    private apiUrl = this.env.userApi;

    constructor(private http: HttpClient) {
    }

    getUserProfileByEmail(email: string): Observable<UserProfile> {
        return this.http
            .get<ApiResponse<UserProfile>>(`${this.apiUrl}/${encodeURIComponent(email)}`)
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
        return this.http.put<ApiResponse<UserProfile>>(`${this.apiUrl}/profile`, profile)
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
