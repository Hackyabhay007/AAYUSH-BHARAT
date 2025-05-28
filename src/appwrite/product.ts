import config from "@/config/config";
import { Client, Databases, Query, Storage } from "appwrite";
import { Product } from "@/types/product";


class ProductService{
    client=new Client();
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
    }
    databases=new Databases(this.client);
    storage=new Storage(this.client);

    async deleteProduct(id:string){
      try {
      await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteProductCollectionId, id);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
    }


    async updateProduct (id: string, data:Product){
    try {
      const response = await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteProductCollectionId, id, {name:data.name,price:data.price,image:data.image,tags:data.tags,rating:data.rating});
      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

    async fetchProduct(){
        try{
        const response = await this.databases.listDocuments(
     config.appwriteDatabaseId,
      config.appwriteProductCollectionId
    );
    // const products = response.documents.map((doc: Models.Document) => ({
    //   id: doc.$id,
    //   name: doc.name,
    //   price: doc.price,
    //   image: doc.image,
    //   tags: doc.tags,
    //   rating: doc.rating,
    //   slug:doc.slug,
    // }));

    return response.documents;
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
    async fetchOneProduct(slug:string){
      try{

        const res = await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteProductCollectionId, [
          Query.equal('slug', slug),
        ]);
        if(res){
          return res.documents[0];
        }
        else{
          return "Error in fetching product";
        }
      }
      catch(error){
        return error;
      }

    }
}


const productService = new ProductService();
export default productService;
