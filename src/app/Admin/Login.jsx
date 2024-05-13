"use client";
import React, { useEffect, useState } from "react";
import * as Components from "../component/LoginRegister/LoginRegister";
import { useAppContext } from "../provider";
import { useRouter } from "next/navigation";
import { useLogin, useRegister } from "@/services/useUserServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [signIn, toggle] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const {
    postLogin,
    login,
    loginLoading,
    loginMessage,
    loginError,
    loginIsError,
  } = useLogin();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (login?.success) {
      dispatch({
        token: login?.value?.token,
        user: login?.value,
      });
      toast.success("Successfully logged in");
      router.push("/");
    } else {
      toast.error(login?.errorMessage);
    }
  }, [login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    postLogin({
      body: {
        email: loginData.email,
        password: loginData.password,
      },
    });
  };

  return (
    <main>
      <div className="flex justify-center items-center h-[34rem]">
        {showWelcome && (
          <div className="">
            <h1 className="text-5xl font-bold">Welcome!</h1>
          </div>
        )}
        <div
          className="adminLoginContainer"
          style={{ display: showWelcome ? "none" : "block" }}
        >
          <div className="adminLoginBox" status={signIn.toString()}>
            <Components.Form>
              <Components.Title>Login</Components.Title>
              <Components.Input
                type="email"
                name="email"
                value={loginData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <Components.Input
                type="password"
                name="password"
                value={loginData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button type="button" onClick={handleLogin}>
                {loginLoading ? "Loading..." : "Login"}
              </Components.Button>
            </Components.Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
