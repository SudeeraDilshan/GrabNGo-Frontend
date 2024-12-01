import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDeleteComponent } from '../category-crud/category-delete/category-delete.component';
import { CategoryService } from '../services/category.service'; 

interface Category {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category-view-admin',
  templateUrl: './category-view-admin.component.html',
  styleUrls: ['./category-view-admin.component.css']
})
export class CategoryViewAdminComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  categories: Category[] = [
    { id: 'CG001', name: 'Beauty and Health', description: 'This includes skincare, cosmetics, wellness supplements, personal hygiene...' },
    { id: 'CG002', name: 'Home and Garden', description: 'Items that improve the functionality, comfort, and aesthetics of living spaces...' },
    { id: 'CG003', name: 'Phone and telecommunication', description: 'Equipment, apparel, and accessories for sports, outdoor activities, and leisure...' },
    { id: 'CG004', name: 'Accessories', description: 'Fashion items that complement clothing, including jewelry, watches, handbags, belts...' },
    { id: 'CG005', name: 'Sports and Entertainment', description: 'Devices and accessories related to mobile and telecommunications, such as smart...' },
  ];
  constructor(private dialog: MatDialog, private router: Router, private categoryService: CategoryService) {}

  editCategory(category: Category) {
    console.log('Delete Category ID:', category.id);
    console.log('Editing Category:', category);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    // Fetch categories from backend
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }
  
  deleteCategory(category: Category): void {
    // Open confirmation dialog
    const dialogRef = this.dialog.open(CategoryDeleteComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Call service to delete category from backend
        this.categoryService.deleteCategory(category.id).subscribe({
          next: () => {
            // Remove category from list after successful deletion
            this.categories = this.categories.filter(c => c.id !== category.id);
            console.log('Category deleted:', category);
            console.log('Updated categories after deletion:', this.categories); 
          },
          error: (err) => {
            console.error('Error deleting category:', err);
          },
        });
      }
    });
  }

  addCategory() {
    console.log('Adding a New Category');
  }
}
