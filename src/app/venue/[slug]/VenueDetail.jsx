"use client";
import { useAppContext } from "@/app/provider";
import { useGetTopEvent } from "@/services/useEventServices";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Card from "@/app/landing/section/Card";
import EventDetailSkeleton from "../../event/[slug]/EventDetailSkeleton";
import Confirmation from "./component/Confirmation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetVenueDetail,
  useVenueFiltered,
} from "@/services/useVenueServices";

const VenueDetailPage = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const [load, setLoad] = useState(false);
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reservedDate, setReservedDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [datetime, setDatetime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const {
    fetchVenueDetail,
    venueDetail,
    venueDetailLoading,
    venueDetailError,
  } = useGetVenueDetail();
  const {
    postVenueFiltered,
    venueFiltered,
    venueFilteredLoading,
    venueFilteredError,
  } = useVenueFiltered();
  const { fetchTopEvent, topEventfetch, topEventfetchLoading } =
    useGetTopEvent();
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const fetchData = () => {
      fetchVenueDetail({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          venueId: slug,
        },
      });
      setLoad(true);
    };

    if (state?.token) {
      fetchData();
    } else {
      timeoutId = setTimeout(fetchData, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, slug, load]);

  useEffect(() => {
    if (venueDetailError?.error?.error === 401) {
      toast.error("Please login first.");
      dispatch({
        token: null,
        user: null,
      });
      router.prefetch("/login");
      router.push("/login");
    }
  }, [venueDetailError]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");
    const timeParam = urlParams.get("time");
    const durationParam = urlParams.get("duration");

    if (dateParam && timeParam && durationParam) {
      setReservedDate(dateParam);
      setTime(timeParam);
      setDuration(durationParam);
    }
  }, []);

  useEffect(() => {
    if (reservedDate && time && duration) {
      filter();
    }
  }, [reservedDate, time, duration]);

  useEffect(() => {
    fetchTopEvent({
      queryParams: {
        maxEvent: 4,
      },
    });
  }, []);

  useEffect(() => {
    if (!venueDetailLoading && !topEventfetchLoading) {
      setLoading(false);
    }
  }, [venueDetailLoading, topEventfetchLoading]);

  var data = topEventfetch?.value;

  const filter = (e) => {
    const [hour, minute] = time.split(":").map((val) => parseInt(val));

    postVenueFiltered({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        venueId: slug,
      },
      body: {
        reservedDate: reservedDate,
        hour: hour,
        minute: minute,
        duration: duration,
      },
    });
  };

  const handleServiceSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        value,
      ]);
    } else {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((service) => service !== value)
      );
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const buyClick = () => {
    setIsBuyClicked(true);
    const formattedDate = formatDate(reservedDate);
    const combinedDatetime = `${formattedDate} ${time}`;
    setDatetime(combinedDatetime);
    dispatch({ venueId: slug });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 5; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = hour.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        times.push(`${hourString}:${minuteString}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="max-w-screen-xl mx-auto px-10">
      {loading ? (
        <EventDetailSkeleton />
      ) : (
        <>
          {/* Banner */}
          <img
            src={
              venueDetail?.value?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
            }
            alt={venueDetail?.value?.name}
            className="w-full h-[440px] object-cover object-center rounded-[2rem]"
          />
          {/* Judul */}
          <div className="">
            <p className="text-[2rem] mt-4">{venueDetail?.value?.name}</p>
          </div>
          {isBuyClicked ? (
            <Confirmation
              venue={venueDetail}
              datetime={datetime}
              selectedServices={selectedServices}
              duration={duration}
            />
          ) : (
            <>
              <div className="flex justify-between mt-5">
                {/* Left Side */}
                <div className="left">
                  {/* Lokasi */}
                  <div>
                    <FontAwesomeIcon icon={faLocationPin} />
                    &nbsp; {venueDetail?.value?.location}
                  </div>
                  {/* Tanggal, Waktu, Durasi venue */}
                  <div className="flex items-center space-x-2 mt-5">
                    <input
                      type="date"
                      className="border border-gray-300 bg-white rounded-md shadow-sm w-[200px] py-2 px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-opacity-50"
                      value={reservedDate}
                      onChange={(e) => setReservedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />

                    <select
                      className="border border-gray-300 bg-white rounded-md shadow-sm w-[200px] py-2 px-3 h-[2.7rem] text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-opacity-50"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      {timeOptions.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                          {timeOption}
                        </option>
                      ))}
                    </select>

                    <div className="relative">
                      <select
                        className="border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 h-[2.7rem] text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-opacity-50"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1} hour
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      id="btn-filter"
                      className="flex items-center justify-center bg-cyan-200 rounded-md shadow-sm w-[3rem] h-[2.7rem] focus:outline-none focus:ring-opacity-50"
                      onClick={filter}
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 4a6 6 0 100 12 6 6 0 000-12z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.5-4.5"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Add ons */}
                  <div className="my-5">
                    <h2 className="font-bold text-2xl">
                      Would you like to add additional services?
                    </h2>
                    <div>
                      <label className="block w-[200px]">
                        <input
                          type="checkbox"
                          value="catering"
                          checked={selectedServices.includes("catering")}
                          onChange={handleServiceSelection}
                        />
                        &nbsp;Catering
                      </label>
                      <label className="block w-[200px]">
                        <input
                          type="checkbox"
                          value="sound system"
                          checked={selectedServices.includes("sound system")}
                          onChange={handleServiceSelection}
                        />
                        &nbsp;Sound System
                      </label>
                    </div>
                  </div>
                </div>
                {/* Right Side */}
                <div className="right">
                  {/* Status free */}
                  <div
                    className={`${
                      venueFiltered?.value?.available
                        ? "bg-green-200"
                        : "bg-red-200"
                    } p-1 px-5 mb-4 text-center rounded-full`}
                  >
                    {venueFiltered?.value?.available
                      ? "Available"
                      : "Unavailable"}
                  </div>

                  {/* Button Book */}
                  <button
                    className={`${
                      venueFiltered?.value?.available
                        ? "bg-cyan-200"
                        : "bg-gray-200"
                    } rounded-2xl text-center w-[150px] h-[50px]`}
                    onClick={buyClick}
                    disabled={!venueFiltered?.value?.available}
                  >
                    {!venueFiltered?.value?.available
                      ? "Filter First"
                      : "Book"}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h1 className="text-[2rem]">Description</h1>
                <hr />
                {venueDetail?.value?.description}
              </div>

              {/* Maybe you like */}
              <div className="pt-5">
                <h1 className="text-[2rem]">Maybe You Like</h1>
                <Card events={data} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VenueDetailPage;
