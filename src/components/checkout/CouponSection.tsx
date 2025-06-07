'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Ticket } from 'lucide-react';
import { CouponData } from '@/types/coupon';

interface CouponSectionProps {
    onApplyCoupon: (couponData: CouponData) => void;
    totalAmount: number;
    onRemoveCoupon: () => void;
    appliedCoupon: CouponData | null;
}

const CouponSection = ({ onApplyCoupon, totalAmount, onRemoveCoupon, appliedCoupon }: CouponSectionProps) => {
    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [applyAnimation, setApplyAnimation] = useState(false);

    const inputClasses = "relative overflow-hidden bg-[#f9f5e9] group/input focus-within:shadow-premium-soft transition-all duration-300";
    const inputShineClasses = "absolute inset-0 bg-gold-shimmer -translate-x-full group-focus-within/input:translate-x-full transition-all duration-1000 opacity-20 pointer-events-none";

    const handleApplyCoupon = async () => {
        setApplyAnimation(true);
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/verify-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    couponCode: couponCode.toUpperCase(),
                    totalAmount,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            if (data.success) {
                const discountAmount = Math.round((totalAmount * data.coupon.discount) / 100);
                onApplyCoupon({
                    ...data.coupon,
                    discountAmount,
                    finalPrice: totalAmount - discountAmount
                });
            }

            setCouponCode('');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';            setError(errorMessage);
        } finally {
            setLoading(false);
            setTimeout(() => setApplyAnimation(false), 1000);
        }
    };

    if (appliedCoupon) {
        return (
            <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-green-700 font-medium">
                            Coupon Applied: {appliedCoupon.code}
                        </p>
                        <p className="text-sm text-green-600">
                            You saved ₹{appliedCoupon.discountAmount}
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onRemoveCoupon}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="Enter coupon code"
                            className="w-full p-3 bg-transparent outline-none rounded-lg"
                            disabled={loading}
                        />
                    </div>
                </div>
                <motion.button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || loading}
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 
                        text-black shadow-2xl border-2 rounded-lg font-medium shadow-gray-glow group disabled:opacity-50 
                        disabled:cursor-not-allowed min-w-[120px]"
                >
                    <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? 'Applying...' : 'Apply'}
                        <motion.span
                            animate={applyAnimation ? {
                                x: [0, -10, 300],
                                opacity: [1, 1, 0]
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
                            <Ticket className="h-4 w-4" />
                        </motion.span>
                    </span>
                </motion.button>
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default CouponSection;