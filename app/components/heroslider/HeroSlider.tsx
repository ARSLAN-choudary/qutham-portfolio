/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./heroslider.css";
import { Autoplay, Pagination } from "swiper/modules";

export default function HeroSlider() {
  const getEmbedUrl = (url: any) => {
    const videoId = url.split("/").pop().split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0`;
  };

  const slides = [
    {
      id: 1,
      title: "AI is Transforming the Future",
      desc: "Explore the innovations driving artificial intelligence and next-gen automation.",
      btn: "Learn More",
      video: "https://youtu.be/JODVpeexrlY?si=xgJ_5svz2riS_ltx",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      className="w-[100vw] hero-swiper pb-10"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-[100vw] h-[60vh] md:h-[90vh] overflow-hidden">
            {/* 🔹 Background video */}
            <iframe
              src={getEmbedUrl(slide.video)}
              title={slide.title}
              frameBorder="0"
              allow="autoplay; loop; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-background-iframe !w-[100vw]"
            />

            {/* 🔹 Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* 🔹 Text + button overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 md:px-16 text-white max-w-[90%] sm:max-w-md md:max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {slide.desc}
              </p>
              <button className="w-fit bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:opacity-90 transition cursor-pointer">
                {slide.btn}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
