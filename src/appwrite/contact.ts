import { Client, Databases, ID } from "appwrite";
import config from '../config/config';

class ContactService {
  client: Client;
  databases: Databases;

  constructor() {
    const endpoint = config.appwriteUrl;
    const projectId = config.appwriteProjectId;

    if (!endpoint || !projectId) {
      throw new Error('Appwrite configuration is missing. Please check your environment variables.');
    }

    try {
      // Validate URL format
      new URL(endpoint);

      this.client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId);
      this.databases = new Databases(this.client);
    } catch {
      console.error('Invalid Appwrite endpoint URL:', endpoint);
      throw new Error('Invalid Appwrite endpoint URL configuration');
    }
  }

  async createContactMessage(data: { fullname: string; email: string; message: string }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteContactCollectionId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  }
}

const contactService = new ContactService();
export default contactService;
