import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface PurchaseButtonProps {
  price: number;
  currency: string;
  onClick: () => void;
  className?: string;
}

export default function PurchaseButton({
  price,
  currency,
  onClick,
  className = '',
}: PurchaseButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between rounded-lg bg-primary px-6 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <span className="text-lg font-medium">Purchase Now</span>
      <span className="text-lg font-bold">
        {currency} {price}
      </span>
    </motion.button>
  );
} 