"use client";
import React, { useEffect, useState } from "react";
import "../AdminCSS/Admin.css";

const AdminCreateVenue = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    venuename: "",
    capacity: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      className="max-w-screen-xl mx-auto px-10"
      style={{ height: "1000px" }}
    >
      <div className="grid-container-1to1 mt-16">
        <div className="flex flex-col gap-8">
          <input
            className="w-full border-2 border-black rounded-md p-4 min-w-64"
            type="text"
            name="venuename"
            placeholder="Venue Name"
            value={formData.venuename}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-black rounded-md p-4 min-w-64"
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-black rounded-md p-4 min-w-64"
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-black rounded-md p-4 min-w-64"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gray-300 w-full border-2 border-black rounded-md p-4"
          >
            Create Venue
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="DisplayPicture"></div>
        </div>
      </div>
    </form>
  );
};

export default AdminCreateVenue;
