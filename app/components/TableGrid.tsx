'use client';

import { Clock, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { OrderType } from '@/app/actions/order.action';
import { pusherClient } from '@/app/lib/pusher';

const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'new':
        return 'bg-yellow-500';
      case 'deny':
        return 'bg-red-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span
      className={`text-white text-xs font-semibold px-2 py-1 rounded ${getStatusColor()}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export const TableGrid = () => {

  const [orders, setOrders] = useState<OrderType[]>([]);
  useEffect(() => {

    pusherClient.subscribe('orders');

    pusherClient.bind('new-order', ({ order }: { order: OrderType }) => {
      setOrders((prevOrders) => [...prevOrders, order]);
      console.log(order);
    });

    return () => {
      pusherClient.unsubscribe('orders');
    };

  }, []); // Dependency on user to start pusher once user is available

  const handleTableClick = (orderId: string) => {
    alert(`Clicked on Order ID: ${orderId}`);
  };

  const handleAccept = (orderId: string) => {
    alert(`Accepted order with ID: ${orderId}`);
  };

  const handleDeny = (orderId: string) => {
    alert(`Denied order with ID: ${orderId}`);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {orders?.length > 0
        ? orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleTableClick(order.id)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-bold">Bàn {order.tableNumber}</h3>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Thời gian tạo */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {order.timestamp && !isNaN(new Date(order.timestamp).getTime())
                    ? formatDistanceToNow(new Date(order.timestamp), { addSuffix: true })
                    : 'Invalid time'}
                </span>
              </div>

              {/* Thông tin đơn hàng */}
              <div className="mt-4">
                <p className="text-gray-600">
                  {Array.isArray(order.items)
                    ? order.items.reduce((sum, item) => sum + item.quantity, 0)
                    : 0}{' '}
                  món
                </p>
                <p className="font-semibold text-lg">
                  {order.totalAmount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>

              {/* Hành động */}
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept(order.id);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Xác nhận
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeny(order.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Từ chối
                </button>
              </div>
            </div>
          ))
        : <div className="flex justify-center items-center h-full text-gray-500">
        Không có đơn hàng nào
      </div>
      }
    </div>
  );
};
