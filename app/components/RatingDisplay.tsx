import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface RatingDisplayProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function RatingDisplay({
  rating,
  count,
  size = 'md',
  className = '',
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <motion.span
      key={i}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: i * 0.1 }}
      className={cn(
        sizeClasses[size],
        i < rating ? 'text-yellow-400' : 'text-gray-300'
      )}
    >
      ★
    </motion.span>
  ));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1">{stars}</div>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
} 