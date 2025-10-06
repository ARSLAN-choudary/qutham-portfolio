"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../sidebar";
import Link from "next/link";

export const Header = () => {
  const [sidebar, isSidebar] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [nestedChildOpen, setNestedChildOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        search &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [search]);

  return (
    <>
      <div className="h-[50px] lg:h-[64px] bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl max-w-screen w-full fixed top-0 z-10">
        <div className="grid grid-cols-3 h-full w-full items-center">
          <div
            onClick={() => isSidebar(!sidebar)}
            className="mr-auto ml-6 lg:ml-[50px] cursor-pointer"
          >
            <div
              className={`bg-white rounded-full h-[2px] my-[6px] w-6 transition-all duration-300 ease-in-out 
      ${sidebar ? "rotate-45 translate-y-[8px]" : ""}`}
            ></div>

            <div
              className={`bg-white rounded-full h-[2px] my-[6px] w-6 transition-all duration-300 ease-in-out 
      ${sidebar ? "opacity-0" : ""}`}
            ></div>

            <div
              className={`bg-white rounded-full h-[2px] my-[6px] w-6 transition-all duration-300 ease-in-out 
      ${sidebar ? "-rotate-45 -translate-y-[8px]" : ""}`}
            ></div>
          </div>

          <div className="cursor-pointer lg:mx-auto">
            <Image
              className="!h-[24px] lg:h-[32px]"
              height={32}
              width={115}
              src="qutham-logo.svg"
              alt="logo"
            />
          </div>

          <div className="flex items-center ml-auto gap-3 lg:gap-6 mr-[45px]">
            <button
              onClick={() => setSearch(true)}
              className="relative cursor-pointer"
            >
              <div className="absolute bg-[linear-gradient(270deg,#ff6f00,#ff00e6)] rounded-[2px] text-white text-[8px] font-bold tracking-[0] leading-[100%] p-[2px] -right-2.5 -top-1.5">
                NEW
              </div>
              <Image
                width={24}
                height={24}
                src="https://gully91.com/static/media/search-icon.20800a727e910210024ddde0dab90744.svg"
                alt=""
              />
            </button>

            <Link href="/contact">
              <Image
                width={24}
                height={24}
                src="https://gully91.com/static/media/Headset.3f51e9b54c5060409c7e983a74790d3d.svg"
                alt=""
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={searchRef}
        className={`h-auto transition-transform ease-in-out delay-300 bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl fixed top-0 left-0 w-full z-[9999] ${
          search ? "translate-y-0 " : "-translate-y-full"
        }`}
      >
        <div className="py-[18px] w-full flex items-center justify-center">
          <div className="relative flex items-center justify-end md:justify-center px-3 w-full">
            <div
              onClick={() => setSearch(false)}
              className="cursor-pointer top-1/2 -translate-y-1/2 left-[25px] md:left-[50px] block absolute"
            >
              <Image
                width={32}
                height={32}
                src="https://gully91.com/static/media/ArrowLeft.87c1dc2ee38b0151d945b18b1b999031.svg"
                alt=""
              />
            </div>

            <div className="rounded-[99px] h-[60px] px-[38px] w-[65%] flex items-center overflow-hidden bg-[hsla(0,0%,100%,.04)] border border-solid border-[hsla(0,0%,100%,.2)]">
              <input
                type="text"
                placeholder="Search for players, teams & tournaments"
                className="text-[18px] bg-[initial] border-none focus:outline-none text-white font-normal w-full h-full leading-[100%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl z-20 ${
          isMobile
            ? "w-full transform transition-transform duration-300 ease-in-out"
            : sidebar
            ? nestedChildOpen
              ? "w-[1200px]"
              : childOpen
              ? "w-[800px]"
              : "w-[400px]"
            : "w-0"
        } transition-all duration-300 ease-in-out`}
        style={{
          transform: isMobile
            ? sidebar
              ? "translateY(0)"
              : "translateY(-100%)"
            : sidebar
            ? "translateX(0)"
            : "translateX(-100%)",
        }}
      >
        <Sidebar
          sidebar={sidebar}
          closeSidebar={() => isSidebar(false)}
          setChildOpen={setChildOpen}
          setNestedChildOpen={setNestedChildOpen}
        />
      </div>
    </>
  );
};
