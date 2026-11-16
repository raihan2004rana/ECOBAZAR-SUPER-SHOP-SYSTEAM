'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
import { Button } from './button';
import { cn } from '../utils/cn';

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  intent?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  intent = 'danger',
  isLoading = false,
}) => {
  const iconConfig = {
    danger: {
      icon: <AlertCircle className="h-6 w-6 text-error-600" />,
      bg: 'bg-error-50',
      btnVariant: 'danger' as const,
    },
    warning: {
      icon: <AlertTriangle className="h-6 w-6 text-warning-600" />,
      bg: 'bg-warning-50',
      btnVariant: 'orange' as const,
    },
    info: {
      icon: <Info className="h-6 w-6 text-info-600" />,
      bg: 'bg-info-50',
      btnVariant: 'default' as const,
    },
  }[intent];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm">
      <div className="flex items-start gap-4">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', iconConfig.bg)}>
          {iconConfig.icon}
        </div>
        <div className="flex-1">
          <DialogHeader className="mb-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1">{description}</DialogDescription>
          </DialogHeader>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant={iconConfig.btnVariant}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
ConfirmationDialog.displayName = 'ConfirmationDialog';
