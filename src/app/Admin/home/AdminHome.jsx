"use client";
import React, { useEffect, useState } from "react";
import "../AdminCSS/Admin.css";
import EventCard from "../section/EventCard";
import VenueCard from "../section/VenueCard";


const AdminHome = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "1000px" }}>
      <>
        <div className="grid-container-AdminHome">
          <div>
            <p className="text-3xl mb-5">Event with Registered Users</p>
            <div className="border-4 h-max rounded-md p-4">
              <div>
                <EventCard />
              </div>
            </div>
          </div>
          <div>
            <p className="text-3xl mb-5">Booked Venue</p>
            <div className="border-4 h-max rounded-md p-4">
              <div>
                <VenueCard />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminHome;
