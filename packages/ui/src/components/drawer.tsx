'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOutsideClick?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  children,
  position = 'right',
  size = 'md',
  closeOnOutsideClick = true,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const positionClasses = {
    right: 'inset-y-0 right-0 h-full border-l',
    left: 'inset-y-0 left-0 h-full border-r',
    top: 'inset-x-0 top-0 w-full border-b',
    bottom: 'inset-x-0 bottom-0 w-full border-t',
  }[position];

  const sizeClasses = {
    sm: position === 'left' || position === 'right' ? 'w-full max-w-sm' : 'max-h-64',
    md: position === 'left' || position === 'right' ? 'w-full max-w-md' : 'max-h-96',
    lg: position === 'left' || position === 'right' ? 'w-full max-w-lg' : 'max-h-[500px]',
    xl: position === 'left' || position === 'right' ? 'w-full max-w-2xl' : 'max-h-[70vh]',
    full: position === 'left' || position === 'right' ? 'w-screen' : 'h-screen',
  }[size];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        aria-hidden="true"
        onClick={() => closeOnOutsideClick && onOpenChange(false)}
      />

      {/* Drawer Container */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed z-50 bg-white p-6 shadow-2xl transition-all duration-300 ease-out border-neutral-200 flex flex-col',
          positionClasses,
          sizeClasses
        )}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-primary-green transition-colors"
          aria-label="Close drawer"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DrawerHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('flex flex-col space-y-1.5 text-left mb-4 pr-8', className)}>{children}</div>;

export const DrawerTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3 className={cn('text-lg font-semibold text-neutral-900 leading-tight', className)}>
    {children}
  </h3>
);

export const DrawerDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <p className={cn('text-sm text-neutral-500 leading-relaxed', className)}>{children}</p>;

export const DrawerBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('flex-1 overflow-y-auto py-2 text-neutral-700', className)}>{children}</div>;

export const DrawerFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-100', className)}>
    {children}
  </div>
);
