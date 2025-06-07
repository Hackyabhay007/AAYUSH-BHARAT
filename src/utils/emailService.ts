import nodemailer, { TransportOptions, SentMessageInfo } from 'nodemailer';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface OrderEmailDetails {
    $id: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string | number;
    order_items: OrderItem[];
    total_price: number;
    payment_amount: number;
    tracking_id?: string;
    coupon_code?: string;
    coupon_discount?: number;
    coupon_price?: number;
}

interface EmailResponse {
    success: boolean;
    messageId?: string;
}

// Log email configuration (safely)
console.log('Email Configuration:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.EMAIL_USER,
    from: process.env.EMAIL_FROM,
    hasPass: !!process.env.EMAIL_PASS,
});

// Create email transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
} as TransportOptions);

export const generateOrderConfirmationEmail = (orderDetails: OrderEmailDetails) => {
    const items = orderDetails.order_items.map((item: OrderItem) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
    }));

    const discountSection = orderDetails.coupon_code ? `
        <div style="background-color: #f0f7ff; padding: 15px; margin: 10px 0; border-radius: 5px;">
            <h3 style="color: #2563eb; margin: 0;">Applied Discount</h3>
            <p><strong>Coupon Code:</strong> ${orderDetails.coupon_code}</p>
            <p><strong>Discount:</strong> ${orderDetails.coupon_discount}%</p>
            <p><strong>Amount Saved:</strong> ₹${orderDetails.coupon_price}</p>
        </div>
    ` : '';

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #363f1d; text-align: center;">Order Confirmation</h1>
            <p>Dear ${orderDetails.first_name},</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h2 style="color: #363f1d;">Order Details</h2>
                <p><strong>Order ID:</strong> ${orderDetails.$id}</p>
                
                <h3 style="color: #666;">Items Ordered:</h3>
                <ul style="list-style: none; padding: 0;">
                    ${items.map((item: OrderItem) => `
                        <li style="margin-bottom: 10px; padding: 10px; background-color: white; border-radius: 4px;">
                            ${item.name} x ${item.quantity} - ₹${item.price}
                        </li>
                    `).join('')}
                </ul>

                ${discountSection}
                
                <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
                    <p><strong>Original Price:</strong> ₹${orderDetails.total_price}</p>
                    ${orderDetails.coupon_price ? `<p><strong>Discount:</strong> -₹${orderDetails.coupon_price}</p>` : ''}
                    <p style="font-size: 18px; font-weight: bold; color: #363f1d;">
                        Final Amount: ₹${orderDetails.payment_amount}
                    </p>
                </div>
            </div>
            
            <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #666;">Shipping Address:</h3>
                <p>
                    ${orderDetails.first_name} ${orderDetails.last_name}<br>
                    ${orderDetails.address}<br>
                    ${orderDetails.city}, ${orderDetails.state}<br>
                    ${orderDetails.country} - ${orderDetails.pincode}
                </p>
            </div>

            ${orderDetails.tracking_id ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/track-order/${orderDetails.tracking_id}" 
                       style="background-color: #363f1d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
                        Track Your Order
                    </a>
                </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px; color: #666;">
                <p>For any questions, please contact us at ${process.env.EMAIL_USER}</p>
            </div>
        </div>
    `;
};

export const sendOrderConfirmationEmail = async (orderDetails: OrderEmailDetails): Promise<EmailResponse> => {
    try {
        console.log('Starting email send process with details:', {
            to: orderDetails.email,
            orderId: orderDetails.$id,
            customerName: `${orderDetails.first_name} ${orderDetails.last_name}`
        });

        // Verify required fields
        if (!orderDetails.email || !orderDetails.$id || !orderDetails.first_name) {
            throw new Error('Missing required email fields');
        }

        // Log email configuration
        console.log('Email configuration:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.EMAIL_USER,
            from: process.env.EMAIL_FROM,
            replyTo: process.env.REPLY_TO
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'AYUDH BHARAT <care@aayudhbharat.com>',
            to: orderDetails.email,
            subject: `Order Confirmation - #${orderDetails.$id}`,
            html: generateOrderConfirmationEmail(orderDetails),
            replyTo: process.env.REPLY_TO || 'care@aayudhbharat.com'
        };

        console.log('Sending email with options:', {
            to: mailOptions.to,
            subject: mailOptions.subject,
            from: mailOptions.from
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Raw email send result:', info);

        if ('messageId' in info) {
            console.log('Order confirmation email sent successfully:', info.messageId);
            return { success: true, messageId: info.messageId };
        }

        console.log('Email sent but no messageId returned');
        return { success: true };
    } catch (error) {
        console.error('Failed to send order confirmation email:', error);
        // Include more details in the error for debugging
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        throw error;
    }
};

export const verifyEmailConfig = async () => {
    try {
        console.log('Verifying email configuration...');
        
        // Check if required environment variables are set and have values
        const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
        const missingOrEmptyVars = requiredEnvVars.filter(varName => {
            const value = process.env[varName];
            return !value || value.trim() === '';
        });
        
        if (missingOrEmptyVars.length > 0) {
            console.error('Missing or empty environment variables:', missingOrEmptyVars);
            console.log('Current environment values (safely):', {
                SMTP_HOST: process.env.SMTP_HOST || 'not set',
                SMTP_PORT: process.env.SMTP_PORT || 'not set',
                EMAIL_USER: process.env.EMAIL_USER || 'not set',
                EMAIL_PASS: process.env.EMAIL_PASS ? 'set' : 'not set',
                EMAIL_FROM: process.env.EMAIL_FROM || 'not set',
            });
            return { 
                success: false, 
                error: `Missing or empty environment variables: ${missingOrEmptyVars.join(', ')}` 
            };
        }

        // Log configuration being tested
        console.log('Testing email configuration:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.EMAIL_USER,
            auth: process.env.EMAIL_USER ? 'configured' : 'missing'
        });

        // Verify SMTP connection
        const verified = await transporter.verify();
        console.log('Email configuration verification result:', verified);
        
        return { success: true };
    } catch (error) {
        console.error('Email configuration verification failed:', error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
};
