'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Sparkles,
  ChevronRight,
  Tag,
  Check,
} from 'lucide-react';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { HeroSlider } from '../components/hero-slider';
import { FeaturedCategoriesSlider } from '../components/featured-categories-slider';
import { FarmToTableSlider } from '../components/farm-to-table-slider';
import { ProductCard } from '../components/product-card';
import { CartDrawer } from '../components/cart-drawer';
import { WishlistDrawer } from '../components/wishlist-drawer';
import { Modals } from '../components/modals';
import {
  categoryDefinitions,
  getProductsByCategorySlug,
  getHotDeals,
  masterCatalogProducts,
} from '../data/catalog';
import { useCatalog } from '../context/catalog-context';

export default function HomePage() {
  // Deals countdown timer state
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

  const { hotDeals: dynamicHotDeals, categories: dynamicCategories, getProductsByCategory, topBanner } = useCatalog();
  const hotDeals = (dynamicHotDeals && dynamicHotDeals.length > 0 ? dynamicHotDeals : getHotDeals()).slice(0, 6);
  const categories = (dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : categoryDefinitions);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      {/* Site Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. HERO SECTION WITH SLIDER & USER-SUPPLIED BANNERS */}
        <HeroSlider />

        {/* 2. TRUST & BENEFITS BAR */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="bg-white rounded-2xl border border-[#E5ECE7] p-4 sm:p-6 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#17251F]">Same Day Delivery</h4>
                  <p className="text-[11px] text-[#64736B]">Fast & Reliable (30 Mins)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#17251F]">100% Secure Payment</h4>
                  <p className="text-[11px] text-[#64736B]">bKash, Cards, Cash on Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#17251F]">Easy Returns</h4>
                  <p className="text-[11px] text-[#64736B]">Hassle Free at Doorstep</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#17251F]">24/7 Dedicated Support</h4>
                  <p className="text-[11px] text-[#64736B]">Always Here for You</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED CATEGORIES SLIDER / QUICK DEPARTMENT EXPLORER */}
        <FeaturedCategoriesSlider />

        {/* 4. TODAY'S BEST DEALS 🔥 (With Countdown & High Savings) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-7 shadow-xs">
            {/* Header with Countdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5ECE7]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-rose-50 text-rose-500">
                    <Flame className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">Today&apos;s Best Deals</h2>
                </div>
                <p className="text-xs text-[#64736B] mt-1">
                  Up to 30% discount on fresh daily produce and pantry staples.
                </p>
              </div>

              {/* Countdown & View All */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#17251F] bg-[#F7F9F5] px-3.5 py-1.5 rounded-xl border border-[#E5ECE7]">
                  <Clock className="w-4 h-4 text-rose-500" />
                  <span className="text-[#64736B]">Ends in:</span>
                  <span className="font-mono text-rose-600 font-extrabold" suppressHydrationWarning>
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>

                <Link
                  href="/deals"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#21A366] hover:text-[#123C2D] transition-colors"
                >
                  <span>View All Deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Product Cards Row - 5 Per Row on Wide Screens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 mt-6">
              {hotDeals.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. ALL 11 INDIVIDUAL CATEGORY PRODUCT SECTIONS            */}
        {/* ========================================================= */}
        {categories.map((cat, index) => {
          const categoryProducts = (getProductsByCategory(cat.slug).length > 0
            ? getProductsByCategory(cat.slug)
            : getProductsByCategorySlug(cat.slug)).slice(0, 10);

          return (
            <React.Fragment key={cat.id}>
              {/* Category Product Section - 5 Products Per Row on Wide Screens */}
              <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-7 shadow-xs">
                  {/* Category Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E5ECE7]">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center text-2xl shrink-0 shadow-xs">
                        {cat.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">
                            {cat.name}
                          </h2>
                          <span className="text-xs bg-[#E5ECE7] text-[#17251F] font-bold px-2.5 py-0.5 rounded-full">
                            {cat.nameBn}
                          </span>
                        </div>
                        <p className="text-xs text-[#64736B] mt-0.5">{cat.tagline}</p>
                      </div>
                    </div>

                    {/* View All Button Linking to /category/[slug] */}
                    <div className="flex items-center gap-3">
                      {/* Subcategory quick tags */}
                      <div className="hidden xl:flex items-center gap-1.5">
                        {cat.subcategories.slice(0, 3).map((sub) => (
                          <Link
                            key={sub}
                            href={`/category/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                            className="text-[11px] bg-[#F7F9F5] hover:bg-[#D8F3DC] text-[#64736B] hover:text-[#123C2D] font-medium px-2.5 py-1 rounded-lg border border-[#E5ECE7] transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/category/${cat.slug}`}
                        className="inline-flex items-center gap-1.5 bg-[#21A366] hover:bg-[#123C2D] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                      >
                        <span>View All {cat.name.split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* 10 Product Cards Grid (5 Per Row on Wide Displays) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-6">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Interspersed High-Impact Promotional Banners */}
              {index === 2 && (
                <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. Bogura Doi Promotional Banner */}
                    <div className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-8">
                      <img
                        src="/images/banner-bogura-doi.jpg"
                        alt="ঐতিহ্যবাহী বগুড়ার দই"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="relative z-10">
                        <Link
                          href="/category/dairy-eggs"
                          className="inline-flex items-center gap-1.5 bg-[#123C2D] hover:bg-[#21A366] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                          <span>Order Curd Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* 2. Farm Fresh Grocery Promotional Banner */}
                    <div className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-8">
                      <img
                        src="/images/banner-farm-grocery.jpg"
                        alt="ফার্ম ফ্রেশ গ্রোসারি"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="relative z-10">
                        <Link
                          href="/category/fresh-fruits-vegetables"
                          className="inline-flex items-center gap-1.5 bg-[#123C2D] hover:bg-[#21A366] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                          <span>Shop Fresh Groceries</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {index === 6 && <FarmToTableSlider />}
            </React.Fragment>
          );
        })}
      </main>

      {/* Cart Drawer, Wishlist Drawer & All Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <Modals />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
