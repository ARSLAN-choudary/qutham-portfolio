"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export const FeaturedEvents = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const TOTAL_X = 5000;
  const THRESHOLD_X = 3000;

  const V_TO_H_RATIO = 1;

  const events = [
    {
      id: 1,
      image: "/cards/cricket.jpg",
    },
    {
      id: 2,
      image: "/cards/in-office.jpg",
    },
    {
      id: 3,
      image: "/cards/dinner.jpeg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;
    if (window.innerWidth < 768) return;

    // ----- STATE -----
    let translateX = 0;
    let isLocked = false;
    let mode: "A" | "B" = "A";
    let phaseBStartScrollY = 0;

    let actualScrollable = Math.max(
      0,
      container.scrollWidth - window.innerWidth
    );
    let MAX_X = Math.min(TOTAL_X, actualScrollable);
    let THRESH_X_CLAMPED = Math.min(THRESHOLD_X, MAX_X);
    let PHASE_B_REMAINING = Math.max(0, MAX_X - THRESH_X_CLAMPED);

    const lockScroll = () => {
      if (!isLocked) {
        document.body.style.overflow = "hidden";
        isLocked = true;
      }
    };
    const unlockScroll = () => {
      if (isLocked) {
        document.body.style.overflow = "";
        isLocked = false;
      }
    };
    const applyTransform = () => {
      container.style.transform = `translateX(${translateX}px)`;
    };

    // Changed from 0.5 to 0.6 to start animation when section is lower on screen
    const centerInView = () => {
      const r = section.getBoundingClientRect();
      return (
        r.top <= window.innerHeight * 0.1 && // Changed from 0.5 to 0.6
        r.bottom >= window.innerHeight * 0.1  // Changed from 0.5 to 0.6
      );
    };

    const partlyInView = () => {
      const r = section.getBoundingClientRect();
      return r.bottom >= 0 && r.top <= window.innerHeight;
    };

    const switchToA = () => {
      mode = "A";
      lockScroll();
      translateX = Math.min(0, Math.max(-MAX_X, translateX));
      applyTransform();
    };

    const switchToB = () => {
      mode = "B";
      translateX = -THRESH_X_CLAMPED;
      applyTransform();
      unlockScroll();
      phaseBStartScrollY = window.scrollY;
    };

    const handleWheelA = (e: WheelEvent) => {
      if (mode !== "A") return;

      const inCenter = centerInView();
      if (!inCenter) {
        unlockScroll();
        return;
      }

      const atStart = translateX >= -2;
      const atEnd = Math.abs(translateX) >= MAX_X - 2;

      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
        unlockScroll();
        return;
      }

      lockScroll();
      e.preventDefault();

      translateX -= e.deltaY * 0.8;
      translateX = Math.min(0, Math.max(-MAX_X, translateX));
      applyTransform();

      if (Math.abs(translateX) >= THRESH_X_CLAMPED && e.deltaY > 0) {
        switchToB();
      }
    };

    const handleScrollB = () => {
      if (mode !== "B") return;
      if (!partlyInView()) return;

      const deltaY = window.scrollY - phaseBStartScrollY;

      const mapped = Math.max(
        0,
        Math.min(PHASE_B_REMAINING, deltaY * V_TO_H_RATIO)
      );
      translateX = -THRESH_X_CLAMPED - mapped;
      translateX = Math.max(-MAX_X, translateX);
      applyTransform();

      // ----- REVERSE behavior -----

      if (deltaY <= 0 || mapped <= 0 + 0.5) {
        translateX = -THRESH_X_CLAMPED;
        applyTransform();
        switchToA();
      }
    };

    // ----- resize recompute -----
    const handleResize = () => {
      actualScrollable = Math.max(0, container.scrollWidth - window.innerWidth);
      MAX_X = Math.min(TOTAL_X, actualScrollable);
      THRESH_X_CLAMPED = Math.min(THRESHOLD_X, MAX_X);
      PHASE_B_REMAINING = Math.max(0, MAX_X - THRESH_X_CLAMPED);
      translateX = Math.min(0, Math.max(-MAX_X, translateX));
      applyTransform();
    };

    switchToA();

    window.addEventListener("wheel", handleWheelA, { passive: false });
    window.addEventListener("scroll", handleScrollB, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheelA);
      window.removeEventListener("scroll", handleScrollB);
      window.removeEventListener("resize", handleResize);
      unlockScroll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-screen w-full h-max min-h-screen md:max-h-max overflow-hidden bg-[linear-gradient(180deg,hsl(60_11%_12%)_1%,hsl(31_22%_12%)_10%,hsl(11_24%_14%)_19%,hsl(344_23%_14%)_28%,hsl(300_18%_13%)_36%,hsl(292_19%_15%)_44%,hsl(285_20%_18%)_53%,hsl(278_21%_20%)_61%,hsl(271_22%_22%)_69%,hsl(272_20%_18%)_77%,hsl(272_17%_13%)_85%,hsl(275_13%_9%)_93%,hsl(0_0%_3%)_100%)] "
    >
      <div className="h-max md:h-full relative">
        {/* Added padding-top to push the content lower */}
        <div className="md:sticky top-[50px] md:top-[64px] h-max md:h-[calc(100vh-64px)] pb-[50px] pt-[6vh] md:pt-[2vh] bg-[url('/bg-mobile.webp')] md:bg-[url('/bg-desktop.webp')] bg-[position:50%_center] md:bg-[position:50%] bg-no-repeat bg-[length:100%_100%] flex justify-start overflow-hidden px-3 py-9 w-full">
          <div
            ref={containerRef}
            className="flex items-center flex-col gap-9 mx-auto md:flex-row md:gap-[176px] will-change-transform transition-transform duration-200 ease-out"
          >
            <h2 className="uppercase z-10">
              <span className="text-[42px] md:text-[124px] font-[900] leading-[120%] [text-shadow:0_0_2px_#cdff00,0_0_5px_#cdff00,0_0_4px_#cdff00]">
                Our <br /> Events
              </span>
            </h2>

            <ul className="flex flex-col gap-[26px] md:flex-row md:items-center md:gap-[151px] md:mb-[-100px] will-change-transform">
              {events.map((event) => (
                <li key={event.id} className="flex-[0_0_auto]">
                  <div
                    className="min-w-[336px] w-full bg-[position:50%] bg-no-repeat bg-cover rounded-[14px] cursor-pointer flex flex-col h-[216px] justify-end py-[30px] px-3 relative md:rounded-[54px] md:h-[548px] md:p-[50px] md:w-[1234px]"
                  >
                    <div className="absolute -z-[1] bottom-0 left-0 bg-no-repeat cursor-pointer">
                      <Image
                        className="w-[336px] md:w-[1234px] h-[216px] md:h-[548px] object-cover rounded-xl"
                        width={1234}
                        height={548}
                        src={event.image}
                        alt=""
                      />
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