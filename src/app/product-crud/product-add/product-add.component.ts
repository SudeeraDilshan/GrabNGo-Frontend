import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  addProductForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  showSuccessMessage = false;

  categories = ['Category 01', 'Category 02', 'Category 03'];
  availabilityOptions = ['Out Of Stock', 'Available'];

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      category: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      console.log('Product Data:', this.addProductForm.value);
      this.showSuccessMessage = true;

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    } else {
      console.error('Form is invalid');
    }
  }

  resetForm() {
    this.addProductForm.reset(); 
    this.imagePreview = null; 
    const fileInput = document.getElementById(
      'product-image'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; 
    }
  }
}
