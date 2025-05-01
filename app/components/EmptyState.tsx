import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  title,
  message,
  icon = '📚',
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg',
        className
      )}
    >
      <div className="rounded-full bg-primary/10 p-4">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{message}</p>
      {action && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.onClick}
          className="rounded-lg bg-primary px-4 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
} 