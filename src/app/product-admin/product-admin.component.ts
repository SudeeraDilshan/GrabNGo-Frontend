import { Component } from '@angular/core';
import { ProductDeleteComponent } from '../product-crud/product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

export interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: string;
    imageUrl: string;
    categoryId: string;
    active: boolean;
    available: boolean;
}

export interface Category {
    categoryId: string;
    categoryName: string;
    description: string;
    isActive: boolean;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T
}

@Component({
    selector: 'app-product-admin',
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent {
    displayedColumns: string[] = ['Product Name', 'Category', 'Price', 'Availability', 'Action'];
    products: Product[] = [];
    categories: Category[] = [];

    constructor(private dialog: MatDialog, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
    }

    loadProducts(): void {
      this.productService.getProducts().subscribe({
        next: (products) => {
          const response = products as unknown as ApiResponse<Product[]>;
          console.log('Raw products from server:', response.data); 
          this.products = response.data.filter(product => product.available);
          console.log('Filtered productsss:', this.products);
        },
        error: (err) => {
          console.error('Error loading products:', err);
        },
      });
    }
    
    

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (categories) => {
                this.categories = (categories as unknown as ApiResponse<Category[]>).data;
            },
            error: (err) => {
                console.error('Error loading categories:', err);
            },
        });
    }

    addProduct() {
        console.log('Navigating to add  form');
        this.router.navigate(['/productAdd']);
    }

    editProduct(product: any) {
        this.router.navigate(['/productEdit', product.productId]);
        console.log("product iddddd: ", product.productId);
    }

    deleteProduct(product: Product): void {
      const dialogRef = this.dialog.open(ProductDeleteComponent);
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.productService.deleteProduct(product.productId, product).subscribe({
            next: () => {
              this.loadProducts(); // Reload from the server
              console.log('Product deleted:', product);
            },
            error: (err) => {
              console.error('Error deleting product:', err);
            },
          });
        }
      });
    }    
    
    

    updateCategory(product: Product): void {
        this.productService.updateProduct(product.productId, {categoryId: product.categoryId}).subscribe({
            next: () => console.log('Category updated:', product),
            error: (err) => console.error('Error updating category:', err),
        });
    }

    updateAvailability(product: Product): void {
        this.productService.updateProduct(product.productId, {available: product.available}).subscribe({
            next: () => console.log('Availability updated:', product),
            error: (err) => console.error('Error updating availability:', err),
        });
    }

}
