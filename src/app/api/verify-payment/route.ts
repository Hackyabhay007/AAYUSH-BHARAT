import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { OrderService } from '@/services/OrderService';

export async function POST(request: Request) {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderData,
            products,
            amount,
            user_id
        } = await request.json();

        // Verify signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const secret = process.env.RAZORPAY_KEY_SECRET!;
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(text)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Create order in database
        const orderDetails = {
            ...orderData,
            payment_type: 'ONLINE',
            payment_status: 'completed',
            status: 'confirmed',
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        };

        const createdOrder = await OrderService.createOrder(orderDetails);

        if (!createdOrder) {
            throw new Error('Failed to create order');
        }

        return NextResponse.json({
            success: true,
            orderId: createdOrder.$id,
            orderDetails: createdOrder
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
