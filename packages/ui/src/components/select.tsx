import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  selectSize?: 'sm' | 'default' | 'lg';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      children,
      selectSize = 'default',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const sizeClasses = {
      sm: 'h-8 pl-2.5 pr-8 text-xs rounded-md',
      default: 'h-10 pl-3 pr-10 text-sm rounded-lg',
      lg: 'h-12 pl-4 pr-12 text-base rounded-xl',
    };

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-slate-700 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            className={cn(
              'w-full appearance-none border border-slate-300 bg-white text-slate-900 transition-colors focus-visible:outline-none focus:ring-2 focus:ring-ecobazar-primary-green focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer',
              error && 'border-red-400 focus:ring-red-400 text-red-900',
              sizeClasses[selectSize],
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          >
            {options
              ? options.map(opt => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-600 font-medium mt-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
