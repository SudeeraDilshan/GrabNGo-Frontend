import { Component, Input } from '@angular/core';
import { OrderViewItem } from "../types";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {
  @Input() orderItem!: OrderViewItem;
}
