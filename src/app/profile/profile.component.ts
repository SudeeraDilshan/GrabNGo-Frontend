import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile = {
    userId: 0,
    emailAddress: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    nic: '',
    address: '',
    role: '',
  };

  isLoading = false;
  errorMessage: string | null = null;
  isEditing = false;  // To toggle between view and edit modes

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user profile data using AuthService
  loadUserProfile(): void {
    this.isLoading = true;
    this.authService.getCurrentUser().subscribe(
      (currentUser) => {
        if (currentUser) {
          // Set the profile data from the currentUser object
          this.profile.userId = currentUser.userId;
          this.profile.emailAddress = currentUser.email;
          this.profile.firstName = currentUser.firstName;
          this.profile.lastName = currentUser.lastName;
          this.profile.contactNumber = currentUser.contactNumber;
          this.profile.nic = currentUser.nic;
          this.profile.address = currentUser.address;
          this.profile.role = currentUser.role;
          console.log('profile firstname: ', this.profile.firstName);
          console.log('profile lastname: ', this.profile.lastName);
          console.log('profile userId: ', this.profile.userId);
          console.log('profile contactNumber: ', this.profile.contactNumber);
          console.log('profile nic: ', this.profile.nic);
          console.log('profile address: ', this.profile.address);
          console.log('profile role: ', this.profile.role);

        } else {
          this.errorMessage = 'User not logged in. Please log in again.';
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load profile data. Please try again.';
      }
    );
  }
   
  // Toggle between edit and view modes
  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  // Save the profile changes
  saveProfile(): void {
    this.isLoading = true;
    // Call AuthService to update the profile, you can call a backend API here
    this.authService.updateProfile(this.profile).subscribe(
      (response) => {
        this.isLoading = false;
        this.isEditing = false;
        // Optionally, display a success message
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to save profile. Please try again.';
      }
    );
  }

  // Logout the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to change password page
  changePassword(): void {
    this.router.navigate(['/password-modification']);
  }
}
