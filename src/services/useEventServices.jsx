import { useGetData } from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

export const useGetEvent = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEvent: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public-all-access/all-events",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    event: data,
    eventMessage: message,
    eventLoading: loading,
    eventStatus: status,
    eventError: error || data?.message,
    eventIsError: isError,
  };
};

export const useGetEventDetail = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEventDetail: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public/retrieve",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    eventDetail: data,
    eventDetailMessage: message,
    eventDetailLoading: loading,
    eventDetailStatus: status,
    eventDetailError: error || data?.message,
    eventDetailIsError: isError,
  };
};

export const useGetTopEvent = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchTopEvent: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public-all-access/top-events",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    topEventfetch: data,
    topEventfetchMessage: message,
    topEventfetchLoading: loading,
    topEventfetchStatus: status,
    topEventfetchError: error || data?.message,
    topEventfetchIsError: isError,
  };
};

export const useEventPayment = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postEventPayment: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/payment/public/pay",
        header,
        option,
        queryParams,
        body,
      }),
    eventPayment: data,
    eventPaymentLoading: loading,
    eventPaymentStatus: status,
    eventPaymentError: error || data?.message,
    eventPaymentIsError: isError || data?.status == "1",
  };
};

export const useEventRegistration = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postEventRegistration: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/public/registration",
        header,
        option,
        queryParams,
        body,
      }),
    eventRegistration: data,
    eventRegistrationLoading: loading,
    eventRegistrationStatus: status,
    eventRegistrationError: error || data?.message,
    eventRegistrationIsError: isError || data?.status == "1",
  };
};

export const useEventConfirmation = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postEventConfirmation: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/public/registrations/confirm-paid-registration",
        header,
        option,
        queryParams,
        body,
      }),
    eventConfirmation: data,
    eventConfirmationLoading: loading,
    eventConfirmationStatus: status,
    eventConfirmationError: error || data?.message,
    eventConfirmationIsError: isError || data?.status == "1",
  };
};

export const useEventRegisDetail = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postEventRegisDetail: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/public/registration/detail",
        header,
        option,
        queryParams,
        body,
      }),
    eventRegisDetail: data,
    eventRegisDetailLoading: loading,
    eventRegisDetailStatus: status,
    eventRegisDetailError: error || data?.message,
    eventRegisDetailIsError: isError || data?.status == "1",
  };
};

export const useGetEventBooking = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEventBooking: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public/get-user-registrations",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    eventBooking: data,
    eventBookingMessage: message,
    eventBookingLoading: loading,
    eventBookingStatus: status,
    eventBookingError: error || data?.message,
    eventBookingIsError: isError,
  };
};