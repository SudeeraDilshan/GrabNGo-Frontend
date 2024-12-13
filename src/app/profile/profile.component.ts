import { Component, OnInit } from '@angular/core';
import { ProfileService, UserProfile } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile: UserProfile = {
        userId: 0,
        emailAddress: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        nic: '',
        address: '',
        role: ''
    };

    isEditing = false;
    isLoading = false;
    errorMessage: string | null = null;

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.fetchUserProfile();
    }

    fetchUserProfile(): void {
        const userEmail = this.authService.getUserEmail();
        if (userEmail) {
            this.isLoading = true;
            this.profileService.getUserProfileByEmail(userEmail).subscribe({
                next: (profile) => {
                    this.profile = profile; // Update profile with backend data.
                    this.isLoading = false;
                    console.log('Fetched profile:', profile);

                },
                error: (error) => {
                    this.errorMessage = error.message || 'Failed to fetch profile details';
                    this.isLoading = false;
                    console.error(error);
                },
            });
        }
    }


    toggleEditMode(): void {
        this.isEditing = !this.isEditing;
        this.errorMessage = null;
    }

    saveProfile(): void {
        this.isLoading = true;
        this.profileService.updateUserProfile(this.profile).subscribe({
            next: (updatedProfile) => {
                this.profile = updatedProfile;
                this.isEditing = false;
                this.isLoading = false;
                this.errorMessage = null;
            },
            error: (error) => {
                this.errorMessage = error.message || 'Failed to update profile';
                this.isLoading = false;
                console.error(error);
            }
        });
    }

    logout(): void {
        this.authService.logout();
    }

    changePassword(): void {
        this.router.navigate(['/password-modification']);
    }
}
