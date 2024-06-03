"use client";
import { useAppContext } from "@/app/provider";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVenueBooking } from "@/services/useVenueServices";

const Confirmation = ({ venue, datetime, selectedServices, duration }) => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { postVenueBooking, venueBooking, venueBookingLoading } =
    useVenueBooking();
  const durationNumber = parseInt(duration);

  useEffect(() => {
    if (venueBooking?.success) {
      router.prefetch("/orders/venue/" + venueBooking?.value?.reservationCode);
      router.push("/orders/venue/" + venueBooking?.value?.reservationCode);
    } else {
      toast.error(venueBooking?.errorMessage);
    }
  }, [venueBooking, router]);

  const splitDatetime = () => {
    const [date, time] = datetime.split(" ");
    const [day, month, year] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const paddedDay = String(day).padStart(2, "0");
    const paddedMonth = String(month).padStart(2, "0");
    const paddedMinute = String(minute).padStart(2, "0");

    return {
      reservedDate: `${year}-${paddedMonth}-${paddedDay}`,
      hour,
      minute: paddedMinute,
    };
  };

  const { reservedDate, hour, minute } = splitDatetime();

  const payment = () => {
    postVenueBooking({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      body: {
        userEmail: state?.user?.email,
        venueId: state?.venueId,
        reservedDate: reservedDate,
        hour: hour,
        minute: minute,
        duration: durationNumber,
        addOns: selectedServices,
      },
    });
  };

  var data = venue?.value;

  return (
    <main>
      <h1 className="font-bold text-xl my-9">Confirmation Page</h1>
      {/* Table */}
      <table className="table-auto">
        <tbody>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Booked By</th>
            <td className="px-4 py-2">{state?.user?.firstName}</td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Date</th>
            <td className="px-4 py-2">{datetime}</td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Add ons</th>
            <td className="px-4 py-2">
              {selectedServices.length > 0 ? (
                selectedServices.map((service, index) => (
                  <span key={index} className="capitalize">
                    {service}
                    {index < selectedServices.length - 1 && ", "}
                  </span>
                ))
              ) : (
                <span>No add-ons selected</span>
              )}
            </td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Location</th>
            <td className="px-4 py-2">{data?.location}</td>
          </tr>
        </tbody>
      </table>

      {/* Description */}
      <div className="my-5">
        <h1 className="text-[2rem]">Description</h1>
        <hr />
        {data?.description}
      </div>

      {/* Button Checkout */}
      <button
        className="w-full bg-cyan-200 mb-5 p-3 rounded-lg"
        onClick={payment}
      >
        {venueBookingLoading ? "Loading..." : "Confirm Booking"}
      </button>
    </main>
  );
};

export default Confirmation;
