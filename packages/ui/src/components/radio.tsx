'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  error?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      orientation = 'vertical',
      label,
      error,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: currentValue,
          onChange: handleChange,
          disabled,
        }}
      >
        <div ref={ref} role="radiogroup" aria-label={label} className={cn('space-y-2', className)} {...props}>
          {label && (
            <span className="block text-sm font-medium text-neutral-800 mb-1.5">{label}</span>
          )}
          <div
            className={cn(
              'flex',
              orientation === 'vertical' ? 'flex-col space-y-2.5' : 'flex-row items-center gap-6'
            )}
          >
            {children}
          </div>
          {error && <p className="text-xs text-error-600 font-medium mt-1">{error}</p>}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      description,
      disabled: individualDisabled,
      id,
      value,
      checked: individualChecked,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const group = React.useContext(RadioGroupContext);
    const generatedId = React.useId();
    const radioId = id || generatedId;

    const isDisabled = group?.disabled || individualDisabled;
    const isChecked = group?.value !== undefined ? group.value === value : individualChecked;
    const name = group?.name || props.name;

    const sizeClasses = {
      sm: 'h-4 w-4',
      default: 'h-5 w-5',
      lg: 'h-6 w-6',
    }[size];

    const innerDotSizes = {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    }[size];

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={group?.onChange || props.onChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'flex items-center justify-center rounded-full border border-neutral-300 bg-white transition-all duration-150 shadow-xs',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-green/30 peer-focus-visible:border-primary-green',
              'peer-checked:border-primary-green',
              isDisabled && 'bg-neutral-100 border-neutral-200',
              sizeClasses
            )}
          >
            <div
              className={cn(
                'rounded-full bg-primary-green transition-transform duration-150',
                isChecked ? 'scale-100' : 'scale-0',
                innerDotSizes
              )}
            />
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
    );
  }
);
Radio.displayName = 'Radio';
