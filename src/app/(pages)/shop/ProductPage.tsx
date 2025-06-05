"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
// import Sidebar from "./components/Sidebar";
import productService from "@/appwrite/product";
import SectionFour from "@/app/components/SectionFour";
import SectionFive from "@/app/components/SectionFive";
import { Product } from "@/types/product";
import ShimmerProductsGrid from "./components/ShimmerProductsGrid";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Start loading
      const data = await productService.fetchProduct();
      // Map Document[] to Product[]
      const productsData: Product[] = data.map((doc) => ({
        $id: doc.$id,
        name: doc.name,
        description: doc.description,
        rating: doc.rating,
        category: doc.category,
        price: doc.price,
        imageUrl: doc.imageUrl,
        sale_price:doc.sale_price,
        weight: doc.weight ?? 0,
        image: doc.image ?? "",
        additionalImages: doc.additionalImages ?? [],
        stock: doc.stock ?? 0,
        brand: doc.brand ?? "",
        tags: doc.tags ?? [],
        ingredients: doc.ingredients ?? [],
        slug: doc.slug ?? "",
        // Add other fields as required by Product type
      }));
      setProducts(productsData);
      setLoading(false); // End loading
    };

    getProducts();
  }, []);    return (
    <div className="relative">
      <div className="flex flex-col pt-0 text-center bg-beige gap-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl lg:text-4xl font-medium uppercase tracking-wide my-8 text-dark-green">AAYUDH BHARAT RITUAL KITS</h1>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Discover our authentic collection of Ayurvedic products crafted with time-tested wisdom from Charaka, Sushruta, and Bhaishajya Granthas. 100% natural formulations for holistic wellness without synthetics or chemicals.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-12 pb-12 lg:flex-row flex-col">
          {/* Main Content */}
          <div className="flex flex-col">
            <div className="flex-1">
              <div className="flex justify-center">
                {loading ? (
                  <ShimmerProductsGrid />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <ProductCard 
                          key={product.$id} 
                          product={product} 
                        />
                      ))
                    ) : (
                      <div className="col-span-3 py-12 text-center">
                        <p className="text-lg text-gray-600">No products found. Please check back later.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SectionFour />
        <SectionFive />
        
        {/* <VideoSection /> */}
      </div>
    </div>
  );
};

export default ProductsPage;
