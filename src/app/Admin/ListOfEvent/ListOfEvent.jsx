"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";
import "../AdminCSS/Admin.css";
import {
  useGetEventAdmin,
  useDisableEvent,
} from "@/services/useAdminEventServices";
import MUIDataTable from "mui-datatables";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ListOfEvent = () => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { fetchEventAdmin, eventAdmin } = useGetEventAdmin();
  var data = eventAdmin?.value || [];

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [eventIdToDisable, setEventIdToDisable] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const { postDisableEvent } = useDisableEvent();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchEventAdmin({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handleDisableConfirmation = (eventId) => {
    setConfirmationOpen(true);
    setEventIdToDisable(eventId);
  };

  const handleDisableEvent = (eventId) => {
    postDisableEvent({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        eventId: eventId,
      },
    });

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
      name: "totalParticipant",
      label: "Total Participant",
      title: "Total Participant",
    },
    {
      name: "closed",
      label: " ",
      title: "",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value === true) {
            return (
              <button className="pointer-events-none">
                <a className="pointer-events-none bg-green-200 text-green-600 p-1 px-5 text-center rounded-full w-[150px]">
                  Disabled
                </a>
              </button>
            );
          } else {
            // If event is not closed, enable the button
            return (
              <button
                onClick={() => handleDisableConfirmation(tableMeta.rowData[0])}
              >
                <a className="bg-red-200 text-red-600 p-1 px-5 text-center rounded-full w-[150px]">
                  Disable
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
            <a href={`/Admin/ListOfEvent/${value}`}>Registration List</a>
          </button>
        ),
      },
    },
    {
      name: "id",
      label: "",
      title: "",
      options: {
        customHeadRender: () => null,
        customBodyRender: (value) => (
          <button className="">
            <a
              className="text-blue-600"
              href={`/Admin/ListOfEvent/edit/${value}`}
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
          title={"All Event List"}
          data={data}
          columns={columns}
          options={options}
        />
        {confirmationOpen && (
          <div className="confirmation-popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-8">
              <p className="mb-4">
                Are you sure you want to disable this event?
              </p>
              <button
                onClick={() => handleDisableEvent(eventIdToDisable)}
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
        <Box className="fixed top-0 left-0 w-full z-50">
          <Collapse in={openAlert}>
            <Alert
              severity="success"
              className="flex items-center text-lg py-4 "
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
              Successfully disabled the event (the page will automatically
              reload in 3 seconds)
            </Alert>
          </Collapse>
        </Box>
      </div>
    </div>
  );
};

export default ListOfEvent;
