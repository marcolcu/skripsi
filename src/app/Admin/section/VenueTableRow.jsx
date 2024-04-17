"use client";
import React, { useEffect } from "react";
import "../AdminCSS/Admin.css";

const VenueTableRow = () => {
  const cardArray = Array.from({ length: 3 }, (_, index) => index + 1);

  return (
    <>
      {cardArray.map((index) => (
        <tr>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div class="inline-flex items-center gap-x-3">
              <span>{index}</span>
            </div>
          </td>
          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            Venue
          </td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <h2 class="text-sm font-normal">somewhere</h2>
          </td>
          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            1/10
          </td>
          <td class="px-4 py-4 text-sm whitespace-nowrap">
            <div class="flex items-center justify-between gap-x-6">
              <button>
                <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                  <h2 class="text-sm font-normal">Disable Venue</h2>
                </div>
              </button>

              <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                Booking List
              </button>

              <button class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                Edit
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default VenueTableRow;
