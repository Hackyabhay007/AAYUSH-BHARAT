import { databases, ID, Query } from '../app/api/lib/appwrite';
import { Order } from '../types/order';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ORDERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!;

export class OrderService {
  static async createOrder(orderData: Partial<Order>) {
    try {
      // Process the order data and ensure weights is a valid integer
      const processedOrderData = {
        ...orderData,
        created_at: new Date().toISOString(),
        status: 'pending',
        payment_status: orderData.payment_type === 'COD' ? 'pending' : 'initiated',
        shipping_status: 'pending',
        weights: typeof orderData.weights === 'number' ? Math.round(orderData.weights) : 0
      };

      // Convert product_ids array to a single string if necessary
      if (orderData.product_ids && !orderData.product_id) {
        processedOrderData.product_id = orderData.product_ids.join(',');
        delete processedOrderData.product_ids;
      }

      // Ensure product_id is a string
      if (Array.isArray(processedOrderData.product_id)) {
        processedOrderData.product_id = processedOrderData.product_id.join(',');
      }

      const response = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        processedOrderData
      );
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async getOrder(orderId: string) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId
      );
      return response;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  static async getUserOrders(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [
          Query.equal('user_id', userId),
          Query.orderDesc('created_at')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }
}
