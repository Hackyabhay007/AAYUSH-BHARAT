import config from "@/config/config";
import { Client, Databases, Models } from "appwrite";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string;
  rating: number;
}


class ProductService{
    client=new Client();
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
    }
    databases=new Databases(this.client);

    async fetchProduct(){
        try{
        const response = await this.databases.listDocuments(
     config.appwriteDatabaseId,
      config.appwriteProductCollectionId
    );
    const products = response.documents.map((doc: Models.Document) => ({
      id: doc.$id,
      name: doc.name,
      price: doc.price,
      image: doc.image,
      tags: doc.tags,
      rating: doc.rating,
    }));

    return products;

        }

        catch(error){throw error;}
    }

    async addProduct(product: Omit<Product, "id">){
        try {
        const response = await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteProductCollectionId,
      "unique()",
      product
    );
    return response;
        } catch (error) {
            throw error;
        }
    }
}


const productService = new ProductService();
export default productService;
