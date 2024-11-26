import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  addCategoryForm: FormGroup;
  imagePreview: string | undefined;
  showSuccessMessage: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  // Handle image upload and preview
  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Reset the form to its initial state
  resetForm(): void {
    this.addCategoryForm.reset();
    this.imagePreview = undefined;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      // Simulate category addition logic (e.g., save to the server)
      // You can replace this with an actual API call or service method

      console.log('Category Added:', this.addCategoryForm.value);

      // Show success message
      this.showSuccessMessage = true;

      // Reset the form after submission
      this.resetForm();
      
      // Hide success message after a few seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }
}
