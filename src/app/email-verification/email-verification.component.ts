import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  resendTimer: number = 30;
  isResendDisabled: boolean = true;
  userEmail: string = "";
  newPassword: string = ""; // Add this to store the new password
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve email from session storage
    this.userEmail = this.authService.getResetPasswordEmail();

    if (!this.userEmail) {
      // If no email is found, redirect to forget password page
      this.router.navigate(['/auth/change-password']);
      return;
    }

    this.verificationForm = this.fb.group({
      code1: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code2: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code3: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code4: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code5: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code6: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]]
    });

    this.startResendTimer();
  }

  getControls(): string[] {
    return Object.keys(this.verificationForm.controls);
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value && input.value.length === 1) {
      const nextInput = document.querySelectorAll('input')[index + 1];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onVerify(): void {
    if (this.verificationForm.valid) {
      // Combine verification code
      const verificationCode = Object.values(this.verificationForm.value).join('');

      // Set loading state
      this.isLoading = true;
      this.errorMessage = '';

      // Navigate to change password page with necessary data
      this.router.navigate(['/auth/change-password'], {
        queryParams: {
          email: this.userEmail,
          verificationCode: verificationCode
        }
      });
    }
  }

  resendCode(): void {
    // Reset timer and disable resend button
    this.isResendDisabled = true;
    this.resendTimer = 30;
    this.startResendTimer();

    // Call forget password API to resend verification code
    this.authService.forgetPassword(this.userEmail)
      .subscribe({
        next: (response) => {
          // Handle successful resend
          console.log('Code resent successfully');
        },
        error: (error) => {
          // Handle resend error
          this.errorMessage = 'Failed to resend verification code';
          console.error('Resend code error:', error);
        }
      });
  }

  private startResendTimer(): void {
    const interval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        this.isResendDisabled = false;
        clearInterval(interval);
      }
    }, 1000);
  }
}