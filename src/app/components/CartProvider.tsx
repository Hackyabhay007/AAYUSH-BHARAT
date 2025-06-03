"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCartOpen } from '@/store/slice/cartSlice';
import CartSidebar from './cart/CartSidebar';

const CartProvider: React.FC = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state: RootState) => state.cart);
  
  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };

  return (
    <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
  );
};

export default CartProvider;
