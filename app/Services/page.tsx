"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaReact,
  FaNodeJs,
  FaAngular,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiJest,
  SiCypress,
} from "react-icons/si";

const TECHS = [
  { id: "react", icon: <FaReact size={22} />, label: "React" },
  { id: "next", icon: <SiNextdotjs size={22} />, label: "Next.js" },
  { id: "angular", icon: <FaAngular size={22} />, label: "Angular" },
  { id: "node", icon: <FaNodeJs size={22} />, label: "Node.js" },
  { id: "express", icon: <SiExpress size={22} />, label: "Express" },
  { id: "mongo", icon: <SiMongodb size={22} />, label: "MongoDB" },
  { id: "mysql", icon: <SiMysql size={22} />, label: "MySQL" },
  { id: "jest", icon: <SiJest size={22} />, label: "Jest" },
  { id: "cypress", icon: <SiCypress size={22} />, label: "Cypress" },
  { id: "git", icon: <FaGitAlt size={22} />, label: "Git" },
];

export default function TechOrbit({ logoSrc }: { logoSrc?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rot = rotRef.current;
    if (!container || !rot) return;

    // Position icons around a circle
    const radius = Math.min(container.clientWidth, container.clientHeight) * 0.38;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;

    iconsRef.current.forEach((el, idx) => {
      if (!el) return;
      const angle = (idx / iconsRef.current.length) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      gsap.set(el, { x: x - 24, y: y - 24 }); // ~icon center offset
    });

    // Orbit rotation
    gsap.to(rot, {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    // Subtle bobbing animation
    iconsRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        y: "+=" + (Math.random() * 10 - 5),
        x: "+=" + (Math.random() * 10 - 5),
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div  className="relative w-full h-[100vh] bg-[url('/scroler/socials-bg-desktop.c0beceae096e8677d45b.webp')] bg-cover bg-center bg-no-repeat">
        <div className="w-full flex items-center justify-center py-16">
          <div
            ref={containerRef}
            className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] bg-gradient-to-b from-white/5 to-transparent rounded-full flex items-center justify-center overflow-visible"
          >
            {/* Rotating wrapper */}
            <div ref={rotRef} className="absolute inset-0">
              {TECHS.map((t, i) => (
                <div
                  key={t.id}
                  ref={(el) => {
                    iconsRef.current[i] = el;
                  }}
                  className="absolute w-12 h-12 rounded-full flex items-center justify-center bg-white text-black shadow-lg"
                  title={t.label}
                >
                  {t.icon}
                </div>
              ))}
            </div>
    
            {/* Center logo */}
            <div className="relative z-20">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center shadow-2xl">
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoSrc}
                    alt="Qutham"
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <div className="text-center text-black">
                    <div className="font-bold text-lg">Qutham</div>
                    <div className="text-xs text-gray-700">Tech</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
