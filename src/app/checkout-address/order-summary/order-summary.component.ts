import { Component } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  items = [
    { name: "Men's winter jacket", size: 'L', quantity: 1, price: 99 },
    { name: "Men's winter jacket", size: 'L', quantity: 1, price: 99 }
  ];

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
