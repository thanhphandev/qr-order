'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  PlusCircle,
  ListOrdered,
  CableCar,
  QrCode,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  History,
  Table
} from 'lucide-react';
interface SidebarProps {
    isOpen: boolean
    setIsOpen: (is: boolean) => void
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      icon: Home
    },
    {
      id: 'menu',
      title: 'Quản lý Menu',
      icon: ListOrdered,
      submenu: [
        { id: 'add-dish', title: 'Thêm món mới', icon: PlusCircle },
        { id: 'categories', title: 'Danh mục', icon: CableCar },
        { id: 'list-dishes', title: 'Danh sách món', icon: ListOrdered }
      ]
    },
    {
      id: 'orders',
      title: 'Đơn hàng',
      icon: History,
      submenu: [
        { id: 'current-orders', title: 'Đơn hiện tại', icon: Table },
        { id: 'order-history', title: 'Lịch sử đơn', icon: History }
      ]
    },
    {
      id: 'qr',
      title: 'QR Management',
      icon: QrCode,
      submenu: [
        { id: 'generate-qr', title: 'Tạo QR Code', icon: QrCode },
        { id: 'table-qr', title: 'QR theo bàn', icon: Table }
      ]
    },
    {
      id: 'analytics',
      title: 'Thống kê',
      icon: BarChart3
    },
    {
      id: 'users',
      title: 'Người dùng',
      icon: Users
    },
    {
      id: 'settings',
      title: 'Cài đặt',
      icon: Settings
    }
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedSubmenu(expandedSubmenu === menuId ? null : menuId);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-orange-100 
          w-72 z-40 overflow-y-auto overflow-x-hidden shadow-lg`}
      >
        <div className="p-4">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-6 top-6 bg-orange-500 text-white p-1 rounded-full 
              shadow-lg hover:bg-orange-600 transition-colors duration-200 lg:hidden"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (item.submenu) toggleSubmenu(item.id);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg 
                    transition-colors duration-200 group
                    ${activeMenu === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'}`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${
                      activeMenu === item.id ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-600'
                    }`} />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {item.submenu && (
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform duration-200 
                        ${expandedSubmenu === item.id ? 'rotate-90' : ''}`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {expandedSubmenu === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-1 space-y-1"
                      >
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => setActiveMenu(subItem.id)}
                            className={`w-full flex items-center p-2 rounded-lg text-sm
                              transition-colors duration-200 group space-x-3
                              ${activeMenu === subItem.id 
                                ? 'bg-orange-50 text-orange-600' 
                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'}`}
                          >
                            <subItem.icon className={`h-4 w-4 ${
                              activeMenu === subItem.id ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-600'
                            }`} />
                            <span>{subItem.title}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;