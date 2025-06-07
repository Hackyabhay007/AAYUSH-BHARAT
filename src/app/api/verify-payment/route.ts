import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { OrderService } from '@/services/OrderService';
import { Order } from '@/types/order';

interface PaymentVerificationRequest {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    orderData: Partial<Order>;
}

export async function POST(request: Request) {
    try {
        const body = await request.json() as PaymentVerificationRequest;
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderData,
        } = body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderData) {
            return NextResponse.json(
                { success: false, error: 'Missing required payment verification data' },
                { status: 400 }
            );
        }

        // Verify signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        
        if (!secret) {
            console.error('RAZORPAY_KEY_SECRET is not defined');
            return NextResponse.json(
                { success: false, error: 'Payment verification configuration error' },
                { status: 500 }
            );
        }

        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(text)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Create order in database
        const orderDetails: Partial<Order> = {
            ...orderData,
            payment_type: 'ONLINE',
            payment_status: 'completed',
            status: 'processing',
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        };

        const createdOrder = await OrderService.createOrder(orderDetails);

        if (!createdOrder) {
            throw new Error('Failed to create order in database');
        }

        return NextResponse.json({
            success: true,
            orderId: createdOrder.$id,
            orderDetails: createdOrder
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Payment verification failed'
            },
            { status: 500 }
        );
    }
}
