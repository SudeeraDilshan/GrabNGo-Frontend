import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  onSubmit() {
    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true; // Show error
    } else {
      this.passwordMismatch = false; // Reset mismatch error
      console.log('Password updated successfully:', this.newPassword);

      // Reset fields
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }
}
