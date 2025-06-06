"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { OrderService } from '@/services/OrderService';
import { Order } from '@/types/order';
import SimpleLoader from '@/components/SimpleLoader';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import TrackOrderInfo from '@/components/track_order/track_order_info';
import OrderTimeline from '@/components/track_order/order_time_line';

const TrackOrderPage = () => {
  const params = useParams();
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Track Order</h1>
          <TrackOrderInfo order={order} />
          <OrderTimeline status={order.status} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackOrderPage;
