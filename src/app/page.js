import Image from "next/image";
import LandingPage from "./landing/LandingPage";
import AdminHome from "./Admin/home/Home";
import AdminCreateVenue from "./Admin/CreateVenue";
import AdminCreateEvent from "./Admin/CreateEvent";
import AdminEditVenue from "./Admin/EditVenue";
import AdminEditEvent from "./Admin/EditEvent";
import AdminLogin from "./Admin/Login";

import ListOfVenue from "./Admin/ListOfVenue";
import ListBooking from "./Admin/ListBooking";

import ListOfEvent from "./Admin/ListOfEvent";
import ListRegistration from "./Admin/ListRegistration";

import LoginRegister from "./login/LoginRegisterPage";

export default function Home() {
  return (
    <>
      {/* <LoginRegister /> */}
      <LandingPage />

      {/* <AdminHome /> */}
      {/* <AdminEditVenue /> */}
      {/* <AdminEditEvent /> */}
      {/* <AdminCreateEvent /> */}
      {/* <AdminCreateVenue /> */}

      {/* <ListOfVenue /> */}
      {/* <ListBooking /> */}

      {/* <ListOfEvent /> */}
      {/* <ListRegistration /> */}
    </>
  );
}
