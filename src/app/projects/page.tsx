"use client";

import AnimatedProjectCard from "../../components/AnimatedProjectCard";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Circuit Builder Simulation",
      description: "Interactive GlowScript/VPython environment for circuit logic.",
      href: "/projects/circuitBuilder",
      image: "/images/projects/circuitBuilder.png",
    },
    {
      title: "Markov Chain Generative Music",
      description: "A stochastic generative music engine based on probability matrices.",
      href: "/projects/markovMusic",
      image: "/images/projects/markov/markov4.png",
    },
    {
      title: "FEA Simulation Dashboard",
      description: "A dashboard visualizing deformation modes and stresses using Three.js.",
      href: "/projects/fea-dashboard",
      image: "/images/projects/fea.png",
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
        Projects
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
