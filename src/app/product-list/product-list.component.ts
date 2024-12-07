import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product/product.service';
 

interface Product {
  categoryId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity:number;
  imageUrl: string;
  available: boolean;
  active: boolean;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  originalNewArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  newArrivals: Product[] = [];
  searchControl = new FormControl('');
  cartCount = 0;
  selectedCategory: number = 0;
  sortByPrice: string = 'asc';
  isFilterOpen: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.resetFilters();
    this.fetchProducts();  
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.originalNewArrivals = products;
        this.resetFilters();  // Apply filters after loading the products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
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


// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// interface Product {
//   categoryId: number;
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   imageUrl: string;
// }

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   originalNewArrivals: Product[] = [];
//   newArrivals: Product[] = [];
//   featuredProducts: Product[] = [];
//   categories: Category[] = [];
//   searchControl = new FormControl('');
//   cartCount = 0;

//   selectedCategory: number = 0;
//   sortByPrice: string = 'asc';
//   isFilterOpen: boolean = false;

//   private productBackendUrl = 'http://172.104.165.74:8084'; 
//   private categoryBackendUrl = 'http://172.104.165.74:8086'; 

//   constructor(private router: Router, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchProducts();
//     this.fetchCategories();
//   }

//   fetchProducts(): void {
//     this.http.get<Product[]>(`${this.productBackendUrl}/products`).subscribe({
//       next: (products) => {
//         this.originalNewArrivals = products;
//         this.newArrivals = [...this.originalNewArrivals];
//       },
//       error: (err) => {
//         console.error('Error fetching products:', err);
//       },
//     });
//   }

//   fetchCategories(): void {
//     this.http.get<Category[]>(`${this.categoryBackendUrl}/categories`).subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Error fetching categories:', err);
//       },
//     });
//   }

//   resetFilters(): void {
//     this.newArrivals = [...this.originalNewArrivals];
//   }

//   onFilterClick(): void {
//     this.isFilterOpen = true;
//   }

//   closeFilter(): void {
//     this.isFilterOpen = false;
//   }

//   applyFilter(): void {
//     this.isFilterOpen = false;
//     this.filterProducts();
//   }

//   filterProducts(): void {
//     let filteredProducts = [...this.originalNewArrivals];

//     if (this.selectedCategory) {
//       filteredProducts = filteredProducts.filter(product => product.categoryId === this.selectedCategory);
//     }

//     if (this.sortByPrice === 'asc') {
//       filteredProducts.sort((a, b) => a.price - b.price);
//     } else {
//       filteredProducts.sort((a, b) => b.price - a.price);
//     }

//     this.newArrivals = filteredProducts;
//   }

//   viewProductDetails(product: Product): void {
//     this.router.navigate([`/product/${product.id}`]);
//   }
// }
