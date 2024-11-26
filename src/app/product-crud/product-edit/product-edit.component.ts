import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{
  editProductForm: FormGroup;
  imagePreview: string | null = null;
  showSuccessMessage = false;
  categories = ['Category 01', 'Category 02', 'Category 03'];
  availabilityOptions = ['Available', 'Out of Stock'];
  productId: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
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
      console.log('Product ID from route:', productId);  // Ensure this logs the ID correctly
      this.productId = productId || '';  // Use the product ID to fetch product details
      this.fetchProductData();
    });
  }
  

  // Fetch product details from the backend
  fetchProductData(): void {
    if (this.productId) {
      // Make sure productId is used in the API URL
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.editProductForm.patchValue({
            productName: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            availability: product.availability
          });
          this.imagePreview = product.imageUrl;  // Assuming product includes image URL
        },
        (error) => {
          console.error('Error fetching product data:', error);
        }
      );
    } else {
      console.error('Product ID is missing!');
    }
  }
  

  // Upload Image
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // Submit the updated product
  onSubmit(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = this.editProductForm.value;
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
      });
    }
  }

  // Reset Form
  resetForm(): void {
    this.editProductForm.reset();
    this.imagePreview = null;
  }
}