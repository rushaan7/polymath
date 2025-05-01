'use client';

import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChapterPreview from './ChapterPreview';
import { bookConfig } from '../config/book';

export default function Preview() {
  const [mounted, setMounted] = useState(false);

  // Only render after mounting to avoid hydration issues
  useState(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Explore the Chapters</h2>
          <p className="text-xl text-gray-300">
            Get a glimpse into the transformative journey that awaits you
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookConfig.chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ChapterPreview
                title={chapter.title}
                description={chapter.description}
                imageUrl={chapter.image}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => {
              const purchaseSection = document.getElementById('purchase');
              purchaseSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Get Started"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 