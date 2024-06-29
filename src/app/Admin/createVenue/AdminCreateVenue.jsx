"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../provider";
import axios from "axios";
import { toast } from "react-toastify";
import { useCreateVenue } from "../../../services/useAdminVenueServices";
import "../AdminCSS/Admin.css";

const AdminCreateVenue = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { postCreateVenue, createVenue } = useCreateVenue();

  const initialFormData = {
    venuename: "",
    capacity: "",
    description: "",
    hour: "00", // default hour value
    minute: "00", // default minute value
    location: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleCreateVenue = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEmptyField = Object.values(formData).some((value) => value === "");

    if (isEmptyField) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    const formattedTime = `${formData.hour}:${formData.minute}`;

    try {
      await postCreateVenue({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          name: formData.venuename,
          description: formData.description,
          location: formData.location,
          maxCapacity: formData.capacity,
          imageUrl: image,
          closingHour: formattedTime,
        },
      });
      setFormData(initialFormData);
      setImage(null);
      setLoading(false);
    } catch (error) {
      toast.error("Error creating event");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (createVenue && createVenue.errorMessage === null) {
      toast.success("Venue created successfully");
    } else if (createVenue && createVenue.errorMessage) {
      toast.error(createVenue.errorMessage);
    }
  }, [createVenue]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hour" || name === "minute") {
      // Ensure value is always a string
      const formattedValue = `${value}`.padStart(2, "0");
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/image/public/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + state?.token,
          },
        }
      );
      setImage(response.data);
      setLoading(false);
      toast.success("Successfully uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      toast.error("Error uploading image");
    }
  };

  const formatMinimumNumber = (inputId) => {
    const numberInput = document.getElementById(inputId);

    //onkeydown will result in an error if formatMinimumNumber's inputId is invalid
    numberInput.onkeydown = function (e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        e.preventDefault();
      }
    };
  };
  useEffect(() => {
    formatMinimumNumber("number");
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <p className="loading-text">Loading...</p>
        </div>
      )}
      <form
        className="max-w-screen-xl mx-auto px-10"
        style={{ height: "1000px" }}
        onSubmit={handleCreateVenue}
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
              id="number"
              className="w-full border-2 border-black rounded-md p-4 min-w-64"
              type="number"
              name="capacity"
              min="1"
              placeholder="Capacity (min 1)"
              value={formData.capacity}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
            />
            <input
              className="w-full border-2 border-black rounded-md p-4 min-w-64"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="flex gap-4 justify-between items-center">
              Closing Hour of the Venue:
              <div className="time-container flex gap-4 justify-between items-center">
                <div className="hour flex gap-2 justify-between items-center">
                  Hour:
                  <select
                    id="hour"
                    className="w-full border-2 border-black rounded-md p-4 custom-select"
                    name="hour"
                    value={formData.hour}
                    onChange={handleChange}
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option
                        key={hour}
                        value={hour < 10 ? `0${hour}` : `${hour}`}
                      >
                        {hour < 10 ? `0${hour}` : `${hour}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="minute flex gap-2 justify-between items-center ">
                  Minute:
                  <select
                    id="minute"
                    className="w-full border-2 border-black rounded-md p-4 custom-select"
                    name="minute"
                    value={formData.minute}
                    onChange={handleChange}
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option
                        key={minute}
                        value={minute < 10 ? `0${minute}` : `${minute}`}
                      >
                        {minute < 10 ? `0${minute}` : `${minute}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <input
              className="w-full border-2 border-black rounded-md p-4 min-w-64"
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            <button
              className="bg-gray-300 w-full border-2 border-black rounded-md p-4"
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Select Image
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*" // Allow only image files
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <button
              className="bg-gray-300 w-full border-2 border-black rounded-md p-4"
              type="submit"
            >
              Create Venue
            </button>
          </div>

          <div className="flex justify-center items-center">
            <div>
              {image ? (
                <img
                  className="border border-black"
                  src={image}
                  alt="Selected Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    margin: "auto",
                  }}
                />
              ) : (
                <p className="text-center border bg-gray-200 border-black p-8 rounded-full h-72 w-72 flex items-center justify-center">
                  No image selected
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminCreateVenue;
