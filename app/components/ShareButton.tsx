import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  platform: 'Twitter' | 'Facebook' | 'LinkedIn' | 'WhatsApp';
  url: string;
  className?: string;
}

export default function ShareButton({
  platform,
  url,
  className = '',
}: ShareButtonProps) {
  const getShareUrl = () => {
    switch (platform) {
      case 'Twitter':
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
      case 'LinkedIn':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
      case 'WhatsApp':
        return `https://wa.me/?text=${encodeURIComponent(url)}`;
      default:
        return url;
    }
  };

  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={getShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-lg border border-muted bg-transparent px-6 py-4 text-foreground shadow-lg transition-all duration-300 hover:bg-muted hover:shadow-xl',
        className
      )}
    >
      <span className="text-lg font-medium">Share on {platform}</span>
    </motion.a>
  );
} 