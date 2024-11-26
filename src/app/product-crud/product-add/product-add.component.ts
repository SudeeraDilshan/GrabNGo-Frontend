import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  addProductForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  showSuccessMessage = false;
  productId: string | null = null;

  categories = ['Category 01', 'Category 02', 'Category 03', 'Category 04', 'Category 05', 'Category 06', ];
  availabilityOptions = ['Out Of Stock', 'Available'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    const productId = this.route.snapshot.paramMap.get('id');
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      category: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      const productData = this.addProductForm.value;

      // Call the ProductService to add the product
      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          console.log('Generated Product ID:', response.id);
          this.showSuccessMessage = true;

          // Navigate to the Product Admin page after success
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/productAdmin']);
          }, 3000);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  loadProductDetails(productId: string) {
    // Fetch product details from backend using productId and populate the form
    console.log(`Loading product details for ID: ${productId}`);
    console.log('ProductId......', productId);
  }

  resetForm() {
    this.addProductForm.reset();
    this.imagePreview = null;
    const fileInput = document.getElementById(
      'product-image'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
