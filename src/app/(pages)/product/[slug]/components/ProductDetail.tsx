import React, { useState } from "react";
import { Star } from "lucide-react";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Variants } from "@/types/product";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store/store';
import { addToCart, createCart } from '../../../../../store/slice/cartSlice';
import { Product } from "@/types/product";
interface ProductDetailProps {
  product:Product;
  thumbnail:string,
   productId:string;
    productName: string,
    description: string,
    price: number,
    rating: number,
    weight: number,
    tags:string[],
    ingredients:string,
    category:string,
    sale_price:number,
  //   variants:{id: string;
  //   title: number;
  //   original_price: number; // Regular price
  //   sale_price: number;    // Discounted price
  //   stock: number;
  //   months:number;
  //   weight:number;  
  // }[],
    variants:Variants[];

  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
  
}


const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  thumbnail,
  productId,
    productName,
    description,
    price,
    rating,
    weight,
    tags,
    ingredients,
    category,
    sale_price,
  selectedVariantIndex,
  onVariantChange,
  variants,
}) => {
const router=useRouter();

  const dispatch = useDispatch<AppDispatch>();
   const { currentCustomer, token } = useSelector((state: RootState) => state.customer);
  const isLoggedIn = !!token;
  
  const { cart, loading } = useSelector((state: RootState) => state.cart);

    
  const [quantity, setQuantity] = useState(1);
  const [currentVariantId, setCurrentVariantId] = useState( variants[0]?.$id);
  const [stockError, setStockError] = useState<string | null>(null);


  // const [expanded, setExpanded] = useState(false);

// const plans = [
//   {
//     label: "3 bottles",
//     quantity: 180,
//     months: 3,
//     price: price*3,
//     // originalPrice: 3297,
//     perTablet: 11.64, 
//     // discount: "36.43%",
//     tag: "Best Results",
//     tagColor: "bg-green-600",
//     // offer: "Free Serum Worth ₹2,799/-",
//   }, 
// ];




  const [selected, setSelected] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  // const [selectedVariant, setSelectedVariant] = useState(0);


 const handleBuyNow = async () => {
    if (!isLoggedIn) {
        // setShowLoginModal(true);
        return;
    }

    const currentVariant = variants.find(v => v.$id === currentVariantId);
    if (!currentVariant) {
        setStockError('Invalid variant selected');
        return;
    }

    const hasStock = await checkStock(currentVariantId, quantity);
    if (!hasStock) return;

    try {
        // Create the buyNowData object
        // const buyNowData = {
        //   product: {
        //     id: productId,
        //     name: productName,
        //     thumbnail: '',
        //     category: category,
        //     quantity: weight,
        //     selectedVariant: {
        //       id: 'variants.$id',
        //       title:'oikok',
        //       sale_price: 12,
        //       original_price: 34,
        //     }
        //   }
        // };

        const fixedProduct = {
  id: productId,
  name:productName,
  thumbnail: thumbnail,
  category: category, // ✅ fixed
  quantity: 1,
  selectedVariant: {
    id: variants[selectedVariantIndex].$id,         // ✅ should be a real ID
    title: productName,        // ✅ string title
    sale_price: variants[selectedVariantIndex].sale_price,
    original_price: variants[selectedVariantIndex].price,
    months:variants[selectedVariantIndex].months,
    weight:variants[selectedVariantIndex].weight,
  }
};


        // Store data with error handling
        try {
          localStorage.setItem('buyNowData', JSON.stringify({product:fixedProduct}));
          
          // Verify the data was stored correctly
          const verifyData = localStorage.getItem('buyNowData');
          if (!verifyData) {
            throw new Error('Failed to store checkout data');
          }

          const parsed = JSON.parse(verifyData);
          if (!parsed?.product?.name) {
            throw new Error('Stored data is invalid');
          }

          // Only navigate if data is stored successfully
          router.push('/checkout?mode=buyNow');
        } catch (storageError) {
          console.error('Storage error:', storageError);
          alert('Failed to start checkout process. Please try again.');
        }
    } catch (error) {
        console.error('Buy Now Error:', error);
        setStockError('Failed to process buy now request');
    }
  };

    const checkStock = async (variantId: string, quantity: number) => {
    // Get current variant directly from variants prop
    const currentVariant = variants.find(v => v.$id === variantId);
    
    if (!currentVariant) {
        setStockError('Variant not found');
        return false;
    }

    // Direct stock check from variant data
    if (currentVariant.stock < quantity) {
        setStockError(`Only ${currentVariant.stock} items available`);
        return false;
    }

    // Clear any existing error if stock is available
    setStockError(null);
    return true;
  };

 const handleAddToCart = async () => {
    try {
        const currentVariant = variants.find(v => v.$id === currentVariantId);
        if (!currentVariant) {
            setStockError('Invalid variant selected');
            return;
        }

        // Check stock before adding to cart
        const hasStock = await checkStock(currentVariantId, quantity);
        if (!hasStock) return;

        // Continue with adding to cart
        // Transform to match Weight interface
        const weights: Weight[] = variants.map(v => ({
          id: 0, // Default value
          documentId: v.$id,
          weight_Value: v.weight,
          original_Price: v.price,
          sale_Price: v.sale_price,
          inventory: [] // Empty array since we don't have inventory data
        }));

        const weightIndex = variants.findIndex(v => v.$id === currentVariantId);
        
        await dispatch(addToCart({
          product: {
            ...product,
            weights
          },
          weightIndex,
          quantity
        }));
    } catch (error) {
        console.error('Failed to add to cart:', error);
        setStockError('Failed to add to cart');
    }
  };


  return (
    // <>
    // <div className="max-w-2xl mx-auto p-4 space-y-6">
    //   {/* Rating & Title */}
    //   <div>
    //     <div className="flex items-center gap-1 text-yellow-500">
    //       {Array.from({ length: productRating }).map((_, i) => (
    //         <Star key={i} size={16} fill="currentColor" />
    //       ))}
    //       <span className="text-sm text-gray-600 ml-2">{productRating} | 1027 reviews</span>
    //     </div>
    //     <h2 className="text-2xl text-dark-green font-medium mt-2">{productName}</h2>
    //   </div>

    //   <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
    //     {[
    //       "Nourishes Nails",
    //       "Reduces Hair-Fall",
    //       "Nourishes Skin",
    //       "Nourishes Hair For Growth",
    //     ].map((text, i) => (
    //       <div
    //         key={i}
    //         className="bg-gray-100 rounded-lg px-4 py-2 text-base font-medium text-left"
    //       >
    //         {text}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Description with Read More */}
    //   <div className="text-sm text-gray-700">
    //     {expanded ? (
    //       <>
    //        Biotin 30mcg tablets by ZeroHarm, powered by nanotechnology, are plant-based Vitamin B7 supplements derived from Sesbania Grandiflora. They promote hair growth, strengthen hair strands, and reduce hair fall while improving hair stiffness, making them one of the best biotin tablets. Additionally, they support skin health and stronger nails, ensuring overall nourishment for hair, skin, and nails.{" "}
    //         <button
    //           onClick={() => setExpanded(false)}
    //           className="text-green-700 underline"
    //         >
    //           Read less
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         Biotin 30mcg tablets by ZeroHarm, powered by nanotechnology, are plant-based Vitamin B7 supplements derived from Sesbania Grandiflora. They promote hair growth, strengthen hair strands, and reduce hair fall while improving hair stiffness, making them one of the best biotin tablets.
    //         <button
    //           onClick={() => setExpanded(true)}
    //           className="text-green-700 underline ml-1"
    //         >
    //           Read more
    //         </button>
    //       </>
    //     )}
    //   </div>

    //   {/* Consumption Instructions */}
    //   <div className="flex justify-center items-center gap-18 text-center sm:gap-4 text-xs text-gray-700">
    //     <div>
    //       <Image width={48} height={48} src="https://www.zeroharm.in/cdn/shop/files/TWICE_A_DAY-01_07dfc5bd-82ea-4eee-8304-136e82a79cb0_300x.png?v=1705991459" alt="Twice a Day" className="mx-auto h-12" />
    //       <p className="mt-1">Twice a Day</p>
    //     </div>
    //     <div>
    //       <Image width={48} height={48} src="https://www.zeroharm.in/cdn/shop/files/before-meal_-01_300x.png?v=1702906666" alt="30 min Before/After" className="mx-auto h-12" />
    //       <p className="mt-1">30 min Before/After<br />Breakfast & Dinner</p>
    //     </div>
    //     <div>
    //       <Image width={48} height={48} src="https://www.zeroharm.in/cdn/shop/files/consume_icons-01_1_300x.png?v=1705992080" alt="3 Months" className="mx-auto h-12" />
    //       <p className="mt-1">3 Months For Better<br />Results</p>
    //     </div>
    //   </div>
    // </div>

    //   <div className="p-4 space-y-6 max-w-xl mx-auto">

    //   {/* Pricing Cards */}
    //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    //     {plans.map((plan, index) => (
    //       <div
    //         key={index}
    //         onClick={() => setSelected(index)}
    //         className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
    //           selected === index ? "border-green-600 shadow-md" : "border-gray-300"
    //         }`}
    //       >
    //         {plan.offer && (
    //           <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
    //             {plan.offer}
    //           </div>
    //         )}
    //         <p className="font-semibold">{plan.label}</p>
    //         <p className="text-sm text-gray-500">{plan.months} months</p>
    //         <p className="text-red-600 text-sm font-semibold mt-1">-{plan.discount} off</p>
    //         <p className="text-lg font-bold mt-2">₹{plan.price}</p>
    //         <p className="text-xs text-gray-500 line-through">₹{plan.originalPrice}</p>
    //         <p className="text-sm text-gray-600 mt-1">₹{plan.perTablet} / tablet</p>

          
    //         {plan.tag && (
    //           <div className={`mt-3 text-white text-xs px-2 py-1 rounded ${plan.tagColor}`}>
    //             {plan.tag}
    //           </div>
    //         )}

    //         {selected === index && (
    //           <div className="absolute top-2 right-2 w-4 h-4 bg-green-600 rounded-full border-2 border-white" />
    //         )}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Offer Banner */}
    //   <div className="rounded-lg overflow-hidden">
    //     <Image width={500} height={500} src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/Nuessential_Shop_now_banner_27_02_24-01_1.jpg?v=1709722217" alt="Promo Banner" className="w-full" />
    //   </div>

    //   {/* Delivery Estimate */}
    //   <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-lg p-3 text-center text-sm">
    //     <Image width={32} height={32} src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/46-truck_100x.gif" className="h-8"  alt="" /> Delivery between <strong>15th - 17th May</strong> | Order within{" "}
    //     <span className="text-green-600 font-medium">3hr 50 mins</span>.
    //   </div>

    //   {/* Action Buttons */}
    //   <div className="flex flex-col sm:flex-row gap-4">
    //     <button className="w-full border border-dark-green text-dark-green py-3 rounded font-medium text-xl">
    //       Add To Cart
    //     </button>
    //     <button className="w-full border bg-dark-green text-light py-3 rounded font-medium text-xl">
    //       Buy It Now
    //     </button>
    //   </div>

    //   {/* Accordions */}
    //   {["Ingredients"].map((title, i) => (
    //     <div key={i} className="border-b">
    //       <button
    //         onClick={() => setAccordionOpen(accordionOpen === title ? null : title)}
    //         className="w-full flex justify-between items-center py-3 text-left font-medium"
    //       >
    //         {title}
    //         <ChevronDown
    //           className={`transform transition-transform ${
    //             accordionOpen === title ? "rotate-180" : ""
    //           }`}
    //         />
    //       </button>
    //       {accordionOpen === title && (
    //         <div className="text-sm text-gray-600 pb-4">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
    // </>
    <>
 <div className="max-w-2xl mx-auto p-4 space-y-6"> 
         <div>
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          <span className="text-sm text-gray-600 ml-2">{rating} | 1027 reviews</span>
        </div>
        <h2 className="text-2xl uppercase text-dark-green font-medium mt-2">{productName}</h2>

        
      <h1 className="text-xl uppercase text-dark-green mt-2">Price: ₹{price} / {weight} gms</h1>
      <h1 className="text-base uppercase text-dark-green mt-2">CATEGORY: {category}</h1>
      </div>

          <div className="text-base text-gray-700">
          Description: 
          {description}
          
      </div>

 {/* Consumption Instructions */}
      <div className="flex justify-center items-center gap-18 lg:gap-20 text-center sm:gap-4 text-xs text-gray-700">
        <div>
          <Image width={52} height={52} src="https://www.zeroharm.in/cdn/shop/files/TWICE_A_DAY-01_07dfc5bd-82ea-4eee-8304-136e82a79cb0_300x.png?v=1705991459" alt="Twice a Day" className="mx-auto h-16 w-16" />
          <p className="mt-1">Twice a Day</p>
        </div>
        <div>
          <Image width={52} height={52} src="https://www.zeroharm.in/cdn/shop/files/before-meal_-01_300x.png?v=1702906666" alt="30 min Before/After" className="mx-auto w-16 h-16" />
          <p className="mt-1">30 min Before/After<br />Breakfast & Dinner</p>
        </div>
        <div>
          <Image width={48} height={48} src="https://www.zeroharm.in/cdn/shop/files/consume_icons-01_1_300x.png?v=1705992080" alt="3 Months" className="mx-auto w-16 h-16" />
          <p className="mt-1">3 Months For Better<br />Results</p>
        </div>
      </div>
    </div>


      <div className="p-4 space-y-6 max-w-xl mx-auto">
            
             <div className="mt-4 space-x-2">
        {variants.length > 0 && (
          <>
          <p className="text-base text-dark-green uppercase ">Select Variant:</p>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => onVariantChange(index)}
            className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
              selectedVariantIndex === index ? "border-green-600 shadow-md" : "border-gray-300"
            }`}
          >
            <p className="font-semibold">{variant.months} Months</p>
            <p className="text-sm text-gray-500">{variant.weight} GMS</p>
            <p className="text-red-600 text-sm font-semibold mt-1">-{variant.price-variant.sale_price} off</p>
            <p className="text-lg font-bold mt-2">₹{variant.price}</p>
            <p className="text-xs text-gray-500 line-through">₹{variant.sale_price}</p>
            <p className="text-sm text-gray-600 mt-1">₹{variant.months} / tablet</p>

          
            {/* {tags.split(',') && (
              <div className={`mt-3 text-white text-xs px-2 py-1 rounded`}>
                {weight}
              </div>
            )} */}

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
      <div className="rounded-lg overflow-hidden">
        <Image width={500} height={500} src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/Nuessential_Shop_now_banner_27_02_24-01_1.jpg?v=1709722217" alt="Promo Banner" className="w-full" />
      </div>

      {/* Delivery Estimate */}
      <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-lg p-3 text-center text-sm">
        <Image width={32} height={32} src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/46-truck_100x.gif" className="h-8"  alt="" /> Delivery between <strong>15th - 17th May</strong> | Order within{" "}
        <span className="text-green-600 font-medium">3hr 50 mins</span>.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full border border-dark-green text-dark-green py-3 rounded font-medium text-xl" onClick={handleAddToCart}>
          Add To Cart
        </button>
        <button className="w-full border bg-dark-green text-light py-3 rounded font-medium text-xl" onClick={handleBuyNow}>
          Buy It Now
        </button>
      </div>


        {stockError && (
          <div className="text-red-600 mb-4 p-2 bg-red-50 rounded">
              {stockError}
          </div>
        )}
      {/* Accordions */}
     
  <div className="border-b">
  <button
    onClick={() => setAccordionOpen(accordionOpen === "ingredients" ? null : "ingredients")}
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
    <div className="text-sm text-black pb-4">
      {ingredients}
    </div>
  )}
</div>


   

        </>
  );
};
export default ProductDetail;