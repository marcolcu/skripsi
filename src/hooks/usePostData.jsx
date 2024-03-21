import { RESTAPI } from "@/utils/restApi";
import { useState } from "react";
import { REQ_STATUS } from "@/constants/constants";

const usePostData = () => {
  const [result, setResult] = useState({
    loading: false,
    data: null,
    message: null,
    error: null,
    status: REQ_STATUS.INITIAL,
    isError: false,
    refresh: false,
  });

  const setData = (newData) => {
    setResult((prev) => ({
      ...prev,
      data: newData,
    }));
  };

  const postData = async ({ body, urlPath = "", queryParams, header }) => {
    setResult((prevData) => ({
      ...prevData,
      data: null,
      loading: true,
      message: null,
      errorData: null,
      isError: false,
      status: REQ_STATUS.LOADING,
    }));

    try {
      const response = await postDataHooks({
        body,
        urlPath,
        header,
        queryParams,
      });

      const value = response?.data?.data;
      setResult((prevData) => ({
        ...prevData,
        data: value,
        message: response?.data?.data?.message ?? "Success post data",
        loading: false,
        status: REQ_STATUS.SUCCESS,
      }));
    } catch (err) {
      let errMsg = err?.response?.data?.data?.message;
      setResult((prevData) => ({
        ...prevData,
        loading: false,
        error: err,
        message: errMsg ?? err?.message,
        isError: true,
        status: REQ_STATUS.FAILED,
      }));
    }
  };

  return {
    data: result?.data,
    message: result?.message,
    error: result?.error,
    isError: result?.isError,
    loading: result?.loading,
    status: result?.status,
    postData,
    setData,
  };
};

export default usePostData;

const postDataHooks = async ({
  body,
  urlPath,
  queryParams,
  header,
  option,
}) => {
  const instance = RESTAPI;

  try {
    let token = localStorage.getItem("token");

    const headers = {
      Authorization: `${token}`,
      ...header,
    };

    const params = {
      headers,
      method: "post",
      url: urlPath,
      params: queryParams,
      data: body,
      ...option,
    };

    const response = await instance(params);

    if (response.status === 401) {
      // logout
      throw {
        data: null,
        error: 401,
        message: response.data.message,
        status: REQ_STATUS.FAILED,
      };
    }

    if (response.status === 400 || response.status > 401) {
      throw {
        data: null,
        error: response.data,
        message: response.data.message,
        status: REQ_STATUS.FAILED,
      };
    }

    return {
      data: response,
      error: null,
      message: response.data.message,
      status: REQ_STATUS.SUCCESS,
    };
  } catch (error) {
    console.log("error", error);
    throw {
      data: null,
      error: error,
      message: error?.message,
      status: REQ_STATUS.FAILED,
    };
  }
};
