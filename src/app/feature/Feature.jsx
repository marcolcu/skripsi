"use client";
import React from "react";

const Feature = () => {

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      <div className="flex items-center justify-between h-screen">
        <div className="w-[500px] text-justify">
          Explore our feature-packed platform designed to enhance your event
          experience. Discover a seamless booking process, intuitive navigation,
          and personalized recommendations tailored to your interests. With
          real-time updates and notifications, stay informed about upcoming
          events and special offers. Enjoy hassle-free ticket purchases, secure
          transactions, and flexible payment options. Dive into a world of
          diverse events, from live performances to exclusive workshops, curated
          just for you. Whether you're a seasoned event-goer or new to the
          scene, our platform offers something for everyone. Join us and unlock
          a world of possibilities to elevate your event journey.
        </div>
        <img src="/assets/settings.png" alt="" />
      </div>

      <div className="h-[100vh]">
        <p className="font-bold text-4xl text-center mb-8">Feature</p>

        <div className="flex my-8">
          <div className="w-1/3 flex flex-col items-center mr-4">
            <img
              src="/assets/addons.png"
              alt=""
              className="w-45 h-45 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">Add Ons</p>
            <p className="text-center mt-2 italic">
              Elevating experiences with our additional add-on features
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center mr-4">
            <img
              src="/assets/filter.png"
              alt=""
              className="w-45 h-45 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">Filter</p>
            <p className="text-center mt-2 italic">
              Simplify your search with our powerful filtering feature
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img
              src="/assets/oneclick.png"
              alt=""
              className="w-45 h-45 object-cover rounded-full"
            />
            <p className="text-center mt-5 font-bold">One Click Regis</p>
            <p className="text-center mt-2 italic">
              Register effortlessly with our one-click registration feature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
