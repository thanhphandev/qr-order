'use client'

import { MenuItem } from "./components/MenuItem";
import { useState } from "react";
import { useCart } from "./hooks/useCart";
import Cart from "./components/Cart/Cart";
import { menuItems } from './hooks/mockData';

const availableTables = Array.from({ length: 4 }, (_, i) => `Bàn ${i + 1}`);


export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity } = useCart()


  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6 
          p-4
        "
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onClose={() => setIsCartOpen(!isCartOpen)}
        isOpen={isCartOpen}
        availableTables={availableTables}
      />
    </div>
  );
}
