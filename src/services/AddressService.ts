import { databases } from '@/appwrite/database';
import { Address } from '@/types/customer';
import { ID } from 'appwrite';

export const saveUserAddress = async (userId: string | null, addressData: Partial<Address>) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID!,
    ID.unique(),
    {
      ...addressData,
      userId
    }
  );

  return response;
};
