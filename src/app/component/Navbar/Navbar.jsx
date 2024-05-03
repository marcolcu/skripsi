"use client";
import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const router = useRouter();

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setIsOpen(false);
    router.push("/");
    dispatch({
      token: null,
      user: null,
    });
    toast.success("Successfully logged out");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 sticky top-[20px] z-[100]">
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
            {state?.token ? (
              <>
                <li>
                  <a
                    href="/venue"
                    className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
                  >
                    <span className="font-semibold">Find a Place</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/event"
                    className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
                  >
                    <span className="font-semibold">Find an Event</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/aboutus"
                    className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
                  >
                    <span className="font-semibold">About Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/feature"
                    className="flex lg:px-3 py-2 items-center text-black-600 hover:text-black-900 hover:underline hover:underline-offset-2 decoration-2"
                  >
                    <span className="font-semibold">Features</span>
                  </a>
                </li>
              </>
            )}
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

        {state?.token ? (
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative inline-block">
              <button
                type="button"
                className="px-4 py-2 font-semibold rounded-lg inline-flex items-center"
                onClick={toggleDropdown}
              >
                Welcome, {state?.user?.firstName}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <ul
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/orders/myevents"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        My Events
                      </a>
                    </li>
                    <li>
                      <a
                        href="/orders/myvenues"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        My Venue Bookings
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-b-lg"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/login?register"
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
        )}
      </header>
    </div>
  );
};

export default Navbar;
