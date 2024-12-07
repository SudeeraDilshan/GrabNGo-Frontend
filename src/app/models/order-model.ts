// export interface Order {
//     productName: string;
//     size: string;
//     quantity: number;
//     price: number;
//     imageUrl: string;
//     date: string; 
//   }

  export interface Order{
    orderId: number;
    userId: number;
    totalPrice: number;
    status: string;
    createdDateTime: Date;
    discount: number;
  }
