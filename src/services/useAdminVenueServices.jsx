import { useGetData } from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

export const useGetVenueAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/venues/admin/get-all-venues",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    venueAdmin: data,
    venueAdminMessage: message,
    venueAdminLoading: loading,
    venueAdminStatus: status,
    venueAdminError: error || data?.message,
    venueAdminIsError: isError,
  };
};

export const useGetVenueRegistrationListAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueRegistrationListAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/venues/admin/booking/get-all-by-venue",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    venueRegistrationListAdmin: data,
    venueRegistrationListAdminMessage: message,
    venueRegistrationListAdminLoading: loading,
    venueRegistrationListAdminStatus: status,
    venueRegistrationListAdminError: error || data?.message,
    venueRegistrationListAdminIsError: isError,
  };
};

export const useCancelBooking = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postCancelBooking: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/public/booking/cancel",
        header,
        option,
        queryParams,
        body,
      }),
    cancelBooking: data,
    cancelBookingLoading: loading,
    cancelBookingStatus: status,
    cancelBookingError: error || data?.message,
    cancelBookingIsError: isError || data?.status == "1",
  };
};

export const useDisableVenue = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postDisableVenue: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/admin/disable",
        header,
        option,
        queryParams,
        body,
      }),
    disableVenue: data,
    disableVenueLoading: loading,
    disableVenueStatus: status,
    disableVenueError: error || data?.message,
    disableVenueIsError: isError || data?.status == "1",
  };
};

export const useCreateVenue = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postCreateVenue: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/admin/create",
        header,
        option,
        queryParams,
        body,
      }),
    createVenue: data,
    createVenueLoading: loading,
    createVenueMessage: message,
    createVenueStatus: status,
    createVenueError: error,
    createVenueIsError: isError,
  };
};

export const useGetVenueDetailAdmin = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueDetailAdmin: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/venues/public/retrieve",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    venueDetailAdmin: data,
    venueDetailAdminMessage: message,
    venueDetailAdminLoading: loading,
    venueDetailAdminStatus: status,
    venueDetailAdminError: error || data?.message,
    venueDetailAdminIsError: isError,
  };
};

export const useEditVenue = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postEditVenue: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "/api/v1/venues/admin/edit",
        header,
        option,
        queryParams,
        body,
      }),
    editVenue: data,
    editVenueLoading: loading,
    editVenueMessage: message,
    editVenueStatus: status,
    editVenueError: error,
    editVenueIsError: isError,
  };
};
