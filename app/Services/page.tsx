"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
    FaReact,
    FaNodeJs,
    FaAngular,
    FaGitAlt,
    FaHtml5,
    FaCss3Alt,
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiJest,
    SiCypress,
    SiTailwindcss,
    SiTypescript,
    SiRedux,
    SiDocker,
    SiGraphql,
} from "react-icons/si";

const TECHS = [
    { id: "react", icon: <FaReact size={26} color="#61DBFB" />, label: "React" },
    { id: "next", icon: <SiNextdotjs size={26} color="#000000" />, label: "Next.js" },
    { id: "angular", icon: <FaAngular size={26} color="#DD0031" />, label: "Angular" },
    { id: "node", icon: <FaNodeJs size={26} color="#3C873A" />, label: "Node.js" },
    { id: "express", icon: <SiExpress size={26} color="#444444" />, label: "Express" },
    { id: "mongo", icon: <SiMongodb size={26} color="#4DB33D" />, label: "MongoDB" },
    { id: "mysql", icon: <SiMysql size={26} color="#00618A" />, label: "MySQL" },
    { id: "jest", icon: <SiJest size={26} color="#C21325" />, label: "Jest" },
    { id: "cypress", icon: <SiCypress size={26} color="#00BFA5" />, label: "Cypress" },
    { id: "git", icon: <FaGitAlt size={26} color="#F05032" />, label: "Git" },
    { id: "tailwind", icon: <SiTailwindcss size={26} color="#38BDF8" />, label: "TailwindCSS" },
    { id: "ts", icon: <SiTypescript size={26} color="#3178C6" />, label: "TypeScript" },
    { id: "redux", icon: <SiRedux size={26} color="#764ABC" />, label: "Redux" },
    { id: "docker", icon: <SiDocker size={26} color="#2496ED" />, label: "Docker" },
    { id: "graphql", icon: <SiGraphql size={26} color="#E10098" />, label: "GraphQL" },
    { id: "html", icon: <FaHtml5 size={26} color="#E34F26" />, label: "HTML5" },
    { id: "css", icon: <FaCss3Alt size={26} color="#1572B6" />, label: "CSS3" },
];

export default function TechOrbit() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
    const rotRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const rot = rotRef.current;
        if (!container || !rot) return;

        const radius =
            Math.min(container.clientWidth, container.clientHeight) * 0.38;
        const cx = container.clientWidth / 2;
        const cy = container.clientHeight / 2;

        // Position icons around circle
        iconsRef.current.forEach((el, idx) => {
            if (!el) return;
            const angle = (idx / iconsRef.current.length) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            gsap.set(el, { x: x - 24, y: y - 24 });
        });

        // Rotate full orbit smoothly
        gsap.to(rot, {
            rotation: 360,
            duration: 24,
            repeat: -1,
            ease: "linear",
            transformOrigin: "50% 50%",
        });

        return () => {
            gsap.killTweensOf("*");
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-[url('/scroler/socials-bg-desktop.c0beceae096e8677d45b.webp')] bg-cover bg-center bg-no-repeat">
            {/* ================= HEADER SECTION ================= */}
            <section className="relative overflow-hidden min-h-[600px] flex items-center justify-center bg-[url('/services/headerbg.webp')] bg-cover bg-center bg-no-repeat">
                {/* Neon Overlay (opacity layer) */}


                {/* Header Text */}
                <div className="relative z-10 w-full">
                    <div className="mx-auto px-6 py-16 md:py-24 max-w-7xl">
                        <div className="max-w-[90%] p-8 md:p-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 transition duration-500">
                            <p className="text-sm font-light uppercase tracking-widest text-white/70 mb-2">
                                WEB DEVELOPMENT
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
                                Building Seamless Experiences
                            </h1>
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-500 hover:bg-teal-600 shadow-xl transition duration-300 transform hover:scale-[1.03]">
                                Build High-Performance Website
                            </button>
                        </div>
                    </div>
                </div>

            </section>


            {/* ================= ORBIT SECTION ================= */}
            <section className="relative w-full flex flex-col   justify-between gap-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-10 px-7 shadow-2xl overflow-hidden max-w-7xl mx-auto my-16">
                {/* LEFT SIDE IMAGE */}
                <div className="flex items-center justify-center w-full">
                    <div className="w-[95%]  relative flex items-center justify-center">
                        {/* Custom Left Arrow (outside image) */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center cursor-pointer text-white swiper-prev-custom transition duration-300">
                            ❮
                        </div>

                        {/* Swiper Container */}
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".swiper-next-custom",
                                prevEl: ".swiper-prev-custom",
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            className="rounded-2xl overflow-hidden shadow-lg"
                        >
                            {/* Slides */}
                            <SwiperSlide>
                                <img
                                    src="/services/headerbg.webp"
                                    alt="Service 1"
                                    className="w-full h-[340px] object-cover rounded-2xl"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="/services/headerbg.webp"
                                    alt="Service 2"
                                    className="w-full h-[340px] object-cover rounded-2xl"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="/services/headerbg.webp"
                                    alt="Service 3"
                                    className="w-full h-[340px] object-cover rounded-2xl"
                                />
                            </SwiperSlide>
                        </Swiper>

                        {/* Custom Right Arrow (outside image) */}
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center cursor-pointer text-white swiper-next-custom transition duration-300">
                            ❯
                        </div>
                    </div>


                    {/* RIGHT SIDE ORBIT SECTION */}


                </div>

                {/* TEXT CONTENT BELOW */}
                <div className="flex flex-col md:flex-row  justify-between gap-5 md:gap-5  relative md:px-5">
                    {/* LEFT TEXT SECTION */}
                    <div className="w-full md:w-1/2 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Overview — What We Are Good At:
                        </h2>
                        <p className="text-white/80 max-w-xl leading-relaxed">
                            At Qutham Tech, we specialize in crafting cutting-edge digital
                            experiences that merge innovation, design, and performance. From robust
                            web development to modern UI/UX and scalable systems — our solutions are
                            built to empower your business growth.
                        </p>
                    </div>

                    {/* RIGHT SLIDER SECTION */}
                    <div className="relative w-full md:w-1/2 flex items-center justify-end">
                        <div
                            ref={containerRef}
                            className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full flex items-center justify-center overflow-visible"
                        >
                            {/* Rotating Icons (Static Orbit) */}
                            <div ref={rotRef} className="absolute inset-0">
                                {TECHS.map((t, i) => (
                                    <div
                                        key={t.id}
                                        ref={(el) => {
                                            iconsRef.current[i] = el;
                                        }}
                                        className="absolute w-12 h-12 rounded-full flex items-center justify-center bg-white/80 shadow-lg backdrop-blur-md"
                                        title={t.label}
                                    >
                                        {t.icon}
                                    </div>
                                ))}
                            </div>

                            {/* Center Logo */}
                            <div className="relative z-20 flex items-center justify-center">
                                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/header/logo.svg"
                                        alt="Qutham Logo"
                                        className="w-20 h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}
