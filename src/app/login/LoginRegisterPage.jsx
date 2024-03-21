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

  const {
    postLogin,
    login,
    loginLoading,
    loginMessage,
    loginError,
    loginIsError,
  } = useLogin();
  const {
    postRegister,
    register,
    registerLoading,
    registerMessage,
    registerError,
    registerIsError,
  } = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastname: "",
    phoneNo: "",
    gender: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password, firstname, lastname, phoneNo, gender } = formData;
  
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registerParam = urlParams.get("register");

    if (registerParam !== null) {
      const registerButton = document.getElementById("registerButton");
      if (registerButton) {
        registerButton.click();
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setLoginData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    postRegister({
      body: {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstname,
        lastname: formData.lastname,
        phoneNo: formData.phoneNo,
        gender: formData.gender,
      },
    });
    if (register?.success) {
      const loginButton = document.getElementById("loginButton");
      if (loginButton) {
        loginButton.click();
      }
    } else {
      toast.error(register?.errorMessage);
    }
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
        <Components.Container
          style={{ display: showWelcome ? "none" : "block" }}
        >
          <Components.SignUpContainer status={signIn.toString()}>
            <Components.Form>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
              <Components.Input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
              <Components.Input
                type="text"
                name="firstname"
                value={firstname}
                placeholder="Given Name"
                onChange={handleChange}
              />
              <Components.Input
                type="text"
                name="lastname"
                value={lastname}
                placeholder="Surname"
                onChange={handleChange}
              />
              <Components.Input
                type="text"
                name="phoneNo"
                value={phoneNo}
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <Components.Select
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Components.Select>

              <Components.Button type="button" onClick={handleRegister}>
                {registerLoading ? "Loading..." : "Register"}
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer status={signIn.toString()}>
            <Components.Form>
              <Components.Title>Login</Components.Title>
              <Components.Input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
              <Components.Input
                type="password"
                name="password"
                value={password}
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
          </Components.SignInContainer>

          <Components.OverlayContainer status={signIn.toString()}>
            <Components.Overlay status={signIn.toString()}>
              <Components.LeftOverlayPanel status={signIn.toString()}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton
                  id="loginButton"
                  onClick={() => toggle(true)}
                >
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel status={signIn.toString()}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter Your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton
                  id="registerButton"
                  onClick={() => toggle(false)}
                >
                  Register
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </main>
  );
}

export default App;
