 
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  categoryId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity:number;
  imageUrl: string;
  available: true;
  active: true;
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
  originalNewArrivals: Product[] =  [
    {
      productId: 1,
      categoryId: 1,
      productName: 'Men\'s Casual T-Shirt',
      productDescription: 'Comfortable cotton t-shirt, perfect for everyday wear',
      productPrice: 999,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 10,
      available: true,
      active: true
    },
    {
      productId: 2,
      categoryId: 2,
      productName: 'Women\'s Summer Dress',
      productDescription: 'Light and breezy dress, ideal for sunny days',
      productPrice: 1299,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 8,
      available: true,
      active: true
    },
    {
      productId: 3,
      categoryId: 1,
      productName: 'Men\'s Slim Fit Jeans',
      productDescription: 'Stylish slim-fit jeans with a modern cut',
      productPrice: 1799,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 5,
      available: true,
      active: true
    },
    {
      productId: 4,
      categoryId: 2,
      productName: 'Women\'s Floral Blouse',
      productDescription: 'Elegant floral blouse for casual or semi-formal occasions',
      productPrice: 1599,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 12,
      available: true,
      active: true
    }
  ];

  featuredProducts: Product[] = [
    {
      productId: 5,
      categoryId: 1,
      productName: 'Men\'s Sports Jacket',
      productDescription: 'Breathable sports jacket, perfect for workouts and casual wear',
      productPrice: 2499,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 7,
      available: true,
      active: true
    },
    {
      productId: 6,
      categoryId: 2,
      productName: 'Women\'s High-Waisted Skirt',
      productDescription: 'Chic and stylish high-waisted skirt for all occasions',
      productPrice: 1999,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 9,
      available: true,
      active: true
    },
    {
      productId: 7,
      categoryId: 1,
      productName: 'Men\'s Denim Jacket',
      productDescription: 'Classic denim jacket, a wardrobe essential for every man',
      productPrice: 2999,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 4,
      available: true,
      active: true
    },
    {
      productId: 8,
      categoryId: 2,
      productName: 'Women\'s Knit Sweater',
      productDescription: 'Cozy and soft knit sweater, perfect for chilly weather',
      productPrice: 2199,
      imageUrl: 'https://via.placeholder.com/150',
      productQuantity: 6,
      available: true,
      active: true
    }
  ];


  categories: Category[] = [
    { id: 1, name: 'Men', imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Women', imageUrl: 'https://via.placeholder.com/100' },
  ];

  newArrivals: Product[] = [];
  searchControl = new FormControl('');
  cartCount = 0;

  selectedCategory: number = 0;
  sortByPrice: string = 'asc';
  isFilterOpen: boolean = false;
 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.resetFilters();
    
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
