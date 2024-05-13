"use client";
import React, { useEffect } from "react";

const VenueListSkeleton = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      <div className="my-4 flex justify-center">
        <div className="flex items-center space-x-2 mt-5">
          {/* Skeleton for date input */}
          <div className="border border-gray-300 bg-gray-200 rounded-md shadow-sm w-[200px] py-2 px-3 animate-pulse"></div>

          {/* Skeleton for time input */}
          <div className="border border-gray-300 bg-gray-200 rounded-md shadow-sm w-[200px] py-2 px-3 animate-pulse"></div>

          {/* Skeleton for duration select */}
          <div className="border border-gray-300 bg-gray-200 rounded-md shadow-sm w-[103px] py-2 px-3 animate-pulse"></div>

          {/* Skeleton for filter button */}
          <div className="flex items-center justify-center bg-gray-200 rounded-md shadow-sm w-[48px] h-[2.7rem] animate-pulse">
            {/* Skeleton for filter button icon */}
            <svg className="w-6 h-6 text-gray-500"></svg>
          </div>
        </div>
      </div>

      {/* Skeleton for venue items */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="relative mb-5">
          {/* Skeleton for venue image */}
          <div className="w-full h-[440px] bg-gray-300 animate-pulse rounded-[2rem]"></div>

          <div className="absolute bottom-0 left-0 right-0 rounded-[2rem]">
            <div className="p-6 bg-gray-200 rounded-b-[2rem]">
              {/* Skeleton for venue name */}
              <div className="font-bold text-4xl bg-gray-300 w-[70%] h-8 mb-2 animate-pulse"></div>
              {/* Skeleton for venue location */}
              <div className="font-medium text-md bg-gray-300 w-[50%] h-6 animate-pulse rounded-b-lg"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Skeleton for load more button */}
      <div className="w-full flex justify-center">
        <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full mt-4 animate-pulse">
          Load More
        </button>
      </div>
    </div>
  );
};

export default VenueListSkeleton;
