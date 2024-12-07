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
  submitted: boolean = false;

  categories = ['Beauty and Health', 'Home and Garden', 'Phone and Telecommunication', 'Accessories	', 'Sports', 'Entertainment'];
  availabilityOptions = ['Out Of Stock', 'Available'];

  constructor( private fb: FormBuilder,  private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productDescription: ['', Validators.required],
      imageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
      available: [true],
      active: [true]
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.addProductForm.patchValue({ imageUrl: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addProductForm.valid) {
      const productData = this.addProductForm.value;
      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Form submitted:', this.addProductForm.value);
          console.log('Product added successfully:', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/productAdmin']);
          }, 3000);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }

  resetForm() {
    this.addProductForm.reset();
    this.submitted = false;
    this.router.navigate(['/productAdmin']);
    this.imagePreview = null;
    const fileInput = document.getElementById( 'product-image' ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
