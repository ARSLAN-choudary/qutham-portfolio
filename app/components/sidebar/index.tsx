"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        children: [
          { title: "Climate cup", link: "/games/football/climate-cup" },
        ],
      },
    ],
  },
  { title: "About Us", link: "/about" },
  { title: "Careers", link: "/careers" },
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
  const router = useRouter();
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState<string | null>(null);
  const [childMenu, setChildMenu] = useState<MenuItem[] | null>(null);
  const [nestedMenu, setNestedMenu] = useState<MenuItem[] | null>(null);
  const [childParent, setChildParent] = useState<string | null>(null);
  const [nestedParent, setNestedParent] = useState<string | null>(null);
  const [delayedChild, setDelayedChild] = useState(false);
  const [delayedNested, setDelayedNested] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState<"main" | "child" | "nested">(
    "main"
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const childSidebarRef = useRef<HTMLDivElement>(null);
  const nestedSidebarRef = useRef<HTMLDivElement>(null);
  const [firstOpen, setFirstOpen] = useState(true);
  const [activeNested, setActiveNested] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sidebar && firstOpen) {
      const timer = setTimeout(() => setFirstOpen(false), 300);
      return () => clearTimeout(timer);
    }
    if (!sidebar) setFirstOpen(true);
  }, [sidebar, firstOpen]);

  useEffect(() => setDelayedChild(!!childMenu), [childMenu]);
  useEffect(() => setDelayedNested(!!nestedMenu), [nestedMenu]);

  const resetMenus = React.useCallback(() => {
    setChildMenu(null);
    setNestedMenu(null);
    setChildParent(null);
    setNestedParent(null);
    setActiveMain(null);
    setActiveChild(null);
    setChildOpen(false);
    setNestedChildOpen(false);
    setCurrentView("main");
  }, [setChildOpen, setNestedChildOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside ALL sidebar sections
      const isOutsideMain =
        sidebarRef.current && !sidebarRef.current.contains(e.target as Node);

      const isOutsideChild =
        childSidebarRef.current &&
        !childSidebarRef.current.contains(e.target as Node);

      const isOutsideNested =
        nestedSidebarRef.current &&
        !nestedSidebarRef.current.contains(e.target as Node);

      // Only close if click is outside ALL sidebar sections
      if (isOutsideMain && isOutsideChild && isOutsideNested) {
        closeSidebar();
        resetMenus();
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar, closeSidebar, resetMenus]);

  // Navigation function
  const navigateToLink = (link?: string) => {
    if (link) {
      router.push(link);
      closeSidebar();
      resetMenus();
    }
  };

  const handleHover = (item: MenuItem, type: "main" | "child" | "nested") => {
    if (isMobile) return;

    if (type === "main") {
      setActiveMain(item.title);
      setActiveChild(null);
      setActiveNested(null);

      if (item.children && item.children.length > 0) {
        // Open child sidebar
        setChildMenu(item.children);
        setChildParent(item.title);
        setChildOpen(true);

        // Reset nested
        setNestedMenu(null);
        setNestedParent(null);
        setNestedChildOpen(false);
      } else {
        // No children → reset both child and nested
        setChildMenu(null);
        setChildParent(null);
        setChildOpen(false);

        setNestedMenu(null);
        setNestedParent(null);
        setNestedChildOpen(false);
      }
    } else if (type === "child") {
      setActiveChild(item.title);
      setActiveNested(null);

      if (item.children && item.children.length > 0) {
        // Open nested sidebar
        setNestedMenu(item.children);
        setNestedParent(item.title);
        setNestedChildOpen(true);
      } else {
        // No children → reset nested
        setNestedMenu(null);
        setNestedParent(null);
        setNestedChildOpen(false);
      }
    } else if (type === "nested") {
      setActiveNested(item.title);
    }
  };

  const handleClick = (item: MenuItem, type: "main" | "child" | "nested") => {
    if (!isMobile) {
      handleHover(item, type);
      if (!item.children && item.link) {
        navigateToLink(item.link);
      }
      return;
    }

    if (item.children) {
      if (type === "main") openChildMenu(item);
      else if (type === "child") openNestedMenu(item);
    } else if (item.link) {
      navigateToLink(item.link);
    }
  };

  const openChildMenu = (item: MenuItem) => {
    setChildMenu(item.children!);
    setChildParent(item.title);
    setCurrentView("child");
    setChildOpen(true);
  };

  const openNestedMenu = (item: MenuItem) => {
    setNestedMenu(item.children!);
    setNestedParent(item.title);
    setCurrentView("nested");
    setNestedChildOpen(true);
  };

  const closeSidebarAndReset = () => {
    closeSidebar();
    resetMenus();
  };

  const handleBack = () => {
    if (currentView === "nested") {
      setCurrentView("child");
      setNestedMenu(null);
      setNestedParent(null);
      setNestedChildOpen(false);
    } else {
      setCurrentView("main");
      setChildMenu(null);
      setChildParent(null);
      setChildOpen(false);
    }
  };

  const renderItems = (items: MenuItem[] | null) =>
    items?.map((item, idx) => {
      const isActive =
        (!isMobile && currentView === "main" && activeMain === item.title) ||
        (!isMobile && currentView === "child" && activeChild === item.title);

      const delay = `${idx * 150}ms`;

      return (
        <li
          key={item.title}
          onMouseEnter={() =>
            !isMobile &&
            (currentView === "main"
              ? handleHover(item, "main")
              : currentView === "child"
                ? handleHover(item, "child")
                : undefined)
          }
          onClick={() =>
            handleClick(
              item,
              currentView === "main"
                ? "main"
                : currentView === "child"
                  ? "child"
                  : "nested"
            )
          }
          className={`cursor-pointer w-full flex items-center justify-between transition-all relative ${isMobile ? "py-3" : ""
            }`}
          style={{ transitionDelay: delay }}
        >
          <span
            className={`font-medium w-full transition-colors ${isMobile ? "text-[20px]" : "text-[24px]"
              } ${isActive ? "text-white" : "text-[hsla(0,0%,100%,.7)]"}`}
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
      );
    });

  const renderMenu = () => {
    const items =
      currentView === "main"
        ? menuItems
        : currentView === "child"
          ? childMenu
          : nestedMenu;
    const parentTitle =
      currentView === "child"
        ? childParent
        : currentView === "nested"
          ? nestedParent
          : null;

    return (
      <div className={`pt-[50px] w-full h-full ${isMobile ? "px-6" : ""}`}>
        <div className={`${isMobile ? "px-4" : "mr-[50px] pl-[50px]"} w-auto`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-9 w-full">
            {isMobile && currentView !== "main" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white text-lg"
              >
                <Image
                  height={16}
                  width={16}
                  src="https://gully91.com/static/media/CaretRight.3db953d54f15d5534dea3a432f2c3360.svg"
                  alt="back"
                  className="rotate-180"
                />
              </button>
            )}
            <Image
              onClick={closeSidebarAndReset}
              className="cursor-pointer"
              height={22}
              width={22}
              src="https://gully91.com/static/media/crossX.5bb1d602be4fa51d25492ed042019732.svg"
              alt="close"
            />
          </div>

          {/* Child Title */}
          {isMobile && parentTitle && (
            <div className="mb-6 py-4 border-b-[0.8px] border-solid border-[hsla(0,0%,100%,.5)]">
              <h2 className="text-white text-[20px] leading-[21px] font-bold">
                {parentTitle}
              </h2>
            </div>
          )}

          {/* Menu Items */}
          <ul
            className={`flex flex-col ${isMobile ? "min-w-0 gap-6" : "min-w-[300px] gap-9"
              }`}
          >
            {renderItems(items)}
          </ul>
        </div>
      </div>
    );
  };

  const getMobileClass = () => {
    if (currentView === "main")
      return sidebar ? "translate-y-0" : "-translate-y-full";
    return "translate-y-0";
  };

  const renderDesktopSubmenu = (
    menu: MenuItem[] | null,
    parent: string | null,
    delayed: boolean,
    leftPosition: number,
    type: "child" | "nested",
    ref?: React.RefObject<HTMLDivElement | null>
  ) => (
    <div
      ref={ref}
      className={`fixed top-0 h-screen z-40 ${menu && sidebar
          ? "w-[400px] transition-[width] duration-[0.3s] ease-in"
          : "w-0"
        }`}
      style={{ left: leftPosition }}
    >
      <div className="pt-[50px] w-full h-full px-[50px]">
        <div
          className={`mb-9 py-9 border-b-[0.8px] border-solid border-[hsla(0,0%,100%,.5)] transition-opacity duration-500 ease-in-out ${menu && sidebar ? "opacity-100" : "opacity-0"
            }`}
        >
          <h2 className="text-white text-[24px] leading-[21px] font-bold">
            {parent}
          </h2>
        </div>
        <ul className="min-w-[300px] flex flex-col gap-9 overflow-hidden relative">
          {menu?.map((child, idx) => {
            const isActive =
              (type === "child" && activeChild === child.title) ||
              (type === "nested" && activeNested === child.title);

            return (
              <li
                key={child.title}
                onMouseEnter={() => handleHover(child, type)}
                onClick={() => handleClick(child, type)}
                className="cursor-pointer w-full flex items-center justify-between transition-all relative ease-in"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <span
                  className={`text-[24px] transition-transform duration-300 ease-in-out relative leading-[21px] font-medium w-full ${isActive ? "text-white" : "text-[hsla(0,0%,100%,.7)]"
                    }`}
                  style={{
                    transform: delayed ? "translateX(0)" : "translateX(-1rem)",
                  }}
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
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 w-full h-full z-40 overflow-hidden"
        >
          <div
            className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-300 ease-in-out ${getMobileClass()} ${currentView !== "main" ? "hidden" : ""
              }`}
          >
            {renderMenu()}
          </div>

          <div
            className={`absolute top-0 left-0 w-full h-full ${currentView === "child" ? "block" : "hidden"
              }`}
          >
            {renderMenu()}
          </div>

          <div
            className={`absolute top-0 left-0 w-full h-full ${currentView === "nested" ? "block" : "hidden"
              }`}
          >
            {renderMenu()}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-screen w-[400px] z-40 transform transition-transform duration-300 ease-in-out ${sidebar ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {renderMenu()}
          </div>
          {renderDesktopSubmenu(
            childMenu,
            childParent,
            delayedChild,
            400,
            "child",
            childSidebarRef
          )}
          {renderDesktopSubmenu(
            nestedMenu,
            nestedParent,
            delayedNested,
            800,
            "nested",
            nestedSidebarRef
          )}
        </>
      )}
    </>
  );
};
