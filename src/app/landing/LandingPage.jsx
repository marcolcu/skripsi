"use client";
import React, { useEffect } from "react";
import BannerPage from "./BannerPage";
import CurrentFav from "./CurrentFav";

const LandingPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "1000px" }}>
      <BannerPage />
      <CurrentFav />
    </div>
  );
};

export default LandingPage;
