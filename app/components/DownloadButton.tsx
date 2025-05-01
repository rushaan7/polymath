import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface DownloadButtonProps {
  format: 'PDF' | 'EPUB' | 'MOBI';
  size: string;
  onClick: () => void;
  className?: string;
}

export default function DownloadButton({
  format,
  size,
  onClick,
  className = '',
}: DownloadButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between rounded-lg border border-primary bg-transparent px-6 py-4 text-primary shadow-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-xl',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">Download</span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-sm font-medium">
          {format}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">{size}</span>
    </motion.button>
  );
} 