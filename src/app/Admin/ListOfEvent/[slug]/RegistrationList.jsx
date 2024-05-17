"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";
import { useGetEventBookingListAdmin } from "@/services/useAdminEventServices";
import MUIDataTable from "mui-datatables";
import ModalRegistrationCancel from "../../AdminComponent/ModalRegistrationCancel";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RegistrationList = ({ slug }) => {
  const {
    fetchEventBookingListAdmin,
    eventBookingListAdmin,
  } = useGetEventBookingListAdmin();

  const [data, setData] = useState([]);
  const { state } = useAppContext();
  const [openModalBookingCancel, setOpenModalBookingCancel] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const handleCancelRegistration = (registration) => {
    if (registration) {
      setSelectedRegistration(registration);
      setOpenModalBookingCancel(true);
    } else {
      console.error("Registration object is null or undefined.");
    }
  };

  const handleSuccessfulCancel = () => {
    setOpenAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (eventBookingListAdmin) {
      let newData = eventBookingListAdmin.value.map((event) => ({
        ...event,
        fullname: `${event.user.firstName || ""} ${
          event.user.lastName || ""
        }`.trim(),
      }));
      setData(newData);
    }
  }, [eventBookingListAdmin]);

  useEffect(() => {
    if (state && state?.token) {
      fetchEventBookingListAdmin({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          eventId: slug,
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
      name: "registrationCode",
      label: "RegistrationID",
      title: "RegistrationID",
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
                onClick={() =>
                  handleCancelRegistration(data[tableMeta.rowIndex])
                }
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
  };

  return (
    <div className="text-center flex items-center justify-center">
      <div className="w-10/12">
        <MUIDataTable
          title={"Registration List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
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
            Successfully cancelled registration (the page will automatically
            reload in 3 seconds)
          </Alert>
        </Collapse>
      </Box>
      <ModalRegistrationCancel
        open={openModalBookingCancel}
        onClose={() => {
          setOpenModalBookingCancel(false);
        }}
        onSuccessCancel={handleSuccessfulCancel} // Pass the callback function
        registration={selectedRegistration}
      />
    </div>
  );
};

export default RegistrationList;
