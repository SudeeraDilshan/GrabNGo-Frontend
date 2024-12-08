// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any = {
    firstName: '',
    lastName: '',
    address: '',
    mobile: '',
    email: '',
  };

  backupProfile: any = {}; // Backup for canceling edits
  isEditing = false; // Edit Mode State
  profilePictureUrl = 'https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png'; // Default Profile Picture

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Fetch user details from API
  getUserDetails() {
    this.profileService.getUserDetails().subscribe(
      (data) => {
        this.profile = {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          mobile: data.contactNumber,
          email: data.emailAddress,
        };
        this.backupProfile = { ...this.profile };
        console.log('User details fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Toggle Edit Mode
  toggleEdit() {
    this.isEditing = true;
  }

  // Save Edited Profile
  saveProfile() {
    this.profileService.updateProfile(this.profile).subscribe(
      () => {
        console.log('Profile updated successfully');
        this.backupProfile = { ...this.profile };
        this.isEditing = false;
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error saving profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    );
  }

  // Cancel Edits
  cancelEdit() {
    this.profile = { ...this.backupProfile };
    this.isEditing = false;
  }

  // Upload Profile Picture
  onProfilePicUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      this.profileService.uploadProfilePicture(file).subscribe(
        (response) => {
          console.log('Profile picture uploaded successfully');
          this.profilePictureUrl = response.profilePictureUrl;
        },
        (error) => {
          console.error('Error uploading profile picture:', error);
        }
      );
    }
  }

  // Delete Account
  deleteAccount() {
    this.profileService.deleteAccount().subscribe(
      () => {
        console.log('Account deleted successfully');
        window.location.href = '/login';
      },
      (error) => {
        console.error('Error deleting account:', error);
      }
    );
  }

  // Change Password
  changePassword() {
    window.location.href = '/password-modification';
  }
}
