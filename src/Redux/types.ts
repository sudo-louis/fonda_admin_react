type Size = {
  size: number;
  quantity: number;
};

export type Product = {
    _id: string; 
    name: string;
    image: string;
    // sizes: number[]; anterior
    sizes: Size[];
    brand: string;
    description: string;
    price: number;
    countInStock: number;
    status_Active: boolean;
    rating: number;
    numReview: number;
  };

  

  export type OrderItem = {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
    _id: string;
  };
  
  export type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  export type PaymentResult = {
    id: string;
    status: string;
    updated_time: string;
    email_address: string;
  };
  
  export type Order = {
    _id: string;
    user: string;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult?: PaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt: string;
  };
  
 