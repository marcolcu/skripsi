"use client";
import React, { useEffect } from "react";
import "../AdminCSS/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useGetEventAdmin } from "@/services/useAdminEventServices";

const EventCard = () => {
  const { fetchEventAdmin, eventAdmin } = useGetEventAdmin();
  useEffect(() => {
    fetchEventAdmin({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const hasEventWithParticipants =
    eventAdmin &&
    eventAdmin.value &&
    eventAdmin.value.some((event) => event.totalParticipant >= 1);

  return (
    <main>
      {eventAdmin && eventAdmin.value && eventAdmin.value.length > 0 ? (
        eventAdmin.value.map(
          (event) =>
            event.totalParticipant >= 1 && (
              <div key={event.id}>
                <div className="mb-3 p-4 base-color rounded-2xl flex flex-col gap-2">
                  <p className="text-2xl">{event.name}</p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} />
                    {new Date(event.dateHeld).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHouse} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPerson} className="w-4" />
                    {event.totalParticipant} Person
                  </div>
                </div>
              </div>
            )
        )
      ) : hasEventWithParticipants ? null : (
        <div className="mb-3 p-4 base-color rounded-2xl flex flex-col gap-2">
          <p className="text-2xl">No Registrations</p>
        </div>
      )}
    </main>
  );
};

export default EventCard;
