import React from "react";

const Loader = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center items-center min-h-[60vh] ${className}`}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid"></div>
  </div>
);

export default Loader;