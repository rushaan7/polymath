import { cn, formatCurrency } from '../lib/utils';

interface PriceDisplayProps {
  current: number;
  original: number;
  currency: string;
  className?: string;
}

export default function PriceDisplay({
  current,
  original,
  currency,
  className = '',
}: PriceDisplayProps) {
  const discount = Math.round(((original - current) / original) * 100);

  return (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-primary">
          {formatCurrency(current, currency)}
        </span>
        <span className="text-lg text-muted-foreground line-through">
          {formatCurrency(original, currency)}
        </span>
      </div>
      <span className="text-sm font-medium text-green-500">
        {discount}% OFF
      </span>
    </div>
  );
} 