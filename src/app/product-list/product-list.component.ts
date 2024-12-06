
// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// interface Product {
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
//   newArrivals: Product[] = [
//     { id: 1, name: 'Product 1', description: 'Item description', price: 1999, imageUrl: 'assets/product-image-1.jpg' },
//     { id: 2, name: 'Product 2', description: 'Item description', price: 2999, imageUrl: 'assets/product-image-2.jpg' },
//     { id: 3, name: 'Product 3', description: 'Item description', price: 2999, imageUrl: 'assets/product-image-2.jpg' },
//     { id: 4, name: 'Product 2', description: 'Item description', price: 2999, imageUrl: 'assets/product-image-2.jpg' }
//   ];

   
//   featuredProducts: Product[] = [
//     { id: 3, name: 'Product 3', description: 'Item description', price: 3999, imageUrl: 'assets/product-image-3.jpg' },
//     { id: 4, name: 'Product 4', description: 'Another great item', price: 4999, imageUrl: 'assets/product-image-4.jpg' },
//     { id: 5, name: 'Product 5', description: 'A fantastic product', price: 5999, imageUrl: 'assets/product-image-5.jpg' },
//     { id: 6, name: 'Product 6', description: 'High-quality item', price: 6999, imageUrl: 'assets/product-image-6.jpg' },
//     { id: 7, name: 'Product 7', description: 'Best seller', price: 7999, imageUrl: 'assets/product-image-7.jpg' },
//     { id: 8, name: 'Product 8', description: 'Customer favorite', price: 8999, imageUrl: 'assets/product-image-8.jpg' }
//   ];
  
   
//   categories: Category[] = [
//     { id: 1, name: 'Category 1', imageUrl: 'assets/category-image-1.jpg' },
//     { id: 2, name: 'Category 2', imageUrl: 'assets/category-image-2.jpg' },
//     { id: 3, name: 'Category 3', imageUrl: 'assets/category-image-3.jpg' },
//     { id: 4, name: 'Category 4', imageUrl: 'assets/category-image-4.jpg' },
//     { id: 5, name: 'Category 5', imageUrl: 'assets/category-image-5.jpg' },
//     { id: 6, name: 'Category 6', imageUrl: 'assets/category-image-6.jpg' },
     
//   ];
  

//   searchControl = new FormControl('');
//   cartCount = 0;

//   constructor() {}

//   ngOnInit(): void {}
// }

// exsist
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  categoryId: number;
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
  originalNewArrivals: Product[] = [
    {
      id: 1, categoryId: 1, name: 'Men\'s Casual T-Shirt', description: 'Comfortable cotton t-shirt, perfect for everyday wear',
      price: 999, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2, categoryId: 2, name: 'Women\'s Summer Dress', description: 'Light and breezy dress, ideal for sunny days',
      price: 1299, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 3, categoryId: 1, name: 'Men\'s Slim Fit Jeans', description: 'Stylish slim-fit jeans with a modern cut',
      price: 1799, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 4, categoryId: 2, name: 'Women\'s Floral Blouse', description: 'Elegant floral blouse for casual or semi-formal occasions',
      price: 1599, imageUrl: 'https://via.placeholder.com/150'
    }
  ];

  newArrivals: Product[] = [...this.originalNewArrivals];

  featuredProducts: Product[] = [
    {
      id: 5, categoryId: 1, name: 'Men\'s Sports Jacket', description: 'Breathable sports jacket, perfect for workouts and casual wear',
      price: 2499, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 6, categoryId: 2, name: 'Women\'s High-Waisted Skirt', description: 'Chic and stylish high-waisted skirt for all occasions',
      price: 1999, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 7, categoryId: 1, name: 'Men\'s Denim Jacket', description: 'Classic denim jacket, a wardrobe essential for every man',
      price: 2999, imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 8, categoryId: 2, name: 'Women\'s Knit Sweater', description: 'Cozy and soft knit sweater, perfect for chilly weather',
      price: 2199, imageUrl: 'https://via.placeholder.com/150'
    }
  ];

  categories: Category[] = [
    { id: 1, name: 'Men\'s Clothing', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Women\'s Clothing', imageUrl: 'https://via.placeholder.com/150' }
  ];

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
      filteredProducts.sort((a, b) => a.price - b.price);
    } else {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    this.newArrivals = filteredProducts;
  }

  viewProductDetails(product: Product): void {
    this.router.navigate([`/product/${product.id}`]);
  }
}
