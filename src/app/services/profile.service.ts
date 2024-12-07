// profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://172.104.165.74:8086/api/v1/user'; 

  constructor(private http: HttpClient) {}

  // Upload profile picture to the server
  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);  // Append the file to FormData

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/upload-profile-picture`, formData, { headers });
}


  // Update profile information
  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-profile`, profileData);
  }

  // Delete account
  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-account`);
  }

  // Change password
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/change-password`, { currentPassword, newPassword });
  }
}
