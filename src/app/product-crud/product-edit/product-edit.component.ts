import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  editProductForm: FormGroup;
  imagePreview: string | null = null;
  showSuccessMessage = false;

  categories = ['Category 01', 'Category 02', 'Category 03'];
  availabilityOptions = ['Available', 'Out of Stock'];

  constructor(private fb: FormBuilder) {
    this.editProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  // Upload Image
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // Enable Editing (Optional Logic)
  enableEditing(controlName: string) {
    this.editProductForm.get(controlName)?.enable();
  }

  // Submit Form
  onSubmit() {
    if (this.editProductForm.valid) {
      console.log('Product updated:', this.editProductForm.value);
      this.showSuccessMessage = true;

      // Simulate backend update logic
      setTimeout(() => (this.showSuccessMessage = false), 3000);
    }
  }

  // Reset Form
  resetForm() {
    this.editProductForm.reset();
    this.imagePreview = null;
  }
}