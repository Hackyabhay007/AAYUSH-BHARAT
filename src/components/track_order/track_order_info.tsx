import React from 'react';
import { Order } from '@/types/order';

interface TrackOrderInfoProps {
  order: Order;
}

const TrackOrderInfo: React.FC<TrackOrderInfoProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Order Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Order ID: {order.$id}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-600">Payment Method: {order.payment_type}</p>
            <p className="text-gray-600">Total Amount: ₹{order.payment_amount}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Shipping Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">{order.first_name} {order.last_name}</p>
            <p className="text-gray-600">{order.address}</p>
            <p className="text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
            <p className="text-gray-600">Phone: {order.phone_number}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Total Items: {order.order_items.length}</p>
          <div className="pl-4 space-y-1">
            {order.order_items.map((item, index) => (
              <p key={index} className="text-gray-600">
                • {item.quantity}x {item.name} (₹{item.price} each)
              </p>
            ))}
          </div>
          <p className="text-gray-600">Subtotal: ₹{order.total_price}</p>
          {typeof order.coupon_discount !== 'undefined' && order.coupon_discount > 0 && (
            <p className="text-gray-600">Discount: -₹{order.coupon_discount}</p>
          )}
          <p className="font-semibold">Final Amount: ₹{order.payment_amount}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderInfo;