import { Component } from '@angular/core';

@Component({
  selector: 'app-order-view-admin',
  templateUrl: './order-view-admin.component.html',
  styleUrl: './order-view-admin.component.css'
})
export class OrderViewAdminComponent {
  orders = [
    {
      id: '001',
      userName: 'Jane',
      price: 5000,
      items: ['Item1', 'Item2', 'Item3'],
      quantity: 5,
      status: 'Confirm',
    },
    {
      id: '002',
      userName: 'Ann',
      price: 5000,
      items: ['Item1'],
      quantity: 2,
      status: 'Packing',
    },
    {
      id: '003',
      userName: 'Pitar',
      price: 5000,
      items: ['Item1'],
      quantity: 2,
      status: 'Dispatch',
    },
    {
      id: '004',
      userName: 'William',
      price: 5000,
      items: ['Item1'],
      quantity: 2,
      status: 'Delivered',
    },
    {
      id: '005',
      userName: 'John',
      price: 5000,
      items: ['Item1'],
      quantity: 2,
      status: 'Confirm',
    },
  ];

  updateOrderStatus(order: any) {
    console.log('Updated status for order:', order);
  }

  addOrder() {
    console.log('Add new order clicked');
  }
}
