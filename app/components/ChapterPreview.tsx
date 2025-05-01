import { cn, truncateText } from '../lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ChapterPreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
}

export default function ChapterPreview({
  title,
  description,
  imageUrl,
  className = '',
}: ChapterPreviewProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-all duration-300 perspective-1000',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        {!imageError ? (
          <div className="relative h-full w-full transform-gpu transition-transform duration-300 group-hover:scale-105">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-700">
            <span className="text-4xl">📚</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-300">
          {truncateText(description, 100)}
        </p>
      </div>
    </motion.div>
  );
} 