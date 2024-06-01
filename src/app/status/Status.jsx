"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../provider";
import { useEventConfirmation } from "@/services/useEventServices";

const Status = () => {
  const [statusCode, setStatusCode] = useState(null);
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { postEventConfirmation, eventConfirmation, eventConfirmationLoading } =
    useEventConfirmation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const statusCode = urlParams.get("status_code");
      setStatusCode(statusCode);
    }
  }, []);

  useEffect(() => {
    if (state?.registrationCode) {
      let statusMessage = statusCode === "200" ? "success" : "fail";

      postEventConfirmation({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          registrationCode: state?.registrationCode,
          status: statusMessage,
        },
      });
    }
  }, [state]);

  useEffect(() => {
    if (statusCode === "200") {
      router.prefetch("/status/finish");
      router.push("/status/finish");
    } else {
      router.prefetch("/status/failed");
      router.push("/status/failed");
    }
  }, [eventConfirmation]);

  return (
    <div className="text-center h-[200px] flex items-center justify-center">
      Loading...
    </div>
  );
};

export default Status;
