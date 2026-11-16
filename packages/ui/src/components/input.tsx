import * as React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'sm' | 'default' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = 'default',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs rounded-md',
      default: 'h-10 px-3 py-2 text-sm rounded-lg',
      lg: 'h-12 px-4 text-base rounded-xl',
    };

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'w-full border bg-white text-slate-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
              error
                ? 'border-red-400 focus:ring-red-400 text-red-900'
                : 'border-slate-300 focus:ring-ecobazar-primary-green',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              sizeClasses[inputSize],
              className
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium mt-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-help`} className="text-xs text-slate-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
