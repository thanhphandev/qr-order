'use client';

import Image from 'next/image';
import { Plus, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { MenuItemType } from '../types/menuItem';
import useFavoritesStore from '../hooks/useFavorites';
import toast from 'react-hot-toast';

export const MenuItem: React.FC<MenuItemType> = ({
  id,
  name,
  description,
  price,
  pricePerSize,
  image,
  status,
  onAddCart,
}: MenuItemType) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const [selectedSize, setSelectedSize] = useState<string | null>(
    pricePerSize?.length ? pricePerSize[0].size : null
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    setIsHydrated(true); // Hydrate on client
  }, []);

  const currentPrice = pricePerSize?.length
    ? pricePerSize.find(p => p.size === selectedSize)?.price
    : price;

  const handleAddToCart = () => {
    setIsLoading(true); // Show loading spinner when adding to cart
    const selectedPrice = pricePerSize?.find(p => p.size === selectedSize)?.price ?? price;
    const itemToAdd = {
      id: `${id}-${selectedSize || ''}`,
      name,
      size: selectedSize ?? pricePerSize?.[0]?.size,
      price: selectedPrice,
      image,
    };
    onAddCart(itemToAdd);
    toast.success('Đã thêm một món vào giỏ hàng');
    setIsLoading(false); // Hide loading spinner after action
  };

  const handleViewDetails = () => {
    alert('Xem chi tiết sản phẩm');
  };

  if (!isHydrated) return null; // Only render after hydration

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {/* Skeleton loader or placeholder image */}
        <div className={`absolute inset-0 bg-gray-300 animate-pulse ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={() => setIsLoading(false)} // Image load complete
        />
        {/* Favorite Button */}
        <button
          onClick={() => {
            toggleFavorite(id);
            toast.success(
              isFavorite(id)
                ? "Đã Thêm khỏi danh sách yêu thích!"
                : "Đã xóa khỏi danh sách yêu thích!"
            );
          }}
          className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite(id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
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
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {status == 'available' && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} text-white px-4 py-2 rounded-full transition-colors space-x-2 w-full`}
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Thêm vào giỏ</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
