"use client";

import Image from "next/image";
import Link from "next/link";
import "../../about/about.css"
function AboutHeader() {
    return (
        <header>
            <h1 id="gullyos-hero-title uppercase">Qutham</h1>
            <div className="style_cta__wrapper__nAGCc">
                <p>
                    In today’s digital era, a strong online presence defines success — from websites and web apps to mobile apps that connect and engage. At Qutham Tech, we craft innovative digital solutions, including SEO, graphic designing, and digital marketing, to turn ideas into impact and empower businesses to grow.
                </p>
                <Link href="/contact" className="style_custom__button__DuUUn">
                    <span>Join Now</span>
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
        </header>
    );
}

export default AboutHeader