"use client";
import React, { useEffect, useState } from "react";
import "../AdminCSS/Admin.css";
import {
  useGetVenueAdmin,
  useDisableVenue,
} from "@/services/useAdminVenueServices";
import { useAppContext } from "@/app/provider";
import MUIDataTable from "mui-datatables";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ListOfVenue = () => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { fetchVenueAdmin, venueAdmin } = useGetVenueAdmin();
  var data = venueAdmin?.value;

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [venueIdToDisable, setVenueIdToDisable] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const { postDisableVenue } = useDisableVenue();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state && state?.token) {
      fetchVenueAdmin({
        header: {
          Authorization: "Bearer " + state?.token,
        },
      });
    }
  }, [state]);

  const handleDisableConfirmation = (venueId) => {
    setConfirmationOpen(true);
    // console.log(venueId)
    setVenueIdToDisable(venueId);
  };

  const handleDisableVenue = (venueId) => {
    postDisableVenue({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        venueId: venueId,
      },
    });

    console.log(venueId);

    setConfirmationOpen(false);
    setOpenAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const columns = [
    {
      name: "id",
      label: "No",
      title: "No",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
      title: "Name",
    },
    {
      name: "location",
      label: "Location",
      title: "Location",
    },
    {
      name: "totalBookings",
      label: "Total Bookings",
      title: "Total Bookings",
    },
    {
      name: "disabled",
      label: " ",
      title: "Status",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value === true) {
            return (
              <button className="pointer-events-none w-36">
                <a className="pointer-events-none bg-green-200 text-green-600 p-1 px-5 text-center rounded-full w-[150px] ">
                  Venue Disabled
                </a>
              </button>
            );
          } else {
            // If event is not closed, enable the button
            return (
              <button
                onClick={() => handleDisableConfirmation(tableMeta.rowData[0])}
                className="w-36"
              >
                <a className="bg-red-200 text-red-600 p-1 px-5 text-center rounded-full w-[150px]">
                  Disable Venue
                </a>
              </button>
            );
          }
        },
      },
    },
    {
      name: "id",
      label: " ",
      title: " ",
      options: {
        customHeadRender: () => null,
        customBodyRender: (value) => (
          <button className="btn">
            <a href={`/Admin/ListOfVenue/${value}`}>Booking List</a>
          </button>
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      title: "Action",
      options: {
        customHeadRender: () => null,
        customBodyRender: (value) => (
          <button>
            <a
              className="text-blue-600"
              href={`/Admin/ListOfVenue/edit/${value}`}
            >
              Edit
            </a>
          </button>
        ),
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
      <div className="w-10/12">
        <MUIDataTable
          title={"All Venue List"}
          data={data}
          columns={columns}
          options={options}
        />
        {confirmationOpen && (
          <div className="confirmation-popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-8">
              <p className="mb-4">
                Are you sure you want to disable this venue?
              </p>
              <button
                onClick={() => handleDisableVenue(venueIdToDisable)}
                className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmationOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        )}
        <Box className="fixed top-0 left-0 w-full">
          <Collapse in={openAlert}>
            <Alert
              severity="success"
              className="flex items-center text-lg py-4 z-50"
              action={
                <IconButton
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              Successfully disabled the venue (the page will automatically
              reload in 3 seconds)
            </Alert>
          </Collapse>
        </Box>
      </div>
    </div>
  );
};

export default ListOfVenue;
