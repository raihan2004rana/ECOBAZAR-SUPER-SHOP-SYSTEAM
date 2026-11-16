'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      disabled,
      checked,
      defaultChecked,
      onChange,
      id,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);

    const isControlled = checked !== undefined;
    const activeChecked = isControlled ? checked : isChecked;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const containerSizes = {
      sm: 'w-7 h-4',
      default: 'w-10 h-6',
      lg: 'w-12 h-7',
    }[size];

    const thumbSizes = {
      sm: 'h-3 w-3 translate-x-0.5 peer-checked:translate-x-3.5',
      default: 'h-5 w-5 translate-x-0.5 peer-checked:translate-x-4.5',
      lg: 'h-6 w-6 translate-x-0.5 peer-checked:translate-x-5.5',
    }[size];

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex items-start gap-3 select-none cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative inline-flex items-center pt-0.5">
          <input
            type="checkbox"
            role="switch"
            id={switchId}
            ref={ref}
            checked={activeChecked}
            disabled={disabled}
            onChange={handleToggle}
            aria-checked={activeChecked}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'rounded-full bg-neutral-300 transition-colors duration-200 ease-in-out',
              'peer-checked:bg-primary-green',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-green/30 peer-focus-visible:ring-offset-2',
              disabled && 'bg-neutral-200 peer-checked:bg-neutral-300',
              containerSizes
            )}
          />
          <div
            className={cn(
              'absolute left-0 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out pointer-events-none',
              thumbSizes
            )}
          />
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
    );
  }
);
Switch.displayName = 'Switch';
