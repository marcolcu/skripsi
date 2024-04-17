"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppContext } from "../provider";

const Status = () => {
  // Mendapatkan parameter status_code dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const statusCode = urlParams.get("status_code");
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  // Memeriksa nilai status_code dan melakukan console.log sesuai kondisi
  if (statusCode === "200") {
    router.push("/status/finish");
    dispatch({
        statusPayment: statusCode,
    });
  } else if (statusCode === "201") {
    console.log("Keluar");
  }

  return (
    <div className="text-center h-[200px] flex items-center justify-center">
      Loading...
    </div>
  );
};

export default Status;
