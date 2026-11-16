'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

export interface DropdownProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const close = React.useCallback(() => setIsOpen(false), []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, close }}>
      <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown');

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      context.setIsOpen((prev) => !prev);
    },
    'aria-expanded': context.isOpen,
    'aria-haspopup': true,
  });
};

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right';
  width?: string;
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  className,
  align = 'right',
  width = 'w-56',
  children,
  ...props
}) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownContent must be used within Dropdown');

  if (!context.isOpen) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={cn(
        'absolute z-50 mt-2 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-100',
        align === 'right' ? 'right-0' : 'left-0',
        width,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  variant?: 'default' | 'danger';
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, icon, shortcut, variant = 'default', children, onClick, ...props }, ref) => {
    const context = React.useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      context?.close();
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        onClick={handleClick}
        className={cn(
          'flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors text-left',
          variant === 'default'
            ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
            : 'text-error-600 hover:bg-error-50 hover:text-error-700',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="h-4 w-4 shrink-0 text-current">{icon}</span>}
          <span>{children}</span>
        </div>
        {shortcut && (
          <span className="text-xs text-neutral-400 tracking-widest">{shortcut}</span>
        )}
      </button>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('-mx-1 my-1 h-px bg-neutral-200', className)} role="separator" />
);

export const DropdownLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider', className)}>
    {children}
  </div>
);
