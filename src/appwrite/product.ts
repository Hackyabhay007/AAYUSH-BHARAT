import { Product, Variants } from "@/types/product";
import type { Client, Databases, Storage } from "appwrite";

class ProductService {
    private static instance: ProductService | null = null;
    private client!: Client;
    private databases!: Databases;
    private storage!: Storage;
    private initialized: boolean = false;

    private constructor() {}

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    private async initialize() {
        if (this.initialized) return;

        const { Client, Databases, Storage } = await import('appwrite');
        const { default: config } = await import('@/config/config');

        if (!config.appwriteUrl || !config.appwriteProjectId) {
            throw new Error('Appwrite configuration is missing. Please check your environment variables.');
        }

        try {
            // Validate URL format
            new URL(config.appwriteUrl);
            
            this.client = new Client();
            this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
            this.initialized = true;
        } catch {
            console.error('Invalid Appwrite endpoint URL:', config.appwriteUrl);
            throw new Error('Invalid Appwrite endpoint URL configuration');
        }
    }

    async deleteProduct(id: string) {
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteProductCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    async fetchVariants() {
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
            const { Query } = await import('appwrite');
            console.log('Fetching all variants');
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteVariantCollectionId,
                [Query.limit(100)]
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching variants:", error);
            throw error;
        }
    }

    async fetchProduct() {
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
            const { Query } = await import('appwrite');
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
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
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
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
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
        await this.initialize();
        try {
            const { default: config } = await import('@/config/config');
            const { Query } = await import('appwrite');
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

export default ProductService.getInstance();
