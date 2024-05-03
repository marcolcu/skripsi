import { useGetData } from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

export const useLogin = () => {
  const { postData, data, loading, message, status, error, isError } = usePostData();

  return {
    postLogin: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/users/login",
        header,
        option,
        queryParams,
        body,
      }),
    login: data,
    loginLoading: loading,
    loginMessage: message,
    loginStatus: status,
    loginError: error,
    loginIsError: isError,
  };
};

export const useRegister = () => {
  const { postData, data, loading, message, status, error, isError } = usePostData();

  return {
    postRegister: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/users/register",
        header,
        option,
        queryParams,
        body,
      }),
    register: data,
    registerLoading: loading,
    registerMessage: message,
    registerStatus: status,
    registerError: error,
    registerIsError: isError,
  };
};

export const useEditUser = () => {
  const { postData, data, loading, message, status, error, isError } = usePostData();

  return {
    postEditUser: ({ header, option, queryParams, body }) =>
      postData({
        urlPath: "api/v1/users/public/edit-profile",
        header,
        option,
        queryParams,
        body,
      }),
    editUser: data,
    editUserLoading: loading,
    editUserMessage: message,
    editUserStatus: status,
    editUserError: error,
    editUserIsError: isError,
  };
};

export const useGetUser = () => {
  const { fetchData, data, message, loading, status, error, isError } =
    useGetData();

  return {
    fetchGetUser: ({ header, option, queryParams, body }) =>
      fetchData({
        urlPath: "api/v1/users/public/find",
        header,
        option,
        queryParams,
        body,
      }),
    user: data,
    userLoading: loading,
    userMessage: message,
    userStatus: status,
    userError: error,
    userIsError: isError,
  };
};
