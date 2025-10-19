"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation} from "swiper/modules";
import { gsap } from "gsap";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import type { Swiper as SwiperType } from "swiper/types";

interface Card {
  id: number;
  name: string;
  role: string;
  workWithUs?: string;
  image: string;
}

interface TeamCardSliderProps {
  cards?: Card[];
}

function TeamCardSlider({ cards }: TeamCardSliderProps) {
const sample: Card[] = [

  { id: 1, name: "Ceo Fahad Khan", role: "Ceo",  image: "/team-card/ceo.png" },
  { id: 1, name: "Iqra Hammed", role: "Human Resources", workWithUs: "5 Years", image: "/team-card/hr.png" },
  { id: 2, name: "Bilal Ahmed", role: "Full Stack Developer", workWithUs: "3 Years", image: "/team-card/bilal.png" },
  { id: 3, name: "Arslan Aslam", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/arslan.png" },
  { id: 4, name: "Asad Ali", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/asad.png" },
  { id: 5, name: "Rafey Talha", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/aqeel.png" },
  { id: 5, name: "Rafey Talha", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/tariq.png" },
  { id: 5, name: "Rafey Talha", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/rafey.png" },
  { id: 6, name: "Maaz Bukhari", role: "Frontend Developer", workWithUs: "3 Years", image: "/team-card/maaz.png" },
  { id: 7, name: "Ahmad Dhilxn", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/ahmed.png" },
  { id: 8, name: "Faizan", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/faizan.png" },
  { id: 9, name: "Sabahat Yaseen", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/sabaht.png" },
  { id: 10, name: "Aqsa", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/aqsa.png" },
  { id: 11, name: "Sidra", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/sidra.png" },
  { id: 12, name: "Hina", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/hina.png" },
  { id: 13, name: "Awais", role: "Frontend Developer", workWithUs: "2 Years", image: "/team-card/awais.png" },
  { id: 14, name: "Hassam", role: "Backend Developer", workWithUs: "2 Years", image: "/team-card/hassam.png" },
  { id: 15, name: "Huzaifa", role: "Backend Developer", workWithUs: "2 Years", image: "/team-card/huzaifa.png" },
  { id: 16, name: "Ali Randhawa", role: "Game Developer", workWithUs: "2 Years", image: "/team-card/ali.png" },
  { id: 17, name: "Farhad", role: "Graphics Designer", workWithUs: "3 Years", image: "/team-card/farhad.png" },
  { id: 18, name: "Farhad", role: "Graphics Designer", workWithUs: "3 Years", image: "/team-card/g1.png" },
  { id: 19, name: "Areeba", role: "Graphics Designer", workWithUs: "3 Years", image: "/team-card/arreba.png" },
  { id: 20, name: "Ayesha", role: "Graphics Designer", workWithUs: "3 Years", image: "/team-card/ayesha.png" },
  { id: 21, name: "Shaima", role: "Graphics Designer", workWithUs: "3 Years", image: "/team-card/shaima.png" },
  { id: 22, name: "Kashan Sheikh", role: "Flutter App Developer", workWithUs: "2 Years", image: "/team-card/kashan.png" },
];


  const items: Card[] = cards && cards.length ? cards : sample;

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
const swiperRef = useRef<SwiperType | null>(null);

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
        className="absolute left-2 sm:left-[-20px] lg:left-[-40px] md:left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 sm:p-3 rounded-full opacity-35 hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 cursor-pointer"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        ref={nextRef}
        className="absolute right-2 sm:right-[-20px] lg:right-[-40px] md:right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 sm:p-3 rounded-full opacity-35 hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 cursor-pointer"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 1200, disableOnInteraction: false }}
        speed={900}
        breakpoints={{
          480: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
           1280: { slidesPerView: 5, spaceBetween: 20 }, 
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }, 0);
        }}
        onAfterInit={(swiper: SwiperType) => {
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
              className="relative group overflow-hidden rounded-2xl shadow-lg bg-white min-h-[300px] sm:min-h-[300px]"
            >
              <Image
                src={dev.image}
                alt={dev.name}
                width={400}
                height={340}
                className="w-full h-[300px] sm:h-[300px]  object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="backdrop-blur-md bg-white/20 p-4 rounded-t-2xl text-white">
                  <h4 className="text-base sm:text-lg font-semibold">{dev.name}</h4>
                  <p className="text-xs sm:text-sm opacity-90">{dev.role}</p>
                   {dev.role.toLowerCase() !== "ceo" && (
            <p className="text-xs opacity-80">Work With Us: {dev.workWithUs}</p>
          )}
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
