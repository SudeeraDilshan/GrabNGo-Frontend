import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, UserProfile } from "../types";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = "http://172.207.18.25:8080/api/v1/user";

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getCurrentUserDetails(): Observable<ApiResponse<UserProfile>> {
        let email = this.authService.getCurrentUserEmail()!;
        const token = this.authService.getAccessToken();
        const headers = new HttpHeaders({

            'Accept': '*/*',
            "Authorization": `Bearer ${token}`,

        });
        return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}/${encodeURIComponent(email)}`, { headers: headers });
    }

    updateUserProfile(profile: UserProfile): Observable<UserProfile> {
        return this.http.put<ApiResponse<UserProfile>>(`${this.apiUrl}/`, profile)
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
