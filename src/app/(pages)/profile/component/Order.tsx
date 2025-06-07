import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OrderService } from "@/services/OrderService";
import SimpleLoader from "@/components/SimpleLoader";
import { Order } from "@/types/order";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Explicitly typed as Order[]
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (!userId) return;

        const userOrders = await OrderService.getUserOrders(userId);
        setOrders(userOrders);

                // Calculate total spent        
        const total = userOrders.reduce(
          (sum, order) => sum + (order.payment_amount || 0),
          0
        );

        // Store total spent in localStorage for dashboard
        localStorage.setItem("totalSpent", total.toString());
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <SimpleLoader />;
  }

  if (!orders.length) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px] px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md py-10 px-6 text-center">
          <h2 className="text-xl uppercase lg:text-2xl md:text-2xl font-semibold text-dark-green mb-2">
            No orders found
          </h2>
          <p className="text-gray-500 lg:text-lg mb-6">
            Start shopping to create your first order!
          </p>
          <button className="bg-dark-green text-white px-5 py-2 rounded-md hover:bg-dark transition">
            <Link href="/shop">Browse Products</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead className="bg-dark-green text-white">
          <tr>
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Total</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.$id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-mono">{order.$id}</td>
              <td className="py-3 px-4">
                {new Date(order.$createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">₹{order.payment_amount}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/order-success/${order.$id}`}
                  className="text-dark-green hover:text-green-700 underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;