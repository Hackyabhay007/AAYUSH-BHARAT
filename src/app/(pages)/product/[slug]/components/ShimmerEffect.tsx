import React from 'react';

const ShimmerEffect: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default ShimmerEffect;
