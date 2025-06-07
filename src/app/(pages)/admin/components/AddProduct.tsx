"use client";

import { useState } from "react";
import productService from "@/appwrite/product";
import config from "@/config/config";
import { ID } from "appwrite";
import toast from "react-hot-toast";
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    tags: "",
    rating: "",
  });
  const bucketId=config.appwriteBucketId;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 try {
      let imageUrl = "";

      if (imageFile) {
        const fileId = ID.unique();
        const response = await productService.storage.createFile(bucketId, fileId, imageFile);

        imageUrl = productService.storage.getFilePreview(bucketId, response.$id);
      }

     

      // const success = await productService.addProduct(productData);
const success=1;
      if (success) {
        setStatus("Product added successfully!");
        toast.success('Product added successfully')
        setFormData({ name: "", price: "", image: "", tags: "", rating: "" });
        setImageFile(null);
      } else {
        toast.error("Failed to add product")
        setStatus("Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload or product save failed")
      setStatus("Image upload or product save failed.");
    }


    };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="image"
          type="file"
          accept="image/"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          max="5"
          min="0"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-center">{status}</p>}
    </div>
  );
};

export default AddProductForm;
