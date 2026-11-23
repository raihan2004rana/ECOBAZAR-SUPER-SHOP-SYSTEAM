'use client';

import * as React from 'react';
import { ToastProvider } from '@ecobazar/ui';
import { CatalogProvider } from '../context/catalog-context';
import { CartProvider } from '../context/cart-context';
import { LanguageProvider } from '../context/language-context';
import { UserProvider } from '../context/user-context';
import { PWAInstaller } from './pwa-installer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <LanguageProvider>
        <CatalogProvider>
          <UserProvider>
            <CartProvider>
              {children}
              <PWAInstaller />
            </CartProvider>
          </UserProvider>
        </CatalogProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}
