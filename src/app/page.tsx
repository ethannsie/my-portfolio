import AnimatedGrid from "@/components/AnimatedGrid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatedGrid />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl font-extrabold tracking-tight"
        >
          ETHAN{" "}
          <span className="text-sky-600">
            SIE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Mechanical Engineer × Software Engineer  
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex justify-center gap-6"
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg text-lg font-medium hover:bg-sky-700 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Projects
          </Link>

          <Link
            href="/resume"
            className="px-6 py-3 border border-sky-600 text-sky-600 rounded-lg text-lg font-medium hover:bg-sky-50 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Resume
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
