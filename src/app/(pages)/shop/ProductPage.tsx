"use client";

import { useEffect, useState } from "react";
import { Product } from "@/appwrite/product"; 
import ProductCard from "./components/ProductCard";
// import Sidebar from "./components/Sidebar";
import productService from "@/appwrite/product";
import SectionFour from "@/app/components/SectionFour";
import SectionFive from "@/app/components/SectionFive";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const data = await productService.fetchProduct();
      console.log(data);
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="pt-22 text-center text-xl font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-24 text-center bg-beige gap-4 p-4">
      <h1 className="text-2xl lg:text-4xl font-medium uppercase tracking-wide my-8 text-dark-green">Featured Products</h1>
      <div className="flex items-center justify-center gap-12 lg:flex-row flex-col">

        {/* Main Content */}
        <div className="flex flex-col">
          <div className="flex-1">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
  );
};

export default ProductsPage;
