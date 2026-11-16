import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { LoadingSpinner } from './loading-spinner';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-ecobazar-primary-green text-white hover:bg-emerald-700 focus-visible:ring-ecobazar-primary-green shadow-sm',
        forest:
          'bg-ecobazar-forest-green text-white hover:bg-emerald-950 focus-visible:ring-ecobazar-forest-green shadow-sm',
        secondary:
          'bg-ecobazar-mint text-ecobazar-forest-green hover:bg-emerald-200 focus-visible:ring-ecobazar-forest-green',
        outline:
          'border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 focus-visible:ring-slate-400',
        orange:
          'bg-ecobazar-accent-orange text-white hover:bg-amber-600 focus-visible:ring-ecobazar-accent-orange shadow-sm',
        ghost:
          'hover:bg-slate-100 text-slate-700 hover:text-slate-900',
        danger:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm',
        link:
          'text-ecobazar-primary-green underline-offset-4 hover:underline p-0 h-auto active:scale-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base font-semibold',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner
            size={size === 'sm' ? 'xs' : 'sm'}
            variant={variant === 'secondary' ? 'forest' : variant === 'outline' || variant === 'ghost' ? 'slate' : 'white'}
          />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
