import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // To store error messages

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = ''; // Clear error messages on login attempt

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        console.log('Login successful:', user);
        this.router.navigate(['/']); // Navigate to home or another page
      },
      error: err => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password. Please try again.'; // Show login error
      },
    });
  }
}
