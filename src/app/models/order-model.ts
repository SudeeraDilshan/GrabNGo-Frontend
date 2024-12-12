export interface Order {
    orderId: number;
    userId: number;
    totalPrice: number;
    status: string;
    createdDateTime: string;
    discount: number;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    country: string;
    zipCode: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    orderItemId: number;
    orderId: number;
    productId: number;
    quantity: number;
    discount: number;
    sellPrice: number;
}

