import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";
const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const databases = new Databases(client);
const DB_ID = config.appwriteDatabaseId;
const COLLECTION_ID = config.appwriteUserCollectionId;

const DatabaseService = {
  async getUserData(userid: string) {
    try {
      const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
        Query.equal("userid", userid),
      ]);
      return response;
    } catch (error) {
      console.log("Error fetching user data:", error);
      throw error;
    }
  },

  async createUserDocument(user: object) {
    return await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      user
    );
  },
};

export default DatabaseService;
