import { Models } from 'appwrite';

export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  company?: string;
  postal_code: string;
  city: string;
  country_code: string;
  province?: string;
  phone?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  amount: number;
  price_type: 'flat' | 'calculated';
}

export interface PaymentProvider {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  type: string;
}

export interface OrderState {
  loading: boolean;
  error: string | null;
  order: Order | null;
  shippingOptions: ShippingOption[];
  paymentProviders: PaymentProvider[];
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  variant: {
    id: string;
    title: number;
    price: number;
  };
}

export interface Order extends Models.Document {
  // Required fields
  address: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  user_id: string;
  email: string;
  state: string;
  city: string;
  country: string;
  phone_number: string;
  payment_type: string;
  payment_status: string;
  shipping_status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  payment_amount: number;
  total_price: number;
  pincode: string | number;
  first_name: string;  last_name: string;
  order_items: number; // Stores total number of items in the order
  _order_items_data?: OrderItem[]; // Internal field to hold full order items data
  product_id: string;
  weights: number | number[]; // Can be single number or array of weights

  // Optional fields
  product_ids?: string[]; // For backward compatibility
  coupon_code?: string;
  coupon_discount?: number;
  coupon_price?: number;
  discount_price?: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  shiprocket_order_id?: string;
  shiprocket_shipment_id?: string;
  tracking_id?: string;
  refund_id?: string;
  refund_status?: string;
  refund_due?: string;
  cancellation_fee?: number;
  refund_amount?: number;
  label_url?: string;
  manifest_url?: string;
  
  // Appwrite document fields (already included through Models.Document)
  // but we need these as required fields
  idempotency_key: string;
  created_at: string;
}

export interface OrdersState {
  orders: Order[];
  allOrders: Order[]; // Add this line
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalOrders: number;
}

export interface OrderEmailDetails {
  $id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string | number;
  order_items: OrderItem[];
  total_price: number;
  payment_amount: number;
  tracking_id?: string;
  coupon_code?: string;
  coupon_discount?: number;
  coupon_price?: number;
}