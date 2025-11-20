"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  const translateX = useTransform(mouseX, [0, window.innerWidth], ["-2%", "2%"]);
  const translateY = useTransform(mouseY, [0, window.innerHeight], ["-2%", "2%"]);

  const grid = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/90 dark:from-black/30 dark:to-black/90 pointer-events-none" />

      {/* Parallax Grid */}
      <motion.div
        style={{ translateX, translateY }}
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]"
      >
        <div className="grid grid-cols-40 grid-rows-40 w-full h-[200%]">
          {grid.map((_, i) => (
            <div key={i} className="border border-gray-300 dark:border-gray-600" />
          ))}
        </div>
      </motion.div>

      {/* Floating Blueprint Numbers */}
      <motion.div
        className="absolute top-10 left-10 text-xs text-gray-500 dark:text-gray-400"
        animate={{ opacity: [0.4, 0.7, 0.4], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        GRID: PRECISION 40 × 40
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-12 text-xs text-gray-500 dark:text-gray-400"
        animate={{ opacity: [0.4, 0.7, 0.4], y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      >
        ENGINEERING MODE: ACTIVE
      </motion.div>
    </div>
  );
}
