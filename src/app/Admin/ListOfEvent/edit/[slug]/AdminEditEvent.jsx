"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../provider";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useEditEvent,
  useGetEventDetailAdmin,
} from "../../../../../services/useAdminEventServices";
import "../../../AdminCSS/Admin.css";

const AdminEditEvent = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [eventImageUrl, setEventImageUrl] = useState(null);
  const [tempImageUrl, setTempImageUrl] = useState(null);

  const { postEditEvent, editEvent } = useEditEvent();

  const [initialFormData, setInitialFormData] = useState({
    eventname: "",
    capacity: "",
    description: "",
    duration: "",
    fee: "",
    location: "",
    image: null,
    date: "",
    hour: "00",
    minute: "00",
  });

  const { fetchEventDetailAdmin, eventDetailAdmin } = useGetEventDetailAdmin();

  const eventName = eventDetailAdmin?.value?.name;
  const eventDescription = eventDetailAdmin?.value?.description;
  const eventCapacity = eventDetailAdmin?.value?.maxCapacity;
  // const eventDateHeld = eventDetailAdmin?.value?.dateHeld;
  const eventDuration = eventDetailAdmin?.value?.duration;
  const eventFee = eventDetailAdmin?.value?.registrationFee;
  const eventLocation = eventDetailAdmin?.value?.location;

  useEffect(() => {
    if (state && state.token) {
      setLoading(true);
      fetchEventDetailAdmin({
        header: {
          Authorization: "Bearer " + state.token,
        },
        queryParams: {
          eventId: slug,
        },
      })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error fetching event details: ", error);
          setLoading(false);
        });
    }
  }, [state]);

  useEffect(() => {
    // Initialize initialFormData here
    setInitialFormData({
      eventname: eventName || "",
      capacity: eventCapacity || "",
      description: eventDescription || "",
      duration: eventDuration || "",
      fee: eventFee || "",
      location: eventLocation || "",
      image: eventImageUrl || null,
    });
  }, [eventDetailAdmin, eventImageUrl]);

  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (eventDetailAdmin && eventDetailAdmin.value) {
      const {
        name,
        maxCapacity,
        description,
        duration,
        registrationFee,
        location,
        imageUrl,
        dateHeld,
      } = eventDetailAdmin.value;

      const eventDate = new Date(Number(dateHeld));

      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, "0");
      const day = String(eventDate.getDate()).padStart(2, "0");
      const hour = String(eventDate.getHours()).padStart(2, "0");
      const minute = String(eventDate.getMinutes()).padStart(2, "0");

      setFormData({
        eventname: name || "",
        capacity: maxCapacity || "",
        description: description || "",
        duration: duration || "",
        fee: registrationFee || "",
        location: location || "",
        image: imageUrl || null,
        date: `${year}-${month}-${day}`, // Format: YYYY-MM-DD
        hour: hour,
        minute: minute,
      });
      setTempImageUrl(imageUrl);
    }
  }, [eventDetailAdmin]);

  const handleEditEvent = async (e) => {
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
      const imageUrlToSend = image ? image : tempImageUrl;

      await postEditEvent({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          eventId: slug,
        },
        body: {
          name: formData.eventname,
          description: formData.description,
          location: formData.location,
          dateHeld: formattedDate,
          maxCapacity: formData.capacity,
          registrationFee: formData.fee,
          duration: formData.duration,
          imageUrl: imageUrlToSend,
        },
      });
      // console.log(formattedDate); //debug submitted date including hour and minutes
      // console.log(imageUrlToSend); //debug to see which imageUrl is sent
      // setFormData(initialFormData);
      // setImage(null);
      setLoading(false);
    } catch (error) {
      toast.error("Error creating event");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (editEvent && editEvent.errorMessage === null) {
      toast.success("Event edited successfully");
    } else if (editEvent && editEvent.errorMessage) {
      toast.error(editEvent.errorMessage);
    }
  }, [editEvent]);

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: response.data, // Update image URL in the form data
      }));

      // Update eventImageUrl state with the uploaded image URL
      setEventImageUrl(response.data);
      // Update the image URL in initialFormData
      setInitialFormData((prevInitialFormData) => ({
        ...prevInitialFormData,
        image: response.data,
      }));
      setLoading(false);
      toast.success("Successfully uploaded");
      // console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      toast.error("Error uploading image");
    }
  };

  //debug to see what's inside formData
  // console.log(formData);

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
        onSubmit={handleEditEvent}
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
              Edit Event
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
            ) : eventDetailAdmin?.value?.imageUrl !== null &&
              eventDetailAdmin?.value?.imageUrl !== undefined ? (
              <img
                className="border border-black"
                src={eventDetailAdmin?.value?.imageUrl} // Use eventImageUrl here
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

export default AdminEditEvent;
