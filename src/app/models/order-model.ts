export interface Order {
    productName: string;
    size: string;
    quantity: number;
    price: number;
    imageUrl: string;
    date: string; // You can use `Date` type if you prefer to work with Date objects
  }