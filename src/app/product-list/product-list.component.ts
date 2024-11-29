
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
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
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

  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  categories: Category[] = [];

  searchControl = new FormControl('');
  cartCount = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchNewArrivals();
    this.fetchFeaturedProducts();
    this.fetchCategories();
  }

  fetchNewArrivals(): void {
    this.http.get<Product[]>('http:///api/new-arrivals')
      .subscribe(data => {
        this.newArrivals = data;
      });
  }

  fetchFeaturedProducts(): void {
    this.http.get<Product[]>('http://backend-url')
      .subscribe(data => {
        this.featuredProducts = data;
      });
  }

  fetchCategories(): void {
    this.http.get<Category[]>('http://backend-url/api/categories')
      .subscribe(data => {
        this.categories = data;
      });
  }

  onFilterClick(): void {
    this.router.navigate(['/filter']);
  }
}
