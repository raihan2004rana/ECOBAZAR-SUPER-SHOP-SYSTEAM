import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '../components/providers';

export const viewport: Viewport = {
  themeColor: '#123C2D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'ECOBAZAR | Fresh Groceries & Organic Supermarket',
  description: 'Online supermarket and grocery shopping in Bangladesh. Fresh daily produce delivered to your doorstep.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ECOBAZAR',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-[#17251F] bg-[#F7F9F5]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
