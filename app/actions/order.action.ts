"use server"

import { pusherServer } from "../lib/pusher";

export type OrderStatus = 'new' | 'deny' | 'completed';

export interface OrderItem {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

export interface OrderType {
  id: string;
  tableNumber: string;
  timestamp: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
}

export const orderRealtime = async(order: OrderType) => {
    try {
        pusherServer.trigger('orders', 'new-order', {
            order
        })
    } catch (error: any) {
        throw new Error(error.message) 
    }
}