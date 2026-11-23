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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('admin_theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e){}
            })()`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 transition-colors">
        {children}
      </body>
    </html>
  );
}
