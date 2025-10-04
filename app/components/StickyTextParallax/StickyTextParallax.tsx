"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./stiky.css"

gsap.registerPlugin(ScrollTrigger);

// Define card data with gallery images
const cardData = [
    {
        id: 1,
        mainImage: "/cards/card-1.webp",
        gallery: [
            "/cards/card-1.webp",
            "/cards/card-1-2.webp",
            "/cards/card-1-3.webp"
        ],
        title: "Project One",
        description: "Description for project one showcasing amazing work."
    },
    {
        id: 2,
        mainImage: "/cards/card-2.webp",
        gallery: [
            "/cards/card-2.webp",
            "/cards/card-2-2.webp",
            "/cards/card-2-3.webp"
        ],
        title: "Project Two",
        description: "Description for project two with stunning visuals."
    },
    {
        id: 3,
        mainImage: "/cards/card-3.webp",
        gallery: [
            "/cards/card-3.webp",
            "/cards/card-3-2.webp",
            "/cards/card-3-3.webp"
        ],
        title: "Project Three",
        description: "Description for project three highlighting innovation."
    },
    {
        id: 4,
        mainImage: "/cards/card-4.webp",
        gallery: [
            "/cards/card-4.webp",
            "/cards/card-4-2.webp",
            "/cards/card-4-3.webp"
        ],
        title: "Project Four",
        description: "Description for project four featuring creative solutions."
    },
    {
        id: 5,
        mainImage: "/cards/card-5.webp",
        gallery: [
            "/cards/card-5.webp",
            "/cards/card-5-2.webp",
            "/cards/card-5-3.webp"
        ],
        title: "Project Five",
        description: "Description for project five demonstrating excellence."
    }
];

export default function StickyTextParallax() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorCircleRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [selectedCard, setSelectedCard] = useState<typeof cardData[0] | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Open modal function
    const openModal = (card: typeof cardData[0]) => {
        setSelectedCard(card);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close modal function
    const closeModal = () => {
        setSelectedCard(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    // Navigate gallery
    const nextImage = () => {
        if (selectedCard) {
            setCurrentImageIndex((prev) =>
                prev === selectedCard.gallery.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedCard) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedCard.gallery.length - 1 : prev - 1
            );
        }
    };

    // Close modal on escape key
    useLayoutEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedCard) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [selectedCard]);

    // Modal animation
    useLayoutEffect(() => {
        if (selectedCard && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
        }
    }, [selectedCard]);

    // Custom cursor animation
    useLayoutEffect(() => {
        const cursor = cursorRef.current;
        const cursorCircle = cursorCircleRef.current;

        if (!cursor || !cursorCircle) return;

        // Move cursor with mouse
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        // Hover animation for cursor
        const handleCardHover = () => {
            setIsHovering(true);
            // Hide default cursor and show custom circle
            document.body.style.cursor = 'none';
            gsap.to(cursorCircle, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        };

        const handleCardLeave = () => {
            setIsHovering(false);
            // Restore default cursor and hide custom circle
            document.body.style.cursor = 'default';
            gsap.to(cursorCircle, {
                opacity: 0,
                scale: 0.5,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        // Add event listeners for cursor movement
        window.addEventListener("mousemove", moveCursor);

        // Add event listeners to all cards
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("mouseenter", handleCardHover);
            card.addEventListener("mouseleave", handleCardLeave);
        });

        // Initial cursor setup - hidden by default
        gsap.set(cursor, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        gsap.set(cursorCircle, {
            opacity: 0,
            scale: 0.5
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            cards.forEach(card => {
                card.removeEventListener("mouseenter", handleCardHover);
                card.removeEventListener("mouseleave", handleCardLeave);
            });
            // Restore cursor on cleanup
            document.body.style.cursor = 'default';
        };
    }, []);

    // Your existing scroll animation code
    useLayoutEffect(() => {
        const container = containerRef.current;
        const cardsContainer = cardsRef.current;
        if (!container || !cardsContainer) return;

        const words = gsap.utils.toArray<HTMLSpanElement>(
            container.querySelectorAll(".parallax-word")
        );
        const cards = gsap.utils.toArray<HTMLDivElement>(
            cardsContainer.querySelectorAll(".card")
        );

        ScrollTrigger.getAll().forEach((t) => t.kill(true));

        /** MASTER TIMELINE **/
        const master = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=5000",
                scrub: 1.5,
                pin: true,
                // markers: true,
            },
        });

        // TEXT PARALLAX
        if (words.length >= 3) {
            master.to(words[0], {
                xPercent: 80,
                ease: "power1.out",
                duration: 2
            }, 0);

            master.to(words[1], {
                xPercent: 40,
                ease: "power1.out",
                duration: 3
            }, 0);

            master.to(words[2], {
                xPercent: -60,
                ease: "power1.out",
                duration: 4
            }, 0);
        }
        if (window.innerWidth <= 767) {



            // CARD STACK ANIMATION mobile
            cards.forEach((card, i) => {
                const cardTimeline = gsap.timeline();
                const offsetX = i + 40;
                const rotation = i % 2 === 0 ? 0 : 0;

                cardTimeline.fromTo(card,
                    {
                        opacity: 0,
                        scale: 0.8,
                        x: 700,
                        y: 300,
                        rotation: 0,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: offsetX,
                        y: -200,
                        rotation: rotation,
                        ease: "power3.out",
                        duration: 1,
                    }
                );

                if (i < cards.length - 1) {
                    cardTimeline.to(card, {
                        opacity: 1,
                        scale: 1,
                        x: offsetX - 0,
                        y: -200,
                        rotation: rotation * 0.2,
                        ease: "power2.inOut",
                        duration: 0.5,
                    }, "+=0.3");
                }

                master.add(cardTimeline, i * 0.8);
            });
        }
        if (window.innerWidth >= 767 && window.innerWidth <= 1023) {

            // CARD STACK ANIMATION tablet
            cards.forEach((card, i) => {
                const cardTimeline = gsap.timeline();
                const offsetX = i * 130;
                const rotation = i % 2 === 0 ? 0 : 0;

                cardTimeline.fromTo(card,
                    {
                        opacity: 0,
                        scale: 0.8,
                        x: 100,
                        y: 300,
                        rotation: 0,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: offsetX,
                        y: -200,
                        rotation: rotation,
                        ease: "power3.out",
                        duration: 1,
                    }
                );

                if (i < cards.length - 1) {
                    cardTimeline.to(card, {
                        opacity: 1,
                        scale: 1,
                        x: offsetX - 10,
                        y: -200,
                        rotation: rotation * 0.2,
                        ease: "power2.inOut",
                        duration: 0.5,
                    }, "+=0.3");
                }

                master.add(cardTimeline, i * 0.8);
            });
        }
        if (window.innerWidth >= 1024) {
            // CARD STACK ANIMATION desktop

            cards.forEach((card, i) => {
                const cardTimeline = gsap.timeline();
                const offsetX = i * 200;
                const rotation = i % 2 === 0 ? 0 : 0;

                cardTimeline.fromTo(card,
                    {
                        opacity: 0,
                        scale: 0.8,
                        x: 100,
                        y: 300,
                        rotation: 0,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: offsetX,
                        y: -200,
                        rotation: rotation,
                        ease: "power3.out",
                        duration: 1,
                    }
                );

                if (i < cards.length - 1) {
                    cardTimeline.to(card, {
                        opacity: 1,
                        scale: 1,
                        x: offsetX - 10,
                        y: -200,
                        rotation: rotation * 0.2,
                        ease: "power2.inOut",
                        duration: 0.5,
                    }, "+=0.3");
                }

                master.add(cardTimeline, i * 0.8);
            });
        }

        return () => {
            master.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className="relative w-full min-h-[600vh] bgImg text-white overflow-hidden">
            {/* Custom Cursor Container */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[100]"
                style={{ willChange: "transform" }}
            >
                {/* Blue-Pink Circle with Text */}
                <div
                    ref={cursorCircleRef}
                    className="flex items-center justify-center text-center pointer-events-none"
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #00aaff, #ff66cc)",
                        boxShadow: "0 0 15px rgba(0,170,255,0.5), 0 0 25px rgba(255,102,204,0.5)",
                        opacity: 0,
                        transform: "translate(-50%, -50%) scale(0.5)",
                    }}
                >
                    <span
                        className="text-white text-[10px] font-bold leading-tight text-center px-1"
                        style={{
                            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                            lineHeight: "1.1"
                        }}
                    >
                        Click To Watch
                    </span>
                </div>
            </div>

            {/* Fixed Background */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage:
                        "url('/scroler/socials-bg-desktop.c0beceae096e8677d45b.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Scroll Section */}
            <section className="relative overflow-visible py-32">
                <div
                    ref={containerRef}
                    className="relative flex flex-col items-center justify-center text-center space-y-6 h-screen"
                >
                    <span className="parallax-word text-[60px] md:text-[120px] lg:text-[184px] uppercase font-bold leading-tight text-white">
                        We&nbsp;Build
                    </span>

                    <span className="parallax-word text-[60px] md:text-[100px] lg:text-[164px] uppercase font-bold leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Digital&nbsp;Dreams
                    </span>

                    <span className="parallax-word text-[60px] md:text-[120px] lg:text-[184px] uppercase font-bold leading-tight text-white">
                        That&nbsp;Inspire
                    </span>

                    {/* Cards Container */}
                    <div
                        ref={cardsRef}
                        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl"
                    >
                        {cardData.map((card, i) => (
                            <div
                                key={card.id}
                                className="card absolute top-[-100px] left-0 opacity-0 cursor-pointer group"
                                style={{
                                    zIndex: i + 1,
                                    transform: "translateX(0) translateY(0) scale(0.8)"
                                }}
                                onClick={() => openModal(card)}
                            >
                                <div className="relative w-full h-full">
                                    {/* Clickable area */}
                                    <div
                                        className="absolute inset-0 z-10 cursor-pointer"
                                        style={{ pointerEvents: 'all' }}
                                    />

                                    <Image
                                        src={card.mainImage}
                                        alt={`Card ${card.id}`}
                                        width={600}
                                        height={400}
                                        className="rounded-2xl shadow-2xl object-cover transition-all duration-300 group-hover:brightness-75 pointer-events-none"
                                        style={{
                                            width: "clamp(300px, 22vw, 400px)",
                                            height: "auto"
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedCard && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="relative bg-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Arrows */}
                        {selectedCard.gallery.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Main Image */}
                        <div className="relative h-[60vh] bg-black/20">
                            <Image
                                src={selectedCard.gallery[currentImageIndex]}
                                alt={selectedCard.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {selectedCard.title}
                            </h2>
                            <p className="text-white/80 mb-4">
                                {selectedCard.description}
                            </p>

                            {/* Gallery Thumbnails */}
                            {selectedCard.gallery.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto py-2">
                                    {selectedCard.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index
                                                ? 'border-blue-500 scale-105'
                                                : 'border-white/20 hover:border-white/40'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Image Counter */}
                            {selectedCard.gallery.length > 1 && (
                                <div className="text-white/60 text-sm mt-2">
                                    {currentImageIndex + 1} / {selectedCard.gallery.length}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Backdrop Click to Close */}
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={closeModal}
                    />
                </div>
            )}
        </div>
    );
}