"use client";
import React, { useEffect } from "react";

const EventListSkeleton = () => {
  return (
    <main className="flex flex-col items-center">
      {/* Placeholder for Banner Image */}
      <div className="w-full h-[400px] bg-gray-400 rounded-[2rem] mb-5 animate-pulse"></div>
      <div className="w-full h-[400px] bg-gray-400 rounded-[2rem] mb-5 animate-pulse"></div>
      <div className="w-full h-[400px] bg-gray-400 rounded-[2rem] mb-5 animate-pulse"></div>

      {/* Placeholder for Load More Button */}
      <div className="w-[110px] bg-gray-400 h-12 rounded-md mb-5 animate-pulse"></div>
    </main>
  );
};

export default EventListSkeleton;

