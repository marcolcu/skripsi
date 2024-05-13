import "../AdminCSS/Admin.css";

const ModalBookingCancel = ({ open, onClose }) => {
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
              name=""
              id=""
              cols="2"
              rows="10"
            ></textarea>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                onClose();
              }}
            >
              <div className="flex justify-center px-12 py-4 text-white rounded-full gap-x-2 bg-red-500 dark:bg-gray-800">
                <h2 className="text-xl font-normal">Cancel Booking</h2>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBookingCancel;
