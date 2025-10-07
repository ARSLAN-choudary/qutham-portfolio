"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CountUp from "react-countup";

const stats = [
    { title: "Web Apps", value: 120 },
    { title: "Mobile Apps", value: 80 },
    { title: "Graphic Designs", value: 150 },
    { title: "Digital Marketing", value: 60 },
    { title: "Lines of Code", value: 500000 },
];

export default function StatsTiltSection() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lightRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const light = lightRef.current;
        if (!container || !light) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // smooth and balanced tilt
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            // tilt animation
            animationRef.current?.kill();
            animationRef.current = gsap.to(container, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.25,
                ease: "power2.out",
                transformPerspective: 1000,
                transformOrigin: "center",
            });

            // soft light follow
            gsap.to(light, {
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            animationRef.current?.kill();
            gsap.to(container, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power3.out",
            });
            gsap.to(light, {
                x: 0,
                y: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        const handleMouseEnter = () => {
            gsap.to(light, { opacity: 0.5, duration: 0.3, ease: "power1.out" });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div>
            <div className="relative w-full flex justify-center">
                {/* Container */}
                <div
                    ref={containerRef}
                    className="relative p-10 rounded-3xl w-[100dvw] md:w-[70dvw] backdrop-blur-[16px] bg-white/10 shadow-lg border border-white/20 
                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 transform-gpu transition-transform duration-300"
                    style={{
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Light Reflection */}
                    <div
                        ref={lightRef}
                        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-3xl opacity-0"
                        style={{ transform: "translate(-50%, -50%)" }}
                    />

                    {/* Stats Cards */}
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="relative rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 
                       shadow-md p-6 text-center hover:scale-[1.03] transition-transform duration-200 
                       hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                        >
                            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-2">
                                <CountUp start={0} end={item.value} duration={2} separator="," />
                            </div>
                            <p className="text-white text-lg tracking-wide">{item.title}</p>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-20 blur-xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}
