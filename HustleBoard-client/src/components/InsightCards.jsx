import React from "react";

const InsightCards = ({ bg, img, message, numbers }) => {
  return (
    <div
      className={`w-[49%] md:w-[24%] mx-auto ${bg} py-1 rounded-md shadow-inner shadow-white/80`}
    >
      <div className="flex items-center gap-2 px-4">
        <img src={`/insightspng/${img}`} alt="tick" className="w-8 md:w-10" />
        <p className="text-lg md:text-3xl text-white/65 font-bold">{numbers}</p>
      </div>
      <p className="text-sm md:text-md text-white/65 font-bold px-6 mt-2">
        {message}
      </p>
    </div>
  );
};

export default InsightCards;
