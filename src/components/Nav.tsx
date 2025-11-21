"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-colors duration-300 
        ${scrolled ? "bg-black backdrop-blur-md shadow-md text-brand-navy_blue" : "bg-brand-navy_blue"}
      `}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT GROUP: Name + LinkedIn + GitHub */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold text-brand-white">
            Ethan Sie
          </Link>

          <Link href="https://www.linkedin.com/in/ethansie/" target="_blank">
            <Image 
              src="/images/logos/linkedin_white.png" 
              alt="LinkedIn"
              width={15}
              height={15}
              className="cursor-pointer"
            />
          </Link>

          <Link href="https://github.com/ethannsie" target="_blank">
            <Image 
              src="/images/logos/github_white.png"
              alt="GitHub"
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className="space-x-6 hidden md:block">
          <Link href="/projects" className="hover:text-brand-light_blue text-brand-white">Projects</Link>
          <Link href="/competitions" className="hover:text-brand-light_blue text-brand-white">Competitions</Link>
          <Link href="/research" className="hover:text-brand-light_blue text-brand-white">Research</Link>
          <Link href="/about" className="hover:text-brand-light_blue text-brand-white">About</Link>
          <Link href="/resume" className="hover:text-brand-light_blue text-brand-white">Resume</Link>
          <a href="/about#contact" className="hover:text-brand-light_blue text-brand-white">Contact</a>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button aria-label="open menu">☰</button>
        </div>

      </div>
    </nav>
  );
}
