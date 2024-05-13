"use client";
import React, { useEffect } from "react";

const SkeletonLoading = () => {
  return (
    <main>
      {/* Placeholder for Banner Image */}
      <div className="w-full h-[400px] bg-gray-400 rounded-[2rem] mb-5 animate-pulse"></div>

      {/* Placeholder for Banner Text */}
      <div className="font-bold py-5 bg-gray-300 w-[400px] h-8 mb-10 animate-pulse"></div>

      {/* Placeholder for Card Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 animate-pulse">
              {/* Placeholder for Event Image */}
              <div className="h-full w-full bg-gray-400"></div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                {/* Placeholder for Event Name */}
                <h3 className="text-sm text-gray-700 bg-gray-300 w-2/3 h-4 mb-2"></h3>
                {/* Placeholder for Genre */}
                <p className="mt-1 text-sm text-gray-500 bg-gray-300 w-1/3 h-4"></p>
              </div>
              {/* Placeholder for Price */}
              <div className="text-sm font-medium text-gray-900 bg-gray-300 w-1/4 h-4"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SkeletonLoading;
