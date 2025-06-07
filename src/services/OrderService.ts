import { Order, OrderItem } from '../types/order';

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

  static async createOrder(orderData: Partial<Order>): Promise<Order> {
    try {
      const { databases, ID } = await this.getAppwriteClient();

      // Store original order items array
      const originalOrderItems = Array.isArray(orderData.order_items) ? 
        orderData.order_items : 
        Array.isArray(orderData._order_items_data) ?
          orderData._order_items_data : [];

      // Process and validate the input data
      const processedOrderData = {
        created_at: new Date().toISOString(),
        status: orderData.status || 'pending',
        payment_type: orderData.payment_type || 'ONLINE',
        payment_status: orderData.payment_type === 'COD' ? 'pending' : 'initiated',
        shipping_status: orderData.shipping_status || 'pending',
        idempotency_key: orderData.idempotency_key || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                
        // Required fields with defaults
        first_name: orderData.first_name || '',
        last_name: orderData.last_name || '',
        email: orderData.email || '',
        address: orderData.address || '',
        city: orderData.city || '',
        state: orderData.state || '',
        country: orderData.country || '',
        phone_number: orderData.phone_number || '',
        user_id: orderData.user_id || '',

        // Convert numbers
        total_price: Number(orderData.total_price || 0),
        payment_amount: Number(orderData.payment_amount || 0),
        weights: Array.isArray(orderData.weights) ? 
          orderData.weights.reduce((sum, w) => sum + Number(w), 0) : 
          Number(orderData.weights || 0),
        pincode: typeof orderData.pincode === 'string' ? 
          parseInt(orderData.pincode) : Number(orderData.pincode || 0),

        // Store total number of items
        order_items: originalOrderItems.reduce((sum, item) => sum + Number(item.quantity), 0),
        
        // Ensure product_id is a string
        product_id: Array.isArray(orderData.product_ids) ? 
          orderData.product_ids.join(',') : 
          orderData.product_id || '',

        // Optional fields
        coupon_code: orderData.coupon_code,
        coupon_discount: orderData.coupon_discount ? Number(orderData.coupon_discount) : undefined,
        coupon_price: orderData.coupon_price ? Number(orderData.coupon_price) : undefined,
        tracking_id: orderData.tracking_id,
        razorpay_order_id: orderData.razorpay_order_id,
        razorpay_payment_id: orderData.razorpay_payment_id,
        razorpay_signature: orderData.razorpay_signature
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        processedOrderData
      );

      // Return full Order type with metadata from response
      return {
        ...processedOrderData,
        $id: response.$id,
        $createdAt: response.$createdAt,
        $updatedAt: response.$updatedAt,
        $permissions: response.$permissions,
        $collectionId: response.$collectionId,
        $databaseId: response.$databaseId,
        // Include the original order items data for API response
        _order_items_data: originalOrderItems
      } as Order;
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
      
      // Cast all fields to their proper types and ensure required fields are present
      return {
        ...response,
        address: response.address || '',
        status: response.status || 'pending',
        user_id: response.user_id || '',
        email: response.email || '',
        state: response.state || '',
        city: response.city || '',
        country: response.country || '',
        phone_number: response.phone_number || '',
        payment_type: response.payment_type || '',
        payment_status: response.payment_status || '',
        shipping_status: response.shipping_status || 'pending',
        payment_amount: Number(response.payment_amount || 0),
        total_price: Number(response.total_price || 0),
        pincode: typeof response.pincode === 'string' ? parseInt(response.pincode) : Number(response.pincode || 0),
        first_name: response.first_name || '',
        last_name: response.last_name || '',
        order_items: Number(response.order_items || 0),
        _order_items_data: [],
        product_id: response.product_id || '',
        weights: Array.isArray(response.weights) ? 
          response.weights.map(w => Number(w)) : 
          Number(response.weights || 0),
        idempotency_key: response.idempotency_key || '',
        created_at: response.created_at || response.$createdAt
      } as Order;
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
      );      // Cast all fields to their proper types and ensure required fields are present
      return response.documents.map(order => ({
        ...order,
        address: order.address || '',
        status: order.status || 'pending',
        user_id: order.user_id || '',
        email: order.email || '',
        state: order.state || '',
        city: order.city || '',
        country: order.country || '',
        phone_number: order.phone_number || '',
        payment_type: order.payment_type || '',
        payment_status: order.payment_status || '',
        shipping_status: order.shipping_status || 'pending',
        payment_amount: Number(order.payment_amount || 0),
        total_price: Number(order.total_price || 0),
        pincode: typeof order.pincode === 'string' ? parseInt(order.pincode) : Number(order.pincode || 0),
        first_name: order.first_name || '',
        last_name: order.last_name || '',
        order_items: Number(order.order_items || 0),
        _order_items_data: [],
        product_id: order.product_id || '',
        weights: Array.isArray(order.weights) ? 
          order.weights.map(w => Number(w)) : 
          Number(order.weights || 0),
        idempotency_key: order.idempotency_key || '',
        created_at: order.created_at || order.$createdAt
      })) as Order[];
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
      );      // Cast all fields to their proper types and ensure required fields are present
      return {
        ...response,
        address: response.address || '',
        status: response.status || 'pending',
        user_id: response.user_id || '',
        email: response.email || '',
        state: response.state || '',
        city: response.city || '',
        country: response.country || '',
        phone_number: response.phone_number || '',
        payment_type: response.payment_type || '',
        payment_status: response.payment_status || '',
        shipping_status: response.shipping_status || 'pending',
        payment_amount: Number(response.payment_amount || 0),
        total_price: Number(response.total_price || 0),
        pincode: typeof response.pincode === 'string' ? parseInt(response.pincode) : Number(response.pincode || 0),
        first_name: response.first_name || '',
        last_name: response.last_name || '',
        order_items: Number(response.order_items || 0),
        _order_items_data: [],
        product_id: response.product_id || '',
        weights: Array.isArray(response.weights) ? 
          response.weights.map(w => Number(w)) : 
          Number(response.weights || 0),
        idempotency_key: response.idempotency_key || '',
        created_at: response.created_at || response.$createdAt
      } as Order;
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }
}
