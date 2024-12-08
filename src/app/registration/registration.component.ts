import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
        {
          emailAddress: [
            '',
            [
              Validators.required,
              Validators.email,
            ],
          ],
          firstName: [
            '',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(50),
            ],
          ],
          lastName: [
            '',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(50),
            ],
          ],
          password: [
            '',
            [
              Validators.required,
            ],
          ],
          confirmPassword: [
            '',
            [
              Validators.required,
            ],
          ],
          contactNumber: [
            '',
            [
              Validators.required,
              Validators.pattern(/^\+?[0-9]{10,14}$/),
            ],
          ],
          address: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(200),
            ],
          ],
          nic: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[0-9]{12}$/),
            ],
          ],
        },
        { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: response => {
          console.log('Registration successful:', response);
          // Optionally, clear the form
          this.router.navigate(["/auth/login"])
        },
        error: err => {
          console.error('Registration failed:', err);
          // Optionally, display an error message
          alert('Registration failed. Please try again.');
        },
      });
    } else {
      console.log('Form Invalid');
      // Optionally, mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}