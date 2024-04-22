"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import CardVenue from "./CardVenue";

const VenueBooking = (event) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const data = event?.event;

  useEffect(() => {
    if (data !== null) {
      setDataLoaded(true);
    }
  }, [data]);

  return (
    <main>
      <div className="bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {dataLoaded && <FontAwesomeIcon icon={faTicket} />}
            &nbsp;Venue Booking
          </h2>
          <a href="#">Let's go &rarr;</a>
        </div>
        {dataLoaded ? (
          data ? (
            <CardVenue events={data} />
          ) : (
            <div className="w-full h-[100px] flex items-center justify-center">
              <p>There is no product</p>
            </div>
          )
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </main>
  );
};

export default VenueBooking;
