"use client";
import React, { useEffect, useState } from "react";
import BannerPage from "./section/BannerPage";
import CurrentFav from "./section/CurrentFav";
import SkeletonLoading from "./section/SkeletonLoading";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a delay to showcase the loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "1000px" }}>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <BannerPage />
          <CurrentFav />
        </>
      )}
    </div>
  );
};

export default LandingPage;
