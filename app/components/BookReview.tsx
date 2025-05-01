import { cn, formatDate } from '../lib/utils';
import { motion } from 'framer-motion';

interface BookReviewProps {
  author: string;
  rating: number;
  content: string;
  date: string;
  className?: string;
}

export default function BookReview({
  author,
  rating,
  content,
  date,
  className = '',
}: BookReviewProps) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={cn(
        'text-xl',
        i < rating ? 'text-yellow-400' : 'text-gray-400'
      )}
    >
      ★
    </span>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-lg bg-slate-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-500/20" />
          <span className="font-medium text-white">{author}</span>
        </div>
        <div className="flex items-center gap-1">{stars}</div>
      </div>
      <p className="mb-4 text-gray-300">{content}</p>
      <span className="text-sm text-gray-400">
        {formatDate(date)}
      </span>
    </motion.div>
  );
} 