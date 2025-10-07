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
            "We build high-performance web apps tailored for scalability, security, and seamless user experiences.",
        icon: "/about/coding.png",
        image: "/about/coding.png",
    },
    {
        id: "mobileapps",
        title: "Mobile App Development",
        description:
            "From concept to code, we create mobile experiences that users love — fast, intuitive, and engaging.",
        icon: "/about/application.png",
        image: "/about/application.png",
    },
    {
        id: "graphicdesigns",
        title: "Creative Graphic Design",
        description:
            "Stunning designs that speak your brand's story — from logos to marketing visuals and beyond.",
        icon: "/about/service-icon-04.png",
        image: "/about/service-icon-04.jpg",
    },
    {
        id: "digitalmarketing",
        title: "Digital Marketing",
        description:
            "Boost your reach with data-driven marketing, SEO optimization, and social media strategies that convert.",
        icon: "/about/automation.png",
        image: "/about/automation.png",
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

    return (
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
    );
}