import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    showPassword: boolean = false;
    errorMessage: string = '';
    isSubmitted: boolean = false; // Added to track form submission

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required
            ]]
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onLogin() {
        // Set submission flag
        this.isSubmitted = true;

        // Mark all fields as touched to trigger validation display
        this.loginForm.markAllAsTouched();

        // Check if the form is valid before submitting
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: user => {
                    console.log('Login successful:', user);
                    this.router.navigate(['/']); // Navigate to home or another page
                },
                error: err => {
                    console.error('Login failed:', err);
                    this.errorMessage = 'Invalid email or password. Please try again.';
                },
            });
        }
    }

    // Getter methods for easy access in template
    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
