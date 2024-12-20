'use client'

import Image from 'next/image';
import { Plus, Heart } from 'lucide-react';
import { useState } from 'react';
import type { MenuItemType } from '../types/menuItem';

export const MenuItem: React.FC<MenuItemType> = ({
  id,
  name,
  description,
  price,
  pricePerSize,
  image,
  status,
  onAddToCart
}: MenuItemType) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    pricePerSize?.length ? pricePerSize[0].size : null
  );

  const currentPrice = pricePerSize?.length
    ? pricePerSize.find(p => p.size === selectedSize)?.price
    : price;

  const handleAddToCart = () => {
    const selectedPrice = pricePerSize?.find(p => p.size === selectedSize)?.price ?? price;
    const itemToAdd = {
      id: `${id}-${selectedSize || ''}`,
      name,
      size: selectedSize ?? pricePerSize?.[0]?.size,
      price: selectedPrice,
      image,
    };
    onAddToCart(itemToAdd);
  };

  const handleViewDetails = () => {
    alert('Xem chi tiết sản phẩm');
  };

  return (
    <div
      className="relative 
        bg-white 
        rounded-2xl 
        shadow-lg 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-xl 
        hover:-translate-y-1
        border border-gray-100
      "
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
          />
        </button>
        {status !== 'available' && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
            {status === 'out_of_stock' ? "Hết hàng" : status === 'inactive' ? 'Ngừng kinh doanh' : null}
          </div>
        )}

      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <div onClick={handleViewDetails} className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg font-bold text-gray-800 truncate max-w-[70%]">
            {name}
          </h3>
          <span className="text-green-600 font-semibold text-base">
            {currentPrice?.toLocaleString()}đ
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        {pricePerSize && pricePerSize.length > 0 && (
          <div className="flex gap-2">
            {pricePerSize.map(({ size, price }) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedSize === size
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors space-x-2 w-full"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
