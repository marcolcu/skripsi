"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../provider";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useEditVenue,
  useGetVenueDetailAdmin,
} from "../../../../../services/useAdminVenueServices";
import "../../../AdminCSS/Admin.css";

const AdminEditVenue = ({ slug }) => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [defaultVenueName, setDefaultVenueName] = useState(null);
  const [tempImageUrl, setTempImageUrl] = useState(null);
  // const [isEditError, setIsEditError] = useState(null);

  const { postEditVenue, editVenue } = useEditVenue();

  const [formData, setFormData] = useState({
    venuename: "",
    capacity: "",
    description: "",
    location: "",
    hour: "00",
    minute: "00",
    imageUrl: null,
  });

  const { fetchVenueDetailAdmin, venueDetailAdmin } = useGetVenueDetailAdmin();

  useEffect(() => {
    if (state && state.token) {
      setLoading(true);
      fetchVenueDetailAdmin({
        header: {
          Authorization: "Bearer " + state.token,
        },
        queryParams: {
          venueId: slug,
        },
      })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error fetching venue details: ", error);
          setLoading(false);
        });
    }
  }, [state]);

  useEffect(() => {
    if (venueDetailAdmin && venueDetailAdmin.value) {
      const {
        name,
        maxCapacity,
        description,
        location,
        imageUrl,
        closingHour,
      } = venueDetailAdmin.value;
      setDefaultVenueName(venueDetailAdmin.value.name);
      setTempImageUrl(venueDetailAdmin.value.imageUrl);

      // Split the closingHour string into hours and minutes
      const [hour, minute] = closingHour.split(":");

      setFormData({
        venuename: name || "",
        capacity: maxCapacity || "",
        description: description || "",
        location: location || "",
        hour: hour || "00", // Set default value as "00" if hour is not provided
        minute: minute || "00", // Set default value as "00" if minute is not provided
        imageUrl: imageUrl,
      });
    }
  }, [venueDetailAdmin]);

  const handleEditVenue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const closingHour = `${formData.hour}:${formData.minute}`;

      await postEditVenue({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          venueName: defaultVenueName,
        },
        body: {
          name: formData.venuename,
          description: formData.description,
          location: formData.location,
          maxCapacity: formData.capacity,
          imageUrl: image ? image : tempImageUrl, // Use image if not null, otherwise use tempImageUrl
          closingHour: closingHour,
        },
      });
      // console.log(editVenue);
      setLoading(false);
    } catch (error) {
      toast.error("Error editing venue");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (editVenue && editVenue.errorMessage === null) {
      toast.success("Venue edited successfully");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    } else if (editVenue && editVenue.errorMessage) {
      toast.error(editVenue.errorMessage);
    }
  }, [editVenue]);

  // useEffect(() => {
  //   if (createEvent && createEvent.errorMessage === null) {
  //     toast.success("Event created successfully");
  //   } else if (createEvent && createEvent.errorMessage) {
  //     toast.error(createEvent.errorMessage);
  //   }
  // }, [createEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      toast.error("Error uploading image");
    }
  };

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
        onSubmit={handleEditVenue}
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
              min="1"
              placeholder="Capacity (min 1)"
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
            <div className="flex gap-4 justify-between items-center">
              Closing Hour of the Venue:
              <div className="time-container flex gap-4 justify-between items-center">
                <div className="hour flex gap-2 justify-between items-center">
                  Hour:
                  <select
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
              Edit Venue
            </button>
          </div>
          <div className="flex justify-center items-center">
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
            ) : venueDetailAdmin?.value?.imageUrl ? (
              <img
                className="border border-black"
                src={venueDetailAdmin?.value?.imageUrl} // Use venueImageUrl here
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
      </form>
    </>
  );
};

export default AdminEditVenue;
