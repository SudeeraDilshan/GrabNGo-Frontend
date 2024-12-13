import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-product-delete',
    templateUrl: './product-delete.component.html',
    styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
    constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>) {
    }

    onNoClick(): void {
        console.log('Deletion canceled');
        this.dialogRef.close(false); 
      }
      
      onDelete(): void {
        console.log('Deletion confirmed');
        this.dialogRef.close(true); 
      }
      
}
