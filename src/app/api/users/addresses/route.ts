import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/appwrite/database';
import { ID, Query } from 'appwrite';
import { getTokenFromRequest, verifyToken } from '@/middleware/auth';
import { Address } from '@/types/customer';
import { ApiErrorResponse } from '@/types/api';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ADDRESS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!;

export async function GET(request: NextRequest) {
    try {
        console.log('=== Starting GET /api/user/addresses ===');
        
        const token = getTokenFromRequest(request);
        console.log(token);
        
        console.log('Token received:', token ? 'Valid token present' : 'No token');
        
        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        console.log('Database config:', {
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            collectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
        });

        console.log('Attempting to fetch user document for ID:', decoded.userId);
        
        // Fetch all addresses for this user from the address collection
        const addressDocs = await databases.listDocuments(
            DATABASE_ID,
            ADDRESS_COLLECTION_ID,
            [Query.equal('userId', decoded.userId)]
        );

        console.log('Raw address documents from database:', addressDocs);

        const response = {
            success: true,
            addresses: addressDocs.documents
        };
        console.log('Sending response:', response);
        console.log('=== Ending GET /api/user/addresses ===');

        return NextResponse.json(response);    } catch (error) {
        const apiError = error as ApiErrorResponse;
        console.error('=== Error in GET /api/user/addresses ===');
        console.error('Error details:', {
            message: apiError.message,
            stack: apiError.stack,
            code: apiError.code,
            response: apiError.response
        });
        return NextResponse.json({            success: false,
            error: apiError.message || 'Failed to fetch addresses'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request);
        const decoded = verifyToken(token);
        const address:Address = await request.json();

        // Create a new address document in the address collection
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
        });    } catch (error) {
        const apiError = error as ApiErrorResponse;
        console.error('Error saving address:', apiError);
        return NextResponse.json({
            success: false,
            error: apiError.message || 'Failed to save address'
        }, { status: 500 });
    }
}
