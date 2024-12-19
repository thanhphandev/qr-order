'use client'

import React, { useEffect, useState } from 'react';
import { Airplay ,Heart, Coffee, IceCream, Salad, Sandwich, SunDim } from 'lucide-react';
import type { Category } from '../types/category';
import { SubCategoryList } from './Subcategory';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Yêu thích',
    icon: Heart,
    subCategories: []
  },
  {
    id: 2,
    name: 'Đồ uống',
    icon: Coffee,
    subCategories: [
      { id: 21, name: 'Cà phê đen' },
      { id: 22, name: 'Trà sữa' },
      { id: 23, name: 'Sinh tố xoài' },
      { id: 24, name: 'Nước ép cam' },
      { id: 25, name: 'Coca-Cola' }
    ]
  },
  {
    id: 3,
    name: 'Món tráng miệng',
    icon: IceCream,
    subCategories: [
      { id: 31, name: 'Kem vani' },
      { id: 32, name: 'Bánh ngọt' },
      { id: 33, name: 'Chè thập cẩm' },
      { id: 34, name: 'Cookies sô cô la' }
    ]
  },
  {
    id: 4,
    name: 'Salads',
    icon: Salad,
    subCategories: [
      { id: 41, name: 'Salad trộn dầu giấm' },
      { id: 42, name: 'Salad rau củ' },
      { id: 43, name: 'Salad Caesar' },
      { id: 44, name: 'Salad trái cây' }
    ]
  },
  {
    id: 5,
    name: 'Bánh mì & Sandwich',
    icon: Sandwich,
    subCategories: [
      { id: 51, name: 'Bánh mì thịt nguội' },
      { id: 52, name: 'Bánh mì trứng' },
      { id: 53, name: 'Sandwich phô mai' },
      { id: 54, name: 'Sandwich gà nướng' }
    ]
  },
  {
    id: 6,
    name: 'Món chính',
    icon: Airplay,
    subCategories: [
      { id: 61, name: 'Phở bò' },
      { id: 62, name: 'Cơm tấm' },
      { id: 63, name: 'Bún chả' },
      { id: 64, name: 'Mì xào hải sản' }
    ]
  },
  {
    id: 7,
    name: 'Đồ ăn nhẹ',
    icon: IceCream,
    subCategories: [
      { id: 71, name: 'Khoai tây chiên' },
      { id: 72, name: 'Cánh gà chiên' },
      { id: 73, name: 'Bánh tráng trộn' },
      { id: 74, name: 'Xoài lắc' }
    ]
  }
];


export function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100); // Header cao khoảng 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`z-40 border-y shadow-sm transition-all duration-300 ${
        isSticky ? 'sticky top-0 bg-white' : 'relative'
      }`}
    >
      <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            aria-pressed={selectedCategory === category.id}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-orange-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <category.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <SubCategoryList
          subCategories={
            categories.find((c) => c.id === selectedCategory)?.subCategories || []
          }
        />
      )}
    </div>
  );
}