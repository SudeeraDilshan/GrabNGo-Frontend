import { Component, OnInit } from '@angular/core';
import { CartService } from '../shopping-cart/shopping-cart.services';

interface OrderItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  zipcode: string;
}

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css'],
})
export class CheckoutAddressComponent implements OnInit {
  items: OrderItem[] = [];
  isModalOpen = false;
  selectedItem: OrderItem | null = null;
  formData: FormData = {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    zipcode: '',
  };
  countries = ['United States', 'Canada', 'United Kingdom'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.items = cartItems.map((item) => ({
        id: item.product.productId,
        name: item.product.productName,
        size: 'Default Size',
        quantity: item.quantity,
        price: item.product.productPrice,
        imageUrl: item.product.imageUrl[0],
      }));
    });
  }

  openConfirmationModal(item: OrderItem): void {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedItem = null;
  }

  confirmDelete(): void {
    if (this.selectedItem) {
      this.cartService.removeFromCart(this.selectedItem.id, this.selectedItem.quantity);
      this.closeModal();
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
