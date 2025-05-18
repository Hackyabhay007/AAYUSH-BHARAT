import React from "react";


interface SidebarProps {
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({
  selectedPrice,
  setSelectedPrice,
  selectedTag,
  setSelectedTag,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md space-y-6">
      <div>
        <h2 className="font-bold mb-2">Filter by Price</h2>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          <option value="low">Less than ₹200</option>
          <option value="medium">₹200 - ₹250</option>
          <option value="high">More than ₹250</option>
        </select>
      </div>

      <div>
        <h2 className="font-bold mb-2">Filter by Tag</h2>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Best Seller">Best Seller</option>
          <option value="Mangalorean Special">Mangalorean Special</option>
          <option value="Veg Spices">Veg Spices</option>
          <option value="Ground & Pure Spices">Ground & Pure Spices</option>
          <option value="Chicken Spices">Chicken Spices</option>
        </select>
      </div>

      <div>
  <h2 className="font-bold mb-2">Sort By</h2>
  <select
    value={selectedSort}
    onChange={(e) => setSelectedSort(e.target.value)}
    className="w-full border p-2 rounded"
  >
    <option value="">None</option>
    <option value="priceLowHigh">Price: Low to High</option>
    <option value="priceHighLow">Price: High to Low</option>
    <option value="ratingHighLow">Rating: High to Low</option>
  </select>
</div>
    </div>
  );
};

export default Sidebar;
