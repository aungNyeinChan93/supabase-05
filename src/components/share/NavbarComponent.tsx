"use client";

/* eslint-disable @next/next/no-img-element */
import { useAppUtilsContext } from "@/context/AppUtilsProvider";
import React, { useState } from "react";

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const { isLogin, setIsLogin, theme, setTheme } = useAppUtilsContext();
  console.log({ isLogin, theme });

  return (
    <>
      <header className="flex shadow-[0px_0px_16px_rgba(17,_17,_26,_0.1)] py-4 px-4 sm:px-6 bg-white min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-xl mx-auto">
          <a href="javascript:void(0)" className="max-sm:hidden">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
          </a>
          <a href="javascript:void(0)" className="hidden max-sm:block">
            <img
              src="https://readymadeui.com/readymadeui-short.svg"
              alt="logo"
              className="w-9"
            />
          </a>

          <div
            id="collapseMenu"
            className={`${
              menuOpen ? "block" : "max-lg:hidden"
            } lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
              style={{ display: menuOpen ? "flex" : "none" }}
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
                className="w-5 h-5"
              >
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </a>
              </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-blue-700 text-blue-700 font-medium block text-base"
                >
                  Home
                </a>
              </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-blue-700 text-slate-900 font-medium block text-base"
                >
                  About
                </a>
              </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-blue-700 text-slate-900 font-medium block text-base"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center max-lg:ml-auto space-x-4">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="cursor-pointer fill-white inline w-4 h-4"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000" />
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                />
              </svg>
              Login
            </button>

            <>
              {/* test */}
              <button type="button" onClick={() => setIsLogin((prev) => !prev)}>
                X
              </button>
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
              >
                Toggle
              </button>
            </>

            <button
              id="toggleOpen"
              className="lg:hidden cursor-pointer"
              onClick={handleClick}
              style={{ display: menuOpen ? "none" : "block" }}
            >
              <svg
                className="w-7 h-7 lg:hidden"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarComponent;
