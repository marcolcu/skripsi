"use client";
import React, { useState } from "react";
import "../AdminCSS/Admin.css";
import ModalRegistrationCancel from "../AdminComponent/ModalResgistrationCancel";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RegistrationEventTableRow = () => {
  const [openModalBookingCancel, setOpenModalBookingCancel] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const cardArray = Array.from({ length: 2 }, (_, index) => index + 1);

  return (
    <>
      {cardArray.map((index) => (
        <tr>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
              <span>{index}</span>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            Event
          </td>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <h2 className="text-sm font-normal">Lorem, ipsum dolor.</h2>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center justify-start gap-x-6">
              <button onClick={() => setOpenModalBookingCancel(true)}>
                <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                  <h2 className="text-sm font-normal">Cancel</h2>
                </div>
              </button>
            </div>
            <Box className="fixed top-0 left-0 w-full">
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
                      <CloseIcon></CloseIcon>
                    </IconButton>
                  }
                >
                  success
                </Alert>
              </Collapse>
              <Collapse>
                <Alert
                  severity="error"
                  className="flex items-center text-lg py-4"
                  action={
                    <IconButton
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon></CloseIcon>
                    </IconButton>
                  }
                >
                  failed
                </Alert>
              </Collapse>
            </Box>
          </td>
        </tr>
      ))}
      <ModalRegistrationCancel
        open={openModalBookingCancel}
        onClose={() => {
          setOpenModalBookingCancel(false);
          setOpenAlert(true);
        }}
      />
    </>
  );
};

export default RegistrationEventTableRow;
