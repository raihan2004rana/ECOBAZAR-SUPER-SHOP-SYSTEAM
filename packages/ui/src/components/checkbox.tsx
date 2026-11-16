'use client';

import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      indeterminate,
      disabled,
      checked,
      id,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const sizeClasses = {
      sm: 'h-4 w-4 rounded text-xs',
      default: 'h-5 w-5 rounded-md text-sm',
      lg: 'h-6 w-6 rounded-md text-base',
    }[size];

    const iconSizes = {
      sm: 'h-3 w-3',
      default: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    }[size];

    return (
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start gap-2.5 select-none cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="relative flex items-center justify-center pt-0.5">
            <input
              type="checkbox"
              id={checkboxId}
              ref={internalRef}
              checked={checked}
              disabled={disabled}
              className="sr-only peer"
              aria-invalid={Boolean(error)}
              {...props}
            />
            <div
              className={cn(
                'flex items-center justify-center border transition-all duration-150',
                'border-neutral-300 bg-white shadow-xs',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-green/30 peer-focus-visible:border-primary-green',
                'peer-checked:bg-primary-green peer-checked:border-primary-green peer-checked:text-white',
                'peer-indeterminate:bg-primary-green peer-indeterminate:border-primary-green peer-indeterminate:text-white',
                error && 'border-error-500 peer-focus-visible:ring-error-500/20',
                disabled && 'bg-neutral-100 border-neutral-200',
                sizeClasses,
                className
              )}
            >
              {indeterminate ? (
                <Minus className={cn('stroke-[3] text-white', iconSizes)} />
              ) : (
                <Check
                  className={cn(
                    'stroke-[3] text-white transition-opacity duration-150',
                    checked ? 'opacity-100' : 'opacity-0',
                    iconSizes
                  )}
                />
              )}
            </div>
          </div>
          {(label || description) && (
            <div className="flex flex-col text-left">
              {label && (
                <span
                  className={cn(
                    'font-medium text-neutral-800 leading-tight',
                    size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-neutral-500 mt-0.5 leading-normal">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && (
          <p className="text-xs text-error-600 font-medium pl-7">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
