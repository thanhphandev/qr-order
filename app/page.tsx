'use client'

import { MenuItem } from "./components/MenuItem";
import { useState } from "react";
import { useCart } from "./hooks/useCart";
import Cart from "./components/Cart/Cart";


const menuItems = [
  {
    id: 1,
    name: "Burger Bò Phô Mai",
    description: "Burger bò tươi với lớp phô mai tan chảy",
    price: 49000,
    sizeAvailable: ['L', 'M', 'S'],
    image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
  },
  {
    id: 2,
    name: "Pizza",
    description: "Burger bò tươi với lớp phô mai tan chảy",
    price: 60000,
    sizeAvailable: ['L', 'M'], // Fixed typo
    image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
  },
  {
    id: 3,
    name: "Bún bò huế",
    description: "Burger bò tươi với lớp phô mai tan chảy",
    price: 30000,
    sizeAvailable: ['L', 'M'], // Fixed typo
    image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
  },
  {
    id: 4,
    name: "Burger Bò Phô Mai",
    description: "Burger bò tươi với lớp phô mai tan chảy",
    price: 49000,
    sizeAvailable: ['L', 'M'], // Fixed typo
    image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
  },
  {
    id: 5,
    name: "Burger Bò Phô Mai",
    description: "Burger bò tươi với lớp phô mai tan chảy",
    price: 49000,
    sizeAvailable: ['L', 'M'], // Fixed typo
    image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
  },

];

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
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onClose={() => setIsCartOpen(!isCartOpen)}
        isOpen={isCartOpen}
      />
    </div>
  );
}
