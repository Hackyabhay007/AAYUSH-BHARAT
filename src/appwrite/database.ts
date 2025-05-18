import { Client, Databases, ID, Query } from "appwrite";
import config from '../config/config';
const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const databases = new Databases(client);
const DB_ID = config.appwriteDatabaseId;
const COLLECTION_ID = config.appwriteUserCollectionId;

const DatabaseService = {
  async listUsersByEmail(email: string) {
    const result = await databases.listDocuments(DB_ID, COLLECTION_ID, [
        Query.equal("email", email)
    ]);
    return result.documents;
  },

  async createUserDocument(user: object) {
    return await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), user);
  },


};

export default DatabaseService;
