'use client';

import * as React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/cart-context';
import { useLanguage } from '../context/language-context';

export const FloatingCartTab: React.FC = () => {
  const { totalCartCount, cartGrandTotal, setIsCartDrawerOpen, isHydrated } = useCart();
  const { language } = useLanguage();
  const [animateBounce, setAnimateBounce] = React.useState(false);

  // Trigger bounce animation when cart count changes
  React.useEffect(() => {
    if (totalCartCount > 0) {
      setAnimateBounce(true);
      const timer = setTimeout(() => setAnimateBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalCartCount]);

  return (
    <aside
      aria-label="Floating Quick Cart"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-30 select-none print:hidden"
    >
      <button
        type="button"
        onClick={() => setIsCartDrawerOpen(true)}
        className={`group relative flex flex-col items-center justify-center py-3 px-2 sm:px-2.5 rounded-l-2xl bg-[#E87027] hover:bg-[#D55F18] text-white shadow-2xl border-l-2 border-y-2 border-amber-300/40 transition-all duration-200 hover:-translate-x-1 active:scale-95 cursor-pointer ${
          animateBounce ? 'animate-bounce' : ''
        }`}
        title={language === 'bn' ? 'শপিং ব্যাগ দেখুন' : 'View Shopping Cart'}
        aria-label={
          language === 'bn'
            ? `শপিং কার্ট: ${isHydrated ? totalCartCount : 0} টি পণ্য, মোট ৳${isHydrated ? cartGrandTotal : 0}`
            : `Shopping Cart: ${isHydrated ? totalCartCount : 0} items, Total ৳${isHydrated ? cartGrandTotal : 0}`
        }
      >
        {/* Shopping Bag Icon with Active Indicator */}
        <div className="relative mb-1">
          <ShoppingBag className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
          {isHydrated && totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#123C2D] text-white text-[9px] font-black flex items-center justify-center border border-white/60 shadow-xs">
              {totalCartCount > 99 ? '99+' : totalCartCount}
            </span>
          )}
        </div>

        {/* Item Count Label */}
        <span className="text-[10px] sm:text-[11px] font-black leading-tight tracking-tight text-white/95">
          {isHydrated ? totalCartCount : 0}{' '}
          <span className="text-[9px] sm:text-[10px] font-bold block sm:inline">
            {language === 'bn' ? 'টি' : totalCartCount === 1 ? 'Item' : 'Items'}
          </span>
        </span>

        {/* Amount Pill */}
        <div className="mt-1 px-1.5 py-0.5 rounded-md bg-[#123C2D]/90 text-emerald-300 text-[10px] sm:text-[11px] font-black tracking-tight whitespace-nowrap shadow-xs group-hover:bg-[#123C2D]">
          ৳{isHydrated ? cartGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0'}
        </div>
      </button>
    </aside>
  );
};
