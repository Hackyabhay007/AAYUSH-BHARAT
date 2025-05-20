

"use client";
import { useState } from "react";
import ProductManager from "./components/ProductManager";
import HeroVideoManager from "./components/HeroVideoManager";
import ReelVideoManager from "./components/ReelVideoManager";
import AddProductForm from "./components/AddProduct";

const AdminDashboard = () => {
  const [tab, setTab] = useState("products");

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setTab("addProduct")} className="btn">
          Add Products
        </button>
        <button onClick={() => setTab("products")} className="btn">
          Manage Products
        </button>
        <button onClick={() => setTab("hero")} className="btn">
          Hero Video
        </button>
        <button onClick={() => setTab("reels")} className="btn">
          Upload Reels
        </button>
      </div>

      {tab === "addProduct" && <AddProductForm />}
      {tab === "products" && <ProductManager />}
      {tab === "hero" && <HeroVideoManager />}
      {tab === "reels" && <ReelVideoManager />}
    </div>
  );
};

export default AdminDashboard;
