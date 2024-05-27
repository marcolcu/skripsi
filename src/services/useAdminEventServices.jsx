import { useGetData } from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

export const useGetEventAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEventAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public-all-access/all-events",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    eventAdmin: data,
    eventAdminMessage: message,
    eventAdminLoading: loading,
    eventAdminStatus: status,
    eventAdminError: error || data?.message,
    eventAdminIsError: isError,
  };
};

export const useGetEventBookingListAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEventBookingListAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/admin/registrations/get-by-events",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    eventBookingListAdmin: data,
    eventBookingListAdminMessage: message,
    eventBookingListAdminLoading: loading,
    eventBookingListAdminStatus: status,
    eventBookingListAdminError: error || data?.message,
    eventBookingListAdminIsError: isError,
  };
};

export const useCancelRegistration = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postCancelRegistration: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/public/cancel-registration",
        header,
        option,
        queryParams,
        body,
      }),
    cancelRegistration: data,
    cancelRegistrationLoading: loading,
    cancelRegistrationStatus: status,
    cancelRegistrationError: error || data?.message,
    cancelRegistrationIsError: isError || data?.status == "1",
  };
};

export const useDisableEvent = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postDisableEvent: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/admin/cancel-event",
        header,
        option,
        queryParams,
        body,
      }),
    disableEvent: data,
    disableEventLoading: loading,
    disableEventStatus: status,
    disableEventError: error || data?.message,
    disableEventIsError: isError || data?.status == "1",
  };
};

export const useCreateEvent = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postCreateEvent: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/events/admin/create",
        header,
        option,
        queryParams,
        body,
      }),
    createEvent: data,
    createEventLoading: loading,
    createEventMessage: message,
    createEventStatus: status,
    createEventError: error,
    createEventIsError: isError,
  };
};

export const useGetEventDetailAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchEventDetailAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/events/public/retrieve",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    eventDetailAdmin: data,
    eventDetailAdminMessage: message,
    eventDetailAdminLoading: loading,
    eventDetailAdminStatus: status,
    eventDetailAdminError: error || data?.message,
    eventDetailAdminIsError: isError,
  };
};

export const useEditEvent = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postEditEvent: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "/api/v1/events/admin/edit",
        header,
        option,
        queryParams,
        body,
      }),
    editEvent: data,
    editEventLoading: loading,
    editEventMessage: message,
    editEventStatus: status,
    editEventError: error,
    editEventIsError: isError,
  };
};
