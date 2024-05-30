import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-20 bg-rose-50">
      <div className="flex items-center space-x-7">
        <div className="w-16 h-16 border-8 border-dotted border-rose-500 rounded-full animate-spin"></div>
        <div className="text-4xl font-semibold text-rose-500">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
