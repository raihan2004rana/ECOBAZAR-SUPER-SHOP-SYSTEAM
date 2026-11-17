import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/providers';

export const metadata: Metadata = {
  title: 'ECOBAZAR | Fresh Groceries & Organic Supermarket',
  description: 'Online supermarket and grocery shopping in Bangladesh. Fresh daily produce delivered to your doorstep.',
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
