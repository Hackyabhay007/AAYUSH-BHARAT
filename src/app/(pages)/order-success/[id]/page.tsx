"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { OrderService } from '@/services/OrderService';
import { Order } from '@/types/order';
import SimpleLoader from '@/components/SimpleLoader';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const OrderSuccessPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!params.id) return;
        const orderData = await OrderService.getOrder(params.id as string);
        setOrder(orderData as Order);
      } catch (error) {
        setError('Failed to fetch order details');
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const handleTrackOrder = () => {
    if (order?.$id) {
      router.push(`/track-order/${order.$id}`);
    }
  };

  const handleCancelOrder = async () => {
    if (!order?.$id) return;
    try {
      await OrderService.cancelOrder(order.$id);
      // Refresh order data
      const updatedOrder = await OrderService.getOrder(order.$id);
      setOrder(updatedOrder as Order);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  if (loading) {
    return <SimpleLoader />;
  }

  if (error || !order) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#363f1d] text-black shadow-md">
          <Navbar scrolled={true} />
        </div>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-2">{error || 'Order not found'}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#363f1d] text-black shadow-md">
        <Navbar scrolled={true} />
      </div>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">Order Successful!</h1>
            <p className="mt-2 text-gray-600">Thank you for your order</p>
          </div>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Order Details</h2>
              <p className="text-gray-600">Order ID: {order.$id}</p>
              <p className="text-gray-600">Total Amount: ₹{order.payment_amount}</p>
              <p className="text-gray-600">Payment Method: {order.payment_type}</p>
              <p className="text-gray-600">Status: {order.status}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
              <p className="text-gray-600">{order.first_name} {order.last_name}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
              <p className="text-gray-600">Phone: {order.phone_number}</p>
            </div>

            {order.coupon_code && (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">Discount Applied</h2>
                <p className="text-gray-600">Coupon: {order.coupon_code}</p>
                <p className="text-gray-600">Discount Amount: ₹{order.coupon_discount}</p>
              </div>
            )}            <div>
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <p className="text-gray-600">Items: {order.order_items.length}</p>
              <div className="mt-2">
                {order.order_items.map((item, index) => (
                  <div key={index} className="text-gray-600 ml-4">
                    • {item.quantity}x {item.name} - ₹{item.price * item.quantity}
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-4">Subtotal: ₹{order.total_price}</p>
              {order.coupon_discount && (
                <p className="text-gray-600">Discount: -₹{order.coupon_discount}</p>
              )}
              <p className="font-semibold mt-2">Final Amount: ₹{order.payment_amount}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleTrackOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Track Order
            </button>
            {order.status !== 'cancelled' && (
              <button
                onClick={handleCancelOrder}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
