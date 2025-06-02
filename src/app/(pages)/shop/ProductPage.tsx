"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
// import Sidebar from "./components/Sidebar";
import productService from "@/appwrite/product";
import SectionFour from "@/app/components/SectionFour";
import SectionFive from "@/app/components/SectionFive";
import { Product } from "@/types/product";
import Loader from "@/components/Loader";

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
  }, []);
  

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <Loader />
        </div>
      )}
      <div className="flex flex-col pt-24 text-center bg-beige gap-4">
        <h1 className="text-2xl lg:text-4xl font-medium uppercase tracking-wide my-8 text-dark-green">OUR RITUAL KITS</h1>
        <div className="flex items-center justify-center gap-12 pb-12 lg:flex-row flex-col">

          {/* Main Content */}
          <div className="flex flex-col">
            <div className="flex-1">
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.$id} 
                      product={product} 
                      onShowNowLoading={setLoading} // pass the setter as prop
                    />
                  ))}
                </div>
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
