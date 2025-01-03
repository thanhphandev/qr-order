import React, { useCallback, useState } from 'react';
import CartButton from './CartButton';
import type { CartItemType } from '@/app/types/cart';
import { CartItem } from './CartItem';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderRealtime } from '@/app/actions/order.action';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CartProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  availableTables: string[];
}

interface DiningOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const DiningOption: React.FC<DiningOptionProps> = ({ label, selected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
      selected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
    }`}
  >
    <span className={`text-sm font-medium ${selected ? 'text-orange-500' : 'text-gray-700'}`}>
      {label}
    </span>
  </motion.button>
);

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, availableTables }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [diningOption, setDiningOption] = useState<'dine-in' | 'takeaway' | null>('dine-in');
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      toggleCart();
    },
    []
  );

  const handlePayment = async () => {
    if (!diningOption || (diningOption === 'dine-in' && !tableNumber)) {
      return; // Ensure valid input before proceeding
    }

    const order = {
      id: `order-${Date.now()}`,
      tableNumber: tableNumber ?? "",
      timestamp: new Date().toISOString(),
      status: 'new' as const,
      items,
      totalAmount: subtotal,
      notes: note,
    };

    try {
      await orderRealtime(order);
      alert('Đơn hàng đã được gửi!');
      toggleCart(); // Close cart after successful order
    } catch (error) {
      alert('Đã xảy ra lỗi khi đặt món!');
    }
  };

  if (!isOpen) {
    return <CartButton itemCount={totalQuantity} onClick={toggleCart} />;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-400 bg-opacity-50 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Giỏ hàng</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Dining Options */}
            <div className="p-4 border-b">
              <div className="flex gap-3">
                <DiningOption
                  label="Ăn tại quán"
                  selected={diningOption === 'dine-in'}
                  onClick={() => setDiningOption('dine-in')}
                />
                <DiningOption
                  label="Mang về"
                  selected={diningOption === 'takeaway'}
                  onClick={() => setDiningOption('takeaway')}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-4 space-y-2">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <CartItem item={item} onUpdateQuantity={onUpdateQuantity} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">Giỏ hàng trống</div>
              )}
            </div>

            {/* Table Number */}
            <AnimatePresence>
              {diningOption === 'dine-in' && items.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {tableNumber === null && <div className="p-4 border-b">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Số bàn
                    </label>
                    <select
                      value={tableNumber ?? ""}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      <option value="" disabled>
                        Chọn số bàn
                      </option>
                      {availableTables.map((table) => (
                        <option key={table} value={table}>
                          {table}
                        </option>
                      ))}
                    </select>
                  </div>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notes */}
            {items.length > 0 && (
              <div className="p-4 border-b">
                <label className="text-sm font-medium text-gray-700 block mb-2">Ghi chú</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú thêm về đơn hàng..."
                  className="w-full p-2 border rounded-lg h-20 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            )}

            {/* Payment Section */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white p-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold">Tổng đơn hàng</span>
                  <span className="font-bold">
                    {subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  disabled={!diningOption || (diningOption === 'dine-in' && !tableNumber)}
                  onClick={handlePayment}
                >
                  Đặt món
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
