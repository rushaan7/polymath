import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export default function Notification({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  className = '',
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500/10 text-green-500',
    error: 'bg-red-500/10 text-red-500',
    warning: 'bg-yellow-500/10 text-yellow-500',
    info: 'bg-blue-500/10 text-blue-500',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed top-4 right-4 z-50 rounded-lg p-4 shadow-lg',
            typeClasses[type],
            className
          )}
        >
          <div className="flex items-center gap-2">
            <span>{message}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="ml-2"
            >
              ✕
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 