"use client";

import { motion } from "framer-motion";

export default function AnimatedGrid() {
  const gridLines = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Fading radial mask */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-white/90 backdrop-blur-[1px]" />

      {/* Scrolling Precision Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear"
        }}
      >
        <div className="grid grid-cols-40 grid-rows-40 w-full h-[200%] opacity-[0.15]">
          {gridLines.map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

