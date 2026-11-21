'use client';

import * as React from 'react';
import { ToastProvider } from '@ecobazar/ui';
import { CatalogProvider } from '../context/catalog-context';
import { CartProvider } from '../context/cart-context';
import { LanguageProvider } from '../context/language-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <LanguageProvider>
        <CatalogProvider>
          <CartProvider>{children}</CartProvider>
        </CatalogProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}
