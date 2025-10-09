"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/navigation";

interface Card {
  id: number;
  name: string;
  role: string;
  experience: string;
  image: string;
}

interface TeamCardSliderProps {
  cards?: Card[];
}

function TeamCardSlider({ cards }: TeamCardSliderProps) {
  const sample = [
    { id: 1, name: "Farhad", role: "Graphics Designer", experience: "3 Years", image: "/services/Group 700.png" },
    { id: 2, name: "Sara Khan", role: "UI/UX Designer", experience: "2 Years", image: "/dev2.jpg" },
    { id: 3, name: "Bilal Ahmed", role: "Backend Developer", experience: "4 Years", image: "/dev3.jpg" },
    { id: 4, name: "Ayesha Malik", role: "Full Stack Dev", experience: "5 Years", image: "/dev4.jpg" },
    { id: 5, name: "Usman Tariq", role: "Mobile Engineer", experience: "3 Years", image: "/dev5.jpg" },
  ];

  const items = cards && cards.length ? cards : sample;

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // 🌀 Animate cards on mount using GSAP
  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-10 px-5">
      {/* Left Arrow */}
      <button
        ref={prevRef}
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="black" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        ref={nextRef}
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="black" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="py-6"
      >
        {items.map((dev, i) => (
  <SwiperSlide key={dev.id}>
    <div
      ref={(el) => {
        if (el) cardRefs.current[i] = el;
      }}
      className="relative group overflow-hidden rounded-2xl shadow-lg bg-white min-h-[340px]"
    >
      {/* Developer Image */}
      <img
        src={dev.image}
        alt={dev.name}
        className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Glassy Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="backdrop-blur-md bg-white/20 p-4 rounded-t-2xl text-white">
          <h4 className="text-lg font-semibold">{dev.name}</h4>
          <p className="text-sm opacity-90">{dev.role}</p>
          <p className="text-xs opacity-80">{dev.experience} Experience</p>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}

      </Swiper>
    </div>
  );
}

export default TeamCardSlider;
