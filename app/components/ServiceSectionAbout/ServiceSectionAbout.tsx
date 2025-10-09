"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "../../about/about.css"
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "webapps",
        title: "Web App Development",
        description:
            "We specialize in crafting Modern Websites, and e-commerce solutions that seamlessly integrate with your existing business infrastructure. Our expertise encompasses front-end development, back-end development, and database integration, ensuring a cohesive and scalable web presence.",
        icon: "/about/coding.png",
        image: "/about/web.jpg",
    },
    {
        id: "mobileapps",
        title: "Mobile App Development",
        description:
            "We create native and cross-platform mobile applications for iOS and Android devices, enabling businesses to engage with their customers on the go. Our mobile app development services encompass user-centric design, intuitive interfaces, and robust functionalities that enhance user experience and drive engagement.",
        icon: "/about/application.png",
        image: "/about/mobile-app-development.png",
    },
    {
        id: "graphicdesigns",
        title: "Creative Graphic Design",
        description:
            "Our team of experienced graphic designers creates compelling visual content that enhances your brand identity and marketing efforts. We specialize in logo design, branding, print design, digital design, and UI/UX design.",
        icon: "/about/service-icon-04.jpg",
        image: "/about/service-icon-04.jpg",
    },
    {
        id: "digitalmarketing",
        title: "Digital Marketing",
        description:
            "Boost your brand's online presence and engage your audience with our top-notch social media marketing strategies. From compelling content creation to targeted advertising, we specialize in driving social media success. Elevate your brand, increase customer engagement, and stay ahead in the digital landscape with our expert social media marketing services. Let's make your brand shine in the social sphere!",
        icon: "/about/automation.png",
        image: "/about/digital-marketing-definition-new-2048x1582.png",
    },
    {
        id: "SEO",
        title: "SEO",
        description:
            "Discover expert insights and practical tips on a wide range of topics with our engaging content. From technology trends to lifestyle hacks, we provide valuable information to enhance your knowledge. Stay informed and entertained with our SEO-optimized articles that cater to your interests and curiosity. Explore our site for a diverse collection of informative content tailored just for you!",
        icon: "/about/automation.png",
        image: "/about/SEO-for-Small-Business.webp",
    },
];

export default function ServiceSectionAbout() {
    const imagesWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const imagesWrapper = imagesWrapperRef.current;
        if (!imagesWrapper) return;

        const images = imagesWrapper.querySelectorAll("img");
        const articles = document.querySelectorAll(".style_text__block__wsB1a");

        // Set initial state
        gsap.set(images, {
            opacity: 0,
            scale: 0.8
        });

        gsap.set(images[0], {
            opacity: 1,
            scale: 1
        });

        // Function to show specific image
        const showImage = (index: number) => {
            images.forEach((img, i) => {
                gsap.to(img, {
                    opacity: i === index ? 1 : 0,
                    scale: i === index ? 1 : 0.8,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        };

        // Create scroll triggers for each article
        articles.forEach((article, i) => {
            ScrollTrigger.create({
                trigger: article,
                start: "top center",
                end: "bottom center",
                onEnter: () => showImage(i),
                onEnterBack: () => showImage(i)
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const galleryItems = [
        {
            id: 1,
            image: "/about/digital-marketing-definition-new-2048x1582.png",
        },
        {
            id: 2,
            image: "/cards/cricket.jpg",
        },
        {
            id: 3,
            image: "/cards/dinner.jpeg",
        },
    ];

    // Separate useEffect for the gallery section
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        if (window.innerWidth < 768) return;

        const TOTAL_X = container.scrollWidth - window.innerWidth; 
const THRESHOLD_X = TOTAL_X * 10; 
        const V_TO_H_RATIO = 1;

        let translateX = 0;
        let isLocked = false;
        let mode: "A" | "B" = "A";
        let phaseBStartScrollY = 0;

        let actualScrollable = Math.max(0, container.scrollWidth - window.innerWidth);
        let MAX_X = Math.min(TOTAL_X, actualScrollable);
        let THRESH_X_CLAMPED = Math.min(THRESHOLD_X, MAX_X);
        let PHASE_B_REMAINING = Math.max(0, MAX_X - THRESH_X_CLAMPED);

        const lockScroll = () => {
            if (!isLocked) {
                document.body.style.overflow = "hidden";
                isLocked = true;
            }
        };
        const unlockScroll = () => {
            if (isLocked) {
                document.body.style.overflow = "";
                isLocked = false;
            }
        };
        const applyTransform = () => {
            container.style.transform = `translateX(${translateX}px)`;
        };
        const centerInView = () => {
            const r = section.getBoundingClientRect();
            return r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5;
        };
        const partlyInView = () => {
            const r = section.getBoundingClientRect();
            return r.bottom >= 0 && r.top <= window.innerHeight;
        };

        const switchToA = () => {
            mode = "A";
            lockScroll();
            translateX = Math.min(0, Math.max(-MAX_X, translateX));
            applyTransform();
        };

        const switchToB = () => {
            mode = "B";
            translateX = -THRESH_X_CLAMPED;
            applyTransform();
            unlockScroll();
            phaseBStartScrollY = window.scrollY;
        };

        const handleWheelA = (e: WheelEvent) => {
            if (mode !== "A") return;

            if (!centerInView()) {
                unlockScroll();
                return;
            }

            const atStart = translateX >= -2;
            const atEnd = Math.abs(translateX) >= MAX_X - 2;

            if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
                unlockScroll();
                return;
            }

            lockScroll();
            e.preventDefault();

            translateX -= e.deltaY * 0.8;
            translateX = Math.min(0, Math.max(-MAX_X, translateX));
            applyTransform();

            if (Math.abs(translateX) >= THRESH_X_CLAMPED && e.deltaY > 0) {
                switchToB();
            }
        };

        const handleScrollB = () => {
            if (mode !== "B") return;
            if (!partlyInView()) return;

            const deltaY = window.scrollY - phaseBStartScrollY;
            const mapped = Math.max(0, Math.min(PHASE_B_REMAINING, deltaY * V_TO_H_RATIO));
            translateX = -THRESH_X_CLAMPED - mapped;
            translateX = Math.max(-MAX_X, translateX);
            applyTransform();

            if (deltaY <= 0 || mapped <= 0 + 0.5) {
                translateX = -THRESH_X_CLAMPED;
                applyTransform();
                switchToA();
            }
        };

        const handleResize = () => {
            actualScrollable = Math.max(0, container.scrollWidth - window.innerWidth);
            MAX_X = Math.min(TOTAL_X, actualScrollable);
            THRESH_X_CLAMPED = Math.min(THRESHOLD_X, MAX_X);
            PHASE_B_REMAINING = Math.max(0, MAX_X - THRESH_X_CLAMPED);
            translateX = Math.min(0, Math.max(-MAX_X, translateX));
            applyTransform();
        };

        switchToA();
        window.addEventListener("wheel", handleWheelA, { passive: false });
        window.addEventListener("scroll", handleScrollB, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("wheel", handleWheelA);
            window.removeEventListener("scroll", handleScrollB);
            window.removeEventListener("resize", handleResize);
            unlockScroll();
        };
    }, []);

    return (
        <>
            <section className="style_gullyos__services__section__KDhcF">
                <div className="style_services__desktop__bg__-PUMG">
                    <div></div>
                </div>

                <div className="style_gully__services__container__RMvWw">
                    {/* Services Details - Left Side */}
                    <div className="style_services__details__uAqsp">
                        {services.map((service, index) => (
                            <article key={service.id} className="style_text__block__wsB1a">
                                <div className="style_text__block__content__sbNUu">
                                    <div className="style_text__block__heading__2FrB6">
                                        <Image
                                            src={service.icon}
                                            alt="icon"
                                            width={24}
                                            height={24}
                                        />
                                        <span>{service.id.toUpperCase()}</span>
                                    </div>
                                    <h2>{service.title}</h2>
                                    <p>{service.description}</p>
                                    <Link href="/contact" className="style_custom__button__DuUUn">
                                        <span>Book Now</span>
                                        <Image
                                            src="/about/arrowForward.bfdd2445f54c5be8c49e9c1f9e37d943.svg"
                                            alt="forward icon"
                                            width={20}
                                            height={20}
                                            className=" arrow "
                                        />
                                        <div className="style_cta__glow__2sBX5"></div>
                                    </Link>
                                </div>

                                <div className="style_text__block__image__pxcCb">
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} preview`}
                                        width={400}
                                        height={300}
                                        loading="lazy"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Services Images Container - Right Side */}
                    <div className="style_services__images__container__2h6e8">
                        <div className="style_images__wrapper__6Itcq" ref={imagesWrapperRef}>
                            {services.map((service) => (
                                <Image
                                    key={service.id}
                                    src={service.image}
                                    alt={`${service.title} visual highlight`}
                                    width={600}
                                    height={400}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Gallery Section - Images Only */}
            <section
                ref={sectionRef}
                className="max-w-screen w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1919] to-[#090909] py-12"
            >
                <div className="relative h-max md:h-full">
                    <div className="md:sticky top-[64px] h-max md:h-[calc(100vh-64px)] flex justify-start overflow-hidden px-3 py-9 w-full">
                        <div
                            ref={containerRef}
                            className="flex items-center flex-col gap-9 mx-auto md:flex-row md:gap-[80px] will-change-transform transition-transform duration-200 ease-out"
                        >
                            <h2 className="uppercase z-10">
                                <span className="text-[32px] md:text-[80px] font-[900] leading-[120%] text-[#cdff00] [text-shadow:0_0_3px_#cdff00,0_0_6px_#cdff00] text-white">
                                    Our <br /> Clients
                                </span>
                            </h2>

                            <ul className="flex flex-col gap-[20px] md:flex-row md:items-center md:gap-[60px] will-change-transform">
                                {galleryItems.map((item) => (
                                    <li key={item.id} className="flex-[0_0_auto]">
                                        <div className="relative min-w-[250px] w-full rounded-[12px] md:rounded-[24px] overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt="Gallery image"
                                                width={600}
                                                height={400}
                                                className="w-[250px] md:w-[600px] h-[180px] md:h-[400px] object-cover"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="hidden md:block min-w-[400px]" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}