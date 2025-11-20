"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AnimatedProjectCard({
  title,
  description,
  href,
  image
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: "-0.3deg" }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="p-6 rounded-2xl border bg-white dark:bg-black shadow-md hover:shadow-2xl 
                 border-gray-200 dark:border-gray-700 cursor-pointer"
    >
      {image && (
        <Image
          src={image}
          width={600}
          height={400}
          alt={title}
          className="rounded-xl mb-4 object-cover"
        />
      )}

      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{description}</p>

      <Link href={href} className="text-sky-600 dark:text-sky-400 font-medium">
        View Project →
      </Link>
    </motion.div>
  );
}

