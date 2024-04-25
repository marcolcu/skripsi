"use client";

import { useAppContext } from "@/app/provider";
import {
  useEventRegisDetail,
  useGetTopEvent,
} from "@/services/useEventServices";
import { useEffect, useState } from "react";
import Card from "@/app/landing/section/Card";
import EventDetailSkeleton from "@/app/event/[slug]/EventDetailSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const OrderDetail = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const { postEventRegisDetail, eventRegisDetail, eventRegisDetailLoading } =
    useEventRegisDetail();
  const { fetchTopEvent, topEventfetch, topEventfetchLoading } =
    useGetTopEvent();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (state && state?.token) {
      postEventRegisDetail({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          registrationCode: slug,
        },
      });
    }
  }, [state, slug]);

  useEffect(() => {
    fetchTopEvent({
      queryParams: {
        maxEvent: 4,
      },
    });
  }, []);

  useEffect(() => {
    if (!eventRegisDetailLoading && !topEventfetchLoading) {
      setLoading(false);
    }
  }, [eventRegisDetailLoading, topEventfetchLoading]);

  useEffect(() => {
    if (!state?.token) {
      router.push("/login");
      toast.error("Please login first");
    }
  }, [state?.token, router]);

  var data = topEventfetch?.value;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  function formatStartTime(timestamp) {
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
              eventRegisDetail?.value?.event?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
            }
            alt={eventRegisDetail?.value?.event?.name}
            className="w-full h-[440px] object-cover object-center rounded-[2rem]"
          />
          {/* Judul */}
          <div className="">
            <p className="text-[2rem] mt-4">
              {eventRegisDetail?.value?.event?.name}
            </p>
          </div>
          <div className="flex justify-between my-5">
            {/* Left Side */}
            <div className="left">
              {/* Lokasi */}
              <table>
                <tbody>
                  <tr>
                    <td>Registration ID</td>
                    <td className="ps-5 font-bold">
                      {eventRegisDetail?.value?.registrationCode}
                    </td>
                  </tr>
                  <tr>
                    <td>Participant Name</td>
                    <td className="ps-5 font-bold">
                      {eventRegisDetail?.value?.user?.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td>Venue</td>
                    <td className="ps-5 font-bold">
                      {eventRegisDetail?.value?.event?.location}
                    </td>
                  </tr>
                  <tr>
                    <td>Event Date</td>
                    <td className="ps-5 font-bold">
                      {formatDate(eventRegisDetail?.value?.event?.dateHeld)}
                    </td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td className="ps-5 font-bold">
                      {formatStartTime(
                        eventRegisDetail?.value?.event?.dateHeld
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className="ps-5 font-bold capitalize">
                      {eventRegisDetail?.value?.status}
                    </td>
                  </tr>
                  {eventRegisDetail?.value?.cancellationReason !== null ?? (
                    <tr>
                      <td>Cancellation Reason</td>
                      <td className="ps-5 font-bold capitalize">
                        eventRegisDetail?.value?.cancellationReason
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Right Side */}
            <div className="right">
              {/* Status free */}
              <div
                className={`bg-${
                  eventRegisDetail?.value?.event?.free ? "green" : "red"
                }-200 p-1 px-5 text-center rounded-full`}
              >
                {eventRegisDetail?.value?.event?.free
                  ? "Free Event"
                  : "Paid Event"}
              </div>

              {/* Harga Event */}
              {!eventRegisDetail?.value?.event?.free && (
                <p className="py-3 text-right">
                  Rp.{" "}
                  {eventRegisDetail?.value?.event?.registrationFee.toLocaleString(
                    "en-US"
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h1 className="text-[2rem]">Description</h1>
            <hr />
            {eventRegisDetail?.value?.event?.description}
          </div>

          {/* Maybe you like */}
          <div className="pt-5">
            <h1 className="text-[2rem]">Maybe You Like</h1>
            <Card events={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
