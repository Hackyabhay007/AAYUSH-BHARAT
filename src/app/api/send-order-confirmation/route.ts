import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

export async function POST(request: Request) {
    try {
        const { orderDetails } = await request.json();

        if (!orderDetails || !orderDetails.email) {
            return NextResponse.json({
                success: false,
                error: 'Missing order details'
            }, { status: 400 });
        }

        const result = await sendOrderConfirmationEmail(orderDetails);
        
        return NextResponse.json({
            success: true,
            message: 'Order confirmation email sent successfully',
            messageId: result.messageId
        });
    } catch (error) {
        console.error('Failed to send order confirmation email:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send email'
        }, { status: 500 });
    }
}
