"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./footer.css"
const Footer = () => {
    return (
        <footer className="style_footer__section__HZm2M">
            <div className="style_footer__grid__zAmB0">
                <div className="style_footer__column__kqYF+ style_footer__logo__Gjeig">
                    <Image
                        src="/footer/logo.svg"
                        alt=" Logo"
                        width={160}
                        height={60}
                    />
                </div>

                <nav className="style_footer__links__z6SRB" aria-label="Quick links">
                    <div className="style_links__content__-IcOB">
                        <h3>Quick links</h3>
                        <ul>
                            <li><Link href="/gullyos">GullyOS</Link></li>
                            <li><Link href="/the-ultimate-circuit">The Ultimate Circuit</Link></li>
                            <li><Link href="/cricket">Cricket</Link></li>
                            <li><Link href="/indoor-cricket">Indoor Cricket</Link></li>
                        </ul>
                    </div>
                </nav>

                <div className="style_footer__connect__QuLYT">
                    <div className="style_connect__content__2lw-t">
                        <div className="style_links__content__-IcOB">
                            <h3>Connect</h3>
                            <ul>
                                <li><Link href="/contact">Contact us</Link></li>
                                <li>
                                    <Image
                                        src="/footer/phone.c6527522a0fa2904eb68ce49bb7fe252.svg"
                                        alt="Phone"
                                        width={16}
                                        height={16}
                                    />
                                    <a href="tel:+919774587007">+91 977499999</a>
                                </li>
                                <li>
                                    <Image
                                        src="/footer/email.d4d63118b2f906ec8ccaf19a5f570a47.svg"
                                        alt="Email"
                                        width={16}
                                        height={16}
                                    />
                                    <a href="mailto:hello@.com">hello@.com</a>
                                </li>
                            </ul>
                        </div>

                        <address className="style_footer__address__ZhTcd">
                            <div className="style_social__logos__37Scg">
                                <a
                                    href="https://www.instagram.com/"
                                    rel="noreferrer"
                                    target="_blank"
                                    aria-label="Instagram"
                                >
                                    <Image
                                        src="/footer/InstagramLogo.835417736555a38a09973bc8f42adbb2.svg"
                                        alt="Instagram"
                                        width={24}
                                        height={24}
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company"
                                    rel="noreferrer"
                                    target="_blank"
                                    aria-label="LinkedIn"
                                >
                                    <Image
                                        src="/footer/LinkedinLogo.97a9ef66ee3eaa6c7c5594ee9002cbbd.svg"
                                        alt="LinkedIn"
                                        width={24}
                                        height={24}
                                    />
                                </a>
                                <a
                                    href="https://www.youtube.com"
                                    rel="noreferrer"
                                    target="_blank"
                                    aria-label="YouTube"
                                >
                                    <Image
                                        src="/footer/YoutubeLogo.07c09cea741994f9f5979d77fdd60fd2.svg"
                                        alt="YouTube"
                                        width={24}
                                        height={24}
                                    />
                                </a>
                            </div>
                        </address>
                    </div>
                </div>
            </div>

            <div className="style_footer__bottom__Zb-QC">
                <ul>
                    <li>© 2025-26 . All rights reserved.</li>
                    <li>
                        <Link href="/terms-conditions">Terms &amp; Condition</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
