import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  verificationForm!: FormGroup; // Form group for the 6-digit code
  resendTimer: number = 30; // Countdown for resend button
  isResendDisabled: boolean = true; // Disable resend initially
  userEmail: string = "";

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem("userEmail")!;
    this.verificationForm = this.fb.group({
      code1: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code2: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code3: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code4: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code5: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      code6: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]]
    });

    this.startResendTimer(); // Start timer on initialization
  }

  getControls(): string[] {
    return Object.keys(this.verificationForm.controls); // Return control names as an array
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value && input.value.length === 1) {
      const nextInput = document.querySelectorAll('input')[index + 1];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus(); // Move to the next input field
      }
    }
  }

  onVerify(): void {
    if (this.verificationForm.valid) {
      const code = Object.values(this.verificationForm.value).join('');
      console.log('Verification Code:', code);
      // Call your API or service to verify the code
    }
  }

  resendCode(): void {
    console.log('Resend Code');
    this.isResendDisabled = true;
    this.resendTimer = 30; // Reset timer
    this.startResendTimer();
    // Call your API or service to resend the code
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
