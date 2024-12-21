'use client';

import React from 'react';
import { Clock, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Order interface definition
export interface Order {
  id: string;
  tableNumber: string;
  status: string;
  created_at: string;
  items: { name: string; price: number }[];
  total_amount: number;
}

// Props for TableGrid component
interface TableGridProps {
  orders: Order[];
}

// Mock OrderStatusBadge component
const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span
      className={`text-white text-xs font-semibold px-2 py-1 rounded ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

// TableGrid component
export const TableGrid: React.FC<TableGridProps> = ({ orders }) => {
  const handleTableClick = (orderId: string) => {
    alert(`Table clicked: Order ID ${orderId}`);
  };

  const handleAccept = (orderId: string) => {
    alert(`Accepted order with ID: ${orderId}`);
  };

  const handleDeny = (orderId: string) => {
    alert(`Denied order with ID: ${orderId}`);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleTableClick(order.id)}
          className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl font-bold">Table {order.tableNumber}</h3>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-gray-600">{order.items.length} items</p>
            <p className="font-semibold text-lg">
              ${order.total_amount.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 flex justify-between space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the table click
                handleAccept(order.id);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the table click
                handleDeny(order.id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

