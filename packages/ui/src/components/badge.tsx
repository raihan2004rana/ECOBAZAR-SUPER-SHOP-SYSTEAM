import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-ecobazar-primary-green/15 text-emerald-800 border border-emerald-300',
        forest: 'bg-ecobazar-forest-green text-white',
        mint: 'bg-ecobazar-mint text-emerald-900',
        orange: 'bg-ecobazar-accent-orange/15 text-amber-900 border border-amber-300',
        danger: 'bg-red-100 text-red-800 border border-red-200',
        outline: 'text-slate-800 border border-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
