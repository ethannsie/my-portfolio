"use client";

import AnimatedProjectCard from "../../components/AnimatedProjectCard";
import { motion } from "framer-motion";

export default function CompetitionsPage() {
  const projects = [
    {
      title: "Mathematical Contest in Modeling | 2025",
      description: "Olympic Medal Prediction Using Tobit Models, Mixed-Effects Regression, and DBSCAN Clustering",
      //description: "International Winner (Top ~20 out of ~21,000 undergraduates); MAA Award",
      href: "/competitions/mmc2025",
      image: "/images/competitions/mmc2025.png",
    },
    {
      title: "International Mathematical Modeling Challenge | 2025",
      description: "Global Volleyball League Optimization: MILP Scheduling & Markov Chain Competitive Modeling",
      //description: "Top 3 in the United States",
      href: "/competitions/immc2025",
      image: "/images/competitions/immc2025.png",
    },
    {
      title: "International Mathematical Modeling Challenge | 2024",
      description: "Pet Readiness & Retention Modeling Using HR-SPLIT and Stochastic Forecasting",
      //description: "International Honorable Mention | Top 2 in the United States",
      href: "/competitions/immc2024",
      image: "/images/competitions/immc2024.png",
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
        Competitions
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
