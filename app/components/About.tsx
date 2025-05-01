'use client';

import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg group"
          >
            <div className="relative h-full w-full">
              <Image
                src="/images/about.jpg"
                alt="About the Book"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white">About the Book</h2>
            <p className="mb-4 text-lg text-gray-300">
              "The Polymath's Path" is a groundbreaking exploration of multidisciplinary thinking and its power to transform our understanding of the world. Through engaging narratives and practical insights, this book challenges the conventional wisdom of specialization and invites readers to embrace the richness of diverse knowledge.
            </p>
            <p className="text-lg text-gray-300">
              Whether you're a student, professional, or lifelong learner, this book will inspire you to break free from the constraints of single-discipline thinking and discover the joy of connecting ideas across different fields.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 