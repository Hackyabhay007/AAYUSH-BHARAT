'use client';

import ShimmerCard from './ShimmerCard';

const ShimmerProductsGrid = () => {
  // Create an array of 6 elements to show 6 shimmer cards
  const shimmerCards = Array(6).fill(null);
  
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shimmerCards.map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShimmerProductsGrid;
