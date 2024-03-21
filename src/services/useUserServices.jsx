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
