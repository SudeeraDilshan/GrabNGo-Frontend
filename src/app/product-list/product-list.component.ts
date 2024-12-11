 
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Product {
  categoryId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity:number;
  imageUrl: string;
}

interface Category {
  categoryId: number;
  categoryName: string;
  imageUrl: string;
  description:string;
  isActive:boolean
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  originalNewArrivals: Product[] = [];
  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  searchControl = new FormControl('');
  cartCount = 0;

  selectedCategory: number = 0;
  sortByPrice: string = 'asc';
  isFilterOpen: boolean = false;

   productBackendUrl = 'http://172.207.18.25:8084/api/v1';
   productBackendUrlBase = 'http://172.207.18.25:8084';
  private categoryBackendUrl = 'http://172.207.18.25:8086/api/v1';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.http.get<{ msg: string; data: Product[]; status: string }>(`${this.productBackendUrl}/product`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.originalNewArrivals = response.data;
          this.newArrivals = [...this.originalNewArrivals];
        } else {
          console.error('Unexpected response format:', response);
          this.originalNewArrivals = [];
          this.newArrivals = [];
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.originalNewArrivals = [];
        this.newArrivals = [];
      },
    });
  }
  
  fetchCategories(): void {
    this.http.get<{msg: string; data: Category[]; status: string}>(`${this.categoryBackendUrl}/categories`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.error('Unexpected response format:', response);
          this.categories = [];
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.categories = [];
      },
    });
  }
  

  resetFilters(): void {
    this.newArrivals = [...this.originalNewArrivals];
  }

  onFilterClick(): void {
    this.isFilterOpen = true;
  }

  closeFilter(): void {
    this.isFilterOpen = false;
  }

  applyFilter(): void {
    this.isFilterOpen = false;
    this.filterProducts();
  }

  filterProducts(): void {
    let filteredProducts = [...this.originalNewArrivals];

    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.categoryId === this.selectedCategory);
    }

    if (this.sortByPrice === 'asc') {
      filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else {
      filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    }

    this.newArrivals = filteredProducts;
  }

  viewProductDetails(product: Product): void {
    this.router.navigate([`/product/${product.productId}`]);
    
  }
}
