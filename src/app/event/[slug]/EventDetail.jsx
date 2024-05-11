"use client";
import { useAppContext } from "@/app/provider";
import {
  useEventRegistration,
  useGetEventDetail,
  useGetTopEvent,
} from "@/services/useEventServices";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Card from "@/app/landing/section/Card";
import EventDetailSkeleton from "./EventDetailSkeleton";
import Confirmation from "./component/Confirmation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetailPage = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const [load, setLoad] = useState(false);
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    fetchEventDetail,
    eventDetail,
    eventDetailLoading,
    eventDetailStatus,
    eventDetailMessage,
    eventDetailError,
  } = useGetEventDetail();
  const { fetchTopEvent, topEventfetch, topEventfetchLoading } =
    useGetTopEvent();
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const fetchData = () => {
      fetchEventDetail({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          eventId: slug,
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
    if (eventDetailError?.error?.error === 401) {
      toast.error("Please login first.");
      dispatch({
        token: null,
        user: null,
      });
      router.prefetch("/login");
      router.push("/login");
    }
  }, [eventDetailError]);

  useEffect(() => {
    fetchTopEvent({
      queryParams: {
        maxEvent: 4,
      },
    });
  }, []);

  useEffect(() => {
    if (!eventDetailLoading && !topEventfetchLoading) {
      setLoading(false);
    }
  }, [eventDetailLoading, topEventfetchLoading]);

  var data = topEventfetch?.value;

  const buyClick = () => {
    setIsBuyClicked(true);
    dispatch({ eventId: slug });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatStartTime = (timestamp) => {
    const startTime = new Date(timestamp);

    const hours = startTime.getHours().toString().padStart(2, "0");
    const minutes = startTime.getMinutes().toString().padStart(2, "0");

    const startTimeString = `${hours}:${minutes}`;

    return startTimeString;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-10">
      {loading ? (
        <EventDetailSkeleton />
      ) : (
        <>
          {/* Banner */}
          <img
            src={
              eventDetail?.value?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
            }
            alt={eventDetail?.value?.name}
            className="w-full h-[440px] object-cover object-center rounded-[2rem]"
          />
          {/* Judul */}
          <div className="">
            <p className="text-[2rem] mt-4">{eventDetail?.value?.name}</p>
          </div>
          {isBuyClicked ? (
            <Confirmation event={eventDetail} />
          ) : (
            <>
              <div className="flex justify-between mt-5">
                {/* Left Side */}
                <div className="left">
                  {/* Lokasi */}
                  <div>
                    <FontAwesomeIcon icon={faLocationPin} />
                    &nbsp; {eventDetail?.value?.location}
                  </div>
                  {/* Tanggal event */}
                  <div>
                    <FontAwesomeIcon icon={faCalendar} />
                    &nbsp; {formatDate(eventDetail?.value?.dateHeld)}
                    &nbsp;T&nbsp;{formatStartTime(eventDetail?.value?.dateHeld)}
                  </div>
                </div>
                {/* Right Side */}
                <div className="right">
                  {/* Status free */}
                  <div
                    className={`${
                      eventDetail?.value?.free ? "bg-green-200" : "bg-red-200"
                    } p-1 px-5 text-center rounded-full mb-3`}
                  >
                    {eventDetail?.value?.free ? "Free Event" : "Paid Event"}
                  </div>

                  {/* Harga Event */}
                  {!eventDetail?.value?.free && (
                    <p className="py-3 text-right">
                      Rp.{" "}
                      {eventDetail?.value?.registrationFee.toLocaleString(
                        "en-US"
                      )}
                    </p>
                  )}

                  {/* Button Buy */}
                  <button
                    className="bg-cyan-200 rounded-2xl text-center w-[150px] h-[50px]"
                    onClick={buyClick}
                  >
                    Buy
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h1 className="text-[2rem]">Description</h1>
                <hr />
                {eventDetail?.value?.description}
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

export default EventDetailPage;
