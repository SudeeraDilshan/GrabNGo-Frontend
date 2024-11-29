import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDeleteComponent } from '../category-crud/category-delete/category-delete.component';

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
    { id: 'CG005', name: 'Sport and Entertainment', description: 'Devices and accessories related to mobile and telecommunications, such as smart...' },
  ];
  constructor(private dialog: MatDialog, private router: Router) {}

  editCategory(category: Category) {
    console.log('Delete Category ID:', category.id);
    console.log('Editing Category:', category);
  }

  deleteCategory(category: Category): void{
    console.log('Delete Category ID:', category.id);
    console.log('Deleting Category:', category);

    const dialogRef = this.dialog.open(CategoryDeleteComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.categories = this.categories.filter(p => p !== category);
        console.log('Category deleted:', category);
        console.log('Updated category list:', this.categories);
      }
    });
  }

  addCategory() {
    console.log('Adding a New Category');
  }
}
