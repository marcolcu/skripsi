import { useGetData } from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

export const useGetVenue = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenue: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/venues/public-all-access/get-all-venues",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    venue: data,
    venueMessage: message,
    venueLoading: loading,
    venueStatus: status,
    venueError: error || data?.message,
    venueIsError: isError,
  };
};

export const useGetVenueDetail = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueDetail: ({ header, option, queryParams }) =>
      fetchData({
        urlPath: "api/v1/venues/public/retrieve",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    venueDetail: data,
    venueDetailMessage: message,
    venueDetailLoading: loading,
    venueDetailStatus: status,
    venueDetailError: error || data?.message,
    venueDetailIsError: isError,
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

export const useVenueFiltered = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postVenueFiltered: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/public/retrieve/filtered",
        header,
        option,
        queryParams,
        body,
      }),
    venueFiltered: data,
    venueFilteredLoading: loading,
    venueFilteredStatus: status,
    venueFilteredError: error || data?.message,
    venueFilteredIsError: isError || data?.status == "1",
  };
};

export const useVenueAllFiltered = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postVenueAllFiltered: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/public/get-all/filtered",
        header,
        option,
        queryParams,
        body,
      }),
    venueAllFiltered: data,
    venueAllFilteredLoading: loading,
    venueAllFilteredStatus: status,
    venueAllFilteredError: error || data?.message,
    venueAllFilteredIsError: isError || data?.status == "1",
  };
};

export const useVenueBooking = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    postVenueBooking: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/venues/public/booking/create",
        header,
        option,
        queryParams,
        body,
      }),
    venueBooking: data,
    venueBookingLoading: loading,
    venueBookingStatus: status,
    venueBookingError: error || data?.message,
    venueBookingIsError: isError || data?.status == "1",
  };
};

export const useVenueBookingDetail = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueBookingDetail: ({ header, option, queryParams, body }) =>
      fetchData({
        urlPath: "api/v1/venues/public/booking/retrieve",
        header,
        option,
        queryParams,
        body,
      }),
    venueBookingDetail: data,
    venueBookingDetailLoading: loading,
    venueBookingDetailStatus: status,
    venueBookingDetailError: error || data?.message,
    venueBookingDetailIsError: isError || data?.status == "1",
  };
};

export const useVenueBookingList = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchVenueBookingList: ({ header, option, queryParams, body }) =>
      fetchData({
        urlPath: "api/v1/venues/public/booking/get-by-user",
        header,
        option,
        queryParams,
        body,
      }),
    venueBookingList: data,
    venueBookingListLoading: loading,
    venueBookingListStatus: status,
    venueBookingListError: error || data?.message,
    venueBookingListIsError: isError || data?.status == "1",
  };
};
