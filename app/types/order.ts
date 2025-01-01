export type OrderStatus = 'new' | 'deny' | 'completed';

export interface OrderItem {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  timestamp: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
}