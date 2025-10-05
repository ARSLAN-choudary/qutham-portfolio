"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export const FeaturedEvents = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const events = [
    {
      id: 1,
      title: "PUBG Global",
      image: "/uic-mobile.webp",
      views: "2.5M",
      players: "120",
      matches: "48",
    },
    {
      id: 2,
      title: "Valorant Masters",
      image: "/uic-mobile.webp",
      views: "1.2M",
      players: "80",
      matches: "30",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Run only on desktop
    if (window.innerWidth < 768) return;

    let translateX = 0;
    let isLocked = false;
    let scrollDistance = container.scrollWidth - window.innerWidth;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      isLocked = true;
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
      isLocked = false;
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top <= window.innerHeight * 0.5 &&
        rect.bottom >= window.innerHeight * 0.5;

      if (!inView) {
        if (isLocked) unlockScroll();
        return;
      }

      const atEnd = Math.abs(translateX) >= scrollDistance - 2;
      const atStart = translateX >= -2;

      // Let natural scroll pass at edges
      if ((e.deltaY > 0 && atEnd) || (e.deltaY < 0 && atStart)) {
        if (isLocked) unlockScroll();
        return;
      }

      if (!isLocked) lockScroll();
      e.preventDefault();

      translateX -= e.deltaY * 0.8;
      translateX = Math.min(0, Math.max(-scrollDistance, translateX));
      container.style.transform = `translateX(${translateX}px)`;
    };

    const handleResize = () => {
      scrollDistance = container.scrollWidth - window.innerWidth;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      unlockScroll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-screen w-full mt-[50px] h-max min-h-screen md:h-screen overflow-hidden"
    >
      <div className="h-max md:h-full relative">
        <div className="md:sticky top-[50px] md:top-[64px] h-max md:h-[calc(100vh-64px)] pb-[50px] bg-[url('/bg-mobile.webp')] md:bg-[url('/bg-desktop.webp')] bg-[position:50%_center] md:bg-[position:50%] bg-no-repeat bg-[length:100%_100%] flex justify-start overflow-hidden px-3 py-9 w-full">
          <div
            ref={containerRef}
            className="flex items-center flex-col gap-9 mx-auto md:flex-row md:gap-[176px] will-change-transform transition-transform duration-200 ease-out"
          >
            <h2 className="uppercase z-10">
              <span className="text-[42px] md:text-[124px] font-[900] leading-[120%] text-shadow-[0_0_2px_#cdff00,0_0_5px_#cdff00,0_0_4px_#cdff00]">
                Featured <br /> Events
              </span>
            </h2>

            <ul className="flex flex-col gap-[26px] md:flex-row md:items-center md:gap-[151px] md:mb-[-100px] will-change-transform">
              {events.map((event) => (
                <li key={event.id} className="flex-[0_0_auto]">
                  <div
                    className="min-w-[336px] w-full bg-[position:50%] bg-no-repeat bg-cover rounded-[14px] cursor-pointer flex flex-col h-[216px] justify-end py-[30px] px-3 relative md:rounded-[54px] md:h-[548px] md:p-[50px] md:w-[1234px]"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  >
                    <div className="flex flex-start flex-col gap-6 w-full md:gap-[50px]">
                      <div className="flex flex-col gap-1.5 h-full md:gap-5">
                        <h3 className="text-white font-bold text-[18px] md:text-[48px] leading-[100%]">
                          {event.title}
                        </h3>
                        <span className="flex items-center gap-1 md:gap-3 cursor-pointer">
                          <span className="text-[#cdff00] text-[12px] md:text-[30px] font-bold leading-[100%]">
                            Watch now
                          </span>
                          <Image
                            className="h-3 w-3 md:!h-[28px] md:!w-[28px]"
                            width={12}
                            height={12}
                            src="/right.svg"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="flex gap-[30px] md:gap-[62px]">
                        <div className="flex flex-col gap-1.5 md:gap-3">
                          <h4 className="text-white text-[16px] md:text-[38px] font-[900] leading-[100%] text-shadow-[0_3px_6px_rgba(0,0,0,.58)]">
                            {event.views}
                          </h4>
                          <span className="text-white text-[12px] md:text-[24px] font-normal leading-[100%]">
                            Views
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-white text-[16px] md:text-[38px] font-[900] leading-[100%] text-shadow-[0_3px_6px_rgba(0,0,0,.58)]">
                            {event.players}
                          </h4>
                          <span className="text-white text-[12px] md:text-[24px] font-normal leading-[100%]">
                            Players
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-white text-[16px] md:text-[38px] font-[900] leading-[100%] text-shadow-[0_3px_6px_rgba(0,0,0,.58)]">
                            {event.matches}
                          </h4>
                          <span className="text-white text-[12px] md:text-[24px] font-normal leading-[100%]">
                            Matches
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block min-w-[1234px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
