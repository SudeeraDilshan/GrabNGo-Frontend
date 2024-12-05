import { Component } from '@angular/core';
import { ProductDeleteComponent } from '../product-crud/product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent {
  products = [
    { name: 'Product 01', category: 'Category 02', price: 1999.00, availability: 'Available' },
    { name: 'Product 02', category: 'Category 01', price: 1999.00, availability: 'Out Of Stock' },
    { name: 'Product 03', category: 'Category 05', price: 1999.00, availability: 'Out Of Stock' },
    { name: 'Product 04', category: 'Category 03', price: 1999.00, availability: 'Available' },
    { name: 'Product 05', category: 'Category 03', price: 1999.00, availability: 'Out Of Stock' },
    { name: 'Product 06', category: 'Category 02', price: 1999.00, availability: 'Out Of Stock' },
    { name: 'Product 07', category: 'Category 05', price: 1999.00, availability: 'Available' },

  ];

  categories = ['Category 01', 'Category 02', 'Category 03', 'Category 04', 'Category 05'];

  constructor(private dialog: MatDialog, private router: Router) {}

  addProduct() {
    // Logic to add a new product
  }

  editProduct(product: any) {
    console.log('Navigating to edit for product ID:', product.id);
    this.router.navigate(['/productEdit', product.id]);
    console.log("product iddddd: ", product.id);
  }  

  deleteProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent);
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.products = this.products.filter(p => p !== product);
        console.log('Product deleted:', product);
        console.log('Updated products list:', this.products);
      }
    });
  }
}
