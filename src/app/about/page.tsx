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
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 -z-10 w-full h-full opacity-80 blur-sm overflow-hidden">
  <div className="grid grid-cols-2 md:grid-cols-4 w-full h-full">
    
    <div className="grid gap-4 h-full">
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1432462770865-65b70566d673?auto=format&fit=crop&w=1950&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=927&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80" />
    </div>

    <div className="grid gap-4 h-full">
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&w=687&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://docs.material-tailwind.com/img/team-3.jpg" />
    </div>

    <div className="grid gap-4 h-full">
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://docs.material-tailwind.com/img/team-3.jpg" />
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&w=687&q=80" />
    </div>

    <div className="grid gap-4 h-full">
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&w=687&q=80" />
      <img className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=927&q=80" />
    </div>

  </div>
</div>


      {/* --- OVERLAY CARD --- */}
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
              with code, and blending creativity with technical design. I’ve worked on projects
              ranging from circuit builders and motion sandboxes to robotics, bio-inspired
              design, and full-stack web apps.
              <br /><br />
              Whether I’m debugging a simulation, creating a new interface, or exploring how
              engineering can solve real-world issues, I enjoy learning through building — and
              building things that people actually use.
            </p>
          </motion.div>

          {/* Contact */}
          <div>
            <h1 className="text-4xl font-bold mb-6" id="contact">Contact</h1>
            <p className="text-lg mb-6">
              Whether you want to talk about engineering, physics simulations, web projects,
              robotics, or something completely different, I’m always happy to connect.
            </p>

            <div className="grid gap-4 text-lg">
              <div className="font-medium">ethan.sie@berkeley.edu</div>
              <a
                href="https://linkedin.com/in/ethansie"
                target="_blank"
                className="hover:underline"
              >
                linkedin.com/in/ethansie
              </a>
              <a
                href="https://github.com/ethannsie"
                target="_blank"
                className="hover:underline"
              >
                github.com/ethannsie
              </a>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
