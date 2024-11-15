import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  resendTimer: number = 60;
  isResendDisabled: boolean = true;

  constructor(private fb: FormBuilder) {
    // Initialize form with 6 empty controls
    this.verificationForm = this.fb.group({
      0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      5: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  ngOnInit(): void {
    this.startResendTimer();
  }

  // Method to get controls as an array for *ngFor
  getControls() {
    return Object.keys(this.verificationForm.controls);
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 5) {
      const nextInput = document.querySelector(
        `input[formControlName="${index + 1}"]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onVerify(): void {
    if (this.verificationForm.valid) {
      const code = Object.values(this.verificationForm.value).join('');
      console.log('Verification Code:', code);
      // Send code to the server for verification
    }
  }

  startResendTimer(): void {
    this.isResendDisabled = true;
    this.resendTimer = 60;
    const interval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer === 0) {
        clearInterval(interval);
        this.isResendDisabled = false;
      }
    }, 1000);
  }

  resendCode(): void {
    console.log('Code resent');
    this.startResendTimer();
  }
}
