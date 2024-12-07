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
  showSuccessMessage = false;
  categories = ['Beauty and Health', 'Home and Garden', 'Phone and Telecommunication', 'Accessories	', 'Sports', 'Entertainment'];
  availabilityOptions = ['Available', 'Out of Stock'];
  productId!: string;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.editProductForm = this.fb.group({
      productId: ['', ],
      productName: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(0)]],
      productDescription: ['', Validators.required],
      categoryId: ['', Validators.required],
      available: [false], 
    });
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!
    this.productService.getProductById(this.productId).subscribe(data =>{
      console.log(data.data);
      this.editProductForm.controls["productName"].setValue(data.data.productName);
      this.editProductForm.controls["productDescription"].setValue(data.data.productDescription);
      this.editProductForm.controls["productPrice"].setValue(data.data.productPrice);
      this.editProductForm.controls["productQuantity"].setValue(data.data.productQuantity);
      this.editProductForm.controls["imageUrl"].setValue(data.data.imageUrl);
      this.editProductForm.controls["categoryId"].setValue(data.data.categoryId);
    })
  }

  fetchProductData(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product) => {
        if (product) {
          this.editProductForm.patchValue({
            productName: product.data.productName,
            productPrice: product.data.productPrice,
            productDescription: product.data.productDescription,
            categoryId: product.data.categoryId,
            // availability: product.availability,
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
        productId: this.productId,
        productName: productData.productName,
        productPrice: productData.productPrice,
        productDescription: productData.productDescription,
        productQuantity: productData.productQuantity,
        imageUrl: productData.imageUrl,
        categoryId: productData.categoryId,
        active: productData.active,
        available: productData.available
      }
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: (response) => {
          console.log('Category Added Response:', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/productAdmin']); 
          }, 3000);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    }
  }

  // Reset Form
  cancel(){
    // this.editProductForm.reset();
    this.router.navigate(['/productAdmin']);
  }
}