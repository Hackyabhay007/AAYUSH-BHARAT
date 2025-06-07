import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { OrderService } from '@/services/OrderService';
import { Order, OrderEmailDetails, OrderItem } from '@/types/order';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

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

        // Validate and process order data
        const orderDetails: Partial<Order> = {
            ...orderData,
            payment_type: 'ONLINE',
            payment_status: 'completed',
            status: 'processing',
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            // Ensure numeric fields are properly typed
            payment_amount: typeof orderData.payment_amount === 'string' ? 
                parseFloat(orderData.payment_amount) : orderData.payment_amount,
            total_price: typeof orderData.total_price === 'string' ? 
                parseFloat(orderData.total_price) : orderData.total_price,            // Store order items total and keep original data in _order_items_data
            order_items: Array.isArray(orderData.order_items) ? 
                orderData.order_items.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0,
            _order_items_data: Array.isArray(orderData.order_items) ? 
                orderData.order_items : []
        };

        const createdOrder = await OrderService.createOrder(orderDetails);        if (!createdOrder) {
            throw new Error('Failed to create order in database');
        }

        // Send order confirmation email
        try {
            console.log('📧 Preparing to send order confirmation email to:', createdOrder.email);
            
            const orderForEmail: OrderEmailDetails = {
                $id: createdOrder.$id,
                first_name: createdOrder.first_name,
                last_name: createdOrder.last_name,
                email: createdOrder.email,
                address: createdOrder.address,
                city: createdOrder.city,
                state: createdOrder.state,
                country: createdOrder.country,
                pincode: createdOrder.pincode || '', // Convert undefined to empty string
                // Use _order_items_data which contains the full order items array
                order_items: Array.isArray(createdOrder._order_items_data) ? 
                    createdOrder._order_items_data : [],
                total_price: Number(createdOrder.total_price),
                payment_amount: Number(createdOrder.payment_amount),
                tracking_id: createdOrder.tracking_id,
                coupon_code: createdOrder.coupon_code,
                coupon_discount: createdOrder.coupon_discount ? Number(createdOrder.coupon_discount) : undefined,
                coupon_price: createdOrder.coupon_price ? Number(createdOrder.coupon_price) : undefined
            };
            
            const emailResult = await sendOrderConfirmationEmail(orderForEmail);
            console.log(`✅ Order confirmation email sent successfully to ${createdOrder.email}`);
            console.log('📦 Order ID:', createdOrder.$id);
            console.log('📨 Email Message ID:', emailResult.messageId);
        } catch (error) {
            console.error('❌ Error sending order confirmation email:', error);
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
