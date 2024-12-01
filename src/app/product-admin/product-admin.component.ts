import { Component } from '@angular/core';
import { ProductDeleteComponent } from '../product-crud/product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  availability: string;
}

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent {
  products = [
    { id: '1', name: 'Product 01', category: 'Beauty and Health', price: 1999.00, availability: 'Available' },
    { id: '2', name: 'Product 02', category: 'Home and Garden', price: 1999.00, availability: 'Out Of Stock' },
    { id: '3', name: 'Product 03', category: 'Phone and Telecommunication', price: 1999.00, availability: 'Out Of Stock' },
    { id: '4', name: 'Product 04', category: 'Beauty and Health', price: 1999.00, availability: 'Available' },
    { id: '5', name: 'Product 05', category: 'Entertainment', price: 1999.00, availability: 'Out Of Stock' },
    { id: '6', name: 'Product 06', category: 'Sports', price: 1999.00, availability: 'Out Of Stock' },
    { id: '7', name: 'Product 07', category: 'Phone and Telecommunication', price: 1999.00, availability: 'Available' },
  ];
  
  categories = ['Beauty and Health', 'Home and Garden', 'Phone and Telecommunication', 'Accessories	', 'Sports', 'Entertainment'];

  constructor(private dialog: MatDialog, private router: Router, private productService: ProductService) {}

  addProduct() {
    console.log('Navigating to add product form');
    this.router.navigate(['/productAdd']);
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
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id);
            console.log('Product deleted:', product);
          },
          error: (err) => {
            console.error('Error deleting product:', err);
          },
        });
      }
    });
  }
}
