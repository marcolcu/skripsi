"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../provider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEditUser, useGetUser } from "@/services/useUserServices";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const { state, dispatch } = useAppContext();
  const [image, setImage] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const { fetchGetUser, user, userLoading } = useGetUser();
  const { postEditUser, editUser, editUserLoading } = useEditUser();

  useEffect(() => {
    if (state && state?.user) {
      getDataUser();
    }
  }, [state]);

  useEffect(() => {
    if (user) {
      setData(user.value);
      setFirstName(user?.value?.firstName);
      setLastName(user?.value?.lastName);
      setEmail(user?.value?.email);
      setPhoneNo(user?.value?.phoneNo);
      setLoading(false);
    }

    if (user?.value?.imageUrl !== null) {
      setImage(user?.value?.imageUrl);
    }
  }, [user]);

  useEffect(() => {
    if (editUser?.success) {
      getDataUser();
      dispatch({
        user: editUser?.value
      })
      toast.success("Successfully updated");
    }
  }, [editUser]);

  const getDataUser = () => {
    fetchGetUser({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        userEmail: state?.user?.email,
      },
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://leading-mallard-probable.ngrok-free.app/api/v1/image/public/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + state?.token,
          },
        }
      );
      setImage(response.data);
      toast.success("Successfully uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = () => {
    if (password === "") {
      toast.error("Please fill in your password");
    } else {
      postEditUser({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          currentEmail: state?.user?.email,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: state?.user?.gender,
          phoneNo: phoneNo,
          imageUrl: image,
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Jika input phoneNo, pastikan nilainya hanya angka
    if (name === "phoneNo") {
      // Hapus semua karakter selain angka
      newValue = value.replace(/\D/g, "");
    }

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phoneNo":
        setPhoneNo(newValue);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };


  return (
    <div
      className="max-w-screen-xl mx-auto my-9 px-10"
      style={{ height: "100vh" }}
    >
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className="top-container flex justify-between">
            <div className="right-component">
              <div
                className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer"
                onClick={handleUploadClick}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    Upload Photo
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={inputRef}
              />
            </div>
            <div className="left-component flex flex-col justify-center text-center w-full">
              <h1>
                {data?.firstName}&nbsp;{data?.lastName}
              </h1>
              <p>
                {data?.userRole === "ROLE_USER" ? "User" : "Admin"} - {data?.email}
              </p>
            </div>
          </div>
          <div className="bottom-container mt-8">
            <table className="w-full">
              <tbody>
                <tr>
                  <td>First Name:</td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName ? firstName : ""}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName ? lastName : ""}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>
                    <input
                      type="text"
                      name="phoneNo"
                      value={phoneNo ? phoneNo : ""}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={email ? email : ""}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="bg-cyan-200 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
