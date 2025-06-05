'use client';

const ShimmerCard = () => {
  return (
    <div className="bg-light rounded-lg p-4 shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
      
      {/* Rating placeholder */}
      <div className="flex justify-center items-center space-x-1 mb-2">
        <div className="h-3 bg-gray-300 rounded w-20"></div>
      </div>
      
      {/* Title placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
      
      {/* Price placeholder */}
      <div className="flex justify-center space-x-2 mb-3">
        <div className="h-3 bg-gray-300 rounded w-12"></div>
        <div className="h-3 bg-gray-300 rounded w-12"></div>
        <div className="h-3 bg-gray-300 rounded w-16"></div>
      </div>
      
      {/* Buttons placeholder */}
      <div className="flex justify-center gap-2">
        <div className="h-8 bg-gray-300 rounded w-24"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
