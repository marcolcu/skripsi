"use client";
import React, { useEffect } from "react";
import "../AdminCSS/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const VenueCard = () => {
  const cardArray = Array.from({ length: 4 }, (_, index) => index);

  return (
    <main>
      {cardArray.map((index) => (
        <div key={index}>
          <div className="mb-3 p-4 base-color rounded-2xl flex flex-col gap-2">
            <p className="text-2xl">Venue Name</p>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHouse} />
              Main Hall, Gedung PT XYZ
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default VenueCard;
