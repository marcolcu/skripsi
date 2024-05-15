"use client";
import React, { useEffect } from "react";
import "../AdminCSS/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useGetVenueAdmin } from "@/services/useAdminVenueServices";
import { useAppContext } from "@/app/provider";

const VenueCard = () => {
  const { state, dispatch } = useAppContext();
  const { fetchVenueAdmin, venueAdmin } = useGetVenueAdmin();
  useEffect(() => {
    if (state && state?.token) {
      fetchVenueAdmin({
        header: {
          Authorization: "Bearer " + state?.token,
        },
      });
    }
  }, [state]);

  const hasVenueWithBookings =
    venueAdmin &&
    venueAdmin.value &&
    venueAdmin.value.some((venue) => venue.totalBookings >= 1);

  return (
    <main>
      {venueAdmin && venueAdmin.value && venueAdmin.value.length > 0 ? (
        venueAdmin.value.map(
          (venue) =>
            venue.totalBookings >= 1 && (
              <div key={venue.id}>
                <div className="mb-3 p-4 base-color rounded-2xl flex flex-col gap-2">
                  <p className="text-2xl">{venue.name}</p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHouse} />
                    {venue.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPerson} className="w-4" />
                    {venue.totalBookings} Person
                  </div>
                </div>
              </div>
            )
        )
      ) : hasVenueWithBookings ? null : (
        <div className="mb-3 p-4 base-color rounded-2xl flex flex-col gap-2">
          <p className="text-2xl">No Bookings</p>
        </div>
      )}
    </main>
  );
};

export default VenueCard;
