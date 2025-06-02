import config from "@/config/config";
import { Client, Databases, Models, Storage } from "appwrite";

export interface Video {
  id: string;
  videoname:string;
  videourl: string;
}

class VideoService {
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
  }
  databases = new Databases(this.client);
  storage = new Storage(this.client);

//   async deleteVideo(id: string) {
//     try {
//       await this.databases.deleteDocument(
//         config.appwriteDatabaseId,
//         config.appwriteVideoCollectionId,
//         id
//       );
//       return true;
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       throw error;
//     }
//   }

async deleteVideo(fileId: string, documentId: string,collectionId=config.appwriteVideoCollectionId): Promise<boolean> {
  try {
    // Delete file from storage
    await this.storage.deleteFile(config.appwriteBucketId, fileId);

    // Delete corresponding document (optional)
    await this.databases.deleteDocument(
      config.appwriteDatabaseId,
      collectionId,
      documentId
    );

    return true;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
}

async fetchVideo(collectionId = config.appwriteVideoCollectionId) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        collectionId
      );
      const videos = response.documents.map((doc: Models.Document) => ({
        id: doc.$id,
        videourl: doc.videourl,
        videoname:doc.videoname,
      }));

      console.log(videos);
      
      return videos;
    } catch (error) {
      throw error;
    }
  }

  async uploadVideo(product: Omit<Video, "id">,collectionId=config.appwriteVideoCollectionId) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseId,
       collectionId,
        "unique()",
        product
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const videoService = new VideoService();
export default videoService;
