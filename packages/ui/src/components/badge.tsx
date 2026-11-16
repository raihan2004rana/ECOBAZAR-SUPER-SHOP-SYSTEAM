import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-ecobazar-primary-green/15 text-emerald-800 border border-emerald-300',
        forest: 'bg-ecobazar-forest-green text-white',
        mint: 'bg-ecobazar-mint text-emerald-900 border border-emerald-200',
        orange: 'bg-ecobazar-accent-orange/15 text-amber-900 border border-amber-300',
        success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        warning: 'bg-amber-100 text-amber-800 border border-amber-200',
        danger: 'bg-red-100 text-red-800 border border-red-200',
        error: 'bg-red-100 text-red-800 border border-red-200',
        info: 'bg-blue-100 text-blue-800 border border-blue-200',
        neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
        outline: 'text-slate-800 border border-slate-300 bg-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px] rounded-full',
        default: 'px-2.5 py-0.5 text-xs rounded-full',
        lg: 'px-3 py-1 text-sm rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  const dotColors = {
    default: 'bg-emerald-500',
    forest: 'bg-emerald-300',
    mint: 'bg-emerald-700',
    orange: 'bg-amber-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400',
    outline: 'bg-slate-500',
  };

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            dotColors[variant || 'default']
          )}
        />
      )}
      {children}
    </div>
  );
}
