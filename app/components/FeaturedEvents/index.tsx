"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Event {
  id: number;
  title: string;
  views: string;
  players: string;
  matches: string;
  image: string;
}

gsap.registerPlugin(ScrollTrigger);

export const FeaturedEvents = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Ultimate Indoor Championship",
      views: "294k",
      players: "200+",
      matches: "50+",
      image: "/uic-mobile.webp",
    },
    {
      id: 2,
      title: "Pro League Finals",
      views: "412k",
      players: "250+",
      matches: "60+",
      image: "/uic-mobile.webp",
    },
    {
      id: 3,
      title: "Summer Cup 2025",
      views: "350k",
      players: "180+",
      matches: "45+",
      image: "/uic-mobile.webp",
    },
    {
      id: 4,
      title: "Winter Clash",
      views: "500k",
      players: "300+",
      matches: "70+",
      image: "/uic-mobile.webp",
    },
    {
      id: 5,
      title: "Champions Arena",
      views: "270k",
      players: "190+",
      matches: "40+",
      image: "/uic-mobile.webp",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.max(0, totalWidth - viewportWidth);

    if (scrollDistance <= 0) return;

    let isActive = false;
    let animating = false;
    let lastUnlockTime = 0;
    let activationTime = 0;

    // blocker overlay to stop outside interactions
    const blocker = document.createElement("div");
    Object.assign(blocker.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "9999",
      background: "transparent",
    });

    const activateBlocker = () => {
      blocker.style.pointerEvents = "auto";
      if (!blocker.parentNode) document.body.appendChild(blocker);
    };

    const deactivateBlocker = () => {
      blocker.style.pointerEvents = "none";
      if (blocker.parentNode) blocker.parentNode.removeChild(blocker);
    };

    const lockSection = () => {
      isActive = true;
      activationTime = Date.now();
      activateBlocker();
      document.body.style.overflow = "hidden";
    };

    const unlockSection = () => {
      isActive = false;
      deactivateBlocker();
      document.body.style.overflow = "";
      lastUnlockTime = Date.now();
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.6 &&
        rect.bottom > window.innerHeight * 0.4;

      // prevent rapid reactivation
      if (Date.now() - lastUnlockTime < 300) return;

      // activate early when entering
      if (inView && !isActive) {
        lockSection();
        // restore section top in view if overshoot happened
        window.scrollTo({
          top: window.scrollY + rect.top - 50,
          behavior: "instant" as ScrollBehavior,
        });
      }

      // skip if inactive
      if (!isActive) return;

      // absorb the first few deltas immediately after activation
      if (Date.now() - activationTime < 150) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const currentX =
        parseFloat(gsap.getProperty(container, "x") as string) || 0;
      const delta = e.deltaY;
      let newX = currentX - delta * 2;

      newX = Math.max(-scrollDistance, Math.min(0, newX));

      gsap.to(container, {
        x: newX,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          animating = false;
        },
      });

      const isAtEnd = Math.abs(newX) >= scrollDistance - 10;
      const isAtStart = newX >= -10;

      if ((delta > 0 && isAtEnd) || (delta < 0 && isAtStart)) {
        unlockSection();

        // smooth continuation of native scroll
        requestAnimationFrame(() => {
          window.scrollBy({
            top: delta > 0 ? 2 : -2,
            behavior: "smooth",
          });
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      deactivateBlocker();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-screen w-full mt-[50px] h-screen overflow-hidden"
    >
      <div className="h-full relative">
        <div className="sticky top-[50px] md:top-[64px] h-[calc(100vh-50px)] md:h-[calc(100vh-64px)] pb-[50px] bg-[url('/bg-mobile.webp')] bg-[position:50%] bg-no-repeat bg-[length:100%_100%] flex justify-start overflow-hidden px-3 py-9 w-full">
          <div
            ref={containerRef}
            className="flex items-center flex-col gap-9 mx-auto md:flex-row md:gap-[176px] will-change-transform"
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
          </div>
        </div>
      </div>
    </section>
  );
};
