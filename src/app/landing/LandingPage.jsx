"use client";
import React, { useEffect, useState } from "react";
import BannerPage from "./section/BannerPage";
import CurrentFav from "./section/CurrentFav";
import SkeletonLoading from "./section/SkeletonLoading";
import { useGetEvent } from "@/services/useEventServices";
import { useAppContext } from "../provider";
import { useRouter } from "next/navigation";
import UpcomingEvent from "./section/UpcomingEvent";
import { useGetVenue } from "@/services/useVenueServices";
import dynamic from 'next/dynamic';

// Dynamic import for VenueBooking
const VenueBooking = dynamic(() => import("./section/VenueBooking"), {
  loading: () => <p>Loading...</p>
});

const LandingPage = () => {
  const { fetchEvent, event, eventLoading } = useGetEvent();
  const { fetchVenue, venue, venueLoading } = useGetVenue();
  const [loading, setLoading] = useState(true);
  var events = event?.value;
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  var venues = venue?.value;

  useEffect(() => {
    if (state?.user?.userRole === "ROLE_ADMIN") {
      router.push("/Admin/home")
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
    fetchVenue({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    if (!eventLoading) {
      setLoading(false);
    }
  }, [eventLoading]);

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <BannerPage />
          <CurrentFav event={events} />
          <UpcomingEvent event={events} />
          <VenueBooking event={venues} />
        </>
      )}
    </div>
  );
};

export default LandingPage;
