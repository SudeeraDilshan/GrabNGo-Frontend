// change-password.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  onSubmit(passwordForm: any) {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
      // Handle the password update logic here
      console.log('Password updated successfully');
    }
  }
}
