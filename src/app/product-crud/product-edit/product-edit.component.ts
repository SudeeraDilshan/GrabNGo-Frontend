import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

export interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  editProductForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  submitted: boolean = false;
  showSuccessMessage = false;
  categories: Category[] = [];
  availabilityOptions = ['Available', 'Out of Stock'];
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.editProductForm = this.fb.group({
      // productId: ['', ],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productQuantity: ['', Validators.required],
      imageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
      available: [true, Validators.required],
      active: [true],
    });
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe((data) => {
        const productData = data.data;
        this.editProductForm.controls['productName'].setValue(productData.productName);
        this.editProductForm.controls['productDescription'].setValue(productData.productDescription);
        this.editProductForm.controls['productPrice'].setValue(productData.productPrice);
        this.editProductForm.controls['productQuantity'].setValue(productData.productQuantity);
        this.editProductForm.controls['imageUrl'].setValue(productData.imageUrl);
        this.editProductForm.controls['categoryId'].setValue(productData.categoryId);
        this.editProductForm.controls['available'].setValue(productData.available);

        // Ensure imagePreview is set
        this.imagePreview = productData.imageUrl;
    });
    this.loadCategories();
}


  resetForm() {
    this.editProductForm.reset();
    this.submitted = false;
    this.router.navigate(['/productAdmin']);
    this.imagePreview = null;
    const fileInput = document.getElementById(
      'product-image'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = (
          categories as unknown as ApiResponse<Category[]>
        ).data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.editProductForm.patchValue({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

    fetchProductData(): void {
        this.productService.getProductById(this.productId).subscribe(
            (product) => {
                if (product) {
                    this.editProductForm.patchValue({
                        productName: product.data.productName,
                        productDescription: product.data.productDescription,
                        productPrice: product.data.productPrice,
                        productQuantity: product.data.productQuantity,
                        imageUrl: product.data.imageUrl,
                        categoryId: product.data.categoryId,
                        availability: product.data.available,
                    });
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

  onSubmit(): void {
    if (this.editProductForm.valid) {
      const productData = this.editProductForm.value;
      const updatedProduct = {
        productName: productData.productName,
        productDescription: productData.productDescription,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        imageUrl: productData.imageUrl,
        categoryId: parseInt(productData.categoryId, 10),
        available: productData.available === 'Available',
      };
      console.log('Payload to API:', updatedProduct);
      this.productService
        .updateProduct(this.productId, updatedProduct)
        .subscribe({
          next: (response) => {
            console.log('Update response:', response);
            this.showSuccessMessage = true;
          },
          error: (err) => {
            console.error('Error updating product:', err);
          },
        });
    }
  }

  cancel() {
    // this.editProductForm.reset();
    this.router.navigate(['/productAdmin']);
  }

  editProduct() {
    this.router.navigate(['/productAdmin']);
  }
}
