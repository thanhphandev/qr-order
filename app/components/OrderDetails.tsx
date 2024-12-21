// import React from 'react';
// import { X } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface OrderDetailsProps {
//   order: Order | null;
//   onClose: () => void;
//   onStatusChange: (orderId: string, status: Order['status']) => void;
// }

// export const OrderDetails: React.FC<OrderDetailsProps> = ({
//   order,
//   onClose,
//   onStatusChange,
// }) => {
//   if (!order) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-2xl">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Table {order.table_number}</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-gray-600">
//                 Ordered {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
//               </p>
//               <select
//                 value={order.status}
//                 onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
//                 className="px-3 py-1 border rounded-md"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="preparing">Preparing</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg">Order Items</h3>
//             {order.items.map((item) => (
//               <OrderItem key={item.id} item={item} />
//             ))}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-semibold">Total</p>
//               <p className="text-xl font-bold">${order.total_amount.toFixed(2)}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };