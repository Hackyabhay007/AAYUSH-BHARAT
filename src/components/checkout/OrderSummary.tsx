import React from "react";
import Image from "next/image";
import getFilePreview from "@/lib/getFilePreview";

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

interface OrderSummaryProps {
  products: CheckoutProduct[];
  appliedCoupon: any;
  calculateTotals: () => { original: number; sale: number };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  appliedCoupon,
  calculateTotals,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-premium sticky top-24">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={`${product.id}-${product.selectedVariant.id}`}
            className="flex gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="h-20 w-20 bg-white rounded-lg overflow-hidden">
              <Image
                src={getFilePreview(product.thumbnail)}
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
                {product.selectedVariant.original_price >
                  product.selectedVariant.sale_price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ₹{product.selectedVariant.original_price}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">x{product.quantity}</div>
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
            <span>
              ₹
              {appliedCoupon
                ? appliedCoupon.finalPrice
                : calculateTotals().sale}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
