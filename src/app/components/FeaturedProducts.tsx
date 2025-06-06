'use client';

import { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";
import productService from "@/appwrite/product";
import { Product } from "@/types/product";
import ProductCard from "../(pages)/shop/components/ProductCard";
import Loader from "@/components/Loader";

const FeaturedProducts = () => {
  const { ref, isVisible } = useInView();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.fetchProduct();
        // Get first 3 products and fetch their variants
        const firstThreeProducts = data.slice(0, 3);        const productsWithVariants = await Promise.all(
          firstThreeProducts.map(async (doc) => {
            // Fetch variants for each product
            const variants = (doc.variants || []).map(variant => ({
              $id: variant.$id,
              productId: variant.productId,
              weight: variant.weight,
              price: variant.price,
              sale_price: variant.sale_price,
              stock: variant.stock,
              image: variant.image,
              additionalImages: variant.additionalImages || [],
              months: variant.months
            }));
            
            return {
              $id: doc.$id,
              name: doc.name,
              description: doc.description,
              category: doc.category,
              tags: doc.tags || '',
              ingredients: doc.ingredients || '',
              slug: doc.slug,
              variants: variants,
              collections: doc.collections || []
            } as Product;
          })
        );
        
        setProducts(productsWithVariants);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-beige">
      <section ref={ref} className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="lg:text-4xl text-2xl uppercase font-semibold mb-4 tracking-wider text-dark-green text-center">
        Our Ayurvedic Ritual Kits
        </h2>
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto font-light">
          Experience ancient wisdom through our traditional Ayurvedic formulations.
          Each kit is crafted to balance your doshas and enhance your overall well-being.
        </p>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <div className="lg:grid flex flex-col items-center lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <div
                  key={product.$id}
                  className={`transform transition-all duration-700 ease-in-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-lg text-gray-600">No products found. Please check back later.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default FeaturedProducts;
