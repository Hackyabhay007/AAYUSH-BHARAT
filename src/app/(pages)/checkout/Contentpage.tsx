"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { clearCart } from "../../../store/slice/cartSlice";
import { CartState } from "@/types/cart";
import { OrderService } from "@/services/OrderService";
import AddressSelector from "@/components/checkout/AddressSelector";
import ClientOnly from "@/components/ClientOnly";
import { Customer } from "@/types/customer";
import { Order } from "@/types/order";
import CouponSection from "@/components/checkout/CouponSection";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import DatabaseService, {
  AddressDocument,
  AddressData,
} from "@/services/DatabaseService";
import { databases } from "@/app/api/lib/appwrite";
import getFilePreview from "@/lib/getFilePreview";
import Image from "next/image";
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
  name?: string; // Optional name field for compatibility
  phone: string;
  userid: string;
};
interface CheckoutData {
  mode: "buyNow" | "cart";
  products: CheckoutProduct[];
}

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>(); // Add this line
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const router = useRouter();
  const { currentCustomer, token } = useSelector(
    (state: RootState) => state.customer
  );

  const { cart } = useSelector((state: RootState) => state.cart as CartState);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [addresses, setAddresses] = useState<AddressDocument[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressDocument | null>(null);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [userPhone, setUserPhone] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [processingPayment, setProcessingPayment] = useState(false); // Add this line
  const [user, setUser] = useState<User | null>(null);
  const sectionVariants = {
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const contactRef = useRef(null);
  const deliveryRef = useRef(null);
  const paymentRef = useRef(null);
  const summaryRef = useRef(null);

  const contactInView = useInView(contactRef, { once: true });
  const deliveryInView = useInView(deliveryRef, { once: true });
  const paymentInView = useInView(paymentRef, { once: true });
  const summaryInView = useInView(summaryRef, { once: true }); // fetchUserAddresses has been moved to useAddresses hook

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initializeCheckout = async () => {
        try {
          const userId = localStorage.getItem("userid");
          if (!userId) {
            router.push("/login");
            return;
          }

          // First initialize checkout data
          if (mode === "buyNow") {
            const storedData = localStorage.getItem("buyNowData");
            if (!storedData) throw new Error("No checkout data found");

            const parsed = JSON.parse(storedData);
            setCheckoutData({
              mode: "buyNow",
              products: [parsed.product],
            });
          } else if (mode === "cart") {
            if (!cart?.items?.length) {
              router.push("/cart");
              return;
            }

            const cartProducts = cart.items.map((item: any) => ({
              id: item.documentId,
              name: item.name,
              thumbnail: item.thumbnail,
              category: [item.category.$id],
              quantity: item.quantity,
              selectedVariant: {
                id: item.id,
                title: item.weight.weight_Value,
                sale_price: item.weight.sale_Price,
                original_price: item.weight.original_Price,
              },
            }));

            setCheckoutData({
              mode: "cart",
              products: cartProducts,
            });
          } else {
            router.push("/product");
            return;
          } // Then fetch addresses
          if (currentCustomer?.$id) {
            await fetchAddresses();
          }

          setLoading(false);
        } catch (error) {
          console.error("Checkout error:", error);
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize checkout"
          );
          router.push("/product");
        }
        const userId = localStorage.getItem("userid");
        if (userId) {
          try {
            const userData = await DatabaseService.getUserData(userId);
            if (userData) {
              console.log("User data fetched:", userData);

              // Set user data ensuring consistent field names
              const userObj = {
                email: userData.email,
                fullname: userData.fullname,
                phone: userData.phone,
                userid: userData.userid,
              };

              console.log("Processed user data:", userObj);
              setUser(userObj);
              setEmail(userObj.email);
            } else {
              console.log("No user data found for ID:", userId);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };

      initializeCheckout();
    }
  }, [token, mode, router, cart, currentCustomer]);

  useEffect(() => {
    console.log("Current checkoutData:", checkoutData);
    console.log("Loading state:", loading);
  }, [checkoutData, loading]);

  const calculateTotals = () => {
    if (!checkoutData?.products) return { original: 0, sale: 0 };

    // Calculate totals and round to integers
    const totals = checkoutData.products.reduce(
      (acc, product) => ({
        original:
          acc.original +
          product.selectedVariant.original_price * product.quantity,
        sale: acc.sale + product.selectedVariant.sale_price * product.quantity,
      }),
      { original: 0, sale: 0 }
    );

    // Round to integers
    return {
      original: Math.round(totals.original),
      sale: Math.round(totals.sale),
    };
  };
  const handlePaymentSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check for user authentication
      const storedUserId = localStorage.getItem("userid");
      if (!storedUserId) {
        throw new Error("Please log in to continue");
      }

      // Debug log
      console.log("Starting payment with customer:", {
        id: user?.userid,
        email: currentCustomer?.email,
        name: user?.fullname,
      });
      if (!selectedAddress || !checkoutData?.products) {
        setError("Please select or add a delivery address");
        return;
      }

      const totalAmount = Math.round(calculateTotals().sale);
      const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
      const finalAmount = appliedCoupon
        ? appliedCoupon.finalPrice
        : totalAmount;
      const orderItemsKey = `rzp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;      // Create complete order data

      const orderData = {
        address: selectedAddress.address_line1,
        status: "pending",
        user_id: storedUserId,
        email: user?.email || currentCustomer?.email || "",
        state: selectedAddress.state,
        city: selectedAddress.city,
        country: "IN",
        phone_number: selectedAddress.mobile,
        payment_type: paymentMethod,
        payment_status: "pending",
        shipping_status: "pending",
        first_name: selectedAddress.full_name.split(" ")[0],
        last_name: selectedAddress.full_name.split(" ").slice(1).join(" "),
        pincode: parseInt(selectedAddress.pincode),
        total_price: totalAmount,
        payment_amount: finalAmount,        order_items: checkoutData.products.reduce(
          (sum, p) => sum + p.quantity,
          0
        ),
        product_id: checkoutData.products.map((p) => p.id).join(','), // Convert product IDs to comma-separated string
        weights: checkoutData.products.reduce((total, p) => total + (Number(p.selectedVariant.title) * p.quantity), 0), // Calculate total weight of all products
        idempotency_key: orderItemsKey,
        coupon_code: appliedCoupon?.code,
        coupon_discount: appliedCoupon?.discount,
        coupon_price: discountAmount,
      };

      // Validate orderData before proceeding
      if (!orderData.user_id) {
        throw new Error("User ID is required. Please try refreshing the page.");
      }      if (paymentMethod === "COD") {
        try {          setProcessingPayment(true); // Show loader
          // Create order for COD
          const createdOrder = await OrderService.createOrder({
            ...orderData,
            payment_type: "COD",
            status: "pending",
            payment_status: "pending",
            shipping_status: "pending"
          });
          
          // Clear cart if order was created successfully
          if (mode === "cart") {
            dispatch(clearCart());
          }
          
          // Show success popup
          setOrderId(createdOrder.$id);
          setProcessingPayment(false);
          setShowConfirmation(true);
          return;
        } catch (error) {
          console.error("Error creating COD order:", error);
          throw new Error("Failed to create order. Please try again.");
        }
      }

      if (paymentMethod === "ONLINE") {
        // Create Razorpay order
        const response = await fetch("/api/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalAmount,
            currency: "INR",
            orderData,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment order");
        }

        const result = await response.json();
        console.log("Razorpay order created:", result);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: result.amount,
          currency: result.currency,
          name: "AAYUSH BHARAT",
          description: "Purchase from Aayush Bharat",
          order_id: result.id,          handler: async function (response: any) {
            try {
              setProcessingPayment(true); // Start loading
              console.log("Payment successful, verifying...", response);

              const verifyResponse = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderData: {
                    ...orderData,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                  },
                  products: checkoutData.products,
                  amount: finalAmount,
                  user_id: orderData.user_id,
                }),
              });

              if (!verifyResponse.ok) {
                const errorData = await verifyResponse.json();
                throw new Error(errorData.error || "Payment verification failed");
              }

              const verifyResult = await verifyResponse.json();
              console.log("Verification result:", verifyResult);

              if (verifyResult.success) {
                // Send email confirmation
                try {
                  await fetch("/api/send-order-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: verifyResult.orderDetails.email,
                      orderDetails: verifyResult.orderDetails,
                      products: checkoutData.products,
                    }),
                  });
                } catch (emailError) {
                  console.error("Email sending failed:", emailError);
                  // Continue with order success even if email fails
                }

                // Clear cart and show confirmation
                if (mode === "cart") {
                  dispatch(clearCart());
                }
                setProcessingPayment(false); // Stop loading
                setOrderId(verifyResult.orderId);
                setShowConfirmation(true);
              } else {
                throw new Error(
                  verifyResult.error || "Payment verification failed"
                );
              }
            } catch (error) {
              setProcessingPayment(false); // Stop loading on error
              console.error("Verification error:", error);
              setErrorMessage(
                error instanceof Error
                  ? error.message
                  : "Payment verification failed"
              );
              setShowErrorModal(true);
            }
          },
          prefill: {
            name: currentCustomer?.full_name,
            email: currentCustomer?.email,
            contact: selectedAddress?.mobile,
          },
          notes: {
            address: selectedAddress?.address_line1,
          },
          theme: {
            color: "#9B2C2C",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Payment failed"
      );
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };
  const handleAddAddress = async (
    newAddress: Omit<AddressDocument, "userId" | "$id">
  ) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setAddressError("Please log in to continue");
        return;
      }

      // Validate required fields
      const requiredFields = [
        "full_name",
        "address_line1",
        "city",
        "state",
        "pincode",
        "mobile",
      ];
      for (const field of requiredFields) {
        if (!newAddress[field as keyof typeof newAddress]) {
          setAddressError(`Please enter ${field.replace("_", " ")}`);
          return;
        }
      }

      // Validate phone number
      if (!/^\d{10}$/.test(newAddress.mobile)) {
        setAddressError("Please enter a valid 10-digit mobile number");
        return;
      }

      // Validate pincode
      if (!/^\d{6}$/.test(newAddress.pincode)) {
        setAddressError("Please enter a valid 6-digit pincode");
        return;
      }

      // Convert AddressDocument to AddressData
      const addressData: AddressData = {
        full_name: newAddress.full_name,
        address_line1: newAddress.address_line1,
        address_line2: newAddress.address_line2 || "",
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode,
        type: newAddress.type || "home",
        mobile: newAddress.mobile,
        country: newAddress.country || "IN",
        userId,
        is_default: addresses.length === 0, // Make first address default
      };

      console.log("Creating new address:", addressData);
      const createdAddress = await DatabaseService.createAddress(addressData);
      console.log("Address created:", createdAddress);

      setAddresses((prev) => [...prev, createdAddress]);
      setSelectedAddress(createdAddress);
      setShowAddressModal(false);
      setAddressError(null);
    } catch (error) {
      console.error("Error saving address:", error);
      setAddressError("Failed to save address. Please try again.");
    }
  };
  const handleSelectAddress = (address: AddressDocument) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    const loadScript = async () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
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
  const fetchAddresses = async () => {
    try {
      setAddressesLoading(true);
      setAddressError(null);

      const userId = localStorage.getItem("userid");
      if (!userId) {
        setAddressError("Please log in to continue");
        return;
      }

      console.log("Fetching addresses for user:", userId);
      const fetchedAddresses = await DatabaseService.getUserAddresses(userId);
      console.log("Fetched addresses:", fetchedAddresses);

      if (Array.isArray(fetchedAddresses)) {
        setAddresses(fetchedAddresses);

        // Set default address if available
        if (fetchedAddresses.length > 0) {
          const defaultAddr =
            fetchedAddresses.find((addr) => addr.is_default) ||
            fetchedAddresses[0];
          console.log("Setting default address:", defaultAddr);
          setSelectedAddress(defaultAddr);
        }
      } else {
        throw new Error("Invalid address data received");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddressError("Failed to load addresses. Please try again.");
    } finally {
      setAddressesLoading(false);
    }
  };

  const renderAddressSection = () => (
    <div className="bg-white p-8 rounded-2xl shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Delivery Address</h2>
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAddressModal}
          className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-500 text-dark rounded-lg font-medium shadow-lg group transition-all duration-300 border-2"
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
          {" "}
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
              onAddAddress={(address) =>
                handleAddAddress(
                  address as Omit<AddressDocument, "userId" | "$id">
                )
              }
              onSelectAddress={(address: AddressDocument) =>
                setSelectedAddress(address)
              }
              selectedAddress={selectedAddress}
              userPhone={user?.phone}
            />
          )}
        </>
      )}
    </div>
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userid");
      if (userId) {
        fetchAddresses();
      }
    }
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
          <p className="text-red-600 mb-4">
            {error || "No product data found"}
          </p>
          <button
            onClick={() => router.push("/shop")}
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
              {" "}
              {/* Contact Info */}{" "}
              <div className="bg-white p-8 rounded-2xl shadow-premium">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-2">
                  Email: {user?.email || email || "Not available"}
                </p>
                <p className="text-gray-600">
                  Name: {user?.fullname || "Not available"}
                </p>
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
              {/* Payment Section */}              <div ref={paymentRef}>
                <PaymentSection
                  paymentMethod={paymentMethod}
                  loading={loading}
                  onPaymentMethodChange={(method) => setPaymentMethod(method)}
                  onSubmit={handlePaymentSubmit}
                />
              </div>
            </div>            {/* Right column - Order Summary */}
            <div ref={summaryRef} className="lg:col-span-1">
              <OrderSummary 
                products={checkoutData?.products}
                appliedCoupon={appliedCoupon}
                calculateTotals={calculateTotals}
              />
            </div>
          </div>
        </div>
        {/* Payment Processing Modal */}
        {processingPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 border-4 border-dark-green border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-white text-lg font-medium">
                Processing your order...
              </p>
              <p className="text-green-200 text-sm mt-2">
                Please don't close this window
              </p>
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
                </div>                <h2 className="text-2xl font-semibold mb-2 text-red-600">Payment Failed</h2>
                <p className="text-gray-600 mb-6">{errorMessage}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setShowErrorModal(false);
                      setErrorMessage("");
                    }}
                    className="px-6 py-2 bg-dark-green text-white rounded-lg hover:bg-green-900 transition-all duration-300 shadow-lg"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => router.push("/cart")}
                    className="px-6 py-2 border-2 border-dark-green text-dark-green rounded-lg hover:bg-green-50 transition-all duration-300"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}        {/* Order Confirmation Modal */}
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-dark-green"
                >
                  <svg
                    className="w-10 h-10 text-dark-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-2 text-dark-green">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your order has been successfully placed.
                    <br />
                    <span className="font-medium">Order ID: </span>
                    <span className="font-mono">{orderId}</span>
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => router.push(`/order-success/${orderId}`)}
                      className="px-6 py-3 bg-dark-green text-white rounded-lg hover:bg-green-900 transition-all duration-300 shadow-lg"
                    >
                      View Order Details
                    </button>
                    <button
                      onClick={() => router.push("/shop")}
                      className="px-6 py-3 border-2 border-dark-green text-dark-green rounded-lg hover:bg-green-50 transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}{" "}
        {/* Add Address Modal */}
        {showAddressModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Address</h3>
                <button
                  onClick={handleCloseAddressModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <AddressSelector
                addresses={[]}
                onAddAddress={(address) => {
                  handleAddAddress(
                    address as Omit<AddressDocument, "userId" | "$id">
                  );
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
