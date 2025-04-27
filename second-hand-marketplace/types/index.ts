export type User = {
  id: string;
  name?: string | null;
  email: string;
  password: string;
  phoneNumber?: string | null;
  gender?: string | null;
  age?: number | null;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  role: 'USER' | 'SELLER' | 'ADMIN';
  orders?: Order[] | null;
};

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  brand?: string | null;
  price: number;
  imageUrl: string;
  condition?: string | null;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
  orderId?: string | null;
};

export type Order = {
  id: string;
  totalAmount: number;
  status: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  buyerId: string;
  products: Product[];
};
