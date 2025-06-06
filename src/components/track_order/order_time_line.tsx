import React from 'react';

interface TimelineItem {
  status: string;
  date: string;
  isCompleted: boolean;
}

interface OrderTimelineProps {
  status: string;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  const getTimelineItems = (): TimelineItem[] => {
    const items: TimelineItem[] = [
      { status: 'Order Placed', date: 'Order Confirmed', isCompleted: true },
      { status: 'Processing', date: 'Order is being processed', isCompleted: status !== 'pending' },
      { status: 'Shipped', date: 'Your order has been shipped', isCompleted: status === 'shipped' || status === 'delivered' },
      { status: 'Delivered', date: 'Order has been delivered', isCompleted: status === 'delivered' }
    ];

    if (status === 'cancelled') {
      return [
        { status: 'Order Placed', date: 'Order Confirmed', isCompleted: true },
        { status: 'Cancelled', date: 'Order has been cancelled', isCompleted: true }
      ];
    }

    return items;
  };

  const timelineItems = getTimelineItems();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Timeline</h2>
      <div className="relative">
        {timelineItems.map((item, index) => (
          <div key={item.status} className="flex items-start mb-8 last:mb-0">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.isCompleted ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  )}
                </svg>
              </div>
              {index < timelineItems.length - 1 && (
                <div
                  className={`w-0.5 h-full ${
                    item.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <div>
              <h3 className="font-medium">{item.status}</h3>
              <p className="text-gray-600 text-sm">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;