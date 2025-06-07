import { NextResponse } from 'next/server';
import { Models } from 'appwrite';

interface CouponDocument extends Models.Document {
    coupon_code: string;
    coupon_discount: number;
    min_price: number;
    description: string;
    expiry_date: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COUPON_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COUPON_COLLECTION_ID!;

export async function POST(request: Request) {
    try {
        const { couponCode, totalAmount } = await request.json();

        // Dynamic imports
        const { Client, Databases, Query } = await import('appwrite');
        const { default: config } = await import('@/config/config');

        // Initialize Appwrite client at runtime
        const client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        const databases = new Databases(client);

        // Fetch coupon from database
        const couponResponse = await databases.listDocuments(
            DATABASE_ID,
            COUPON_COLLECTION_ID,
            [Query.equal('coupon_code', couponCode)]
        );

        if (!couponResponse.documents.length) {
            return NextResponse.json({
                success: false,
                error: 'Invalid coupon code'
            }, { status: 400 });
        }

        const coupon = couponResponse.documents[0] as CouponDocument;
        const now = new Date();
        const expiryDate = new Date(coupon.expiry_date);

        // Validate expiry
        if (now > expiryDate) {
            return NextResponse.json({
                success: false,
                error: 'Coupon has expired'
            }, { status: 400 });
        }

        // Validate minimum price
        if (totalAmount < coupon.min_price) {
            return NextResponse.json({
                success: false,
                error: `Minimum order amount should be ₹${coupon.min_price}`
            }, { status: 400 });
        }

        // Calculate discount
        const discountAmount = Math.round((totalAmount * coupon.coupon_discount) / 100);
        const finalPrice = totalAmount - discountAmount;

        return NextResponse.json({
            success: true,
            coupon: {
                code: coupon.coupon_code,
                discount: coupon.coupon_discount,
                minPrice: coupon.min_price,
                description: coupon.description,
                discountAmount,
                finalPrice,
                $id: coupon.$id
            }
        });

    } catch (error) {
        console.error('Coupon verification error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to verify coupon'
        }, { status: 500 });
    }
}
