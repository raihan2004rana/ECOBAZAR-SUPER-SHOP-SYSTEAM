'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'underline' | 'pills' | 'enclosed';
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = 'underline',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange, variant }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const variant = context?.variant || 'underline';

    const variantClasses = {
      underline: 'border-b border-neutral-200 gap-6',
      pills: 'bg-neutral-100 p-1 rounded-lg gap-1',
      enclosed: 'border-b border-neutral-200 gap-1',
    }[variant];

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('inline-flex items-center', variantClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, disabled, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.value === value;
    const variant = context.variant;

    const variantClasses = {
      underline: cn(
        'pb-3 pt-2 text-sm font-medium border-b-2 transition-colors -mb-px',
        isActive
          ? 'border-primary-green text-primary-green font-semibold'
          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
      ),
      pills: cn(
        'px-3.5 py-1.5 text-sm font-medium rounded-md transition-all',
        isActive
          ? 'bg-white text-neutral-900 shadow-xs font-semibold'
          : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50'
      ),
      enclosed: cn(
        'px-4 py-2 text-sm font-medium border-t border-x rounded-t-md transition-colors -mb-px',
        isActive
          ? 'bg-white border-neutral-200 border-b-transparent text-primary-green font-semibold'
          : 'border-transparent text-neutral-500 hover:text-neutral-700 bg-neutral-50'
      ),
    }[variant];

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        disabled={disabled}
        onClick={() => context.onValueChange(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-green disabled:opacity-50 disabled:pointer-events-none',
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    if (context.value !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn('mt-4 focus-visible:outline-hidden animate-in fade-in-50 duration-150', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
