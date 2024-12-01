import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{
  editProductForm: FormGroup;
  imagePreview: string | null = null;
  showSuccessMessage = false;
  categories = ['Beauty and Health', 'Home and Garden', 'Phone and Telecommunication', 'Accessories	', 'Sports', 'Entertainment'];
  availabilityOptions = ['Available', 'Out of Stock'];
  productId: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router,private route: ActivatedRoute) {
    this.editProductForm = this.fb.group({
      productId: ['', ],
      productName: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log('Product ID from route:', productId); 
      this.productId = productId || '';  // Use the product ID to fetch product details
      this.fetchProductData();
    });
  }
  

  // Fetch product details from the backend
  fetchProductData(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product) => {
        if (product) {
          this.editProductForm.patchValue({
            productName: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            availability: product.availability,
          });
          this.imagePreview = product.imageUrl || null;
        } else {
          console.error('Product data is null or undefined!');
          this.router.navigate(['/productAdmin']);
        }
      },
      (error) => {
        console.error('Error fetching product data:', error);
        this.router.navigate(['/productAdmin']);
      }
    );
  }
  
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = this.editProductForm.value;
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/productAdmin']); // Navigate after success
          }, 3000);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    } else {
      console.error('Form is invalid!');
    }
  }

  // Reset Form
  cancel(){
    this.editProductForm.reset();
    this.router.navigate(['/productAdmin']);
  }
}