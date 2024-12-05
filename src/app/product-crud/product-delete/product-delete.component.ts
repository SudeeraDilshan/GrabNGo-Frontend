import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false); 
  }

  onDelete(): void {
    this.dialogRef.close(true); 
  }
}
