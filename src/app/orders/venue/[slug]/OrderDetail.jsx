"use client";

import { useAppContext } from "@/app/provider";
import { useEffect, useState } from "react";
import EventDetailSkeleton from "@/app/event/[slug]/EventDetailSkeleton";
import { useVenueBookingDetail } from "@/services/useVenueServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const OrderDetail = ({ slug }) => {
  const { state, dispatch } = useAppContext();
  const {
    fetchVenueBookingDetail,
    venueBookingDetail,
    venueBookingDetailLoading,
    venueBookingDetailError,
  } = useVenueBookingDetail();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (state && state?.token) {
      fetchVenueBookingDetail({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          bookingCode: slug,
        },
      });
    }
  }, [state, slug]);

  useEffect(() => {
    if (!venueBookingDetailLoading && venueBookingDetail) {
      setLoading(false);
    }
  }, [venueBookingDetailLoading, venueBookingDetail]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const padStartTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const paddedMinute = String(minute).padStart(2, "0");
    return `${hour}:${paddedMinute}`;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-10">
      {loading ? (
        <EventDetailSkeleton />
      ) : (
        <>
          {/* Banner */}
          <img
            src={
              venueBookingDetail?.value?.venue?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLff5M2CCoLu58Ybuz4BjyfYqTe3Ffv6Mng&usqp=CAU"
            }
            alt={venueBookingDetail?.value?.venue?.name}
            className="w-full h-[440px] object-cover object-center rounded-[2rem]"
          />
          {/* Judul */}
          <div className="">
            <p className="text-[2rem] mt-4">
              {venueBookingDetail?.value?.venue?.name}
            </p>
          </div>
          <div className="flex justify-between my-5">
            {/* Left Side */}
            <div className="left">
              {/* Table */}
              <table className="table-auto">
                <tbody>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">
                      Reservation Code
                    </th>
                    <td className="px-4 py-2">
                      {venueBookingDetail?.value?.reservationCode}
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">Participant Name</th>
                    <td className="px-4 py-2">{state?.user?.firstName}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">
                      Booking Date & Time
                    </th>
                    <td className="px-4 py-2">
                      {formatDate(venueBookingDetail?.value?.reservedDate)}{" "}
                      {padStartTime(venueBookingDetail?.value?.startTime)}
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">Add on</th>
                    <td className="px-4 py-2">
                      {venueBookingDetail?.value?.addOns.length > 0 ? (
                        venueBookingDetail?.value?.addOns.map(
                          (service, index) => (
                            <span key={index} className="capitalize">
                              {service}
                              {index <
                                venueBookingDetail?.value?.addOns.length - 1 &&
                                ", "}
                            </span>
                          )
                        )
                      ) : (
                        <span>No add-ons selected</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">Location</th>
                    <td className="px-4 py-2">
                      {venueBookingDetail?.value?.venue?.location}
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 px-4 py-2 text-left">Status</th>
                    <td className="px-4 py-2 capitalize">
                      {venueBookingDetail?.value?.status}
                    </td>
                  </tr>
                  {venueBookingDetail?.value?.cancellationReason !== null && (
                    <tr>
                      <th className="pl-0 px-4 py-2 text-left">
                        Cancellation Reason
                      </th>
                      <td className="px-4 py-2 capitalize">
                        {venueBookingDetail?.value?.cancellationReason}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Right Side */}
            <div className="right"></div>
          </div>

          {/* Description */}
          <div>
            <h1 className="text-[2rem]">Description</h1>
            <hr />
            {venueBookingDetail?.value?.venue?.description}
          </div>

          {/* Maybe you like */}
          <div className="pt-5">
            <h1 className="text-[2rem]">Maybe You Like</h1>
            {/* <Card events={data} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
