"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full border-t border-[#1a1a1a] py-6">
      {/* Flex Row Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
        
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start ">
          <Image src="/qutham-tech.svg" alt="Logo" width={130} height={50} />
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent font-semibold uppercase text-xs tracking-wide mb-2">
            Quick Links
          </h3>
          <ul className="flex gap-4 text-xs text-gray-300">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/" className="hover:text-white transition">Projects</Link></li>
            <li><Link href="/" className="hover:text-white transition">Events</Link></li>
          </ul>
        </div>

        {/* Connect */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
  <h3 className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent font-semibold uppercase text-xs tracking-wide mb-2">
    Connect
  </h3>

  <ul className="text-xs text-gray-300 flex flex-wrap md:flex items-center justify-center gap-5">
    <li className="flex items-center gap-2 justify-center md:justify-start">
      <Image
        src="/footer/phone.c6527522a0fa2904eb68ce49bb7fe252.svg"
        alt="Phone"
        width={12}
        height={12}
      />
      <a href="tel:+92 307-0079017">+92 307-0079017 / +971 50 112 0272</a>
    </li>

    <li className="flex items-center gap-2 justify-center md:justify-start">
      <Image
        src="/footer/email.d4d63118b2f906ec8ccaf19a5f570a47.svg"
        alt="Email"
        width={12}
        height={12}
      />
      <a href="mailto:contact@qutham.com">contact@qutham.com</a>
    </li>
  </ul>
</div>


        {/* Social Icons */}
        <div className="flex items-center justify-center gap-5">
          <a href="https://www.instagram.com/qutham_official" target="_blank" rel="noreferrer">
            <Image src="/footer/InstagramLogo.835417736555a38a09973bc8f42adbb2.svg" alt="Instagram" width={18} height={18} className="hover:scale-110 transition lg:w-[30px]" />
          </a>
          <a href="https://www.linkedin.com/company/qutham-technologies" target="_blank" rel="noreferrer">
            <Image src="/footer/LinkedinLogo.97a9ef66ee3eaa6c7c5594ee9002cbbd.svg" alt="LinkedIn" width={18} height={18} className="hover:scale-110 transition lg:w-[30px]" />
          </a>
          <a href="https://www.facebook.com/share/1DiS5boyPa/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
            <Image src="/footer/f.svg" alt="Facebook" width={16} height={16} className="hover:scale-110 transition lg:w-[23px]" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a] mt-4 pt-3 text-[11px] text-gray-400 flex flex-col md:flex-row justify-center items-center gap-3">
        <span>© 2025-26 Qutham Technologies. All rights reserved.</span>
        <Link href="/" className="hover:text-white transition">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
