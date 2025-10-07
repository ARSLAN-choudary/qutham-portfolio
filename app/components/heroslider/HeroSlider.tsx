"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./heroslider.css";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      title: "GullyOS: Next-Gen Tournament Tech",
      desc: "Multi-sports Tournament Management platform to manage your tournaments and leagues with ease.",
      btn: "Know More",
      img: "/cards/useless.webp",
    },
    {
      id: 2,
      title: "Smarter League Management",
      desc: "Automate scheduling, scoring, and stats with powerful analytics.",
      btn: "Explore",
      img: "/cards/ganj.webp",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      className="w-full hero-swiper pb-10"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative flex items-center justify-between bg-gradient-to-r from-[#021B17] to-[#046B4E] px-10 md:px-20 hero-slide overflow-hidden">
            {/* Left side content */}
            <div className="max-w-xl text-white z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-lg mb-8">{slide.desc}</p>
              <button className="bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition">
                {slide.btn}
              </button>
            </div>

            {/* Right side image */}
            <div className="absolute right-0 bottom-0 md:right-10 md:bottom-0 w-[70%] md:w-[45%] z-0">
              <Image
                src={slide.img}
                alt="Hero Slide"
                width={700}
                height={700}
                className="object-contain"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
