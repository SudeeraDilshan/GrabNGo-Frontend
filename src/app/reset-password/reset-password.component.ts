import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

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
    sessionStorage.setItem("userEmail", this.email);
    this.router.navigate(['/email-verify']);
  }
}
