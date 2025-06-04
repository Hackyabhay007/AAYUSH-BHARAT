import { useRouter } from 'next/navigation';

interface OrderSuccessProps {
  orderId: string;
  onClose?: () => void;
}

export const OrderSuccess = ({ orderId, onClose }: OrderSuccessProps) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
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
              onClick={() => router.push(`/order-success/${orderId}`)}
              className="px-4 py-2 bg-darkRed text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              View Order Details
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
