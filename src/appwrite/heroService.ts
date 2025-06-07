import { Client, Databases } from "appwrite";
import conf from "@/config/config";

export class HeroService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async getHeroContent() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteVideoCollectionId,
                // Add query to sort by createdAt if needed
                // [Query.orderDesc('$createdAt')]
            );
            
            if (response.documents.length > 0) {
                return response.documents.map(doc => ({
                    heading: doc.heading || '',
                    image: doc.image || '',
                    video: doc.video || '',
                    button1: doc.button1 || '',
                    button1_slug: doc.button1_slug || '',
                    button2: doc.button2 || '',
                    button2_slug: doc.button2_slug || '',
                    sub_text: doc.sub_text || '',
                    mobile_image: doc.mobile_image || ''
                }));
            }
            return [];        } catch (error: unknown) {
            console.error("Error fetching hero content:", error);
            if (error instanceof Error) {
                console.error("Error details:", error.message);
            } else {
                console.error("Error details: Unknown error");
            }
            return null;
        }
    }
}

const heroService = new HeroService();
export default heroService;
