"use client";
import React, { useEffect } from "react";

const ProfileSkeleton = () => {
  return (
    <div
      className="max-w-screen-xl mx-auto my-9 px-10"
      style={{ height: "54vh" }}
    >
      <div className="top-container flex justify-between">
        <div className="right-component">
          {/* Skeleton loading for profile image */}
          <div className="bg-gray-400 animate-pulse w-40 h-40 rounded-full"></div>
        </div>
        <div className="left-component flex flex-col justify-center items-center w-full">
          {/* Skeleton loading for name */}
          <h1 className="bg-gray-400 animate-pulse w-32 h-6 mb-2"></h1>
          {/* Skeleton loading for role and email */}
          <p className="bg-gray-400 animate-pulse w-24 h-4"></p>
        </div>
      </div>
      <div className="bottom-container mt-8">
        <table className="w-full">
          <tbody>
            {[...Array(4)].map((_, index) => (
            <tr key={index}>
              <td className="w-24">
                <div className="bg-gray-400 animate-pulse w-16 h-4"></div>
              </td>
              <td>
                <div className="bg-gray-400 animate-pulse w-full h-10"></div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          {/* Skeleton loading for submit button */}
          <div className="bg-gray-400 animate-pulse w-24 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
