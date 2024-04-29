"use client";
import React from "react";

const AboutUs = () => {

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      <div className="flex items-center justify-between h-screen">
        <img src="/assets/chat-information.png" alt="" />
        <div className="w-[500px] text-justify">
          We are a platform connecting you to various exciting events around
          you. From concerts to workshops, we provide easy access and
          unforgettable experiences. With intuitive booking features, plan every
          event detail quickly and effortlessly. Join our dynamic community and
          be part of our journey to create unforgettable moments.
        </div>
      </div>

      <div className="h-[50vh]">
        <p className="font-bold italic text-4xl text-center mb-8">
          Man behind the apps
        </p>

        <div className="flex my-8">
          <div className="w-1/3 flex flex-col items-center mr-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/0b6e7329-04e4-4f60-ad8a-142858f9b896.jpeg?alt=media"
              alt=""
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">Oliver Oswin Sumady</p>
            <p className="text-center mt-2 italic">Backend Programmer</p>
          </div>
          <div className="w-1/3 flex flex-col items-center mr-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/0f1f4419-50cc-4d36-95a7-9203fc83e257.jpg?alt=media"
              alt=""
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">Brian Joe Antoni</p>
            <p className="text-center mt-2 italic">Frontend Programmer</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/10113054-e994-4484-ac34-ae829482bb29.jpg?alt=media"
              alt=""
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">Vincentius Marco Melandri</p>
            <p className="text-center mt-2 italic">Frontend Programmer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
