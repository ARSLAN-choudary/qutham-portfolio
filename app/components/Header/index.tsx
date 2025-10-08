"use client";
import Image from "next/image";
import React, {  useState } from "react";
import { Sidebar } from "../sidebar";
import Link from "next/link";

export const Header = () => {
  const [sidebar, isSidebar] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [nestedChildOpen, setNestedChildOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


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

          <Link href='/' className="cursor-pointer lg:mx-auto">
            <Image
              className="!h-[24px] lg:!h-[32px]"
              height={32}
              width={115}
              src="qutham-logo.svg"
              alt="logo"
            />
          </Link>

          <div className="flex items-center ml-auto gap-3 lg:gap-6 mr-[45px]">
            <Link
              href="/careers"

              className="relative cursor-pointer"
            >

              <Image
                width={24}
                height={24}
                src="/header/briefcase-icon.svg"
                alt="career"
              />
            </Link>

            <Link href="/contact">
              <Image
                width={24}
                height={24}
                src="/header/telephone_11311763.png"
                alt=""
                className="cursor-pointer"
                style={{ filter: "invert(1) brightness(2)" }}
              />
            </Link>
          </div>
        </div>
      </div>


      <div
        className={`fixed top-0 left-0 h-screen bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl z-20 ${isMobile
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
