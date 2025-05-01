import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface Chapter {
  title: string;
  page: number;
  duration?: string;
}

interface TableOfContentsProps {
  chapters: Chapter[];
  currentChapter?: number;
  className?: string;
}

export default function TableOfContents({
  chapters,
  currentChapter,
  className = '',
}: TableOfContentsProps) {
  return (
    <div className={cn('rounded-lg bg-card p-6 shadow-lg', className)}>
      <h2 className="mb-4 text-xl font-bold text-foreground">
        Table of Contents
      </h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              'flex items-center justify-between rounded-lg p-3 transition-colors duration-200',
              currentChapter === index
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
              <span className="font-medium text-foreground">
                {chapter.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {chapter.duration && (
                <span className="text-sm text-muted-foreground">
                  {chapter.duration}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                Page {chapter.page}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 