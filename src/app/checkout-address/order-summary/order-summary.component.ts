import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shopping-cart/shopping-cart.services';

interface OrderItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  items: OrderItem[] = [];
  isModalOpen = false;
  selectedItem: OrderItem | null = null;
  imageUrl: string | undefined;
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
        imageUrl: item.product.imageUrl[0]
      }));
    });
  }

  openConfirmationModal(item: OrderItem): void {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  // Close the confirmation modal
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

  // Calculate the subtotal
  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
