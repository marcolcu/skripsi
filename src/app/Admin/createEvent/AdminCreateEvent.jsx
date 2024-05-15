"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../provider";
import axios from "axios";
import { toast } from "react-toastify";
import { useCreateEvent } from "../../../services/useAdminEventServices";
import "../AdminCSS/Admin.css";

const AdminCreateEvent = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { postCreateEvent, createEvent } = useCreateEvent();

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const formattedDefaultDate = defaultDate.toISOString().slice(0, 10);

  const initialFormData = {
    eventname: "",
    capacity: "",
    description: "",
    date: formattedDefaultDate,
    hour: "00", // default hour value
    minute: "00", // default minute value
    duration: "",
    fee: "",
    location: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEmptyField = Object.values(formData).some((value) => value === "");

    if (isEmptyField) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    const { date, hour, minute } = formData;
    const formattedDate = new Date(
      `${date}T${hour}:${minute}:00.000+07:00`
    ).toISOString();

    try {
      await postCreateEvent({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          name: formData.eventname,
          description: formData.description,
          location: formData.location,
          dateHeld: formattedDate,
          maxCapacity: formData.capacity,
          registrationFee: formData.fee,
          duration: formData.duration,
          imageUrl: image,
        },
      });
      // console.log(formattedDate); //debug submitted date including hour and minutes
      // console.log(createEvent);
      setFormData(initialFormData);
      setImage(null);
      setLoading(false);
    } catch (error) {
      toast.error("Error creating event");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (createEvent && createEvent.errorMessage === null) {
      toast.success("Event created successfully");
    } else if (createEvent && createEvent.errorMessage) {
      toast.error(createEvent.errorMessage);
    }
  }, [createEvent]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate <= today) {
        alert("Please select a date after today.");
        return;
      }

      const formattedDate = selectedDate.toISOString().slice(0, 10);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    } else if (name === "hour" || name === "minute") {
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
    formatMinimumNumber("duration");
    formatMinimumNumber("fee");
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
        onSubmit={handleCreateEvent}
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
              Date:
              <input
                className="w-full border-2 border-black rounded-md p-4 min-w-64"
                type="date"
                name="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
              />
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
              id="duration"
              className="w-full border-2 border-black rounded-md p-4 min-w-64"
              type="number"
              name="duration"
              placeholder="Duration (In Hours)"
              value={formData.duration}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
            />
            <input
              id="fee"
              className="w-full border-2 border-black rounded-md p-4 min-w-64"
              type="number"
              name="fee"
              min="0"
              placeholder="Registration Fee (min 0)"
              value={formData.fee}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
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
              Create Event
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

export default AdminCreateEvent;
