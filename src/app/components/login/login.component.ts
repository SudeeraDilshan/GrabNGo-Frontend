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

  constructor(private authService: AuthService, private router: Router) {}


  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: user => {
          console.log('Login successful:', user);
          this.router.navigate(['/']); // Navigate to home or another page
        },
        error: err => {
          console.error('Login failed:', err);
        },
      });
    } else {
      console.error('Please fill in all fields.');
    }
  }
}
