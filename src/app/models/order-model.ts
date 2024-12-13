export interface OrderItemDTO {
    orderItemId: number; // Unique ID for the order item
    orderId: number;     // ID of the associated order
    productId: number;   // ID of the product
    quantity: number;    // Quantity of the product
    discount: number;    // Discount applied to the item
    sellPrice: number;   // Selling price of the item
  }
  
  export interface Order {
    orderId: number;              // Unique ID for the order
    userId: number;               // ID of the user who placed the order
    totalPrice: number;           // Total price of the order
    status: string;               // Status of the order (e.g., "Pending", "Completed")
    createdDateTime: string;      // Date and time the order was created
    discount: number;             // Discount applied to the order
    firstName: string;            // First name of the user
    lastName: string;             // Last name of the user
    address: string;              // Shipping address
    apartment: string;            // Apartment details (if applicable)
    city: string;                 // City of the address
    country: string;              // Country of the address
    zipCode: string;              // ZIP/postal code
    orderItems: OrderItemDTO[];   // List of items in the order
  }
  