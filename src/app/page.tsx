"use client";

import BlueprintGrid from "../components/AnimatedGrid";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-brand-navy_blue">

      {/* HERO CONTENT — centered */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Name */}
        <motion.h1
          className="text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          ETHAN SIE
        </motion.h1>

        {/* Tagline */}
        <motion.div
          className="mt-6 text-xl text-brand-orange max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="text-3xl">
          Mechanical Engineer × Software Engineer  
          </div>
          <br />
          Bridging high-precision engineering with computational design.
        </motion.div>


        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <Link
            href="/projects"
            className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                       hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Projects
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                       hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Resume
          </a>

          <a
            href="/competitions"
            target="_blank"
            className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                       hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Competitions
          </a>
        </motion.div>
      </div>

    </section>
  );
}
