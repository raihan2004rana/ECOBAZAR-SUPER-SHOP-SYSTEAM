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
  Sparkles,
  CreditCard,
} from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#123C2D] text-white pt-14 pb-8 border-t border-[#21A366]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Fast 30-Min Delivery</h4>
              <p className="text-xs text-white/70">Dispatched from 3 local hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">100% Safe & Formalin Free</h4>
              <p className="text-xs text-white/70">Strict lab tested quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Doorstep Returns</h4>
              <p className="text-xs text-white/70">Instant refund or replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#21A366]/20 text-[#2EBD70] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Dedicated Helpdesk</h4>
              <p className="text-xs text-white/70">+880 9612-000000</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-white/10">
          {/* Col 1: Brand story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-200">
              <Logo size="md" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              ECOBAZAR is Bangladesh&apos;s premier multi-branch fresh supermarket. We bridge rural organic farmers and Dhaka households through an unbroken cold-chain supply network.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2EBD70]" />
                <span>Headquarters: House 42, Road 27, Dhanmondi, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2EBD70]" />
                <span>Operating Hours: 7:00 AM – 11:30 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2EBD70]" />
                <span>Email: support@ecobazar.com.bd</span>
              </div>
            </div>
          </div>

          {/* Col 2: 11 Departments */}
          <div>
            <h4 className="font-extrabold text-sm text-[#D8F3DC] mb-3 uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {categoryDefinitions.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-[#2EBD70] transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-[#D8F3DC] mb-3 uppercase tracking-wider">
              More Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {categoryDefinitions.slice(6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-[#2EBD70] transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick links & Hubs */}
          <div>
            <h4 className="font-extrabold text-sm text-[#D8F3DC] mb-3 uppercase tracking-wider">
              Explore & Hubs
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/deals" className="hover:text-[#2EBD70] transition-colors">
                  Today&apos;s Super Deals
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-[#2EBD70] transition-colors">
                  New Harvest Arrivals
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#2EBD70] transition-colors">
                  Coupons & Promos
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[#2EBD70] transition-colors">
                  Store Branches (3 Live)
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#2EBD70] transition-colors">
                  About Our Network
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2EBD70] transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment methods */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 ECOBAZAR Supermarket Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-medium">Accepted Payments:</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">bKash</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">Nagad</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">Visa</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">Mastercard</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
