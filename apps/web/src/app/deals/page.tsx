'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Percent,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { ProductCard } from '../../components/product-card';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { getHotDeals, categoryDefinitions } from '../../data/catalog';
import { useCatalog } from '../../context/catalog-context';

export default function DealsPage() {
  const { hotDeals, categories: dynamicCategories } = useCatalog();
  const allDeals = hotDeals && hotDeals.length > 0 ? hotDeals : getHotDeals();
  const categories = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : categoryDefinitions;
  const [selectedCat, setSelectedCat] = React.useState('all');
  const [minDiscount, setMinDiscount] = React.useState(0);

  // Countdown
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredDeals = allDeals.filter((item) => {
    if (selectedCat !== 'all' && item.categorySlug !== selectedCat) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-[#1A0A0F] text-white py-14 sm:py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/banner-hot-deals.jpg"
              alt="Today's Supermarket Deals"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#21080E]/95 via-[#123C2D]/90 sm:via-[#123C2D]/75 md:to-[#123C2D]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0F] via-transparent to-black/40" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-500/40 border border-rose-400/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-black mb-3 shadow-md">
                  <Flame className="w-4 h-4 text-rose-300 fill-rose-300" />
                  <span>LIMITED TIME FLASH SAVINGS</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white drop-shadow-md">
                  Today&apos;s Best Supermarket Deals
                </h1>
                <p className="text-sm sm:text-base text-rose-50/90 mt-2 max-w-xl font-medium drop-shadow-sm">
                  Save big on premium fresh fruits, seasonal vegetables, grass-fed dairy, and essential kitchen staples.
                </p>
              </div>

              {/* Countdown Card */}
              <div className="bg-[#123C2D]/80 backdrop-blur-md border border-white/25 rounded-2xl p-5 text-center shrink-0 shadow-xl">
                <p className="text-xs uppercase font-extrabold text-rose-300 tracking-wider mb-2">
                  DEALS REFRESH IN:
                </p>
                <div className="flex items-center gap-2 font-mono text-2xl font-black text-white" suppressHydrationWarning>
                  <div className="bg-white/20 px-3 py-1.5 rounded-xl">
                    {String(timeLeft.hours).padStart(2, '0')}
                    <span className="text-[10px] block font-sans font-normal text-white/70">HRS</span>
                  </div>
                  <span>:</span>
                  <div className="bg-white/20 px-3 py-1.5 rounded-xl">
                    {String(timeLeft.minutes).padStart(2, '0')}
                    <span className="text-[10px] block font-sans font-normal text-white/70">MIN</span>
                  </div>
                  <span>:</span>
                  <div className="bg-white/20 px-3 py-1.5 rounded-xl text-rose-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                    <span className="text-[10px] block font-sans font-normal text-white/70">SEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl border border-[#E5ECE7] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#64736B]">Filter by Category:</span>
              <button
                type="button"
                onClick={() => setSelectedCat('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === 'all'
                    ? 'bg-[#123C2D] text-white'
                    : 'bg-[#F7F9F5] text-[#17251F] hover:bg-[#E5ECE7]'
                }`}
              >
                All Deals ({allDeals.length})
              </button>
              {categoryDefinitions.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCat(c.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCat === c.slug
                      ? 'bg-[#21A366] text-white'
                      : 'bg-[#F7F9F5] text-[#17251F] hover:bg-[#E5ECE7]'
                  }`}
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="text-xs text-[#64736B] font-semibold">
              Showing {filteredDeals.length} active promotions
            </div>
          </div>
        </section>

        {/* Product Grid - 3 Columns on Tablet, 5 Columns on Wide Screens */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <CartDrawer />
      <WishlistDrawer />
      <Modals />
      <SiteFooter />
    </div>
  );
}
