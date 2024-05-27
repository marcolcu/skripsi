"use client";
import { useAppContext } from "@/app/provider";
import {
  useEventPayment,
  useEventRegistration,
} from "@/services/useEventServices";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Confirmation = ({ event, onError }) => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [isEventPaymentAvailable, setIsEventPaymentAvailable] = useState(false);
  const { postEventPayment, eventPayment, eventPaymentLoading } =
    useEventPayment();
  const { postEventRegistration, eventRegistration, eventRegistrationLoading } =
    useEventRegistration();

  useEffect(() => {
    if (
      eventRegistration?.success &&
      eventRegistration?.value?.event?.free === false
    ) {
      postEventPayment({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          userEmail: state?.user?.email,
          eventId: state?.eventId,
        },
      });
    } else if (eventRegistration?.success) {
      dispatch({
        registrationCode: eventRegistration?.value?.registrationCode,
      });
      router.prefetch(
        "/orders/event/" + eventRegistration?.value?.registrationCode
      );
      router.push(
        "/orders/event/" + eventRegistration?.value?.registrationCode
      );
    }
  }, [eventRegistration?.success]);

  useEffect(() => {
    if (eventRegistration?.success && eventPayment) {
      dispatch({
        registrationCode: eventRegistration?.value?.registrationCode,
      });
      if (eventRegistration?.value?.event?.free === true) {
        router.prefetch(
          "/orders/event/" + eventRegistration?.value?.registrationCode
        );
        router.push(
          "/orders/event/" + eventRegistration?.value?.registrationCode
        );
      } else {
        router.prefetch(eventPayment?.value?.redirectUrl);
        router.push(eventPayment?.value?.redirectUrl);
      }
    } else if (eventRegistration?.success === false) {
      onError(eventRegistration?.errorMessage || "Registration failed.");
    }
  }, [eventRegistration, eventPayment]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const payment = () => {
    postEventRegistration({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      body: {
        userEmail: state?.user?.email,
        eventId: state?.eventId,
      },
    });
  };

  function formatStartTime(timestamp) {
    const startTime = new Date(timestamp);

    const hours = startTime.getHours().toString().padStart(2, "0");
    const minutes = startTime.getMinutes().toString().padStart(2, "0");

    const startTimeString = `${hours}:${minutes}`;

    return startTimeString;
  }

  var data = event?.value;

  return (
    <main>
      <h1 className="font-bold text-xl my-9">Confirmation Page</h1>
      {/* Table */}
      <table className="table-auto">
        <tbody>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Nama Peserta</th>
            <td className="px-4 py-2">{state?.user?.firstName}</td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Tanggal Acara</th>
            <td className="px-4 py-2">{formatDate(data?.dateHeld)}</td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Waktu Mulai</th>
            <td className="px-4 py-2">{formatStartTime(data?.dateHeld)}</td>
          </tr>
          <tr>
            <th className="pl-0 px-4 py-2 text-left">Tempat</th>
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
        {eventRegistrationLoading ? "Loading..." : "Confirm Registration"}
      </button>
    </main>
  );
};

export default Confirmation;
