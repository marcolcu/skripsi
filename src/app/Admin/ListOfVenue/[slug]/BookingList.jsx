"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";
import { useGetVenueRegistrationListAdmin } from "@/services/useAdminVenueServices";
import MUIDataTable from "mui-datatables";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalBookingCancel from "../../AdminComponent/ModalBookingCancel";

const BookingList = ({ slug }) => {
  const { state } = useAppContext();
  const { fetchVenueRegistrationListAdmin, venueRegistrationListAdmin } =
    useGetVenueRegistrationListAdmin();
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openModalBookingCancel, setOpenModalBookingCancel] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelBooking = (booking) => {
    if (booking) {
      setSelectedBooking(booking);
      setOpenModalBookingCancel(true);
    } else {
      console.error("Booking object is null or undefined.");
    }
  };

  const handleSuccessfulCancel = () => {
    setOpenAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (venueRegistrationListAdmin?.success === true) {
      let newData = venueRegistrationListAdmin.value.map((venue) => ({
        ...venue,
        fullname: `${venue.user.firstName || ""} ${
          venue.user.lastName || ""
        }`.trim(),
      }));
      setData(newData);
    }
  }, [venueRegistrationListAdmin]);

  useEffect(() => {
    if (state && state?.token) {
      fetchVenueRegistrationListAdmin({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          venueId: slug,
        },
      });
    }
  }, [state]);

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
      name: "reservationCode",
      label: "BookingID",
      title: "BookingID",
    },
    {
      name: "fullname",
      label: "Username",
      title: "Username",
    },
    {
      name: "status",
      label: "Status",
      title: "Status",
      options: {
        sort: false,
        customBodyRender: (value) => {
          let buttonStyle = {};
          let statusColor = "";

          switch (value) {
            case "cancelled":
              statusColor = "bg-red-200 text-red-600 ";
              break;
            case "confirmed":
              statusColor = "bg-green-200 text-green-600";
              break;
            case "pending":
              statusColor = "bg-yellow-200 text-yellow-600";
              break;
            default:
              statusColor = "bg-gray-200 text-gray-600";
              break;
          }

          buttonStyle = {
            backgroundColor: statusColor.split(" ")[0].substring(3),
            color: statusColor.split(" ")[1].substring(5),
          };

          return (
            <div style={buttonStyle}>
              <a
                className={statusColor + " p-1 px-5 text-center rounded-full "}
              >
                {value}
              </a>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: " ",
      title: " ",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta) => {
          if (value !== "cancelled" && value !== "pending") {
            return (
              <button
                onClick={() => handleCancelBooking(data[tableMeta.rowIndex])}
                className="text-red-500"
              >
                <a href="#">Cancel</a>
              </button>
            );
          } else {
            return null;
          }
        },
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
    emptyRowsOption: () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <p>There is no data to display.</p>
      </Box>
    ),
  };

  return (
    <div className="text-center flex items-center justify-center">
      <div className="w-10/12">
        <MUIDataTable
          title={"Booking List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <Box className="fixed top-0 left-0 w-full z-50">
        <Collapse in={openAlert}>
          <Alert
            severity="success"
            className="flex items-center text-lg py-4"
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
            Successfully cancelled Booking (the page will automatically reload
            in 3 seconds)
          </Alert>
        </Collapse>
      </Box>
      <ModalBookingCancel
        open={openModalBookingCancel}
        onClose={() => {
          setOpenModalBookingCancel(false);
        }}
        onSuccessCancel={handleSuccessfulCancel} // Pass the callback function
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingList;
