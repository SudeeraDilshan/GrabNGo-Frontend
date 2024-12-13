import { OrderItem } from "./models/order-model";

export interface ApiResponse<T> {
    data: T;
    status: boolean;
    message: string;
    errors: string[];
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userRole: "ADMINISTRATOR" | "STANDARD_USER";
    userId: string;
    email: string;
}

export interface UserProfile {
    userId: number;
    emailAddress: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    nic: string;
    address: string;
    role: string;
}

export interface Category {
    id: number;
    name: string;
    imageUrl: string;
}

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

export interface OrderViewItem {
    orderId: number;
    quantity: number;
    status: string;
    createdDateTime: string;
    unitPrice: number;
    productName: string;
    productImg: string;
}

export interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productQuantity: number;
    imageUrl: string;
    categoryId: string;
    active: boolean;
    available: boolean;
}

export interface Category {
    categoryId: string;
    categoryName: string;
    description: string;
    isActive: boolean;
}

export interface Cart {
    cartId: number;
    userId: number;
    totalAmount: number;
    totalProducts: number;
    active: boolean;
}

export interface CartItem {
    cartItemId:number,
    productId:number,
    quantity:number,
    price:number,
    cartId:number
}