import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {products.map((product) => (
        <ProductCard key={product.$id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
