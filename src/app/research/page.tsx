"use client";

import AnimatedProjectCard from "../../components/AnimatedProjectCard";
import { motion } from "framer-motion";

export default function ResearchPage() {
  const projects = [
    {
      title: "Thermofluidics and Surface Nanoengineering",
      description: "Currently working on self-cleaning coatings at MTSN Lab @ UC Berkeley.",
      href: "/research/mtsn",
      image: "/images/research/mtsn.png",
    },
    {
        title: "Exploring Pulse Shaping Techniques",
        description: "Maintaining the Fidelity of X and CX Gates within a Quantum Algorithm",
        href: "/research/quantum",
        image: "/images/research/quantum.png",
    },
    {
      title: "Martian Flyer Exploration",
      description: "A study into viable flyers on Mars and design analysis.",
      href: "/research/martian",
      image: "/images/research/martian.png",
    },
    {
      title: "CubeSat Exploration",
      description: "Developing and Testing a 1U CubeSat using COTS Hardware ",
      href: "/research/cubesat",
      image: "/images/research/cubesat.png",
    },
  ];

  return (
    <div className="px-6 py-20 bg-brand-navy_blue">
      {/* Title Animation */}
      <motion.h1
        className="text-8xl font-extrabold text-center mb-4 text-brand-orange"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Research
      </motion.h1>

      {/* Project Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {projects.map((proj) => (
          <AnimatedProjectCard key={proj.title} {...proj} />
        ))}
      </motion.div>
    </div>
  );
}
