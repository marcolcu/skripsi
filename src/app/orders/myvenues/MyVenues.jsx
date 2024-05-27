"use client";
import { useAppContext } from "@/app/provider";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useVenueBookingList } from "@/services/useVenueServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyVenues = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { fetchVenueBookingList, venueBookingList, venueBookingListLoading } =
    useVenueBookingList();
  const data = venueBookingList?.value;
  const skeletonRowCount = 5;
  const router = useRouter();

  useEffect(() => {
    if (state && state?.user?.email && state?.token) {
      fetchVenueBookingList({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          userEmail: state?.user?.email,
        },
      });
    }
  }, [state]);

  useEffect(() => {
    if (!venueBookingListLoading) {
      setLoading(false);
    }
  }, [venueBookingListLoading]);

  const columns = [
    {
      name: "id",
      label: "No",
      title: "No",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
        setCellProps: () => ({ className: "text-center" }),
      },
    },
    {
      name: "venue.name",
      label: "Name",
      title: "Name",
    },
    {
      name: "venue.location",
      label: "Location",
      title: "Location",
    },
    {
      name: "venue.description",
      label: "Description",
      title: "Description",
    },
    {
      name: "status",
      label: "Status",
      title: "Status",
      options: {
        customBodyRender: (value) => (
          <div
            className={`${
              value === "confirmed" ? "bg-green-200" : "bg-red-200"
            } p-1 px-5 text-center rounded-full w-[150px]`}
          >
            <span className="capitalize">{value}</span>
          </div>
        ),
        setCellProps: () => ({ className: "text-center" }),
      },
    },
    {
      name: "reservationCode",
      label: "Action",
      title: "Action",
      options: {
        customBodyRender: (value) => (
          <a
            href={`/orders/venue/${value}`}
            className="inline-block bg-cyan-200 hover:bg-cyan-300 text-gray-800 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Open
          </a>
        ),
        setCellProps: () => ({ className: "text-center" }),
      },
    },
  ];

  const options = {
    selectableRows: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    print: false,
    download: false,
    enableNestedDataAccess: ".",
  };

  const sortedData = data
    ?.slice()
    .sort((a, b) => a.venue.createdDate - b.venue.createdDate);

  return (
    <div className="text-center flex items-center justify-center">
      {loading ? (
        // Skeleton loading
        <div className="text-center">
          <table className=" divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-300 h-6 w-[11rem] animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-10/12">
          <MUIDataTable data={sortedData} columns={columns} options={options} />
        </div>
      )}
    </div>
  );
};

export default MyVenues;
