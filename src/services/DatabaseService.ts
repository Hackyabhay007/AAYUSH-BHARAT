import { databases, ID, Query } from '@/app/api/lib/appwrite';
import { Models } from 'appwrite';

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

class DatabaseService {
  private static databases = databases;
  static async getUserAddresses(userId: string): Promise<AddressDocument[]> {
    try {
      const response = await DatabaseService.databases.listDocuments<AddressDocument>(
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

  static async createAddress(data: AddressData): Promise<AddressDocument> {
    try {
      return await DatabaseService.databases.createDocument(
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

  static async updateAddress(documentId: string, data: Partial<AddressData>): Promise<AddressDocument> {
    try {
      return await DatabaseService.databases.updateDocument(
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
  static async deleteAddress(documentId: string): Promise<void> {
    try {
      await DatabaseService.databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
        documentId
      );
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  static async getUserData(userId: string): Promise<UserData | null> {
    try {
      const response = await DatabaseService.databases.listDocuments<UserData>(
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

export default DatabaseService;