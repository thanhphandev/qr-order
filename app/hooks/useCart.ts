import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { CartItemType } from '../types/cart';

const CART_COOKIE_KEY = 'cart_items';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Khôi phục giỏ hàng từ cookie khi khởi động
  useEffect(() => {
    const savedCart = Cookies.get(CART_COOKIE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart items from cookie:', error);
      }
    }
  }, []);

  // Lưu giỏ hàng vào cookie mỗi khi thay đổi
  useEffect(() => {
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(cartItems), { expires: 7 }); // Lưu trong 7 ngày
  }, [cartItems]);

 const addToCart = (item: { id: string; name: string; size?: string; price: number; image: string }) => {
  setCartItems(prev => {
    const existing = prev.find(
      i => i.id === item.id && (i.size === item.size || (!i.size && !item.size))
    );
    if (existing) {
      return prev.map(i =>
        i.id === item.id && i.size === item.size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }
    return [...prev, { ...item, quantity: 1 }];
  });
};


  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    Cookies.remove(CART_COOKIE_KEY);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    clearCart
  };
}
