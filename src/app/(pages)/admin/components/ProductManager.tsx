// "use client";

// import React, { useEffect, useState } from "react";
// import productService from "@/appwrite/product";
// import config from "@/config/config";
// import { ID } from "appwrite";
// import toast from "react-hot-toast";
// import Image from "next/image";

// type Product = {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
//     tags: string;
//     rating: number;
// };

// const ProductManager = () => {
//     const bucketId = config.appwriteBucketId; 
//      const [imageFile, setImageFile] = useState<File | null>(null);
//   const [ExistingProduct,setExistingProduct]=useState<Product[]>([]);
//    const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     image: "",
//     tags: "",
//     rating: "",
//   });
//    const [status, setStatus] = useState("");

//   const fetchProducts = async () => {
//     const res = await productService.fetchProduct();
//     setExistingProduct(res);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.name === "image") {
//       const file = e.target.files?.[0] || null;
//       setImageFile(file);
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e:React.FormEvent) => {
//     e.preventDefault();
//      try {
//       let imageUrl = "";

//       if (imageFile) {
//         const fileId = ID.unique();
//         const response = await productService.storage.createFile(bucketId, fileId, imageFile);
//         imageUrl = productService.storage.getFilePreview(bucketId, response.$id);
//       }

//       const productData = {
//         name: formData.name,
//         price: parseFloat(formData.price),
//         image: imageUrl, 
//         tags: formData.tags,
//         rating: parseFloat(formData.rating),
//       };

//       const success = await productService.addProduct(productData);

//       if (success) {
//         setStatus("Product added successfully!");
//         toast.success('Product added successfully')
//         setFormData({ name: "", price: "", image: "", tags: "", rating: "" });
//         setImageFile(null);
//       } else {
//         toast.error("Failed to add product")
//         setStatus("Failed to add product.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Image upload or product save failed")
//       setStatus("Image upload or product save failed.");
//     }

//     fetchProducts();
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-2">Existing Products</h3>
//       <ul className="space-y-2">
//         {ExistingProduct.map((existingproduct) => (
//           <li key={existingproduct.id} className="border p-2 rounded shadow-sm flex justify-between">
//             <div>
//               <strong>{existingproduct.name}</strong> - ₹{existingproduct.price}
//               <br />
//               <span className="text-xs">{existingproduct.tags}</span>
//             </div>
//             {existingproduct.image && <Image src={existingproduct.image} alt={existingproduct.name} height={500} width={500} className="w-16 h-16 object-cover" />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductManager;


"use client";

import React, { useEffect, useState } from "react";
import productService from "@/appwrite/product";
import config from "@/config/config";
import { ID } from "appwrite";
import toast from "react-hot-toast";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string;
  rating: number;
};

const ProductManager = () => {
  const bucketId = config.appwriteBucketId;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingProducts, setExistingProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    price: "",
    image: "",
    tags: "",
    rating: "",
  });

  const fetchProducts = async () => {
    const res = await productService.fetchProduct();
    setExistingProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const file = e.target.files?.[0] || null;
      setImageFile(file);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
        id:product.id,
      name: product.name,
      price: String(product.price),
      image: product.image,
      tags: product.tags,
      rating: String(product.rating),
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      let imageUrl = editingProduct.image;

      if (imageFile) {
        const fileId = ID.unique();
        const response = await productService.storage.createFile(bucketId, fileId, imageFile);
        imageUrl = productService.storage.getFilePreview(bucketId, response.$id);
      }

      const updatedProduct = {
        ...editingProduct,
        name: formData.name,
        price: parseFloat(formData.price),
        image: imageUrl,
        tags: formData.tags,
        rating: parseFloat(formData.rating),
      };
      
      console.log(formData.id);
      
      await productService.updateProduct(formData.id, updatedProduct);
      toast.success("Product updated");
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ id:"",name: "", price: "", image: "", tags: "", rating: "" });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Existing Products</h3>
      <ul className="space-y-4">
        {existingProducts.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow-sm flex justify-between items-center gap-4">
            <div>
              <strong>{product.name}</strong> - ₹{product.price}
              <br />
              <span className="text-sm text-gray-500">{product.tags}</span>
            </div>
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                height={64}
                width={64}
                className="object-cover rounded"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border px-3 py-2 mb-2 rounded"
            />
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border px-3 py-2 mb-2 rounded"
            />
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags"
              className="w-full border px-3 py-2 mb-2 rounded"
            />
            <input
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full border px-3 py-2 mb-2 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border px-3 py-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
