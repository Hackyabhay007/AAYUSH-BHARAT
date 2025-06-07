import { NextResponse } from 'next/server';
import { OrderService } from '@/services/OrderService';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { Order, OrderEmailDetails, OrderItem } from '@/types/order';

export async function POST(request: Request) {
    try {        const { orderData } = await request.json();

        if (!orderData || !orderData.email || !orderData.first_name || !orderData.last_name || 
            !orderData.address || !orderData.city || !orderData.state || !orderData.country || 
            !orderData.pincode || !orderData.total_price || !orderData.payment_amount) {
            return NextResponse.json(
                { success: false, error: 'Missing required order data fields' },
                { status: 400 }
            );
        }

        // Create order document
        const orderDocument: Partial<Order> = {
            ...orderData,
            payment_type: 'COD',
            payment_status: 'pending',
            status: 'processing',
            shipping_status: 'pending',
            idempotency_key: `cod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString()
        };

        // Create order in database
        const createdOrder = await OrderService.createOrder(orderDocument);

        if (!createdOrder) {
            throw new Error('Failed to create order in database');
        }        // Send order confirmation email
        try {            // Prepare email data with proper type casting
            const orderItems = typeof orderDocument.order_items === 'string'
                ? JSON.parse(orderDocument.order_items) as OrderItem[]
                : Array.isArray(orderDocument.order_items)
                    ? orderDocument.order_items
                    : [];            const emailData: OrderEmailDetails = {
                $id: createdOrder.$id,
                first_name: orderDocument.first_name as string,
                last_name: orderDocument.last_name as string,
                email: orderDocument.email as string,
                address: orderDocument.address as string,
                city: orderDocument.city as string,
                state: orderDocument.state as string,
                country: orderDocument.country as string,
                pincode: orderDocument.pincode || '',  // Convert undefined to empty string
                order_items: orderItems,
                total_price: Number(orderDocument.total_price),
                payment_amount: Number(orderDocument.payment_amount),
                tracking_id: orderDocument.tracking_id,
                coupon_code: orderDocument.coupon_code || undefined,
                coupon_discount: typeof orderDocument.coupon_discount === 'number' ? 
                    orderDocument.coupon_discount : 
                    typeof orderDocument.coupon_discount === 'string' ? 
                        parseFloat(orderDocument.coupon_discount) : undefined,
                coupon_price: typeof orderDocument.coupon_price === 'number' ?
                    orderDocument.coupon_price :
                    typeof orderDocument.coupon_price === 'string' ?
                        parseFloat(orderDocument.coupon_price) : undefined
            };
            
            await sendOrderConfirmationEmail(emailData);
            console.log('Order confirmation email sent successfully');
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
        }

        return NextResponse.json({
            success: true,
            message: 'COD order created successfully',
            orderId: createdOrder.$id,
            orderDetails: createdOrder
        });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to create order'
            },
            { status: 500 }
        );
    }
}
