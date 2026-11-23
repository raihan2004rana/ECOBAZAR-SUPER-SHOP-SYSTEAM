'use client';

import * as React from 'react';
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/language-context';

export const PWAInstaller: React.FC = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showBanner, setShowBanner] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.warn('[PWA] Service Worker registration failed:', error);
          });
      });
    }

    // 2. Check if already running as standalone app
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // If already installed and opened from home screen, do not show banner
    if (isStandaloneMode) return;

    // Check if user previously dismissed banner in current session
    const dismissed = sessionStorage.getItem('ecobazar_pwa_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // 3. Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Capture beforeinstallprompt for Android & Chrome Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show after slight delay for iOS if not already dismissed
    if (isIosDevice && !dismissed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3500);
      return () => clearTimeout(timer);
    }

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setShowBanner(false);
      setDeferredPrompt(null);
      console.log('[PWA] ECOBAZAR App successfully installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If on iOS or prompt not available, show alert/help
      if (isIOS) {
        alert(
          language === 'bn'
            ? 'অ্যাপ ইনস্টল করতে নিচে সাফারি ব্রাউজারের "Share" (⎋) বাটনে ক্লিক করে "Add to Home Screen" (➕) নির্বাচন করুন।'
            : 'To install on iOS: tap the Safari Share button (⎋) and select "Add to Home Screen" (➕).'
        );
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    sessionStorage.setItem('ecobazar_pwa_dismissed', 'true');
  };

  if (!showBanner || isStandalone || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#123C2D] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-500/30 backdrop-blur-md flex items-center justify-between gap-3">
        {/* App Logo & Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2EBD70] to-[#16A36A] flex items-center justify-center shrink-0 shadow-md p-1 border border-emerald-300/40">
            <img src="/icons/icon.svg" alt="ECOBAZAR Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-xs sm:text-sm text-white tracking-tight truncate">
              {language === 'bn' ? 'ECOBAZAR মোবাইল অ্যাপ' : 'ECOBAZAR Mobile App'}
            </h4>
            <p className="text-[11px] text-[#A7F3D0] truncate mt-0.5">
              {language === 'bn'
                ? 'দ্রুত অর্ডারিং ও লাইভ ট্র্যাকিং'
                : 'Install for 1-tap fast ordering'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="px-3.5 py-1.5 rounded-xl bg-[#2EBD70] hover:bg-[#25A25F] text-[#071F15] font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ইনস্টল' : 'Install'}</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
