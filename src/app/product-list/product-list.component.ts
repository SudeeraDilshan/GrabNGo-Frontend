import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
  imageUrl: string;
  description: string;
  isActive: boolean;
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

    productBackendUrl = 'http://172.207.18.25:8080/api/v1';
    private categoryBackendUrl = 'http://172.207.18.25:8080/api/v1';

  // Declare filteredProducts here
  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    const categoryId = this.route.snapshot.paramMap.get('id');

    const categoryName = this.router.getCurrentNavigation()?.extras.state?.['categoryName'];
    console.log(categoryId, categoryName);
  }

  fetchProducts(): void {
    this.http.get<{ msg: string; data: Product[]; status: string }>(`${this.productBackendUrl}/product`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.originalNewArrivals = response.data;
          console.log("Fetched products:", this.originalNewArrivals); // Log fetched products
          this.filteredProducts = [...this.originalNewArrivals];  // Initialize filteredProducts
          this.newArrivals = [...this.originalNewArrivals];
        } else {
          console.error('Unexpected response format:', response);
          this.originalNewArrivals = [];
          this.filteredProducts = [];
          this.newArrivals = [];
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.originalNewArrivals = [];
        this.filteredProducts = [];
        this.newArrivals = [];
      },
    });
  }

  fetchCategories(): void {
    this.http.get<{ msg: string; data: Category[]; status: string }>(`${this.categoryBackendUrl}/categories`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.categories = response.data;
          console.log("Fetched categories: ", this.categories);  // Log to verify categories data
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

  onSearch(): void {
    const searchTerm = this.searchControl.value?.toLowerCase();
    console.log("Search term:", searchTerm); // Log the search term
    if (searchTerm) {
      this.filteredProducts = this.originalNewArrivals.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm) ||
        product.productDescription.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredProducts = [...this.originalNewArrivals];
    }
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

    filterProducts(): void {
        let filteredProducts = [...this.originalNewArrivals];

    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    }

    if (this.sortByPrice === 'asc') {
      filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (this.sortByPrice === 'desc') {
      filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    }

        this.newArrivals = filteredProducts;
    }

  viewProductDetails(product: Product): void {
    if (product && product.productId) {
      console.log(`Navigating to product details page for productId: ${product.productId}`);

      this.router.navigate(['/product', product.productId]);
    } else {
      console.error('Product ID is missing. Cannot navigate to the product details page.');
    }
  }

  goToCategory(categoryId: number, categoryName: string): void {
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    if (category) {
      this.router.navigate(['/category', categoryId], { state: { categoryName: categoryName } });
    } else {
      console.error('Category not found');
    }
  }

  applyFilter(): void {
    this.isFilterOpen = false;

    const selectedCategoryId = Number(this.selectedCategory);
    console.log("Selected Category ID: ", selectedCategoryId);

    this.filterProducts();

    const category = this.categories.find((cat) => cat.categoryId === selectedCategoryId);
    if (category) {
      console.log("Category found: ", category);
      this.router.navigate(['/category', selectedCategoryId], {
        state: { categoryName: category.categoryName },
      });
    } else {
      console.error('Category not found', selectedCategoryId);
    }
  }
}
