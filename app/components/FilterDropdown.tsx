import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
}

export default function FilterDropdown({
  options,
  selected,
  onSelect,
  label = 'Filter',
  className = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div className={cn('relative', className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-muted bg-card px-4 py-2 text-foreground shadow-lg transition-all duration-300 hover:bg-muted"
      >
        <span className="font-medium">
          {label}: {selectedOption?.label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-muted bg-card p-2 shadow-lg"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full rounded-lg px-4 py-2 text-left transition-colors duration-200',
                  selected === option.value
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                )}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 