'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Search, History, X } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const [search, setSearch] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  return (
    <header className="top-0 z-50 w-full bg-white shadow-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Animated Collapse */}
          <motion.div 
            initial={{ opacity: 1, width: 'auto' }}
            animate={{ 
              opacity: isSearchFocused ? 0 : 1, 
              width: isSearchFocused ? 0 : 'auto',
              marginRight: isSearchFocused ? 0 : '1rem'
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 overflow-hidden"
          >
            <Image src="/logo1.png" alt="Logo" width={60} height={40} />
            <h1 className="font-semibold text-2xl text-orange-600">SwiftFood</h1>
          </motion.div>

          {/* Search Section - Expandable */}
          <motion.div 
            initial={{ width: '300px' }}
            animate={{ 
              width: isSearchFocused ? '100%' : '300px',
              marginLeft: isSearchFocused ? 0 : '1rem',
              marginRight: isSearchFocused ? 0 : '1rem'
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className="relative flex-1 max-w-2xl"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ 
                scale: isSearchFocused ? 1.02 : 1,
                boxShadow: isSearchFocused 
                  ? "0 10px 15px -3px rgba(0,0,0,0.1)" 
                  : "0 1px 3px 0 rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
              className="relative rounded-full overflow-hidden"
            >
              <input
                type="text"
                value={search}
                placeholder="Tìm kiếm món ăn..."
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className={`w-full pl-10 pr-4 py-2 rounded-full border transition-all duration-300 
                  ${isSearchFocused 
                    ? 'border-orange-500 ring-2 ring-orange-500/30' 
                    : 'border-gray-300'
                  } focus:outline-none`}
              />
              <motion.div
                initial={{ x: 0 }}
                animate={{ 
                  x: isSearchFocused ? -10 : 0,
                  opacity: isSearchFocused ? 0.5 : 1
                }}
                className="absolute left-3 top-2.5"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </motion.div>
              
              {/* Animated Clear Button */}
              {isSearchFocused && search && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </motion.div>

            
          </motion.div>

          {/* Shopping Cart Section - Animated Hide */}
          <motion.div 
            initial={{ opacity: 1, width: 'auto' }}
            animate={{ 
              opacity: isSearchFocused ? 0 : 1, 
              width: isSearchFocused ? 0 : 'auto',
              marginLeft: isSearchFocused ? 0 : '1rem'
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center overflow-hidden"
          >
            <button className="relative p-2">
              <History className="h-6 w-6 text-gray-600" />
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
