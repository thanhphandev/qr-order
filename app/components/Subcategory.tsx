import React, { useState } from 'react';
import type { SubCategory } from '../types/category';

interface SubCategoryListProps {
  subCategories: SubCategory[];
}

export function SubCategoryList({ subCategories }: SubCategoryListProps) {
  if (subCategories.length === 0) return null;

  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

  const handleClickSubcategory = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="bg-white border-t px-4 py-2 animate-slideDown">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide p
      
      
      b-2">
        {subCategories.map((subCategory) => (
          <button
            onClick={() => handleClickSubcategory(subCategory.id)}
            key={subCategory.id}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedSubcategory === subCategory.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:text-white hover:bg-orange-500'
            }`}
          >
            {subCategory.name}
          </button>
        ))}
      </div>
    </div>
  );
}
