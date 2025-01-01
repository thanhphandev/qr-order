import React from 'react'
import Header from './components/Header';
import { CategoryBar } from './components/CategoryBar';

interface ProviderMenuProps {
    children: React.ReactNode;
  }
const MenuProvider = ({children}: ProviderMenuProps) => {
  return (
    <div>
        <Header />
        <CategoryBar />
        {children}
    </div>
  )
}

export default MenuProvider