"use client";

import AnimatedProjectCard from "../../components/AnimatedProjectCard";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Thermofluidics and Surface Nanoengineering",
      description: "Currently working on self-cleaning coatings at MTSN Lab @ UC Berkeley.",
      href: "/research/mtsn",
      image: "/images/research/markov/markov4.png",
    },
    {
      title: "Martian Flyer Exploration",
      description: "A study into viable flyers on Mars and design analysis.",
      href: "/research/martian",
      image: "/images/research/markov/markov4.png",
    },
    {
      title: "CubeSAT",
      description: "Design and deployment of a low cost CubeSAT",
      href: "/research/cubesat",
      image: "/images/research/markov/markov4.png",
    },
  ];

  return (
    <div className="px-6 py-20 bg-brand-navy_blue">
      {/* Title Animation */}
      <motion.h1
        className="text-8xl font-extrabold text-center mb-4 text-brand-white"
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
