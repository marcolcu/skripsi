"use client";
import React, { useEffect, useState } from "react";
import * as Components from "../component/LoginRegister/LoginRegister";

function App() {
  const [signIn, toggle] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

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
              <Components.Input type="email" placeholder="Email" />
              <Components.Input type="password" placeholder="Password" />
              <Components.Input type="text" placeholder="Given Name" />
              <Components.Input type="text" placeholder="Surname" />
              <Components.Input type="text" placeholder="Phone Number" />
              <Components.Input type="text" placeholder="Gender" />
              <Components.Button onClick={() => alert("register")}>
                Register
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer status={signIn.toString()}>
            <Components.Form>
              <Components.Title>Login</Components.Title>
              <Components.Input type="email" placeholder="Email" />
              <Components.Input type="password" placeholder="Password" />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button onClick={() => alert("login")}>
                Login
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
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel status={signIn.toString()}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter Your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
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
