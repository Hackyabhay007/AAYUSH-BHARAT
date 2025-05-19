"use client";

import { useState } from "react";
import productService from "@/appwrite/product";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    tags: "",
    rating: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      tags: formData.tags,
      rating: parseFloat(formData.rating),
    };

    const success = await productService.addProduct(productData);

    if (success) {
      setStatus("Product added successfully!");
      setFormData({ name: "", price: "", image: "", tags: "", rating: "" });
    } else {
      setStatus("Failed to add product.");
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
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
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
