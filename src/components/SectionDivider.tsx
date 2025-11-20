"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ width: "0%" }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent my-16"
    />
  );
}

