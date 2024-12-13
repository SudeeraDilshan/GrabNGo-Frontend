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
    isSubmitted: boolean = false; 

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

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
        this.isSubmitted = true;
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: user => {
                    console.log('Login successful:', user);
                    this.router.navigate(['/']);
                },
                error: err => {
                    console.error('Login failed:', err);
                    this.errorMessage = 'Invalid email or password. Please try again.';
                },
            });
        }
    }
}
