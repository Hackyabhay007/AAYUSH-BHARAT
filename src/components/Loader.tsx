import React from "react";

const Loader = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center items-center min-h-[60vh] ${className}`}>
    <div className="animate-spin rounded-full h-16 w-16 border-8 border-t-green-600 border-amber-100 border-solid"></div>
  </div>
);

export default Loader;