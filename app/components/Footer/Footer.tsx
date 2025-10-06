"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="style_footer__section__HZm2M">
      <div className="style_footer__grid__zAmB0">
        <div className="style_footer__column__kqYF+ style_footer__logo__Gjeig">
          <Image src="/qutham-tech.svg" alt=" Logo" width={160} height={60} />
        </div>

        <nav className="style_footer__links__z6SRB" aria-label="Quick links">
          <div className="style_links__content__-IcOB">
            <h3>Quick links</h3>
            <ul>
              <li className="cursor-pointer">
                <Link href="/about">About</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/careers">Careers</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/cricket">Our Projects</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/indoor-cricket">Our Events</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="style_footer__connect__QuLYT">
          <div className="style_connect__content__2lw-t">
            <div className="style_links__content__-IcOB">
              <h3>Connect</h3>
              <ul>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
                <li>
                  <Image
                    src="/footer/phone.c6527522a0fa2904eb68ce49bb7fe252.svg"
                    alt="Phone"
                    width={16}
                    height={16}
                  />
                  <a href="tel:+923287079495">+92 328 7079495</a>
                </li>
                <li>
                  <Image
                    src="/footer/email.d4d63118b2f906ec8ccaf19a5f570a47.svg"
                    alt="Email"
                    width={16}
                    height={16}
                  />
                  <a href="mailto:quthamtech@gmail.com">quthamtech@gmail.com</a>
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
                  href="https://www.facebook.com"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <Image
                    src="/footer/facebook-logo.png"
                    alt="Facebook"
                    width={18}
                    height={18}
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
