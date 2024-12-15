import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service'; // Import the service
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrl: './category-edit.component.css'
})

export class CategoryEditComponent {
    editCategoryForm: FormGroup;
    showSuccessMessage: boolean = false;
    categoryId!: string;

    constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.editCategoryForm = this.fb.group({
            categoryName: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')!
        this.categoryService.getCategoryById(this.categoryId).subscribe(data => {
            console.log(data.data);
            this.editCategoryForm.controls["categoryName"].setValue(data.data.categoryName);
            this.editCategoryForm.controls["description"].setValue(data.data.description);
        })
    }

    cancel() {
        this.router.navigate(['/category']);
    }

    onSubmit(): void {
        if (this.editCategoryForm.valid) {
            const categoryData = this.editCategoryForm.value;
            const updateCategory = {
                id: this.categoryId,
                categoryName: categoryData.categoryName,
                description: categoryData.description,
                isActive: true
            }
            // Use the service to send data to the backend
            this.categoryService.updateCategory(this.categoryId, updateCategory).subscribe({
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
