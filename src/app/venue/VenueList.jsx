"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../provider";
import { useRouter } from "next/navigation";
import { useGetVenue, useVenueAllFiltered } from "@/services/useVenueServices";
import VenueListSkeleton from "./VenueListSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VenueList = () => {
  const { fetchVenue, venue, venueLoading } = useGetVenue();
  const {
    postVenueAllFiltered,
    venueAllFiltered,
    venueAllFilteredLoading,
    venueAllFilteredError,
  } = useVenueAllFiltered();
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState();
  const { state, dispatch } = useAppContext();
  const [visibleVenues, setVisibleVenues] = useState(3);
  const [reservedDate, setReservedDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [datetime, setDatetime] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state?.user?.userRole === "ROLE_ADMIN") {
      router.push("/Admin/home");
    }
  });

  useEffect(() => {
    fetchVenue({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    if (!venueLoading && venue) {
      setLoading(false);
    }
  }, [venueLoading, venue]);

  useEffect(() => {
    if (venue) {
      setVenues(venue?.value);
    }
  }, [venue]);

  useEffect(() => {
    if (!venueAllFilteredLoading && venueAllFiltered) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [venueAllFilteredLoading, venueAllFiltered]);

  useEffect(() => {
    if (venueAllFiltered) {
      setVenues(venueAllFiltered?.value);
    } else {
      toast.error(venueAllFiltered?.errorMessage);
    }
  }, [venueAllFiltered]);

  const handleLoadMore = () => {
    setVisibleVenues((prevVisibleVenues) => prevVisibleVenues + 3);
  };

  const handleRouting = (date, time, duration, id) => {
    if (date && time && duration) {
      router.prefetch(
        "/venue/" +
          id +
          "?date=" +
          date +
          "&time=" +
          time +
          "&duration=" +
          duration
      );
      router.push(
        "/venue/" +
          id +
          "?date=" +
          date +
          "&time=" +
          time +
          "&duration=" +
          duration
      );
    } else {
      router.prefetch("/venue/" + id);
      router.push("/venue/" + id);
    }
  };

  const filter = (e) => {
    const [hour, minute] = time.split(":").map((val) => parseInt(val));
    if (reservedDate && time && duration) {
      postVenueAllFiltered({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          reservedDate: reservedDate,
          hour: hour,
          minute: minute,
          duration: duration,
        },
      });
    } else {
      toast.error("Please enter all the filter");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      {loading ? (
        <VenueListSkeleton />
      ) : (
        <>
          <div className="my-4 flex justify-center">
            <div className="flex items-center space-x-2 mt-5">
              <input
                type="date"
                className="border border-gray-300 bg-white rounded-md shadow-sm w-[200px] py-2 px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-opacity-50"
                value={reservedDate}
                onChange={(e) => setReservedDate(e.target.value)}
              />

              <input
                type="time"
                className="border border-gray-300 bg-white rounded-md shadow-sm w-[200px] py-2 px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-opacity-50"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

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
          </div>

          {venues.slice(0, visibleVenues).map((venue, index) => (
            <a
              href="#"
              key={index}
              onClick={() =>
                handleRouting(reservedDate, time, duration, venue?.id)
              }
            >
              <div className="relative mb-5">
                <img
                  src={
                    venue.imageUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
                  }
                  alt={venue.name}
                  className={`w-full h-[440px] object-cover object-center rounded-[2rem] ${
                    venue?.imageUrl ? "bg-gradient-to-t from-black" : ""
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 ">
                  <div
                    className={`p-6 ${
                      venue?.imageUrl ? "text-white" : "text-black"
                    }`}
                  >
                    <p className="font-bold text-4xl ">{venue.name}</p>
                    <p className="font-medium text-md ">{venue.location}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {visibleVenues < venues.length && (
            <div className="w-full flex justify-center">
              <button
                onClick={handleLoadMore}
                className="bg-cyan-200 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full mt-4"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VenueList;
