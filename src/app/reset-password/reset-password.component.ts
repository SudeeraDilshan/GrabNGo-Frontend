import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Remember Me:', this.rememberMe);

    this.router.navigate(['/email-verify']);
  }
}
