"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { clearCart } from '../../../store/slice/cartSlice'; // Add this import
import AddressSelector from '@/components/checkout/AddressSelector';
import ClientOnly from '@/components/ClientOnly';
import { Customer, Address } from '@/types/customer';
import { Order } from '@/types/order';
import CouponSection from '@/components/checkout/CouponSection';
import { DatabaseService } from '@/appwrite/database';
import getFilePreview from '@/lib/getFilePreview';
import Image from 'next/image';
interface CheckoutProduct {
  id: string;
  name: string;
  thumbnail: string;
  category: string[];
  quantity: number;
  selectedVariant: {
    id: string;
    title: number;
    sale_price: number;
    original_price: number;
  };
}

type User = {
  email: string;
  fullname: string;
  phone: string;
  userid: string;
};
interface CheckoutData {
  mode: 'buyNow' | 'cart';
  products: CheckoutProduct[];
}

const CheckoutPage = () => {

    const dispatch = useDispatch<AppDispatch>(); // Add this line
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const router = useRouter();
    const { currentCustomer, token } = useSelector((state: RootState) => state.customer);
    
    const { cart } = useSelector((state: RootState) => state.cart);
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
    const [userPhone, setUserPhone] = useState<string>('');
    const [addressError, setAddressError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [addressesLoading, setAddressesLoading] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [processingPayment, setProcessingPayment] = useState(false); // Add this line
    const [user, setUser] = useState<User | null>(null);
    const sectionVariants = {
        visible: { 
            opacity: 1, 
            y: 0
        }
    };

    const contactRef = useRef(null);
    const deliveryRef = useRef(null);
    const paymentRef = useRef(null);
    const summaryRef = useRef(null);

    const contactInView = useInView(contactRef, { once: true });
    const deliveryInView = useInView(deliveryRef, { once: true });
    const paymentInView = useInView(paymentRef, { once: true });
    const summaryInView = useInView(summaryRef, { once: true });

    const fetchUserAddresses = async () => {
        try {
            console.log("fetching user addresses");
            setAddressesLoading(true);
            setAddressError(null);
                
                
            const response = await fetch('/api/users/addresses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            
            
            const data = await response.json();
            console.log('Raw API response:', data);
        
            if (data.success && Array.isArray(data.addresses)) {
                // Parse each string address into an object
                const parsedAddresses = data.addresses
  .map((addr: any) => {
    if (
      addr &&
      addr.full_name &&
      addr.phone &&
      addr.address_line1 &&
      addr.address_line2 &&
      addr.city &&
      addr.country &&
      addr.state &&
      addr.pincode
    ) {
      return addr as Address;
    }
    return null;
  });

                console.log('Parsed addresses:', parsedAddresses);
                setAddresses(data.addresses);
                
                if (parsedAddresses.length > 0) {
                    const defaultAddr = parsedAddresses.find((addr: Address) => addr?.is_default) || parsedAddresses[0];
                    setSelectedAddress(defaultAddr);
                }
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setAddressError('Failed to load addresses. Please try again.');
        } finally {
            setAddressesLoading(false);
        }
    };

   
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initializeCheckout = async () => {
                try {
                    const userId=localStorage.getItem('userid');
                    if (!userId) {
                        router.push('/login');
                        return;
                    }

                    // First initialize checkout data
                    if (mode === 'buyNow') {
                        const storedData = localStorage.getItem('buyNowData');
                        if (!storedData) throw new Error('No checkout data found');

                        const parsed = JSON.parse(storedData);
                        setCheckoutData({
                            mode: 'buyNow',
                            products: [parsed.product]
                        });
                    } else if (mode === 'cart') {
                        if (!cart?.items?.length) {
                            router.push('/cart');
                            return;
                        }

                        const cartProducts = cart.items.map(item => ({
                            id: item.documentId,
                            name: item.name,
                            thumbnail: item.thumbnail,
                            category: [item.category.$id],
                            quantity: item.quantity,
                            selectedVariant: {
                                id: item.id,
                                title: item.weight.weight_Value,
                                sale_price: item.weight.sale_Price,
                                original_price: item.weight.original_Price
                            }
                        }));

                        setCheckoutData({
                            mode: 'cart',
                            products: cartProducts
                        });
                    } else {
                        router.push('/product');
                        return;
                    }

                    // Then fetch addresses
                    if (currentCustomer?.$id) {
                        await fetchUserAddresses();
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('Checkout error:', error);
                    setError(error instanceof Error ? error.message : 'Failed to initialize checkout');
                    router.push('/product');
                }

                const userId=localStorage.getItem('userid');
                const userData=(await DatabaseService.getUserData(userId)).documents[0];
                setUser(userData);
                console.log(user);
                
            };



            initializeCheckout();
        }
    }, [token, mode, router, cart, currentCustomer]);

    useEffect(() => {
        console.log('Current checkoutData:', checkoutData);
        console.log('Loading state:', loading);
    }, [checkoutData, loading]);

    const calculateTotals = () => {
        if (!checkoutData?.products) return { original: 0, sale: 0 };
        
        // Calculate totals and round to integers
        const totals = checkoutData.products.reduce((acc, product) => ({
            original: acc.original + (product.selectedVariant.original_price * product.quantity),
            sale: acc.sale + (product.selectedVariant.sale_price * product.quantity)
        }), { original: 0, sale: 0 });

        // Round to integers
        return {
            original: Math.round(totals.original),
            sale: Math.round(totals.sale)
        };
    };

    const handlePaymentSubmit = async () => {
        try {
            setLoading(true);
            setAddressError(null);
            setError(null);

            // Debug log
            console.log('Starting payment with customer:', {
                id: user?.userid,
                email: currentCustomer?.email,
                name: user?.fullname
            });

            if (!selectedAddress || !checkoutData?.products) {
                setAddressError('Please select or add a delivery address');
                return;
            }

            const totalAmount = Math.round(calculateTotals().sale);
            const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
            const finalAmount = appliedCoupon ? appliedCoupon.finalPrice : totalAmount;
            const orderItemsKey = `rzp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Create complete order data
            const orderData = {
                address: selectedAddress.address_line1,
                status: 'pending',
                user_id: currentCustomer?.id || currentCustomer?.$id, // Try both possible ID fields
                email: currentCustomer?.email || '',
                state: selectedAddress.state,
                city: selectedAddress.city,
                country: 'IN',
                phone_number: selectedAddress.mobile,
                payment_type: paymentMethod,
                payment_status: 'pending',
                shipping_status: 'pending',
                first_name: selectedAddress.full_name.split(' ')[0],
                last_name: selectedAddress.full_name.split(' ').slice(1).join(' '),
                pincode: parseInt(selectedAddress.pincode),
                total_price: totalAmount,
                payment_amount: finalAmount,
                order_items: checkoutData.products.reduce((sum, p) => sum + p.quantity, 0),
                product_id: checkoutData.products.map(p => p.id),
                weights: checkoutData.products.map(p => p.selectedVariant.title), // Add selected weights array
                idempotency_key: orderItemsKey,
                coupon_code: appliedCoupon?.code,
                coupon_discount: appliedCoupon?.discount,
                coupon_price: discountAmount
            };

            // Validate orderData before proceeding
            if (!orderData.user_id) {
                throw new Error('User ID is required. Please try refreshing the page.');
            }

            if (paymentMethod === 'ONLINE') {
                // Create Razorpay order
                const response = await fetch('/api/create-razorpay-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: finalAmount,
                        currency: 'INR',
                        orderData
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create payment order');
                }

                const result = await response.json();
                console.log('Razorpay order created:', result);

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: result.amount,
                    currency: result.currency,
                    name: 'AAYUSH BHARAT',
                    description: 'Purchase from Aayush Bharat',
                    order_id: result.id,
                    handler: async function(response: any) {
                        try {
                            setProcessingPayment(true); // Start loading
                            console.log('Payment successful, verifying...', response);

                            const verifyResponse = await fetch('/api/verify-payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                    orderData,
                                    products: checkoutData.products,
                                    amount: finalAmount,
                                    user_id: orderData.user_id
                                })
                            });

                            if (!verifyResponse.ok) {
                                throw new Error('Payment verification failed');
                            }

                            const verifyResult = await verifyResponse.json();
                            console.log('Verification result:', verifyResult);

                            if (verifyResult.success) {
                                // Send email confirmation
                                try {
                                    await fetch('/api/send-order-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            email: verifyResult.orderDetails.email,
                                            orderDetails: verifyResult.orderDetails,
                                            products: checkoutData.products
                                        })
                                    });
                                } catch (emailError) {
                                    console.error('Email sending failed:', emailError);
                                    // Continue with order success even if email fails
                                }

                                // Clear cart and show confirmation
                                if (mode === 'cart') {
                                    dispatch(clearCart());
                                }
                                setProcessingPayment(false); // Stop loading
                                setOrderId(verifyResult.orderId);
                                setShowConfirmation(true);
                            } else {
                                throw new Error(verifyResult.error || 'Payment verification failed');
                            }
                        } catch (error) {
                            setProcessingPayment(false); // Stop loading on error
                            console.error('Verification error:', error);
                            setErrorMessage(error instanceof Error ? error.message : 'Payment verification failed');
                            setShowErrorModal(true);
                        }
                    },
                    prefill: {
                        name: currentCustomer?.full_name,
                        email: currentCustomer?.email,
                        contact: selectedAddress?.mobile
                    },
                    notes: {
                        address: selectedAddress?.address_line1
                    },
                    theme: {
                        color: '#9B2C2C'
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Payment error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Payment failed');
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async (newAddress: Address) => {
        try {
            const addressWithId = {
                ...newAddress,
                id: `addr_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
                is_default: addresses.length === 0 // Make first address default
            };
            const addressWithoutId = {
                ...newAddress,
                // id: `addr_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
                // is_default: addresses.length === 0 // Make first address default
            };

            const updatedAddresses = [...addresses, addressWithId];
            
            // Update addresses in Appwrite
            const response = await fetch('/api/users/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                    // addresses: updatedAddresses.map(addr => JSON.stringify(addr))
                    addressWithoutId
                )
            });
            
            const data = await response.json();
            if (data.success) {
                setAddresses(updatedAddresses);
                setSelectedAddress(addressWithId);
                setShowAddressModal(false); // Close modal after success
            } else {
                throw new Error(data.error || 'Failed to save address');
            }
        } catch (error) {
            console.error('Error saving address:', error);
            setAddressError('Failed to save address. Please try again.');
        }
    };

    const handleSelectAddress = (address: Address) => {
        setSelectedAddress(address);
    };

    useEffect(() => {
        const loadScript = async () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        loadScript();
    }, []);

    const handleOpenAddressModal = () => setShowAddressModal(true);
    const handleCloseAddressModal = () => setShowAddressModal(false);

    const handleApplyCoupon = (couponData: any) => {
        setAppliedCoupon(couponData);
    }; 

    const renderAddressSection = () => (
        <div className="bg-white p-8 rounded-2xl shadow-premium">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Delivery Address</h2>
                <motion.button
  whileHover={{ 
    scale: 1.02, 
    boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)"
  }}
  whileTap={{ scale: 0.98 }}
  onClick={handleOpenAddressModal}
  className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-spice-700 to-spice-500 text-dark rounded-lg font-medium shadow-lg group transition-all duration-300 border-2"
>
  <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
  <span className="relative z-10 text-dark-green">Add New Address</span>
</motion.button>


            </div>
            
            {addressesLoading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-600">Loading addresses...</span>
                </div>
            ) : (
                <>
                    {addressError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            {addressError}
                        </div>
                    )}
                    
                    {addresses.length === 0 ? (
                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
                            No addresses found. Please add a delivery address.
                        </div>
                    ) : (
                        <AddressSelector
                            addresses={addresses}
                            onAddAddress={handleAddAddress}
                            onSelectAddress={handleSelectAddress}
                            selectedAddress={selectedAddress}
                            userPhone={userPhone}
                        />
                    )}
                </>
            )}
        </div>
    );

    useEffect(() => {
        if (currentCustomer?.$id && token) {
            fetchUserAddresses();
        } else {
            setAddressesLoading(false);
        }
    }, [currentCustomer?.$id, token]);

    useEffect(()=>{
        fetchUserAddresses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-bgColor to-lightBgColor py-12 flex items-center justify-center pt-[15%] md:pt-[7%]">
                <div className="text-center space-y-4"> 
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-dark-green border-t-transparent mx-auto"></div>
                    <p className="text-gray-600 font-medium">Loading checkout...</p>
                </div>
            </div>
        );
    }

    if (error || !checkoutData?.products) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-bgColor to-lightBgColor py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'No product data found'}</p>
                    <button 
                        onClick={() => router.push('/shop')}
                        className="text-darkRed underline"
                    >
                        Return to Shop
                    </button>
                </div>
            </div>
        );
    }
   
    console.log(checkoutData);
    

    return (
        <ClientOnly>
            <div className="min-h-screen bg-beige font-montserrat bg-gradient-to-b from-bgColor to-lightBgColor py-12 pt-[15%] md:pt-[7%]">
                <div className="w-[90%] max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-12">
                        {/* Left column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Info */}
                            <div className="bg-white p-8 rounded-2xl shadow-premium">
                                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-2">Email: {currentCustomer?.email}</p>
                                <p className="text-gray-600">Name: {user?.fullname}</p>
                            </div>

                            {/* Address Section */}
                            {renderAddressSection()}

                            {/* Coupon Section */}
                            <div className="bg-white p-8 rounded-2xl shadow-premium">
                                <h2 className="text-2xl font-semibold mb-6">Coupon</h2>
                                <CouponSection
                                    onApplyCoupon={handleApplyCoupon}
                                    totalAmount={calculateTotals().sale}
                                    onRemoveCoupon={() => setAppliedCoupon(null)}
                                    appliedCoupon={appliedCoupon}
                                />
                            </div>

                            {/* Payment Section */}
                            <div
                                ref={paymentRef}
                                className="bg-white p-8 rounded-2xl shadow-premium"
                            >
                                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-darkRed text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                                    Payment Method
                                </h2>
                                <div className="space-y-4 mb-6">
                                    {/* <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="payment"
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={(e) => setPaymentMethod(e.target.value as 'COD')}
                                            className="form-radio text-darkRed"
                                        />
                                        <label htmlFor="cod">Cash on Delivery</label>
                                    </div> */}
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="online"
                                            name="payment"
                                            value="ONLINE"
                                            checked={paymentMethod === 'ONLINE'}
                                            onChange={(e) => setPaymentMethod(e.target.value as 'ONLINE')}
                                            className="form-radio text-darkRed"
                                        />
                                        <label htmlFor="online">Online Payment</label>
                                    </div>
                                </div>
                                <motion.button
  whileHover={{ 
    scale: 1.02, 
    boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)"
  }}
  whileTap={{ scale: 0.98 }}
  onClick={handlePaymentSubmit}
  disabled={loading}
  className="relative overflow-hidden w-full p-4 bg-gradient-to-r from-spice-700 to-spice-500 text-black shadow-2xl border-2 rounded-lg font-medium  group transition-all duration-300 disabled:opacity-70"
>
  <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
  <span className="relative z-10">
    {loading ? 'Processing...' : `Proceed with ${paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}`}
  </span>
</motion.button>

                            </div>
                        </div>

                        {/* Right column - Order Summary */}
                        <div ref={summaryRef} className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-premium sticky top-24">
                                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    {checkoutData?.products.map((product) => (
                                        <div key={`${product.id}-${product.selectedVariant.id}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="h-20 w-20 bg-white rounded-lg overflow-hidden">
                                                <Image 
                                                    src={getFilePreview( product.thumbnail)} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover" 
                                                    width={500}
                                                    height={500}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {product.selectedVariant.title}g
                                                </p>
                                                <div className="mt-1">
                                                    <span className="text-darkRed font-medium">
                                                        ₹{product.selectedVariant.sale_price}
                                                    </span>
                                                    {product.selectedVariant.original_price > product.selectedVariant.sale_price && (
                                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                                            ₹{product.selectedVariant.original_price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                x{product.quantity}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-6 space-y-4 border-t pt-6">
                                        {calculateTotals().original > calculateTotals().sale && (
                                            <div className="flex justify-between text-gray-600">
                                                <span>Original Price</span>
                                                <span className="line-through">₹{calculateTotals().original}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{calculateTotals().sale}</span>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                                                <span>-₹{appliedCoupon.discountAmount}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold text-xl">
                                            <span>Total</span>
                                            <span>₹{appliedCoupon ? appliedCoupon.finalPrice : calculateTotals().sale}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Processing Modal */}
                {processingPayment && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4">
                                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p className="text-white text-lg font-medium">
                                    Processing your payment...
                                </p>
                                <p className="text-amber-200 text-sm mt-2">
                                    Please wait while we confirm your order
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Payment Error Modal */}
                {showErrorModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg 
                                        className="w-8 h-8 text-red-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12" 
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
                                <p className="text-gray-600 mb-6">
                                    {errorMessage}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            setShowErrorModal(false);
                                            setErrorMessage('');
                                        }}
                                        className="px-6 py-2 bg-darkRed text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={() => router.push('/cart')}
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Back to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Order Confirmation Modal */}
                {showConfirmation && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg 
                                        className="w-8 h-8 text-green-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M5 13l4 4L19 7" 
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
                                <p className="text-gray-600 mb-4">
                                    Your order has been successfully placed.
                                    <br />
                                    Order ID: {orderId}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => router.push(`/profile/orders/${orderId}`)}
                                        className="px-4 py-2 bg-darkRed text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        View Order
                                    </button>
                                    <button
                                        onClick={() => router.push('/shop')}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Add Address Modal */}
                {showAddressModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-blend-color backdrop-blur-lg  bg-opacity-10 flex items-center justify-center z-50"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
                        >
                            <AddressSelector
                                addresses={[]}
                                onAddAddress={(address: Address) => {
                                    handleAddAddress(address);
                                    handleCloseAddressModal();
                                }}
                                onSelectAddress={() => {}}
                                selectedAddress={null}
                                userPhone={userPhone}
                                hideExistingAddresses
                            />
                            <button
                                onClick={handleCloseAddressModal}
                                className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </ClientOnly>
    );
};

export default CheckoutPage;