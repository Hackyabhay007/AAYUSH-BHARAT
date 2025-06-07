import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, verifyEmailConfig } from '@/utils/emailService';
import { OrderEmailDetails } from '@/types/order';

export async function POST(request: Request) {
    try {
        // Log the incoming request
        console.log('Received email request');
        
        const body = await request.json();
        console.log('Request body:', body);

        const { email, orderDetails, products } = body;

        // Validate required fields
        if (!email || !orderDetails || !products) {
            console.error('Missing required fields');
            return NextResponse.json({ 
                success: false, 
                error: 'Missing required fields' 
            }, { status: 400 });
        }

        // Verify email configuration
        const emailConfigResult = await verifyEmailConfig();
        if (!emailConfigResult.success) {
            throw new Error(emailConfigResult.error || 'Email configuration is invalid');
        }

        // Format the order details according to your email service interface
        const emailOrderDetails: OrderEmailDetails = {
            $id: orderDetails.orderId,
            first_name: orderDetails.address.first_name,
            last_name: orderDetails.address.last_name,
            email: email,
            address: orderDetails.address.address,
            city: orderDetails.address.city,
            state: orderDetails.address.state,
            country: orderDetails.address.country,
            pincode: orderDetails.address.pincode,
            order_items: products.map((product: any) => ({
                name: product.name,
                quantity: product.quantity,
                price: product.selectedVariant.sale_price
            })),
            total_price: orderDetails.amount,
            payment_amount: orderDetails.finalAmount || orderDetails.amount,
            tracking_id: orderDetails.trackingId,
            coupon_code: orderDetails.couponCode,
            coupon_discount: orderDetails.couponDiscount,
            coupon_price: orderDetails.couponPrice
        };

        // Send email
        const emailResult = await sendOrderConfirmationEmail(emailOrderDetails);
        console.log('Email sent result:', emailResult);

        return NextResponse.json({ 
            success: true,
            message: 'Order confirmation email sent successfully',
            messageId: emailResult.messageId
        });
    } catch (error) {
        console.error('Error in send-order-email route:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to send order confirmation email' 
        }, { status: 500 });
    }
}
