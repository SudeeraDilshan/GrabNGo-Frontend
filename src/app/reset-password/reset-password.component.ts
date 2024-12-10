import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the import path as needed
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    // Validate form
    if (form.invalid) {
      return;
    }

    // Start loading
    this.isLoading = true;
    this.errorMessage = '';

    // Call forget password service method
    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        // Store email for verification
        sessionStorage.setItem('resetPasswordEmail', this.email);
        sessionStorage.setItem('userEmail', this.email);
        this.router.navigate(['/auth/email-verify', {email: this.email}]);
      }
    });
  }
}
