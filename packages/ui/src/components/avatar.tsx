'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  shape?: 'circle' | 'square';
}

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      name,
      initials: customInitials,
      size = 'default',
      status,
      shape = 'circle',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const sizeClasses = {
      xs: 'h-6 w-6 text-[10px]',
      sm: 'h-8 w-8 text-xs',
      default: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-14 w-14 text-lg',
      '2xl': 'h-16 w-16 text-xl',
    }[size];

    const statusSizes = {
      xs: 'h-1.5 w-1.5 ring-1',
      sm: 'h-2 w-2 ring-1.5',
      default: 'h-2.5 w-2.5 ring-2',
      lg: 'h-3 w-3 ring-2',
      xl: 'h-3.5 w-3.5 ring-2',
      '2xl': 'h-4 w-4 ring-2',
    }[size];

    const statusColors = {
      online: 'bg-success-500',
      offline: 'bg-neutral-400',
      busy: 'bg-error-500',
      away: 'bg-warning-500',
    };

    const initials = customInitials || getInitials(name);
    const hasValidImage = Boolean(src && !imageError);

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 select-none items-center justify-center font-medium',
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          'bg-mint-100 text-forest-700 border border-mint-200 shadow-xs',
          sizeClasses,
          className
        )}
        {...props}
      >
        {hasValidImage ? (
          <img
            src={src!}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className={cn(
              'h-full w-full object-cover',
              shape === 'circle' ? 'rounded-full' : 'rounded-lg'
            )}
          />
        ) : (
          <span className="font-semibold tracking-wider">{initials || '?'}</span>
        )}

        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-white',
              statusSizes,
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
