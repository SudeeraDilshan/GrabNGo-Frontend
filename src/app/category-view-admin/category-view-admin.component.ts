import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDeleteComponent } from '../category-crud/category-delete/category-delete.component';
import { CategoryService } from '../services/category.service';
import { ApiResponse } from "../types";

export interface Category {
    categoryId: string;
    categoryName: string;
    description: string;
    isActive: boolean;
}

@Component({
    selector: 'app-category-view-admin',
    templateUrl: './category-view-admin.component.html',
    styleUrls: ['./category-view-admin.component.css']
})
export class CategoryViewAdminComponent {
    displayedColumns: string[] = ['name', 'description', 'action'];
    categories: Category[] = [];

    constructor(private dialog: MatDialog, private router: Router, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.loadCategories();
    }

    addCategory() {
        console.log('Adding a New Category');
    }

    editCategory(category: Category) {
        console.log('Editing Category:', category);
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (categories) => {
                this.categories = (categories as unknown as ApiResponse<Category[]>).data;
                console.log('Categories loaded:', this.categories);
            },
            error: (err) => {
                console.error('Error loading categories:', err);
            },
        });
    }

    deleteCategory(category: Category): void {
        const dialogRef = this.dialog.open(CategoryDeleteComponent);
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                category.isActive = false;
                this.categoryService.deleteCategory(category.categoryId, category).subscribe({
                    next: () => {
                        this.categories = this.categories.filter(c => c.categoryId !== category.categoryId);
                    },
                    error: (err) => {
                        console.error('Error deleting category:', err);
                    },
                });
            }
        });
    }

}
