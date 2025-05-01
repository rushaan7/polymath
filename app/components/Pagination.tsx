import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'rounded-lg px-4 py-2 text-foreground transition-colors duration-200',
          currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-muted'
        )}
      >
        ←
      </motion.button>
      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPageChange(page)}
          className={cn(
            'rounded-lg px-4 py-2 transition-colors duration-200',
            currentPage === page
              ? 'bg-primary text-white'
              : 'text-foreground hover:bg-muted'
          )}
        >
          {page}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'rounded-lg px-4 py-2 text-foreground transition-colors duration-200',
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-muted'
        )}
      >
        →
      </motion.button>
    </div>
  );
} 