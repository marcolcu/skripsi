"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-5 sticky top-[20px]">
      <header
        className={`flex flex-col lg:flex-row justify-between items-center my-5 p-8 rounded-full ${
          scrolled ? "backdrop-blur-2xl bg-white/30 " : "bg-cyan-50"
        }`}
      >
        <div className="flex w-full lg:w-auto items-center justify-between">
          <a href="/" className="text-lg">
            <span className={`font-bold  ${scrolled ? "" : ""}`}>
              Event App
            </span>
          </a>
        </div>

        <nav className="astronav-items astronav-toggle hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0">
          <ul className="flex flex-col lg:flex-row lg:gap-3">
            <li>
              <a
                href="/"
                className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
              >
                <span className="font-semibold"> Home</span>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
              >
                <span className="font-semibold">About Us</span>
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
              >
                <span className="font-semibold">Features</span>
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
              >
                <span className="font-semibold">Support</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/login"
            className="rounded-full text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-4 py-2 bg-black font-semibold hover:bg-gray-800 text-white border-2 border-transparent hover:underline hover:underline-offset-2 decoration-2"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="font-semibold hover:underline hover:underline-offset-2 decoration-2"
          >
            Log in
          </a>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
