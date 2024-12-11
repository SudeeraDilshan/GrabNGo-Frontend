import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve email and verification code from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.verificationCode = params['verificationCode'];

      // Redirect back if email or verification code is missing
      if (!this.email || !this.verificationCode) {
        this.router.navigate(['/auth/forget-password']);
      }
    });
  }

  // Toggle methods for password visibility
  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(passwordForm: NgForm): void {
    // Reset error states
    this.passwordMismatch = false;
    this.errorMessage = '';

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    // Validate form
    if (passwordForm.invalid) {
      return;
    }

    // Set loading state
    this.isLoading = true;

    // Prepare reset password payload
    const resetPayload = {
      email: this.email,
      password: this.newPassword,
      verificationCode: this.verificationCode
    };

    // Call reset password API
    this.authService.resetPassword(resetPayload).subscribe({
      next: () => {
        this.isLoading = false;
        // Navigate to login silently after success
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to reset password';
        console.error('Reset password error:', error);
      }
    });
  }
}
