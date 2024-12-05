import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  // Default data for form
  formData = {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    zipcode: '',
  };

  // List of countries (example, can be replaced with dynamic data)
  countries = ['United States', 'Canada', 'United Kingdom'];

  // Form submission handler
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
