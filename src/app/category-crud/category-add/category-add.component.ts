import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent implements OnInit {
  addCategoryForm: FormGroup;
  imagePreview: string | undefined;
  showSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private router: Router
  ) {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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

  resetForm(): void {
    this.addCategoryForm.reset();
    this.imagePreview = undefined;
  }

  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      const categoryData = this.addCategoryForm.value;

      // Use the service to send data to the backend
      this.categoryService.addCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Category Added Response:', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/category']);
          }, 3000);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    }
  }
}
