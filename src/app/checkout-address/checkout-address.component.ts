import { Component, OnInit } from '@angular/core';
import { CartService } from '../shopping-cart/shopping-cart.services';
import { CheckoutService } from '../services/checkout.services';

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
  countries = [
     'Afghanistan', 'Andorra', 'Argentina', 'Australia', 'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 
     'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Cyprus', 'Czech Republic', 'Denmark', 'Egypt',
      'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel',
       'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Laos', 'Lebanon', 'Liechtenstein', 'Luxembourg', 
       'Malaysia', 'Malta', 'Marshall Islands', 'Mexico', 'Micronesia', 'Monaco', 'Mongolia', 'Myanmar', 'Nauru', 
       'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Peru', 'Philippines',
        'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'San Marino', 'Saudi Arabia', 'Singapore', 'Slovakia',
         'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Tuvalu', 
         'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uzbekistan', 'Vatican City', 'Vietnam'

  ];

  constructor(private cartService: CartService, private checkoutService: CheckoutService) {}

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
      const userId = this.getUserIdFromLocalStorage();
      if (!userId) {
        console.error("User ID not found. Please log in.");
        return;
      }

      const orderId = this.generateOrderId(); 
      const payload = {
        orderId,
        userId,
        totalPrice: this.getSubtotal(),
        status: 'Pending',
        createdDateTime: new Date().toISOString(),
        discount: 0,  
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        address: this.formData.address,
        apartment: this.formData.apartment,
        city: this.formData.city,
        country: this.formData.country,
        zipCode: this.formData.zipcode,
        orderItems: this.items.map((item) => ({
          orderItemId: 0,  
          orderId, 
          productId: item.id,
          quantity: item.quantity,
          discount: 0,  
          sellPrice: item.price,
        })),
      };

     
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === 'orderItems') {
          
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, (payload as any)[key]);
        }
      });

      this.checkoutService.submitCheckout(formData).subscribe(
        (response) => {
          console.log('Checkout successful:', response);
          alert('Order placed successfully!');
        },
        (error) => {
          console.error('Error during checkout:', error);
          alert('There was an error submitting your order. Please try again.');
        }
      );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
 
  generateOrderId(): number {
    return Math.floor(Math.random() * 1000000); 
  }

   
  getUserIdFromLocalStorage(): number | null {
    const userId = sessionStorage.getItem('USER_ID');
    return userId ? parseInt(userId) : null;
  }
}
