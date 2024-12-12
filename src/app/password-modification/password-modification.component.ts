import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-password-modification',
    templateUrl: './password-modification.component.html',
    styleUrls: ['./password-modification.component.css']
})
export class PasswordModificationComponent {
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';
    passwordMismatch: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    showOldPassword: boolean = false;
    showNewPassword: boolean = false;
    showConfirmPassword: boolean = false;

    constructor(private http: HttpClient) {
    }

    toggleOldPasswordVisibility() {
        this.showOldPassword = !this.showOldPassword;
    }

    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onSubmit(passwordForm: NgForm) {
        // Reset messages
        this.errorMessage = '';
        this.successMessage = '';

        // Check if passwords match
        if (this.newPassword !== this.confirmPassword) {
            this.passwordMismatch = true;
            return;
        }

        // Prepare payload for backend
        const payload = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            email: 'janaka.perera@example.com' // Replace with actual user email from authentication service
        };

        // Send change password request
        this.http.post('http://172.104.165.74:8082/api/v1/user/change-password', payload)
            .subscribe({
                next: (response) => {
                    this.successMessage = 'Password changed successfully!';
                    this.resetForm(passwordForm);
                },
                error: (error) => {
                    this.errorMessage = error.error?.message || 'Failed to change password. Please try again.';
                }
            });
    }

    resetForm(form: NgForm) {
        form.reset();
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.passwordMismatch = false;
    }
}
