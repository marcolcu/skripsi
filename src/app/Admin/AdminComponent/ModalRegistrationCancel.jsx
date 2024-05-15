import "../AdminCSS/Admin.css";
import { useCancelRegistration } from "@/services/useAdminEventServices";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";

const ModalRegistrationCancel = ({
  open,
  onClose,
  registration,
  onSuccessCancel,
}) => {
  const { state } = useAppContext();
  const { postCancelRegistration } = useCancelRegistration();
  const [reason, setReason] = useState("");
  const [isReasonEmpty, setIsReasonEmpty] = useState(true);

  const handleInputChange = (value) => {
    setReason(value);
    setIsReasonEmpty(value.trim().length === 0);
  };

  const handleCancelRegistration = async () => {
    try {
      await postCancelRegistration({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          userEmail: registration.user.email,
          eventId: registration.event.id,
          cancellationReason: reason,
        },
      });
      onSuccessCancel();
      onClose();
    } catch (error) {
      console.error("Error cancelling registration:", error);
      onFailCancel();
    }
  };

  if (!open) return null;

  return (
    <div className="overlay flex justify-center items-center">
      <div className="modalContainer relative py-12">
        <button onClick={onClose} className="closeBtn absolute">
          <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
            <h2 className="text-sm font-normal">X</h2>
          </div>
        </button>
        <div className="flex-col justify-between">
          <p className="flex justify-center mb-4 whitespace-break-spaces text-xl">
            Input Cancellation Reason
          </p>
          <div className="textareaContainer mx-16">
            <textarea
              className="border p-2"
              placeholder="(max input 100 characters)"
              maxLength={100}
              value={reason}
              onChange={(e) => handleInputChange(e.target.value)}
              cols="2"
              rows="10"
            ></textarea>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                handleCancelRegistration();
              }}
              disabled={isReasonEmpty}
              className={`${
                isReasonEmpty ? "cursor-not-allowed bg-gray-400" : "bg-red-500"
              } text-white px-12 py-4 rounded-full text-xl`}
            >
              Cancel Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegistrationCancel;
