import { NextResponse } from 'next/server';
import { OrderService } from '@/services/OrderService';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { Order } from '@/types/order';

export async function POST(request: Request) {
    try {
        const { orderData } = await request.json();

        if (!orderData || !orderData.email) {
            return NextResponse.json(
                { success: false, error: 'Missing required order data' },
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
        try {
            await sendOrderConfirmationEmail({
                $id: createdOrder.$id,
                first_name: createdOrder.first_name,
                last_name: createdOrder.last_name,
                email: createdOrder.email,
                address: createdOrder.address,
                city: createdOrder.city,
                state: createdOrder.state,
                country: createdOrder.country,
                pincode: createdOrder.pincode,
                order_items: createdOrder.order_items,
                total_price: createdOrder.total_price,
                payment_amount: createdOrder.payment_amount,
                tracking_id: createdOrder.tracking_id,
                coupon_code: createdOrder.coupon_code,
                coupon_discount: createdOrder.coupon_discount,
                coupon_price: createdOrder.coupon_price
            });
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
