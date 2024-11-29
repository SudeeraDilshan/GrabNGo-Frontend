import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent {
  constructor(public dialogRef: MatDialogRef<CategoryDeleteComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false); 
  }

  onDelete(): void {
    this.dialogRef.close(true); 
  }
}
