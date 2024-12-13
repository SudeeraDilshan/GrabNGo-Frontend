import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Product {
    categoryId: number;
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productQuantity: number;
    imageUrl: string;
}

interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
    isActive: boolean;
}

@Component({
    selector: 'app-filter-category',
    templateUrl: './filter-category.component.html',
    styleUrls: ['./filter-category.component.css'],
})
export class FilterCategoryComponent implements OnInit {
    categoryId: number = 0;
    categoryProducts: Product[] = [];
    categoryName: string = 'Category Products';
    productBackendUrl = 'http://172.207.18.25:8080/api/v1';
    categoryBackendUrl = 'http://172.207.18.25:8080/api/v1';

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.categoryId = +params['categoryId'];

       
      const state = this.router.getCurrentNavigation()?.extras.state as { categoryName?: string };
      if (state?.categoryName) {
        this.categoryName = state.categoryName;
      } else {
        this.fetchCategoryDetails(this.categoryId);
      }

            this.fetchCategoryProducts(this.categoryId);
        });
    }

  fetchCategoryDetails(categoryId: number): void {
    this.http.get<{ msg: string; data: Category }>(`${this.categoryBackendUrl}/categories/${categoryId}`)
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.categoryName = response.data.categoryName;  
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        error: (err) => {
          console.error('Error fetching category details:', err);
        },
      });
  }

  fetchCategoryProducts(categoryId: number): void {
    this.http.get<{ msg: string; data: Product[]; status: string }>(
      `${this.productBackendUrl}/product?categoryId=${categoryId}`
      
    )
    .subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.categoryProducts = response.data;
        } else {
          console.error(`Unexpected response format for category ID ${categoryId}:`, response);
          this.categoryProducts = [];
        }
      },
      error: (err) => {
        console.error('Error fetching products from backend:', err);
        if (err.status === 0) {
          console.error('Network error or CORS issue. Check API accessibility.');
        } else {
          console.error(`Backend returned error: ${err.message}`);
        }
        this.categoryProducts = []; 
      },
    });
  }

    viewProductDetails(product: Product): void {
        if (product && product.productId) {
            this.router.navigate([`/product/${product.productId}`]);
        } else {
            console.error('Product ID is missing. Cannot navigate to the product details page.');
        }
    }
}
