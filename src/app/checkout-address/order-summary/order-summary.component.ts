import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
    items: any[] = []; // Array to hold cart items
    isModalOpen = false; // To toggle modal visibility
    selectedItem: any = null; // Item to be removed

    ngOnInit(): void {
        this.loadDummyData(); // Load dummy data on initialization
    }

    // Load dummy data
    loadDummyData(): void {
        this.items = [
            {
                id: '1',
                name: 'Product 1',
                size: 'M',
                quantity: 2,
                price: 25.5,
                imageUrl: 'https://via.placeholder.com/50',
            },
            {
                id: '2',
                name: 'Product 2',
                size: 'L',
                quantity: 1,
                price: 40.0,
                imageUrl: 'https://via.placeholder.com/50',
            },
            {
                id: '3',
                name: 'Product 3',
                size: 'S',
                quantity: 3,
                price: 15.75,
                imageUrl: 'https://via.placeholder.com/50',
            },
        ];
    }

    // Open the confirmation modal
    openConfirmationModal(item: any): void {
        this.selectedItem = item;
        this.isModalOpen = true;
    }

    // Close the confirmation modal
    closeModal(): void {
        this.isModalOpen = false;
        this.selectedItem = null;
    }

    // Confirm deletion of the selected item
    confirmDelete(): void {
        if (this.selectedItem) {
            this.items = this.items.filter((i) => i.id !== this.selectedItem.id);
            this.closeModal();
        }
    }

    // Calculate the subtotal
    getSubtotal(): number {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
