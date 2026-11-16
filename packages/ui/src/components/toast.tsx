'use client';

import * as React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../utils/cn';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  toast: {
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
  };
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    ({ title, description, type = 'default', duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, description, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toastHelpers = React.useMemo(
    () => ({
      success: (title: string, description?: string) =>
        addToast({ title, description, type: 'success' }),
      error: (title: string, description?: string) =>
        addToast({ title, description, type: 'error' }),
      warning: (title: string, description?: string) =>
        addToast({ title, description, type: 'warning' }),
      info: (title: string, description?: string) =>
        addToast({ title, description, type: 'info' }),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        toast: toastHelpers,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success-600 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-error-600 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning-600 shrink-0" />,
    info: <Info className="h-5 w-5 text-info-600 shrink-0" />,
    default: <Info className="h-5 w-5 text-neutral-600 shrink-0" />,
  };

  const borders = {
    success: 'border-success-200 bg-white shadow-lg',
    error: 'border-error-200 bg-white shadow-lg',
    warning: 'border-warning-200 bg-white shadow-lg',
    info: 'border-info-200 bg-white shadow-lg',
    default: 'border-neutral-200 bg-white shadow-lg',
  };

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-5',
        borders[toast.type || 'default']
      )}
    >
      {icons[toast.type || 'default']}
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-neutral-900 leading-tight">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-xs text-neutral-600 leading-normal">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}> = ({ toasts, onClose, position = 'bottom-right' }) => {
  if (toasts.length === 0) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4 items-end',
    'bottom-right': 'bottom-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'bottom-left': 'bottom-4 left-4 items-start',
  }[position];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn('pointer-events-none fixed z-50 flex flex-col space-y-2.5', positionClasses)}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
