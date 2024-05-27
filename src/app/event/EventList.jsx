"use client";
import React, { useEffect, useState } from "react";
import { useGetEvent } from "@/services/useEventServices";
import { useAppContext } from "../provider";
import { useRouter } from "next/navigation";
import EventListSkeleton from "./EventListSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const EventList = () => {
  const { fetchEvent, event, eventLoading } = useGetEvent();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState();
  const { state, dispatch } = useAppContext();
  const [visibleEvents, setVisibleEvents] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (state?.user?.userRole === "ROLE_ADMIN") {
      router.push("/Admin/home");
    }
  });

  useEffect(() => {
    fetchEvent({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    if (!eventLoading && event) {
      setLoading(false);
    }
  }, [eventLoading, event]);

  useEffect(() => {
    if (event) {
      setEvents(event?.value);
    }
  }, [event]);

  const handleLoadMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 3);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      {loading ? (
        <EventListSkeleton />
      ) : events === null ? (
        <div className="text-center">No Data</div>
      ) : (
        <>
          {events.slice(0, visibleEvents).map((event, index) => (
            <Link href={`/event/${event?.id}`} key={index} prefetch>
              <div className="relative mb-5">
                <div className="relative">
                  <img
                    src={
                      event.imageUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
                    }
                    alt={event.name}
                    className="w-full h-[440px] object-cover object-center rounded-[2rem]"
                  />
                  <div
                    className={`${
                      event?.imageUrl !== null
                        ? "absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-[2rem]"
                        : ""
                    }`}
                  ></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 ">
                  <div
                    className={`p-6 ${
                      event?.imageUrl ? "text-white" : "text-black"
                    }`}
                  >
                    <p className="font-bold text-4xl ">{event.name}</p>
                    <p className="font-medium text-md ">{event.location}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {visibleEvents < events.length && (
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

export default EventList;
