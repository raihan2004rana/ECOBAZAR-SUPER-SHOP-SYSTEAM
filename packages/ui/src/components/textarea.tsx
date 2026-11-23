import * as React from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCharCount,
      maxLength,
      value,
      defaultValue,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    const [charCount, setCharCount] = React.useState<number>(
      value ? String(value).length : defaultValue ? String(defaultValue).length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 tracking-tight"
            >
              {label}
            </label>
          )}
          {showCharCount && maxLength && (
            <span className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          maxLength={maxLength}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-slate-900 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus:ring-2 focus:ring-ecobazar-primary-green focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-neutral-900 disabled:text-slate-400 dark:disabled:text-neutral-600 transition-colors',
            error && 'border-red-400 focus:ring-red-400 text-red-900 dark:text-red-300',
            className
          )}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
