import { Client, Databases } from "appwrite";
import config from "@/config/config";

export class ReelService {
    private client: Client;
    private databases: Databases;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async getReels() {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                "68430279001a62cd1466" // Using the specific collection ID
            );
            
            if (!response.documents) {
                return [];
            }

            return response.documents.map(doc => ({
                id: doc.$id,
                videourl: doc.reel // Using only the reel attribute
            }));
        } catch (error) {
            console.error("Error fetching reels:", error);
            return [];
        }
    }
}

const reelService = new ReelService();
export default reelService;
