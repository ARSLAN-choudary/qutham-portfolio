"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Sidebar } from "../sidebar";
import Link from "next/link";

export const Header = () => {
  const [sidebar, isSidebar] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [nestedChildOpen, setNestedChildOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="h-[50px] lg:h-[64px] bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl w-full fixed top-0 z-10 flex items-center justify-between px-6 lg:px-[50px]">
        
        {/* LEFT: Hamburger */}
        <div
          onClick={() => isSidebar(!sidebar)}
          className="cursor-pointer flex flex-col justify-center"
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

        {/* CENTER: Logo */}
        <Link href="/" className="cursor-pointer flex items-center justify-center">

          <Image
  src="\header\logo.svg"
  alt="logo"
  width={180}
  height={0}
  className="md:w-[240px] w-[180px]  fixed top-0 "
/>
        </Link>
        {/* RIGHT: Icons */}
        <div className="flex items-center gap-3 lg:gap-6">
          <Link href="/careers" className="cursor-pointer">
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
              alt="contact"
              className="cursor-pointer"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </Link>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[hsla(0,0%,8%,.4)] backdrop-blur-2xl z-20 
        ${isMobile
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
