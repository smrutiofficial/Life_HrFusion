import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center flex-col gap-6 justify-center bg-[#1D2135] bg-opacity-75 z-50">
       <p className="text-white text-6xl font-bold">
          Life <span className="text-[#897EEF]">Hrfusion</span>
        </p>
      <div className="w-12 h-12 border-4 border-[#897EEF] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Preloader;