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
    showSuccessMessage: boolean = false;

    constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router) {
        this.addCategoryForm = this.fb.group({
            categoryName: ['', Validators.required],
            description: ['', Validators.required],
            isActive: [true],
        });
    }

    ngOnInit(): void {
    }

    resetForm(): void {
        this.router.navigate(['/category']);
        this.addCategoryForm.reset();
    }

    onSubmit(): void {
        if (this.addCategoryForm.valid) {
            const categoryData = this.addCategoryForm.value;
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
