import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton = ({ itemCount = 0, onClick }: CartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 
        flex items-center gap-3 
        px-6 py-3.5
        bg-gradient-to-r from-orange-600 to-orange-500
        hover:from-orange-500 hover:to-orange-400
        text-white rounded-full
        shadow-lg hover:shadow-xl
        transform transition-all duration-300 ease-out
        ${isHovered ? 'scale-105' : 'scale-100'}
        group
      `}
    >
      <div className="relative">
        <ShoppingBag 
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isHovered ? 'rotate-12' : 'rotate-0'
          }`}
        />
        {itemCount > 0 && (
          <div className="absolute -top-2 -right-2 
            bg-white text-orange-600
            text-xs font-bold
            min-w-[20px] h-5
            rounded-full
            flex items-center justify-center
            border-2 border-orange-500
            transform transition-transform duration-300
            group-hover:scale-110"
          >
            {itemCount}
          </div>
        )}
      </div>
      <span className="font-semibold tracking-wide">Giỏ hàng</span>
    </button>
  );
};

export default CartButton;