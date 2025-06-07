import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/middleware/auth';
import type { Address } from '@/types/customer';
import type { ApiErrorResponse } from '@/types/api';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ADDRESS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!;

export async function GET(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request);
        if (!token) {
            return NextResponse.json({ 
                success: false, 
                error: 'Authentication required' 
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid token' 
            }, { status: 401 });
        }

        // Dynamic imports
        const { Client, Databases, Query } = await import('appwrite');
        const { default: config } = await import('@/config/config');

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        const databases = new Databases(client);
        
        // Fetch addresses
        const addressDocs = await databases.listDocuments(
            DATABASE_ID,
            ADDRESS_COLLECTION_ID,
            [Query.equal('userId', decoded.userId)]
        );

        return NextResponse.json({
            success: true,
            addresses: addressDocs.documents
        });
    } catch (error) {
        const apiError = error as ApiErrorResponse;
        console.error('Error fetching addresses:', apiError);
        return NextResponse.json({
            success: false,
            error: apiError.message || 'Failed to fetch addresses'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request);
        if (!token) {
            return NextResponse.json({ 
                success: false, 
                error: 'Authentication required' 
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid token' 
            }, { status: 401 });
        }

        const address: Address = await request.json();

        // Dynamic imports
        const { Client, Databases, ID } = await import('appwrite');
        const { default: config } = await import('@/config/config');

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        const databases = new Databases(client);

        // Create address
        const newAddress = await databases.createDocument(
            DATABASE_ID,
            ADDRESS_COLLECTION_ID,
            ID.unique(),
            {
                ...address,
                userId: decoded.userId
            }
        );

        return NextResponse.json({
            success: true,
            address: newAddress
        });
    } catch (error) {
        const apiError = error as ApiErrorResponse;
        console.error('Error saving address:', apiError);
        return NextResponse.json({
            success: false,
            error: apiError.message || 'Failed to save address'
        }, { status: 500 });
    }
}
