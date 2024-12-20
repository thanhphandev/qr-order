import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { CartItemType } from '@/app/types/cart';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({ item, onUpdateQuantity }: CartItemProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.size && <span className="text-sm text-gray-500">{item.size}</span>}
                    <p className="text-gray-600">
                        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}