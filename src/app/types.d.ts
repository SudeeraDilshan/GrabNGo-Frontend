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

export interface Product {

    CategoryId: number;
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    imageUrl: string[];
    productQuantity: number;
    total: number;
    available: boolean;
    active: boolean
}

export interface Category {
    id: number;
    name: string;
    imageUrl: string;
}