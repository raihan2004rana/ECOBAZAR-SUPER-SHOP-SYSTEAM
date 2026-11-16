'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOutsideClick?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
  size = 'md',
  closeOnOutsideClick = true,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);

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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-[95vw] h-[90vh]',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        aria-hidden="true"
        onClick={() => closeOnOutsideClick && onOpenChange(false)}
      />

      {/* Dialog Window */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-50 w-full rounded-xl bg-white p-6 shadow-2xl transition-all',
          'border border-neutral-200 animate-in fade-in-0 zoom-in-95 duration-200',
          sizeClasses
        )}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-primary-green transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('flex flex-col space-y-1.5 text-left mb-4', className)}>{children}</div>;

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3 className={cn('text-lg font-semibold text-neutral-900 leading-tight', className)}>
    {children}
  </h3>
);

export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <p className={cn('text-sm text-neutral-500 leading-relaxed', className)}>{children}</p>;

export const DialogBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('py-2 text-neutral-700', className)}>{children}</div>;

export const DialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-100', className)}>
    {children}
  </div>
);

// Modal aliases for ergonomic naming
export const Modal = Dialog;
export const ModalHeader = DialogHeader;
export const ModalTitle = DialogTitle;
export const ModalDescription = DialogDescription;
export const ModalBody = DialogBody;
export const ModalFooter = DialogFooter;
