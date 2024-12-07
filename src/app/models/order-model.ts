export interface Order {
  orderId: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdDateTime: string; // or Date if you prefer
  discount: number;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  zipCode: string;
  orderItems: OrderItem[]; // Include orderItems
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  discount: number;
  sellPrice: number;
}
