import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-colors z-50"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="font-semibold">Giỏ hàng</span>
      {itemCount > 0 &&
      <div className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-bold overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={itemCount}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            transition={{
              duration: 0.25,
              ease: "easeOut"
            }}
            className="block"
          >
            {itemCount}
          </motion.span>
        </AnimatePresence>
      </div>}
    </button>
  );
};

export default CartButton;