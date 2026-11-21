'use client';

import * as React from 'react';
import Link from 'next/link';
import { Logo } from '@ecobazar/ui';
import { categoryDefinitions, storeBranches } from '../data/catalog';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Banknote,
} from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#123C2D] text-white pt-10 md:pt-14 pb-24 md:pb-8 border-t border-[#21A366]/20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 pb-8 md:pb-12 border-b border-white/10 text-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">Fast 30-Min Delivery</h4>
              <p className="text-[10px] sm:text-xs text-white/70">Dispatched from 3 local hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">100% Safe & Organic</h4>
              <p className="text-[10px] sm:text-xs text-white/70">Strict lab tested quality</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">Doorstep Returns</h4>
              <p className="text-[10px] sm:text-xs text-white/70">Instant refund or replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">Dedicated Helpdesk</h4>
              <p className="text-[10px] sm:text-xs text-white/70">+880 9612-000000</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 py-8 md:py-12 border-b border-white/10">
          {/* Col 1: Brand story */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="brightness-200">
              <Logo size="md" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              ECOBAZAR is Bangladesh&apos;s premier multi-branch fresh supermarket. We bridge rural organic farmers and Dhaka households through an unbroken cold-chain supply network.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2EBD70] shrink-0" />
                <span className="truncate">House 42, Road 27, Dhanmondi, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2EBD70] shrink-0" />
                <span>7:00 AM – 11:30 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2EBD70] shrink-0" />
                <span>support@ecobazar.com.bd</span>
              </div>
            </div>
          </div>

          {/* Col 2 & 3: Departments - Clean 2-column list on mobile to save vertical scrolling */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-sm text-[#D8F3DC] mb-3 uppercase tracking-wider">
              Departments & Fresh Harvest
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/80">
              {categoryDefinitions.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="hover:text-[#2EBD70] transition-colors truncate"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Quick links & Hubs */}
          <div>
            <h4 className="font-extrabold text-sm text-[#D8F3DC] mb-3 uppercase tracking-wider">
              Explore & Hubs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs text-white/80">
              <Link href="/profile" className="hover:text-[#2EBD70] transition-colors font-bold text-white flex items-center gap-1.5">
                <span>Customer Profile</span>
                <span className="text-[9px] bg-amber-400 text-neutral-900 font-black px-1.5 py-0.2 rounded-full uppercase">
                  VIP
                </span>
              </Link>
              <Link href="/deals" className="hover:text-[#2EBD70] transition-colors">
                Today&apos;s Deals
              </Link>
              <Link href="/new-arrivals" className="hover:text-[#2EBD70] transition-colors">
                New Harvest
              </Link>
              <Link href="/offers" className="hover:text-[#2EBD70] transition-colors">
                Coupons & Promos
              </Link>
              <Link href="/careers" className="hover:text-[#2EBD70] transition-colors flex items-center gap-1.5 font-bold text-white">
                <span>Careers</span>
                <span className="text-[9px] bg-[#2EBD70] text-[#123C2D] font-black px-1.5 py-0.2 rounded-full uppercase">
                  Hiring
                </span>
              </Link>
              <Link href="/branches" className="hover:text-[#2EBD70] transition-colors">
                Store Branches
              </Link>
              <Link href="/about-us" className="hover:text-[#2EBD70] transition-colors">
                About Our Network
              </Link>
              <Link href="/contact" className="hover:text-[#2EBD70] transition-colors">
                Contact & Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment methods */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 text-center sm:text-left">
          <p>© 2026 ECOBAZAR Supermarket Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-white/90 font-bold text-[11px] mr-1">Accepted Payments:</span>
            
            {/* bKash Logo Card */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-xs">
              <svg className="w-4 h-3.5" viewBox="0 0 100 80" fill="none">
                <polygon points="10,40 50,10 65,35 40,40" fill="#E2136E" />
                <polygon points="50,10 90,25 65,35" fill="#C70057" />
                <polygon points="40,40 65,35 75,70 45,55" fill="#E2136E" />
                <polygon points="65,35 90,25 85,55 75,70" fill="#C70057" />
              </svg>
              <span className="font-black text-[#E2136E] text-[11px] tracking-tight">bKash</span>
            </div>

            {/* Nagad Logo Card */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 6 6 10 7 14C8 18 11 21 14 21C17 21 20 18 20 13C20 8 16 4 12 2Z" fill="#F7941D" />
                <path d="M11 7C8 10 8 13 9 16C10 18 12 19 14 19C15 19 17 18 17 15C17 12 14 9 11 7Z" fill="#E31A22" />
              </svg>
              <span className="font-black text-[#E31A22] text-[11px] tracking-tight">Nagad</span>
            </div>

            {/* Visa Logo Card */}
            <div className="flex items-center bg-white px-2 py-1 rounded-md shadow-xs">
              <span className="font-black text-[#1A1F71] text-[11px] italic tracking-wider font-sans">VISA</span>
            </div>

            {/* Mastercard Logo Card */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-xs">
              <div className="flex -space-x-1.5 items-center">
                <span className="w-3 h-3 rounded-full bg-[#EB001B]" />
                <span className="w-3 h-3 rounded-full bg-[#F79E1B] mix-blend-multiply opacity-90" />
              </div>
              <span className="font-extrabold text-[#17251F] text-[10px] tracking-tight">mastercard</span>
            </div>

            {/* Cash on Delivery Logo Card */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-xs">
              <Banknote className="w-3.5 h-3.5 text-[#21A366]" />
              <span className="font-black text-[#123C2D] text-[11px]">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
