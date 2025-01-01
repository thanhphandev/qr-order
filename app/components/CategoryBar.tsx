'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Coffee, IceCream } from 'lucide-react';
import type { Category } from '../types/category';
import { SubCategoryList } from './Subcategory';
import {useFavoritesStore} from '../hooks/useFavorites';
import Link from 'next/link';
import clsx from 'clsx';

// Mock Categories
export const categories: Category[] = [
  {
    id: '2',
    name: 'Drink',
    icon: Coffee,
    subCategories: [
      { id: '21', name: 'Cà phê đen' },
      { id: '22', name: 'Trà sữa' },
      { id: '23', name: 'Sinh tố xoài' },
      { id: '24', name: 'Nước ép cam' },
      { id: '25', name: 'Coca-Cola' },
    ],
  },
  {
    id: '3',
    name: 'Bestg',
    icon: IceCream,
    subCategories: [
      { id: '31', name: 'Kem vani' },
      { id: '32', name: 'Bánh ngọt' },
    ],
  },
];

// Debounce Function
const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { favoriteItems } = useFavoritesStore();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  const handleFavoriteClick = () => {
    handleCategoryClick('favorites')
    alert(`${favoriteItems}`)
  }
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsSticky(window.scrollY > 100);
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'z-40 border-y c transition-all duration-300',
        isSticky ? 'sticky top-0 bg-white' : 'relative'
      )}
    >
      <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
        {favoriteItems.length > 0 && (
          <button
            onClick={handleFavoriteClick}
            className={clsx(
              'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all',
              selectedCategory === 'favorites'
                ? 'bg-orange-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            )}
            aria-pressed={selectedCategory === 'favorites'}
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm font-medium">Yêu thích</span>
          </button>
        )}

        {categories.map((category) => (
          <Link
            href={`/${category.name}`}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={clsx(
              'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all',
              selectedCategory === category.id
                ? 'bg-orange-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            )}
            aria-pressed={selectedCategory === category.id}
            aria-label={category.name}
          >
            <category.icon className="w-6 h-6" />
            <span className="text-sm font-medium">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      {selectedCategory && (
        <SubCategoryList
          subCategories={
            categories.find((c) => c.id === selectedCategory)?.subCategories || []
          }
        />
      )}
    </nav>
  );
}
