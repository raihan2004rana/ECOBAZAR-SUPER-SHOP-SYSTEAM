'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { AboutHeroSlider } from '../../components/about-hero-slider';

export default function AboutUsPage() {
  const stats = [
    { label: 'Happy Households in Dhaka', value: '45,000+' },
    { label: 'Partner Organic Farmers', value: '120+' },
    { label: 'Active Physical Hubs', value: '3 Locations' },
    { label: 'Average Delivery Time', value: '25 Mins' },
  ];

  const pillars = [
    {
      title: '100% Formalin & Pesticide Free',
      desc: 'Every morning batch undergoes rigorous chemical and microbial testing before entering our distribution shelves.',
      icon: <ShieldCheck className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: 'Direct Rural Farm Procurement',
      desc: 'By eliminating predatory middlemen, we guarantee fair prices to Bangladeshi farmers and fair rates to consumers.',
      icon: <HeartHandshake className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: 'Active 4°C Cold-Chain Transit',
      desc: 'Our fish, meat, dairy, and leafy greens are maintained in dedicated temperature-controlled chilled bags until your door.',
      icon: <Truck className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: 'No-Questions-Asked Replacements',
      desc: 'If any fruit or vegetable does not meet your quality expectations, our delivery partner replaces it instantly.',
      icon: <Award className="w-6 h-6 text-[#21A366]" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Slider */}
        <AboutHeroSlider />

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-3">
                <p className="text-3xl sm:text-4xl font-black text-[#123C2D]">{s.value}</p>
                <p className="text-xs text-[#64736B] font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Mission & Story */}
        <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3 py-1 rounded-full">
                OUR JOURNEY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#17251F] mt-3 leading-tight">
                Rebuilding Trust in Daily Food & Grocery Shopping
              </h2>
              <p className="text-sm text-[#64736B] leading-relaxed mt-4">
                In urban Dhaka, finding genuine organic produce free from toxic preservatives like formalin and carbide has historically been a constant worry for families.
              </p>
              <p className="text-sm text-[#64736B] leading-relaxed mt-3">
                ECOBAZAR was built from the ground up to solve this. We maintain certified partner contracts with over 120 farm collectives across Bogura, Rajshahi, Rangpur, and Jessore. Every morning, produce is harvested at dawn, pre-screened in testing labs, and moved via refrigerated transport directly to our Dhanmondi, Gulshan, and Uttara hubs.
              </p>

              <div className="mt-6 space-y-2 text-xs font-bold text-[#17251F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#21A366]" />
                  <span>Unbroken cold chain guarantee below 4°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#21A366]" />
                  <span>Fair price living wage guarantee for our rural growers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#21A366]" />
                  <span>30-minute hyper-local delivery fleet in Dhaka</span>
                </div>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E5ECE7]">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
                alt="ECOBAZAR Farm Fresh"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D]/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs uppercase font-bold text-[#2EBD70]">Zero Middlemen Sourcing</p>
                  <h4 className="text-lg font-black">Direct from Soil to Table</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Pillars */}
        <section id="quality-standards" className="bg-white py-14 border-t border-[#E5ECE7] scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3 py-1 rounded-full">
                QUALITY STANDARDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17251F] mt-2">
                The Four Pillars of ECOBAZAR Integrity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#F7F9F5] rounded-2xl p-6 border border-[#E5ECE7] space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5ECE7] flex items-center justify-center shadow-xs">
                    {p.icon}
                  </div>
                  <h3 className="font-extrabold text-sm text-[#17251F]">{p.title}</h3>
                  <p className="text-xs text-[#64736B] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
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
