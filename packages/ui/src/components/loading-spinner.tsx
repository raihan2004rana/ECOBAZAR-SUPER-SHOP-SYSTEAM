import * as React from 'react';
import { cn } from '../utils/cn';

export interface LoadingSpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  variant?: 'forest' | 'primary' | 'white' | 'orange' | 'slate';
}

export function LoadingSpinner({
  size = 'default',
  variant = 'primary',
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizeMap = {
    xs: 'h-3.5 w-3.5',
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-7 w-7',
    xl: 'h-10 w-10',
  };

  const colorMap = {
    forest: 'text-ecobazar-forest-green',
    primary: 'text-ecobazar-primary-green',
    white: 'text-white',
    orange: 'text-ecobazar-accent-orange',
    slate: 'text-slate-500',
  };

  return (
    <svg
      className={cn('animate-spin', sizeMap[size], colorMap[variant], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
