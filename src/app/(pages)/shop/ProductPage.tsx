"use client";

import { useEffect, useState } from "react";
import { Product } from "@/appwrite/product"; 
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import productService from "@/appwrite/product";
import SectionFour from "@/app/components/SectionFour";
import VideoSection from "@/app/components/VideoSection";
import SectionFive from "@/app/components/SectionFive";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  useEffect(() => {
    const getProducts = async () => {
      const data = await productService.fetchProduct();
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, []);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      let priceMatch = true;
      let tagMatch = true;

      if (selectedPrice === "low") priceMatch = product.price < 200;
      else if (selectedPrice === "medium")
        priceMatch = product.price >= 200 && product.price <= 250;
      else if (selectedPrice === "high") priceMatch = product.price > 250;

      if (selectedTag) tagMatch = product.tags.includes(selectedTag);

      return priceMatch && tagMatch;
    });

    if (selectedSort === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "ratingHighLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (loading) {
    return (
      <div className="pt-22 text-center text-xl font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-24 bg-beige gap-4 p-4">

      <div className="flex gap-12 flex-row">

      {/* Sidebar for filters */}
      <div className="w-64">
        <Sidebar
          selectedPrice={selectedPrice}
          setSelectedPrice={(value) => {
            setSelectedPrice(value);
            setCurrentPage(1);
          }}
          selectedTag={selectedTag}
          setSelectedTag={(value) => {
            setSelectedTag(value);
            setCurrentPage(1);
          }}
          selectedSort={selectedSort}
          setSelectedSort={(value) => {
            setSelectedSort(value);
            setCurrentPage(1);
          }}
        />
      </div>

<div className="flex flex-col">

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
          </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
              ? "bg-orange-500 text-white"
              : "bg-white text-black"
            }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
          </div>

      <SectionFour/>
      <SectionFive/>
      <VideoSection/>
    </div>
  );
};

export default ProductsPage;
