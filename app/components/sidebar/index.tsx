"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface MenuItem {
  title: string;
  link?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Home", link: "/" },
  {
    title: "Games",
    children: [
      { title: "Cricket", link: "/games/cricket" },
      {
        title: "Football",
        link: "/games/football",
        children: [{ title: "Climate cup" }],
      },
    ],
  },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

export const Sidebar = ({
  sidebar,
  closeSidebar,
  setChildOpen,
  setNestedChildOpen,
}: {
  sidebar: boolean;
  closeSidebar: () => void;
  setChildOpen: (open: boolean) => void;
  setNestedChildOpen: (open: boolean) => void;
}) => {
  const [activeMainItem, setActiveMainItem] = useState<string | null>(null);
  const [activeChildItem, setActiveChildItem] = useState<string | null>(null);
  const [childMenu, setChildMenu] = useState<MenuItem[] | null>(null);
  const [childMenuParent, setChildMenuParent] = useState<string | null>(null);
  const [nestedChildMenu, setNestedChildMenu] = useState<MenuItem[] | null>(
    null
  );
  const [nestedChildParent, setNestedChildParent] = useState<string | null>(
    null
  );
  const [delayedChildMenu, setDelayedChildMenu] = useState<boolean>(false);
  const [lastChildMenu, setLastChildMenu] = useState<boolean>(false);
  // const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (childMenu) {
      setTimeout(() => setDelayedChildMenu(true), 300);
    } else {
      setDelayedChildMenu(false);
    }
  }, [childMenu]);

  useEffect(() => {
    if (nestedChildMenu) {
      setTimeout(() => setLastChildMenu(true), 300);
    } else {
      setLastChildMenu(false);
    }
  }, [nestedChildMenu]);

  useEffect(() => {
    if (!sidebar) {
      setChildMenu(null);
      setChildMenuParent(null);
      setNestedChildMenu(null);
      setNestedChildParent(null);
      setActiveMainItem(null);
      setActiveChildItem(null);
    }
  }, [sidebar]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
        setChildMenu(null);
        setChildMenuParent(null);
        setNestedChildMenu(null);
        setNestedChildParent(null);
        setActiveMainItem(null);
        setActiveChildItem(null);
        setChildOpen(false);
        setNestedChildOpen(false);
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar, closeSidebar, setChildOpen, setNestedChildOpen]);

  const handleMainHover = (item: MenuItem) => {
    setActiveMainItem(item.title);
    if (item.children) {
      setChildMenu(item.children);
      setChildMenuParent(item.title);
      setNestedChildMenu(null);
      setNestedChildParent(null);
      setActiveChildItem(null);
      setChildOpen(true);
      setNestedChildOpen(false);
    } else {
      setChildMenu(null);
      setChildMenuParent(null);
      setNestedChildMenu(null);
      setNestedChildParent(null);
      setChildOpen(false);
      setNestedChildOpen(false);
    }
  };

  const handleChildHover = (child: MenuItem) => {
    setActiveChildItem(child.title);
    if (child.children) {
      setNestedChildMenu(child.children);
      setNestedChildParent(child.title);
      setNestedChildOpen(true);
    } else {
      setNestedChildMenu(null);
      setNestedChildParent(null);
      setNestedChildOpen(false);
    }
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-[400px] z-40 transform transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-[50px] w-full h-full">
          <div className="mr-[50px] pl-[50px] w-auto">
            <div className="flex items-center justify-between mb-9 w-full">
              <span></span>
              <Image
                onClick={closeSidebar}
                className="cursor-pointer"
                height={22}
                width={22}
                src="https://gully91.com/static/media/crossX.5bb1d602be4fa51d25492ed042019732.svg"
                alt="close"
              />
            </div>
            <ul className="min-w-[300px] flex flex-col gap-9">
              {menuItems.map((item) => (
                <li
                  key={item.title}
                  onMouseEnter={() => handleMainHover(item)}
                  onClick={() => handleMainHover(item)}
                  className="cursor-pointer w-full flex items-center justify-between"
                >
                  <span
                    className={`text-[24px] leading-[21px] font-medium w-full transition-colors ${
                      activeMainItem === item.title
                        ? "text-white"
                        : "text-[hsla(0,0%,100%,.7)]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.children && (
                    <Image
                      height={14}
                      width={14}
                      src="https://gully91.com/static/media/CaretRight.3db953d54f15d5534dea3a432f2c3360.svg"
                      alt="arrow"
                      className="transition-transform duration-300"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-[400px] h-screen z-40
          ${
            childMenu && sidebar
              ? "w-[400px] transition-[width] duration-[0.3s] ease-in"
              : "w-0"
          }`}
      >
        <div
          className={`pt-[50px] w-full h-full px-[50px] ${
            childMenu && sidebar ? "px-[50px]" : "!px-0"
          }`}
        >
          <div
            className={`mb-9 py-9 border-b-[0.8px] border-solid border-[hsla(0, 0%, 100%, .5)] transition-opacity duration-500 ease-in-out
          ${childMenu && sidebar ? "opacity-100" : "opacity-0"}`}
          >
            <h2 className="text-white text-[24px] leading-[21px] font-bold">
              {childMenuParent}
            </h2>
          </div>
          <ul className="min-w-[300px] flex flex-col gap-9 overflow-hidden relative">
            {childMenu?.map((child, index) => (
              <li
                key={child.title}
                onMouseEnter={() => handleChildHover(child)}
                onClick={() => handleChildHover(child)}
                className={`cursor-pointer w-full transition-all duration-800 ease-in-out relative flex items-center justify-between ${
                  delayedChildMenu ? "opacity-100 left-0" : "opacity-0 -left-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span
                  className={`text-[24px] leading-[21px] font-medium w-full transition-colors ${
                    activeChildItem === child.title
                      ? "text-white"
                      : "text-[hsla(0,0%,100%,.7)]"
                  }`}
                >
                  {child.title}
                </span>
                {child.children && (
                  <Image
                    height={14}
                    width={14}
                    src="https://gully91.com/static/media/CaretRight.3db953d54f15d5534dea3a432f2c3360.svg"
                    alt="arrow"
                    className="transition-transform duration-300"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`fixed top-0 left-[800px] h-screen z-40
          ${
            nestedChildMenu && sidebar
              ? "w-[400px] transition-[width] duration-[0.3s] ease-in"
              : "w-0"
          }`}
      >
        <div
          className={`pt-[50px] w-full h-full px-[50px] ${
            nestedChildMenu && sidebar ? "px-[50px]" : "!px-0"
          }`}
        >
          <div
            className={`mb-9 py-9 border-b-[0.8px] border-solid border-[hsla(0, 0%, 100%, .5)] transition-opacity duration-500 ease-in-out
          ${nestedChildMenu && sidebar ? "opacity-100" : "opacity-0"}`}
          >
            <h2 className="text-white text-[24px] leading-[21px] font-bold">
              {nestedChildParent}
            </h2>
          </div>
          <ul className="min-w-[300px] flex flex-col gap-9 overflow-hidden relative">
            {nestedChildMenu?.map((child, index) => (
              <li
                key={child.title}
                className={`cursor-pointer w-full transition-all duration-800 ease-in-out relative flex items-center justify-between ${
                  lastChildMenu ? "opacity-100 left-0" : "opacity-0 -left-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="text-[24px] leading-[21px] font-medium w-full transition-colors text-[hsla(0,0%,100%,.7)]">
                  {child.title}
                </span>
                {child.children && (
                  <Image
                    height={14}
                    width={14}
                    src="https://gully91.com/static/media/CaretRight.3db953d54f15d5534dea3a432f2c3360.svg"
                    alt="arrow"
                    className="transition-transform duration-300"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
