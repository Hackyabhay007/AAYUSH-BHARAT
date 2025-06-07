import { Client, Databases, ID, Models, Query } from "appwrite";
import config from "@/config/config";

export interface AddressData {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    country: string;
    type: 'home' | 'office' | 'other';
    userId: string;
    mobile: string;
    state: string;
    pincode: string;
    is_default: boolean;
}

export type AddressDocument = Models.Document & AddressData;

interface UserData extends Models.Document {
    userid: string;
    email: string;
    fullname: string;
    phone: string;
}

export class DatabaseService {
    private static instance: DatabaseService;
    private client: Client;
    private databases: Databases;

    private constructor() {
        const endpoint = config.appwriteUrl;
        const projectId = config.appwriteProjectId;

        if (!endpoint || !projectId) {
            throw new Error('Appwrite configuration is missing');
        }

        try {
            new URL(endpoint);
            this.client = new Client();
            this.client
                .setEndpoint(endpoint)
                .setProject(projectId);
            this.databases = new Databases(this.client);
        } catch (error) {
            console.error('Database service initialization error:', error);
            throw new Error('Database service initialization failed');
        }
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async listDocuments<T extends Models.Document>(
        databaseId: string, 
        collectionId: string, 
        queries?: string[]
    ): Promise<Models.DocumentList<T>> {
        try {
            return await this.databases.listDocuments(
                databaseId,
                collectionId,
                queries
            );
        } catch (error) {
            console.error('Error listing documents:', error);
            throw error;
        }
    }

    async createDocument<T extends Models.Document>(
        databaseId: string, 
        collectionId: string, 
        data: Omit<T, keyof Models.Document>
    ): Promise<T> {
        try {
            return await this.databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                data
            );
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    async getUserAddresses(userId: string): Promise<AddressDocument[]> {
        try {
            const response = await this.databases.listDocuments<AddressDocument>(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
                [Query.equal('userId', userId)]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching user addresses:', error);
            throw error;
        }
    }

    async createAddress(data: AddressData): Promise<AddressDocument> {
        try {
            return await this.databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
                ID.unique(),
                data
            );
        } catch (error) {
            console.error('Error creating address:', error);
            throw error;
        }
    }

    async updateAddress(documentId: string, data: Partial<AddressData>): Promise<AddressDocument> {
        try {
            return await this.databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
                documentId,
                data
            );
        } catch (error) {
            console.error('Error updating address:', error);
            throw error;
        }
    }

    async deleteAddress(documentId: string): Promise<void> {
        try {
            await this.databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
                documentId
            );
        } catch (error) {
            console.error('Error deleting address:', error);
            throw error;
        }
    }

    async getUserData(userId: string): Promise<UserData | null> {
        try {
            const response = await this.databases.listDocuments<UserData>(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
                [Query.equal('userid', userId)]
            );

            if (response.documents.length === 0) {
                console.log('No user document found for userId:', userId);
                return null;
            }

            return response.documents[0];
        } catch (error) {
            console.error('Error getting user data:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default DatabaseService.getInstance();