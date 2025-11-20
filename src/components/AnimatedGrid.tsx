"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface BlueprintNameProps {
  name?: string;
}

export default function BlueprintName({ name = "ETHAN SIE" }: BlueprintNameProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    function updateSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const safeWidth = windowSize.width || 1;
  const safeHeight = windowSize.height || 1;

  // Reduced movement range for the text to keep it readable but dynamic
  const translateX = useTransform(mouseX, [0, safeWidth], ["-2%", "2%"]);
  const translateY = useTransform(mouseY, [0, safeHeight], ["-2%", "2%"]);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a1d37] flex items-center justify-center">
      {/* Subtle background scanline texture remains for depth */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-scanline" />

      {/* Centered Name with Parallax */}
      <motion.div style={{ x: translateX, y: translateY }} className="relative z-10">
        <motion.h1
          className="text-4xl md:text-7xl font-bold text-cyan-300/90 tracking-[0.2em] font-mono uppercase select-none"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {name}
        </motion.h1>
        
        {/* Decorative underline accent */}
        <motion.div 
          className="h-px w-full bg-cyan-500/30 mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
        />
      </motion.div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100%) }
        }
        .animate-scanline {
          animation: scanline 16s linear infinite;
        }
      `}</style>
    </div>
  );
}