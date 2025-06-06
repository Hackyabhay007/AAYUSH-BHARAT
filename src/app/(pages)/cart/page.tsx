"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchCart, updateCartItem, removeCartItem } from '../../../store/slice/cartSlice';
import { CartItem } from '../../../types/cart';
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'
import { Package } from 'lucide-react'; // Add this import

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const ShoppingCartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const router = useRouter(); // This will now use the App Router

  useEffect(() => {
    dispatch(fetchCart()).catch(() => {
      // Handle error if needed
    });
  }, [dispatch]);

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    // Enforce minimum quantity of 1
    const newQuantity = Math.max(1, quantity);
    await dispatch(updateCartItem({
      lineId,
      quantity: newQuantity,
    }));
  };

  const removeProduct = async (lineId: string) => {
    if (!cart) return;
    await dispatch(removeCartItem({
      lineId,
    }));
  };

  const handleCheckout = () => {
    if (!cart?.items?.length) return;
    router.push('/checkout?mode=cart');
  };

  const [checkoutAnimation, setCheckoutAnimation] = useState(false);

  const handleCheckoutClick = () => {
    setCheckoutAnimation(true);
    setTimeout(() => {
      setCheckoutAnimation(false);
      handleCheckout();
    }, 1000);
  };

  const renderCartItem = (item: CartItem) => (
    <motion.div
      key={item.id}
      className="bg-white font-montserrat rounded-xl shadow-premium hover:shadow-premium-hover p-6 transition-all duration-300"
      variants={itemVariants}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Image
          src={item.thumbnail}
          alt={item.name}
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded sm:w-28 sm:h-28"
        />
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.weight.weight_Value}g</p>
            <p className="text-sm text-gray-600">
              Original Price: ₹{item.weight.original_Price.toFixed(2)}
            </p>
          </div>
          <motion.button
            onClick={() => removeProduct(item.id)}
            className="text-sm text-blue-600 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove
          </motion.button>
        </div>
        <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors
                ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              whileHover={item.quantity > 1 ? { scale: 1.1 } : {}}
              whileTap={item.quantity > 1 ? { scale: 0.9 } : {}}
              disabled={item.quantity <= 1}
            >
              -
            </motion.button>
            <span className="w-8 text-center">{item.quantity}</span>
            <motion.button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              +
            </motion.button>
          </div>
          <motion.div
            className="text-right font-medium text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.weight.sale_Price * item.quantity}
          >
            ₹{(item.weight.sale_Price * item.quantity).toFixed(2)}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen font-montserrat bg-gradient-to-b md:pt-10 pt-14 pb-20 md:pb-8 from-bgColor to-lightBgColor">
      {/* Add premium background pattern */}
      <div className="absolute inset-0 bg-texture-grain opacity-5 mix-blend-overlay pointer-events-none"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1
          className="text-center font-bold text-4xl md:text-5xl text-gray-800 mb-4"
          variants={itemVariants}
        >
          Your Shopping Cart
        </motion.h1>
        <motion.p
          className="text-center text-lg md:text-xl text-gray-600 mb-12"
          variants={itemVariants}
        >
          Complete your purchase and experience the finest spices
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
            {cart?.items.map(renderCartItem)}
          </div>

          {/* Enhanced Summary Card */}
          <motion.div
            className="lg:sticky lg:top-6 bg-white rounded-xl shadow-premium p-6 h-fit border border-gold-200"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-playfair font-bold text-premium-900 mb-6">Order Summary</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-spice-600 to-spice-400 mb-6"></div>
            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={cart?.total}
              >
                <span className="text-lg font-medium text-premium-900">Total</span>
                <span className="text-xl font-playfair font-bold text-spice-700">
                  <span className="font-sans">₹</span> {(cart?.total || 0).toFixed(2)}
                </span>
              </motion.div>
              <p className="text-sm text-premium-700">Shipping calculated at checkout.</p>
              <motion.button
                onClick={handleCheckoutClick}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={!cart?.items?.length}
                className="relative overflow-hidden w-full px-8 py-4 bg-gradient-to-r from-spice-700 to-spice-600 
                  text-white rounded-lg font-medium shadow-spice-glow group disabled:opacity-50 
                  disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <motion.span
                    animate={checkoutAnimation ? {
                      x: [0, -10, 300], // Move left first, then far right
                      opacity: [1, 1, 0] // Fade out at the end
                    } : {
                      x: 0,
                      opacity: 1
                    }}
                    transition={{
                      duration: 1,
                      times: [0, 0.2, 1],
                      ease: "easeInOut"
                    }}
                    className="inline-block"
                  >
                    <Package className="h-5 w-5" />
                  </motion.span>
                </span>
              </motion.button>
              <motion.button
                onClick={() => router.push('/')}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(212, 160, 93, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full px-8 py-4 bg-gradient-to-r from-spice-50 to-spice-100 
                  text-spice-700 rounded-lg font-medium group border border-spice-200
                  hover:border-spice-300 transition-all duration-300 mt-4"
              >
                <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-50"></span>
                <span className="relative z-10">
                  Continue Shopping
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShoppingCartPage;
