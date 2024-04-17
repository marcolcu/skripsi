"use client";
import React, { useEffect, useState } from "react";
import "./AdminCSS/Admin.css";

const AdminEditEvent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <form
      className="max-w-screen-xl mx-auto px-10"
      style={{ height: "1000px" }}
    >
      <div className="grid-container-1to1 mt-16">
        <div className="flex flex-col gap-8">
          <p className="w-full border-2 border-black rounded-md p-4 min-w-64">
            Venue Name -
          </p>
          <p className="w-full border-2 border-black rounded-md p-4 min-w-64">
            Capacity -
          </p>
          <p className="w-full border-2 border-black rounded-md p-4 min-w-64">
            Description -
          </p>
          <p className="w-full border-2 border-black rounded-md p-4 min-w-64">
            Location -
          </p>

          <div className="flex gap-4">
            <button className="bg-gray-300 w-full border-2 border-black rounded-md p-4">
              Cancel
            </button>
            <button className="bg-red-600 text-white w-full border-2 border-black rounded-md p-4">
              Delete
            </button>
          </div>
          <button className="bg-green-500 text-white w-full border-2 border-black rounded-md p-4">
            Save Venue
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="DisplayPicture"></div>
        </div>
      </div>
    </form>
  );
};

export default AdminEditEvent;
