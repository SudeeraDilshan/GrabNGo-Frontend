import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.css']
})
export class FilterResultsComponent implements OnInit {
  searchQuery: string = '';  
  searchControl = new FormControl('');
  products: Product[] = [];
  totalItems: number = 0;  
  sortOptions = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Newest First'];
  selectedSort = 'Best Match';  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    this.searchControl.valueChanges.subscribe(value => {
      this.searchQuery = value || '';  
      this.initializeProducts();
    });

    
    this.initializeProducts();
  }

  initializeProducts(): void {
    
    this.http.get<Product[]>('api/products', {
      params: {
        query: this.searchQuery,  
        sort: this.selectedSort.toLowerCase() 
      }
    }).subscribe({
      next: (data) => {
        this.products = data;  
        this.totalItems = data.length; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = [];  
        this.totalItems = 0;  
      }
    });
  }


  onSearch(): void {
    this.searchQuery = this.searchControl.value || '';
    this.initializeProducts();
  }

  
  onSortChange(): void {
    this.initializeProducts();
  }

  
  saveForLater(product: Product): void {
    console.log('Saving product for later:', product);
  }
}
