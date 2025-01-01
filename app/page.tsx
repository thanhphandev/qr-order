'use client'

import { MenuItem } from "./components/MenuItem";
import { useCart } from "./hooks/useCart";
import Cart from "./components/Cart/Cart";
import { menuItems } from './hooks/mockData';
import MenuProvider from "./MenuProvider";

const availableTables = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

export default function Home() {
  const { addToCart, cartItems, updateQuantity } = useCart()
  return (
    <MenuProvider>
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
            {...item
            }
            onAddCart={addToCart}
          />
        ))}
      </div>
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        availableTables={availableTables}
      />

    </MenuProvider>
  );
}
