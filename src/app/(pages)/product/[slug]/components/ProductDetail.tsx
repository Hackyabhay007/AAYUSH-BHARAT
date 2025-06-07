import React, { useState } from "react";
import { ChevronDown, ShoppingCart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { addToCart } from "../../../../../store/slice/cartSlice";
import { Product, Variants } from "@/types/product";

interface Weight {
  id: number;
  documentId: string;
  weight_Value: number;
  original_Price: number;
  sale_Price: number;
  inventory: any[];
}

interface ProductDetailProps {
  product: Product;
  productId: string;
  productName: string;
  description: string;
  category: string;
  tags: string | string[];
  ingredients: string;
  variants: Variants[];
  selectedVariant: Variants | null;
  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  productId,
  productName,
  description,
  tags,
  ingredients,
  category,
  selectedVariant,
  selectedVariantIndex,
  onVariantChange,
  variants,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [quantity, setQuantity] = useState(1);
  const [stockError, setStockError] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  
  const tag = Array.isArray(tags) ? tags : (tags || '').split(',');

  const checkStock = async (variantId: string | undefined, quantity: number) => {
    if (!variantId) {
      setStockError("Invalid variant ID");
      return false;
    }

    const currentVariant = variants.find((v) => v.$id === variantId);

    if (!currentVariant) {
      setStockError("Variant not found");
      return false;
    }

    if (currentVariant.stock < quantity) {
      setStockError(`Only ${currentVariant.stock} items available`);
      return false;
    }

    setStockError(null);
    return true;
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      setStockError("Please select a variant");
      return;
    }

    const hasStock = await checkStock(selectedVariant.$id, quantity);
    if (!hasStock) return;

    try {
      const fixedProduct = {
        id: productId,
        name: productName,
        image: selectedVariant.image,
        category: category,
        quantity: 1,
        selectedVariant: {
          id: variants[selectedVariantIndex].$id || '',
          title: productName,
          sale_price: variants[selectedVariantIndex].sale_price,
          original_price: variants[selectedVariantIndex].price,
          months: variants[selectedVariantIndex].months,
          weight: variants[selectedVariantIndex].weight,
        },
      };

      localStorage.setItem("buyNowData", JSON.stringify({ product: fixedProduct }));
      router.push("/checkout?mode=buyNow");
    } catch (error) {
      console.error("Buy Now Error:", error);
      setStockError("Failed to process buy now request");
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedVariant) {
        setStockError("Please select a variant");
        return;
      }

      const hasStock = await checkStock(selectedVariant.$id, quantity);
      if (!hasStock) return;      const weights = variants.map((v) => ({
        id: 0,
        documentId: v.$id || '',
        weight_Value: v.weight,
        original_Price: v.price,
        sale_Price: v.sale_price,
        inventory: [],
      }));
      
      const weightIndex = selectedVariant ? variants.findIndex((v) => v.$id === selectedVariant.$id) : 0;      // Create a new object with proper typing that matches what cartSlice expects
      const productWithWeights = {
        $id: product.$id,
        name: product.name,
        description: product.description,
        category: product.category,
        tags: product.tags,
        ingredients: product.ingredients,
        slug: product.slug,
        // Include any other required properties from the product
        // Explicitly provide the weights with the correct type
        weights: weights.map(w => ({
          id: w.id as string | number,
          documentId: w.documentId,
          weight_Value: w.weight_Value,
          original_Price: w.original_Price,
          sale_Price: w.sale_Price
        }))
      };

      await dispatch(
        addToCart({
          // First convert to unknown, then to the required type
          product: productWithWeights as unknown as Product & { 
            weights: Array<{ 
              id: string | number; 
              documentId: string;
              weight_Value: number;
              original_Price: number;
              sale_Price: number;
            }> 
          },
          weightIndex,
          quantity,
        })
      );
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setStockError("Failed to add to cart");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div>
          {/* <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          <span className="text-sm text-gray-600 ml-2">{rating} | 1027 reviews</span>
        </div> */}
          <h2 className="text-2xl uppercase text-dark-green font-medium mt-2">
            {productName}
          </h2>          {selectedVariant && (
            <h1 className="text-xl uppercase text-dark-green mt-2">
              Price: ₹{selectedVariant.price} / {selectedVariant.weight} gms
            </h1>
          )}
          <h1 className="text-base uppercase text-dark-green mt-2">
            CATEGORY: {category}
          </h1>
        </div>

<div className="grid grid-cols-2 gap-2">

       {tag.map((tag,index)=>(
         <div key={index} className="text-left">
          <div className="px-8 py-3 bg-gray-200 rounded ">
          <h1 className="uppercase text-xs">{tag}</h1>
          </div>
        </div>
       ))}
       </div>

        <div className="text-sm text-gray-700">
          
          <span className={descExpanded ? "" : "line-clamp-3"}>
           Description: {description}
          </span>
          {description.length > 0 && (
            <button
              className="ml-2 text-green-700 underline"
              onClick={() => setDescExpanded(!descExpanded)}
            >
              {descExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {/* Consumption Instructions */}
        <div className="flex justify-center items-center gap-18 lg:gap-20 text-center sm:gap-4 text-xs text-gray-700">
          <div>
            <Image
              width={52}
              height={52}
              src="https://www.zeroharm.in/cdn/shop/files/TWICE_A_DAY-01_07dfc5bd-82ea-4eee-8304-136e82a79cb0_300x.png?v=1705991459"
              alt="Twice a Day"
              className="mx-auto h-16 w-16"
            />
            <p className="mt-1">Twice a Day</p>
          </div>
          <div>
            <Image
              width={52}
              height={52}
              src="https://www.zeroharm.in/cdn/shop/files/before-meal_-01_300x.png?v=1702906666"
              alt="30 min Before/After"
              className="mx-auto w-16 h-16"
            />
            <p className="mt-1">
              30 min Before/After
              <br />
              Breakfast & Dinner
            </p>
          </div>
          <div>
            <Image
              width={48}
              height={48}
              src="https://www.zeroharm.in/cdn/shop/files/consume_icons-01_1_300x.png?v=1705992080"
              alt="3 Months"
              className="mx-auto w-16 h-16"
            />
            <p className="mt-1">
              3 Months For Better
              <br />
              Results
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">
        <div className="mt-4 space-x-2">
          {variants.length > 0 && (
            <>
              <p className="text-base text-dark-green uppercase ">
                Select Variant:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    onClick={() => onVariantChange(index)}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedVariantIndex === index
                        ? "border-green-600 shadow-md bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    <p className="font-semibold">{variant.months} Months</p>
                    <p className="text-sm text-gray-500">
                      {variant.weight} GMS
                    </p>
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      -{variant.price - variant.sale_price} off
                    </p>
                    <p className="text-lg font-bold mt-2">₹{variant.price}</p>
                    <p className="text-xs text-gray-500 line-through">
                      ₹{variant.sale_price}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      ₹{variant.months} / tablet
                    </p>

                    {selected === index && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-green-600 rounded-full border-2 border-white" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Offer Banner */}
      {/* <div className="rounded-lg overflow-hidden">
        <Image
          width={500}
          height={500}
          src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/Nuessential_Shop_now_banner_27_02_24-01_1.jpg?v=1709722217"
          alt="Promo Banner"
          className="w-full"
        />
      </div> */}      {/* Delivery Estimate */}
      <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-lg p-3 mb-4 text-center text-sm">
        <Image
          width={32}
          height={32}
          src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/46-truck_100x.gif"
          className="h-8"
          alt=""
        />{" "}
        Delivery between <strong>{new Date().toLocaleString('en-IN', {day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata'})} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleString('en-IN', {day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata'})}</strong> | Order within{" "}
        <span className="text-green-600 font-medium">3hr 50 mins</span>.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="w-full border border-dark-green text-dark-green py-3 rounded font-medium text-xl cursor-pointer relative overflow-hidden group"
          onClick={handleAddToCart}
        >
          <span className="relative flex items-center justify-center transition-all duration-300 group-hover:-translate-x-full">
            Add To Cart
            <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-full transition-transform duration-300">
              <ShoppingCart className="w-6 h-6" />
            </span>
          </span>
        </button>
        <button
          className="w-full border bg-dark-green  text-light py-3 rounded font-medium text-xl cursor-pointer relative overflow-hidden group"
          onClick={handleBuyNow}
        >
          <span className="relative flex items-center justify-center transition-all duration-300 group-hover:-translate-x-full">
            Buy It Now
            <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-full transition-transform duration-300">
              <ShoppingBag className="w-6 h-6" />
            </span>
          </span>
        </button>
      </div>

      {stockError && (
        <div className="text-red-600 mb-4 p-2 bg-red-50 rounded">
          {stockError}
        </div>
      )}
      {/* Accordions */}

      <div className="border-b mt-2">
        <button
          onClick={() =>
            setAccordionOpen(
              accordionOpen === "ingredients" ? null : "ingredients"
            )
          }
          className="w-full flex justify-between items-center py-3 text-left font-medium"
        >
          <span>Show Ingredients</span>
          <ChevronDown
            className={`transform transition-transform ${
              accordionOpen === "ingredients" ? "rotate-180" : ""
            }`}
          />
        </button>

        {accordionOpen && (
          <div className="text-sm text-black pb-4">{ingredients}</div>
        )}
      </div>
    </>
  );
};
export default ProductDetail;
