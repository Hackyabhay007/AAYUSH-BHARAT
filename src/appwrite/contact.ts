import { Client, Databases, ID } from "appwrite";
import config from '../config/config';
const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const databases = new Databases(client);
const DB_ID = config.appwriteDatabaseId;
const COLLECTION_ID = config.appwriteContactCollectionId;

const ContactService = {

  async createContactMessage(data:object) {
    return await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), data);
  },

  
};

export default ContactService;
