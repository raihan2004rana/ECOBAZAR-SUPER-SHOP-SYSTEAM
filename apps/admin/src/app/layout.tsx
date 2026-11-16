import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECOBAZAR Admin | Enterprise Retail OS & POS',
  description: 'Central administration, multi-branch inventory, and Point of Sale management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
