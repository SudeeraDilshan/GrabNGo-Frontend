import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authservice: AuthService)  {

  }

  onLogin() {
    if (this.email && this.password) {
      // console.log('Login successful:', this.email);
      // Implement actual login logic here, e.g., HTTP requests to authenticate user
      this.authservice.login(this.email, this.password)
    } else {
      console.error('Please fill in all fields.');
    }
  }
}
