"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { gsap } from "gsap";
import Image from "next/image";
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
    { id: 10, name: "Iqra Hammed", role: "Human Resources", experience: "3 Years", image: "/team-card/hr.jpeg" },
    { id: 1, name: "Bilal Ahmed", role: "Full Stack Developer", experience: "4 Years", image: "/team-card/bilal.jpeg" },
    { id: 9, name: "Ahmad Dhilxn", role: "Frontend Developer", experience: "2 Years", image: "/team-card/ahmad.jpeg" },
    { id: 2, name: "Faizan", role: "Frontend Developer", experience: "2 Years", image: "/team-card/faizan.jpeg" },
    { id: 5, name: "Sabahat Yaseen", role: "Frontend Developer", experience: "2 Years", image: "/team-card/sabaht.jpeg" },
    { id: 6, name: "Aqsa", role: "Frontend Developer", experience: "2 Years", image: "/team-card/aqsa.jpeg" },
    { id: 7, name: "Sidra", role: "Frontend Developer", experience: "2 Years", image: "/team-card/sidra.jpeg" },
    { id: 8, name: "Hina", role: "Frontend Developer", experience: "2 Years", image: "/team-card/hina.jpeg" },
    { id: 8, name: "Awais", role: "Frontend Developer", experience: "2 Years", image: "/team-card/awais.jpeg" },
    { id: 3, name: "Hassam", role: "Backend Developer", experience: "2 Years", image: "/team-card/hassam.jpeg" },
    { id: 3, name: "Huzaifa", role: "Backend Developer", experience: "2 Years", image: "/team-card/huzaifa.jpeg" },
    { id: 4, name: "Ali Randhawa", role: "Game Developer", experience: "2 Years", image: "/team-card/ali.jpeg" },
    { id: 11, name: "Farhad", role: "Graphics Designer", experience: "3 Years", image: "/team-card/farhad.jpeg" },
    { id: 12, name: "Farhad", role: "Graphics Designer", experience: "3 Years", image: "/team-card/g1.jpeg" },
    { id: 13, name: "Areeba", role: "Graphics Designer", experience: "3 Years", image: "/team-card/arreba.jpeg" },
    { id: 14, name: "Ayesha", role: "Graphics Designer", experience: "3 Years", image: "/team-card/ayesha.jpeg" },
    { id: 14, name: "Shaima", role: "Graphics Designer", experience: "3 Years", image: "/team-card/shaima.jpeg" },
    { id: 14, name: "Kashan Sheikh", role: "Flutter App developer", experience: "2 Years", image: "/team-card/kashan.jpeg" },
  ];

  const items = cards && cards.length ? cards : sample;

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const swiperRef = useRef<unknown>(null);

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
    <div className="relative w-full max-w-[1200px] mx-auto py-10 px-4 sm:px-5">
      {/* Left Arrow */}
      <button
        ref={prevRef}
        className="absolute left-2 sm:left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="black" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        ref={nextRef}
        className="absolute right-2 sm:right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="black" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        touchRatio={1}
        touchAngle={45}
        simulateTouch={true}
        shortSwipes={true}
        longSwipesRatio={0.5}
        longSwipesMs={500}
        followFinger={true}
        allowTouchMove={true}
        resistance={true}
        resistanceRatio={0.85}
        breakpoints={{
          480: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Store swiper instance
          swiperRef.current = swiper;

          // Delay the navigation setup to ensure refs are available
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }, 0);
        }}
        onAfterInit={(swiper) => {
          // Re-initialize navigation after swiper is fully initialized
          setTimeout(() => {
            if (swiper.navigation && swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 10);
        }}
        className="py-6"
      >
        {items.map((dev, i) => (
          <SwiperSlide key={dev.id}>
            <div
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative group overflow-hidden rounded-2xl shadow-lg bg-white min-h-[300px] sm:min-h-[340px]"
            >
              {/* Developer Image */}
              <Image
                src={dev.image}
                alt={dev.name}
                width={400}
                height={340}
                className="w-full h-[300px] sm:h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Glassy Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="backdrop-blur-md bg-white/20 p-4 rounded-t-2xl text-white">
                  <h4 className="text-base sm:text-lg font-semibold">{dev.name}</h4>
                  <p className="text-xs sm:text-sm opacity-90">{dev.role}</p>
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