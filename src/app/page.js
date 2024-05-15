import Image from "next/image";
import LandingPage from "./landing/LandingPage";
import AdminHome from "./Admin/home/AdminHome";

import LoginRegister from "./login/LoginRegisterPage";

export default function Home() {
  return (
    <>
      {/* <LoginRegister /> */}
      {/* <LandingPage /> */}

      <AdminHome />
    </>
  );
}
