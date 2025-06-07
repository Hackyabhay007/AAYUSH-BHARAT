"use client";
import React from 'react';
import { X, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCartOpen, updateCartItem, removeCartItem } from '@/store/slice/cartSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import getFilePreview from '@/lib/getFilePreview';
import { CartItem } from '@/types/cart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  // Memoize total calculation
  const total = cart?.items.reduce((sum, item) => 
    sum + (item.weight.sale_Price * item.quantity)
  , 0) ?? 0;
  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(updateCartItem({ lineId, quantity: newQuantity }));
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Update cart error:', error);
      toast.error('Failed to update cart');
    }
  };
  const handleRemoveItem = async (lineId: string) => {
    try {
      await dispatch(removeCartItem({ lineId }));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
    onClose();
  };

  const handleCheckout = () => {
    dispatch(setCartOpen(false));
    router.push('/checkout?mode=cart');
  };

  return (
    <>
      {/* Cart Overlay Blur */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}      {/* Cart Drawer */}
      <div
        className={`fixed flex flex-col justify-between top-0 right-0 w-full sm:w-[400px] h-full z-50 bg-light transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex bg-beige justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium uppercase flex items-center text-dark-green">
            <ShoppingBag size={20} className="mr-2" />
            Your Cart {cart?.items && cart.items.length > 0 && (
              <span className="ml-2 text-sm bg-dark-green text-white px-2 py-0.5 rounded-full">
                {cart.items.length}
              </span>
            )}
          </h2>
          <button onClick={onClose} className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-y-auto">
          {cart?.items && cart.items.length > 0 ? (
            <div className="space-y-4">
              {cart.items.map((item: CartItem) => (
                <div key={item.id} className="flex gap-4 pb-4 hover:bg-beige/30 p-2 transition-all">
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.thumbnail ? getFilePreview(item.thumbnail) : '/placeholder.jpg'}
                      alt={item.name || 'Product image'}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.weight.weight_Value}g
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-medium">₹{item.weight.sale_Price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="text-lg">Your cart is empty</span>
              </div>
              <button
                onClick={onClose}
                className="mt-4 text-dark-green hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart?.items && cart.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-medium">₹{total}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleGoToCart} 
                className="border border-dark-green text-dark-green py-3 rounded font-medium cursor-pointer relative overflow-hidden group"
              >
                <span className="relative flex items-center justify-center transition-all duration-300 group-hover:-translate-x-full">
                  Go to Cart
                  <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-full transition-transform duration-300">
                    <ShoppingBag size={18} />
                  </span>
                </span>
              </button>
              <button 
                onClick={handleCheckout} 
                className="bg-dark-green text-white py-3 rounded font-medium cursor-pointer relative overflow-hidden group"
              >
                <span className="relative flex items-center justify-center transition-all duration-300 group-hover:-translate-x-full">
                  Checkout
                  <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-full transition-transform duration-300">
                    <ShoppingCart size={18} />
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
