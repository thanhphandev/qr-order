'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, Menu, LogOut } from 'lucide-react';
import { logout } from '@/app/actions/user';

interface AdminHeaderProps {
  onMenuClick: () => void
}
const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const notifications = 3;

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onMenuClick} className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200">
            <Menu className="h-6 w-6 text-orange-400" />
          </button>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-orange-600" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
            >
              <Settings className="h-5 w-5 text-orange-600" />
            </motion.button>

            <div className="h-8 w-px bg-orange-200 mx-2"></div>

            <div className="flex items-center space-x-3">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center cursor-pointer"
              >
                A
              </motion.div>
            </div>
            <form action={logout}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 ml-2"
                type="submit"
              >
                <LogOut className="h-5 w-5 text-red-500" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;