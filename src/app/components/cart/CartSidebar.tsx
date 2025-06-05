"use client";
import React from 'react';
import { X, ShoppingCart, ShoppingBag, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import Image from 'next/image';
import { removeCartItem, updateCartItem } from '@/store/slice/cartSlice';
import { CartItem } from '@/types/cart';
import getFilePreview from '@/lib/getFilePreview';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(updateCartItem({ lineId, quantity: newQuantity }));
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    try {
      await dispatch(removeCartItem({ lineId }));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
    onClose();
  };

  const handleCheckout = () => {
    router.push('/checkout?mode=cart');
    onClose();
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
                  <div className="w-20 h-20 relative overflow-hidden">
                    <Image
                      src={getFilePreview(item.thumbnail)}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-dark-green">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight.weight_Value}g</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-700 hover:bg-gray-200 w-6 h-6 flex items-center justify-center border border-gray-300 cursor-pointer transition-all"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-700 hover:bg-gray-200 w-6 h-6 flex items-center justify-center border border-gray-300 cursor-pointer transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-medium text-dark-green">₹{item.weight.sale_Price * item.quantity}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 hover:bg-red-50 transition-all"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart size={48} className="mb-4" />
              <p>Your cart is empty</p>
            </div>
          )}
        </div>{/* Footer */}
        {cart?.items && cart.items.length > 0 && (
          <div className="p-4 border-t bg-[#FCEED5]">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium text-dark-green">₹{cart.total}</span>
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
