"use client";
import React, { useEffect, useState } from "react";
import BannerPage from "./section/BannerPage";
import CurrentFav from "./section/CurrentFav";
import SkeletonLoading from "./section/SkeletonLoading";
import { useGetEvent } from "@/services/useEventServices";
import { useAppContext } from "../provider";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { fetchEvent, event, eventLoading } = useGetEvent();
  const [loading, setLoading] = useState(true);
  var events = event?.value;
  const { state, dispatch } = useAppContext();
  const router = useRouter();

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
        </>
      )}
    </div>
  );
};

export default LandingPage;
