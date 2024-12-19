import React, { useCallback } from 'react';
import CartButton from './CartButton';
import type { CartItemType } from '@/app/types/cart';
import { CartItem } from './CartItem';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
    items: CartItemType[];
    onUpdateQuantity: (id: number, quantiy: number) => void;
    onClose: () => void;
    isOpen: boolean;
}

const Cart = ({ items, onUpdateQuantity, onClose, isOpen }: CartProps) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleClose = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        onClose();
    }, [onClose]);

    if (!isOpen) {
        return <CartButton itemCount={totalQuantity} onClick={handleClose} />;
    }

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-gray-400 bg-opacity-50 z-50"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={e => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-auto"
                    >
                        <div className="sticky top-0 bg-white p-4 border-b">
                            <div className="flex items-center justify-between">
                                <motion.h2
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl font-bold"
                                >
                                    Giỏ hàng
                                </motion.h2>
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-4 space-y-2"
                        >
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CartItem
                                            item={item}
                                            onUpdateQuantity={onUpdateQuantity}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {items.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center py-8 text-gray-500"
                                >
                                    Giỏ hàng trống
                                </motion.div>
                            )}
                        </motion.div>

                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="sticky bottom-0 bg-white p-4 border-t"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold">Tổng đơn hàng</span>
                                    <span className="font-bold">
                                        {subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Đặt món
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Cart;