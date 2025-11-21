"use client";

import { motion } from "framer-motion";
import React from "react";
import { Card, CardContent } from "../../components/contact-ui";

export default function ContactPage() {
  return (
    <motion.div
      className="relative max-w-4xl mx-auto px-6 py-20 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.9 }}
    >
      {/* background grid ... keep exactly the same */}

      <Card className="relative z-10 rounded-2xl shadow-lg bg-white/80 backdrop-blur-xl">
        <CardContent className="grid gap-10">

          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
          >
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg leading-relaxed text-neutral-700">
              I’m Ethan — an engineer who loves building physics simulations, solving problems
              with code, and blending creativity with technical design...
            </p>
          </motion.div>

          {/* Contact Section */}
          {/* ... unchanged */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
