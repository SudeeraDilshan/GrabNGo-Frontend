import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    // Code to handle form submission
    console.log('Email:', this.email);
    console.log('Remember Me:', this.rememberMe);
  }
}
