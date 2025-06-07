import { Order } from '../types/order';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ORDERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!;

export class OrderService {
  private static async getAppwriteClient() {
    const { Client, Databases, ID } = await import('appwrite');
    const { default: config } = await import('@/config/config');

    const client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    return { client, databases: new Databases(client), ID };
  }

  static async createOrder(orderData: Partial<Order>) {
    try {
      const { databases, ID } = await this.getAppwriteClient();

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

  static async getOrder(orderId: string): Promise<Order> {
    try {
      const { databases } = await this.getAppwriteClient();
      const response = await databases.getDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId
      );
      return response as Order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const { databases } = await this.getAppwriteClient();
      const { Query } = await import('appwrite');
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [
          Query.equal('user_id', userId),
          Query.orderDesc('created_at')
        ]
      );
      return response.documents as Order[];
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  static async cancelOrder(orderId: string): Promise<Order> {
    try {
      const { databases } = await this.getAppwriteClient();
      const response = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        {
          status: 'cancelled',
          shipping_status: 'cancelled'
        }
      );
      return response as Order;
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }
}
