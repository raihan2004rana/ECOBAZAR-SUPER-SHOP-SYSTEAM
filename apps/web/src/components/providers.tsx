'use client';

import * as React from 'react';
import { ToastProvider } from '@ecobazar/ui';
import { CatalogProvider } from '../context/catalog-context';
import { CartProvider } from '../context/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CatalogProvider>
        <CartProvider>{children}</CartProvider>
      </CatalogProvider>
    </ToastProvider>
  );
}
