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

export default function DealsPage() {
  const allDeals = getHotDeals();
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
        <section className="bg-gradient-to-r from-rose-950 via-[#123C2D] to-rose-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-500/30 border border-rose-400/40 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-bold mb-3">
                  <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>LIMITED TIME FLASH SAVINGS</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                  Today&apos;s Best Supermarket Deals
                </h1>
                <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl font-medium">
                  Save big on premium fresh fruits, seasonal vegetables, grass-fed dairy, and essential kitchen staples.
                </p>
              </div>

              {/* Countdown Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center shrink-0">
                <p className="text-xs uppercase font-extrabold text-rose-300 tracking-wider mb-2">
                  DEALS REFRESH IN:
                </p>
                <div className="flex items-center gap-2 font-mono text-2xl font-black text-white">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
