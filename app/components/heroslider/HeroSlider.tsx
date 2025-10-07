"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./heroslider.css";
import { Autoplay, Pagination } from "swiper/modules";

export default function HeroSlider() {

  const getEmbedUrl = (url:any) => {

    const videoId = url.split('/').pop().split('?')[0];
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0`;
  };

  const slides = [
    {
      id: 1,
      title: "AI is Transforming the Future",
      desc: "Explore the innovations driving artificial intelligence and next-gen automation.",
      btn: "Learn More",
      video:
        "https://youtu.be/JODVpeexrlY?si=xgJ_5svz2riS_ltx",
    },
    // {
    //   id: 2,
    //   title: "The Power of Modern Technology",
    //   desc: "Discover how emerging tools are reshaping our digital world.",
    //   btn: "Explore Now",
    //   video:
    //     "https://youtu.be/0x5mf8BUJZY?si=Q2mJtGzEY9_A-J25",
    // },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      className="w-full hero-swiper pb-10"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
            {/* 🔹 Background video (FIXED: Using <iframe> for seamless YouTube embed) */}
            <iframe
              src={getEmbedUrl(slide.video)}
              title={slide.title}
              frameBorder="0"
              allow="autoplay; loop; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              // Add a class for CSS styling
              className="youtube-background-iframe" 
            />

            {/* 🔹 Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* 🔹 Text + button overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-lg mb-8">{slide.desc}</p>
              <button className="bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition cursor-pointer">
                {slide.btn} 
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}