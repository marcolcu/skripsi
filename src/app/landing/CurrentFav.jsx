"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const CurrentFav = () => {
  return (
    <main>
      <div className="font-bold flex items-center mt-7">
        <FontAwesomeIcon icon={faStar} size="2x" />
        <span className="px-2 text-4xl font-extrabold"> Current Fav</span>
      </div>
    </main>
  );
};

export default CurrentFav;
