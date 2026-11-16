import * as React from 'react';
import { cn } from '../utils/cn';

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  currencySymbol?: string;
  originalAmount?: number;
  size?: 'sm' | 'base' | 'lg' | 'xl';
}

export function PriceDisplay({
  amount,
  currencySymbol = '৳',
  originalAmount,
  size = 'base',
  className,
  ...props
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    base: 'text-base font-bold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-extrabold',
  };

  const formattedAmount = new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span
      className={cn('inline-flex items-baseline gap-1.5 font-sans tabular-nums', className)}
      {...props}
    >
      <span className={cn('text-ecobazar-forest-green', sizeClasses[size])}>
        {currencySymbol}
        {formattedAmount}
      </span>
      {originalAmount && originalAmount > amount && (
        <span className="text-xs text-slate-400 line-through">
          {currencySymbol}
          {new Intl.NumberFormat('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(originalAmount)}
        </span>
      )}
    </span>
  );
}
