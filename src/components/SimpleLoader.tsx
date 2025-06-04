const SimpleLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-darkRed animate-loading"></div>
      </div>
    </div>
  );
};

export default SimpleLoader;
