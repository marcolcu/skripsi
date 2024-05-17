"use client";
import { useAppContext } from "@/app/provider";
import { useGetEventBooking } from "@/services/useEventServices";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const MyEvents = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { fetchEventBooking, eventBooking, eventBookingLoading } =
    useGetEventBooking();
  const data = eventBooking?.value;
  const skeletonRowCount = 5;
  const router = useRouter();

  useEffect(() => {
    if (state && state?.user?.email && state?.token) {
      fetchEventBooking({
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
    if (!eventBookingLoading) {
      setLoading(false);
    }
  }, [eventBookingLoading]);

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
      name: "event.name",
      label: "Name",
      title: "Name",
    },
    {
      name: "event.location",
      label: "Location",
      title: "Location",
    },
    {
      name: "event.description",
      label: "Description",
      title: "Description",
    },
    {
      name: "event.free",
      label: "Status",
      title: "Status",
      options: {
        customBodyRender: (value) => (
          <div
            className={`${
              value ? "bg-green-200" : "bg-red-200"
            } p-1 px-5 text-center rounded-full w-[150px]`}
          >
            {value ? "Free Event" : "Paid Event"}
          </div>
        ),
        setCellProps: () => ({ className: "text-center" }),
      },
    },
    {
      name: "event.registrationFee",
      label: "Fee",
      title: "Fee",
      options: {
        customBodyRender: (value) => (
          <p className="py-3 w-[100px]">Rp. {value?.toLocaleString("en-US")}</p>
        ),
      },
    },
    {
      name: "registrationCode",
      label: "Action",
      title: "Action",
      options: {
        customBodyRender: (value) => (
          <a
            href={`/orders/event/${value}`}
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
          <MUIDataTable
            title={"My Event List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default MyEvents;
