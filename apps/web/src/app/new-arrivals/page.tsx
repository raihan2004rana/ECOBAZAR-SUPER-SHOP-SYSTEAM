'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { ProductCard } from '../../components/product-card';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { masterCatalogProducts } from '../../data/catalog';

export default function NewArrivalsPage() {
  // Grab fresh harvest & new arrivals
  const newArrivals = masterCatalogProducts.filter(
    (p) =>
      p.isNewArrival ||
      p.badge?.includes('HARVEST') ||
      p.badge?.includes('FRESH') ||
      p.badge?.includes('ORGANIC')
  ).slice(0, 20);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#123C2D] via-[#1a513d] to-[#21A366] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-bold mb-3">
                <Sparkles className="w-4 h-4 text-[#F4A340]" />
                <span>FRESH HARVEST • ARRIVED THIS MORNING</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                Daily Fresh Harvest & New Arrivals
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-2 font-medium">
                Produce harvested before sunrise from our organic partner farms in Bogura, Rajshahi, and Sylhet. Inspected and delivered crisp to your home.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Ribbon */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl border border-[#E5ECE7] p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-[#17251F]">Picked Today at 5:00 AM</p>
                <p className="text-[#64736B]">Zero cold storage dehydration</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-[#17251F]">100% Pesticide Screened</p>
                <p className="text-[#64736B]">Certified chemical-free guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-[#17251F]">Same Day Delivery</p>
                <p className="text-[#64736B]">Express 30 minutes in Dhaka</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#17251F]">
              Recently Harvested & Restocked ({newArrivals.length} items)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
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
