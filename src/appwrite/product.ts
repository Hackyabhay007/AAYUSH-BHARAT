import config from "@/config/config";
import { Client, Databases, Query, Storage } from "appwrite";
import { Product, Variants } from "@/types/product";

class ProductService {
    client: Client;
    databases: Databases;
    storage: Storage;

    constructor() {
        const endpoint = config.appwriteUrl;
        const projectId = config.appwriteProjectId;

        if (!endpoint || !projectId) {
            throw new Error('Appwrite configuration is missing. Please check your environment variables.');
        }

        try {
            // Validate URL format
            new URL(endpoint);
            
            this.client = new Client();
            this.client
                .setEndpoint(endpoint)
                .setProject(projectId);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
        } catch {
            console.error('Invalid Appwrite endpoint URL:', endpoint);
            throw new Error('Invalid Appwrite endpoint URL configuration');
        }
    }

    async deleteProduct(id: string) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteProductCollectionId, id);
            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    async fetchVariants() {
        try {
            console.log('Fetching all variants');
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteVariantCollectionId,
                [Query.limit(100)]
            );
            console.log('Variants response:', response);
            return response.documents;
        } catch (error) {
            console.error('Error fetching variants:', error);
            return [];
        }
    }

    async fetchProduct() {
        try {
            console.log('Fetching products and variants...');
            
            // First fetch all products
            const productsResponse = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteProductCollectionId,
                [Query.orderDesc('$createdAt')]
            );
            
            // Then fetch all variants
            const allVariants = await this.fetchVariants();
            
            // Group variants by productId
            const variantsByProduct: Record<string, Variants[]> = {};
            
            allVariants.forEach(variant => {
                if (!variantsByProduct[variant.productId]) {
                    variantsByProduct[variant.productId] = [];
                }
                variantsByProduct[variant.productId].push({
                    $id: variant.$id,
                    productId: variant.productId,
                    weight: variant.weight,
                    price: variant.price,
                    sale_price: variant.sale_price,
                    stock: variant.stock,
                    image: variant.image,
                    additionalImages: variant.additionalImages || [],
                    months: variant.months
                });
            });

            // Map products with their variants
            const productsWithVariants = productsResponse.documents.map(doc => ({
                $id: doc.$id,
                name: doc.name,
                description: doc.description,
                category: doc.category,
                tags: doc.tags || '',
                ingredients: doc.ingredients || '',
                slug: doc.slug,
                variants: variantsByProduct[doc.$id] || [],
                collections: doc.collections || []
            }));

            console.log('Products with variants:', productsWithVariants);
            return productsWithVariants;
        } catch (error) {
            console.error('Error in fetchProduct:', error);
            throw error;
        }
    }

    async updateProduct(id: string, data: Product) {
        try {
            const response = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteProductCollectionId,
                id,
                {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    tags: data.tags,
                    ingredients: data.ingredients,
                    slug: data.slug,
                    collections: data.collections || []
                }
            );
            return response;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    async addProduct(product: Omit<Product, "id">) {
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

    async fetchOneProduct(slug: string) {
        try {
            // Fetch the product
            const productRes = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteProductCollectionId,
                [Query.equal('slug', slug)]
            );

            if (!productRes || productRes.documents.length === 0) {
                return "Error in fetching product";
            }

            const product = productRes.documents[0];

            // Fetch variants for this product
            const variantsRes = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteVariantCollectionId,
                [Query.equal('productId', product.$id)]
            );

            return {
                ...product,
                variants: variantsRes.documents
            };
        } catch (error) {
            return error;
        }
    }
}

const productService = new ProductService();
export default productService;
