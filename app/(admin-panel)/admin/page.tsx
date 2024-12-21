import React from 'react'
import { Order, TableGrid } from '../../components/TableGrid'

const mockOrders: Order[] = [
  {
    id: '1',
    tableNumber: '12',
    status: 'pending',
    created_at: new Date().toISOString(),
    items: [
      { name: 'Burger', price: 10.99 },
      { name: 'Fries', price: 3.49 },
    ],
    total_amount: 14.48,
  },
  {
    id: '2',
    tableNumber: '5',
    status: 'preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    items: [{ name: 'Pizza', price: 12.99 }],
    total_amount: 12.99,
  },
  {
    id: '3',
    tableNumber: '7',
    status: 'ready',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { name: 'Salad', price: 6.99 },
      { name: 'Soup', price: 4.99 },
    ],
    total_amount: 11.98,
  },
];

const page = () => {
  return (
    <div className=''>
        
    </div>
  )
}

export default page