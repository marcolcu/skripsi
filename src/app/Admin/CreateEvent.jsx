"use client";
import React, { useEffect, useState } from "react";
import "./AdminCSS/Admin.css";

const AdminCreateEvent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    eventname: "",
    capacity: "",
    description: "",
    date: "",
    fee: "",
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
            name="eventname"
            placeholder="Event Name"
            value={formData.eventname}
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
            type="date"
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-black rounded-md p-4 min-w-64"
            type="number"
            name="fee"
            placeholder="Registration Fee"
            value={formData.fee}
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
            Create Event
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="DisplayPicture"></div>
        </div>
      </div>
    </form>
  );
};

export default AdminCreateEvent;
