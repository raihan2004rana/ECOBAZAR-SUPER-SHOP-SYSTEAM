'use client';

import * as React from 'react';
import { ToastProvider } from '@ecobazar/ui';
import { CartProvider } from '../context/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
