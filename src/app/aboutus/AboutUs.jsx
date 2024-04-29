"use client";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [toggleState, setToggleState] = useState(0);

  return (
    <div className="max-w-screen-xl mx-auto px-10" style={{ height: "auto" }}>
      <div className="flex items-center justify-between h-screen">
        <img src="/assets/chat-information.png" alt="" />
        <div className="w-[500px] text-justify">
          Kami adalah wadah yang menghubungkan Anda dengan berbagai acara
          menarik di sekitar Anda. Dari konser hingga workshop, kami menyediakan
          akses mudah dan pengalaman yang tak terlupakan. Dengan fitur pemesanan
          yang intuitif, Anda dapat dengan cepat dan mudah merencanakan setiap
          detail acara. Bergabunglah dengan komunitas kami yang dinamis dan
          jadilah bagian dari perjalanan kami untuk menciptakan momen-momen
          berharga yang tak terlupakan.
        </div>
      </div>

      <div className="h-[50vh]">
        <p className="font-bold italic text-4xl text-center mb-8">
          Man behind the apps
        </p>

        <div class="flex my-8">
          <div class="w-1/3 flex flex-col items-center mr-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/0b6e7329-04e4-4f60-ad8a-142858f9b896.jpeg?alt=media"
              alt=""
              class="w-32 h-32 object-cover rounded-full"
            />
            <p class="text-center mt-5 font-bold">Oliver Oswin Sumady</p>
            <p class="text-center mt-2 italic">Backend Programmer</p>
          </div>
          <div class="w-1/3 flex flex-col items-center mr-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/0f1f4419-50cc-4d36-95a7-9203fc83e257.jpg?alt=media"
              alt=""
              class="w-32 h-32 object-cover rounded-full"
            />
            <p class="text-center mt-5 font-bold">Brian Joe Antoni</p>
            <p class="text-center mt-2 italic">Frontend Programmer</p>
          </div>
          <div class="w-1/3 flex flex-col items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eventappskripsi.appspot.com/o/10113054-e994-4484-ac34-ae829482bb29.jpg?alt=media"
              alt=""
              class="w-32 h-32 object-cover rounded-full"
            />
            <p class="text-center mt-5 font-bold">Vincentius Marco Melandri</p>
            <p class="text-center mt-2 italic">Frontend Programmer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
