import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  author: string;
  role: string;
  content: string;
  avatar?: string;
  className?: string;
}

export default function TestimonialCard({
  author,
  role,
  content,
  avatar,
  className = '',
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-lg bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/20">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{content}</p>
    </motion.div>
  );
} 