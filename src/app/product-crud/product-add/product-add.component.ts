import { Component } from '@angular/core';
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
    data: T
}

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
    categories: Category[] = [];
    imageFile: File | null = null;

    availabilityOptions = [
        {label: 'Out Of Stock', value: false},
        {label: 'Available', value: true}
    ];

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
        this.addProductForm = this.fb.group({
            // productId:  [''],
            productName: ['', Validators.required],
            productDescription: ['', Validators.required],
            productPrice: ['', [Validators.required, Validators.min(1)]],
            productQuantity: ['', Validators.required],
            imageUrl: [''],
            categoryId: ['', Validators.required],
            available: [true, Validators.required],
            active: [true]
        });
    }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (categories) => {
                this.categories = (categories as unknown as ApiResponse<Category[]>).data;
            },
            error: (err) => {
                console.error('Error loading categories:', err);
            },
        });
    }

    // onImageUpload(event: Event): void {
    //   const file = (event.target as HTMLInputElement).files?.[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.imagePreview = reader.result;
    //       this.addProductForm.patchValue({ imageUrl: reader.result });
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    onImageUpload(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.imageFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // onSubmit() {
    //   this.submitted = true;
    //   if (this.addProductForm.valid && this.imageFile) {
    //     const formData = new FormData();
    //     formData.append('productName', this.addProductForm.get('productName')?.value);
    //     formData.append('productDescription', this.addProductForm.get('productDescription')?.value);
    //     formData.append('productPrice', this.addProductForm.get('productPrice')?.value);
    //     formData.append('productQuantity', this.addProductForm.get('productQuantity')?.value);
    //     formData.append('available', this.addProductForm.get('available')?.value);
    //     formData.append('active', this.addProductForm.get('active')?.value);
    //     formData.append('categoryId', this.addProductForm.get('categoryId')?.value);
    //     formData.append('file', this.imageFile);
    //     console.log('Image file:', this.imageFile);

    //     this.productService.addProduct(formData).subscribe({
    //       next: (response) => {
    //         console.log('Product added successfully:', response);
    //         this.showSuccessMessage = true;
    //         setTimeout(() => {
    //           this.showSuccessMessage = false;
    //           this.router.navigate(['/productAdmin']);
    //         }, 3000);
    //       },
    //       error: (err) => {
    //         console.error('Error adding product:', err);
    //       },
    //     });
    //   } else {
    //     console.error('Form is invalid or no image is selected.');
    //   }
    // }

    onSubmit() {
        this.submitted = true;
        if (this.addProductForm.valid && this.imageFile) {
            const formData = new FormData();

            formData.append('productName', this.addProductForm.get('productName')?.value);
            formData.append('productDescription', this.addProductForm.get('productDescription')?.value);
            formData.append('productPrice', this.addProductForm.get('productPrice')?.value);
            formData.append('productQuantity', this.addProductForm.get('productQuantity')?.value);
            formData.append('categoryId', this.addProductForm.get('categoryId')?.value);
            formData.append('available', this.addProductForm.get('available')?.value.toString());
            formData.append('active', this.addProductForm.get('active')?.value.toString());

            // Append the file with correct key
            formData.append('file', this.imageFile);

            this.productService.addProduct(formData).subscribe({
                next: (response) => {
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
        } else {
            console.error('Form is invalid or no image is selected.');
        }
    }


    resetForm() {
        this.addProductForm.reset();
        this.submitted = false;
        this.router.navigate(['/productAdmin']);
        this.imagePreview = null;
        const fileInput = document.getElementById('product-image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }
}
