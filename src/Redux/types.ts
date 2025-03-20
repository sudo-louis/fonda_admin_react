type Size = {
  size: number;
  quantity: number;
};

export type Categorie ={
  _id: string; 
  name: string;  
};

export type Provider ={
  _id: string; 
  name: string;  
  contact: string;  
  image: string;    
};
 
export type Product = {
  _id: string;
  name: string; 
  price: number;
  category: string;
  provider: string;
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
  
 