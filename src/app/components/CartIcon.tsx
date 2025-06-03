"use client";
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCartOpen } from '@/store/slice/cartSlice';

const CartIcon: React.FC = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const itemCount = cart?.items?.length || 0;
  
  const handleCartClick = () => {
    console.log("Opening cart sidebar");
    dispatch(setCartOpen(true));
  };

  return (
    <div 
      className="relative cursor-pointer" 
      onClick={handleCartClick}
      aria-label="Open cart"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
