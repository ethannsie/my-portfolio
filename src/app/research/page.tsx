"use client";

import AnimatedProjectCard from "../../components/AnimatedProjectCard";
import SectionDivider from "../../components/SectionDivider";
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
      href: "/projects/robotic-arm",
      image: "/images/projects/markov.png",
    },
    {
      title: "FEA Simulation Dashboard",
      description: "A dashboard visualizing deformation modes and stresses using Three.js.",
      href: "/projects/fea-dashboard",
      image: "/images/projects/fea.png",
    },
  ];

  return (
    <div className="px-6 py-20">
      {/* Title Animation */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Projects
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 max-w-xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
      >
        A selection of engineering and software projects I’ve built.
      </motion.p>

      <SectionDivider />

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
