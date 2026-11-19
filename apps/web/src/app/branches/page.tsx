'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  Check,
  Building2,
  Truck,
  ShieldCheck,
  Sparkles,
  Calendar,
  Compass,
  ArrowRight,
  ExternalLink,
  Store,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { storeBranches, StoreBranch } from '../../data/catalog';
import { useCart } from '../../context/cart-context';
import { useToast } from '@ecobazar/ui';

export default function BranchesPage() {
  const { selectedBranch, setSelectedBranch } = useCart();
  const { toast } = useToast();
  const [selectedAreaFilter, setSelectedAreaFilter] = React.useState<string>('all');

  const handleSelectBranch = (branch: StoreBranch) => {
    setSelectedBranch(branch);
    toast.success('Store Selected', `${branch.name} is now your active fulfillment store.`);
  };

  const filteredBranches =
    selectedAreaFilter === 'all'
      ? storeBranches
      : storeBranches.filter((b) => b.id === selectedAreaFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO BANNER */}
        <section className="relative bg-[#071F15] text-white py-14 sm:py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-deliveryman.jpg"
              alt="ECOBAZAR Supermarket Branches & Cold Storage Hubs"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/75 to-[#0A261B]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F15] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#2EBD70] text-[#071F15] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                <Building2 className="w-4 h-4 text-[#071F15]" />
                <span>3 STRATEGIC WALK-IN HUBS IN DHAKA</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white drop-shadow-md">
                Our Physical Supermarket Hubs & Walk-In Stores
              </h1>
              <p className="text-sm sm:text-base text-emerald-50/90 font-medium leading-relaxed drop-shadow-sm">
                সরাসরি স্টোরে এসে স্বাচ্ছন্দ্যে সতেজ শাকসবজি ও খাঁটি অর্গানিক খাবার বেছে নিন, অথবা অর্ডার করুন মাত্র ২৫-৩০ মিনিটে ঘরে পাওয়ার জন্য।
              </p>
            </div>
          </div>
        </section>

        {/* BRANCHES LISTING SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Section Header & Area Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3 py-1 rounded-full">
                SELECT YOUR NEAREST STORE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17251F] mt-2">
                আউটলেটসমূহ ও এক্সপ্রেস ফুলফিলমেন্ট হাব
              </h2>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E5ECE7] shadow-2xs self-start md:self-auto">
              <button
                type="button"
                onClick={() => setSelectedAreaFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedAreaFilter === 'all'
                    ? 'bg-[#21A366] text-white shadow-xs'
                    : 'text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                All 3 Branches
              </button>
              <button
                type="button"
                onClick={() => setSelectedAreaFilter('b-dhn')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedAreaFilter === 'b-dhn'
                    ? 'bg-[#21A366] text-white shadow-xs'
                    : 'text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                Dhanmondi
              </button>
              <button
                type="button"
                onClick={() => setSelectedAreaFilter('b-gls')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedAreaFilter === 'b-gls'
                    ? 'bg-[#21A366] text-white shadow-xs'
                    : 'text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                Gulshan-2
              </button>
              <button
                type="button"
                onClick={() => setSelectedAreaFilter('b-utr')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedAreaFilter === 'b-utr'
                    ? 'bg-[#21A366] text-white shadow-xs'
                    : 'text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                Uttara
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredBranches.map((branch) => {
              const isCurrent = selectedBranch.id === branch.id;

              return (
                <div
                  key={branch.id}
                  className={`bg-white rounded-3xl border overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group ${
                    isCurrent
                      ? 'border-[#21A366] ring-2 ring-[#21A366]/30 shadow-md'
                      : 'border-[#E5ECE7] hover:border-[#21A366]/50'
                  }`}
                >
                  <div>
                    {/* Branch Shop Image */}
                    <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-100">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="bg-[#2EBD70] text-[#071F15] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          ⚡ {branch.deliveryTime} EXPRESS ETA
                        </span>

                        {isCurrent ? (
                          <span className="bg-[#21A366] text-white font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <Check className="w-3.5 h-3.5" />
                            <span>Active Store</span>
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            Est. {branch.established}
                          </span>
                        )}
                      </div>

                      {/* Image Bottom Overlay Info */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#2EBD70] font-black">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Established: {branch.established}</span>
                        </div>
                        <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm mt-0.5">
                          {branch.name}
                        </h3>
                        {branch.nameBn && (
                          <p className="text-xs text-emerald-100 font-semibold">{branch.nameBn}</p>
                        )}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Short Description */}
                      {branch.description && (
                        <p className="text-xs text-[#64736B] leading-relaxed font-medium">
                          {branch.description}
                        </p>
                      )}

                      {/* Key Details List */}
                      <div className="space-y-2.5 text-xs text-[#64736B] pt-2 border-t border-[#E5ECE7]/60">
                        {/* Address */}
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#17251F] font-bold block">{branch.address}</span>
                            <span className="text-[11px] text-[#21A366] font-semibold mt-0.5 block">
                              📍 কভারেজ: {branch.coverage}
                            </span>
                          </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#21A366] shrink-0" />
                          <span className="text-[#17251F] font-medium">{branch.hours}</span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-[#21A366] shrink-0" />
                          <a
                            href={`tel:${branch.phone}`}
                            className="text-[#123C2D] font-bold hover:text-[#21A366] hover:underline transition-colors"
                          >
                            {branch.phone} (সরাসরি হটলাইন)
                          </a>
                        </div>

                        {/* Manager */}
                        <div className="flex items-center gap-2.5">
                          <User className="w-4 h-4 text-[#21A366] shrink-0" />
                          <span>
                            হাব ম্যানেজার: <strong className="text-[#17251F]">{branch.manager}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Hub Capabilities */}
                      <div className="pt-3 border-t border-[#E5ECE7]/60">
                        <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                          Hub Features & Capabilities
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {branch.features.map((feat) => (
                            <span
                              key={feat}
                              className="text-[11px] bg-[#F7F9F5] border border-[#E5ECE7] text-[#17251F] font-semibold px-2.5 py-1 rounded-xl"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleSelectBranch(branch)}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 ${
                        isCurrent
                          ? 'bg-[#D8F3DC] text-[#123C2D] border border-[#21A366]/40 cursor-default'
                          : 'bg-[#21A366] hover:bg-[#123C2D] text-white hover:shadow-md'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-4 h-4 text-[#21A366]" />
                          <span>বর্তমানে নির্বাচিত সক্রিয় স্টোর (Active)</span>
                        </>
                      ) : (
                        <>
                          <Store className="w-4 h-4" />
                          <span>এই স্টোরটি সিলেক্ট করুন (Set as My Store)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* IN-STORE SERVICES & AMENITIES */}
        <section className="bg-white py-14 border-y border-[#E5ECE7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3.5 py-1 rounded-full">
                WALK-IN AMENITIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#17251F] mt-2">
                ইকো বাজার স্টোরে গ্রাহক সুবিধাসমূহ
              </h3>
              <p className="text-xs sm:text-sm text-[#64736B] mt-1 font-medium">
                পরিবার নিয়ে সরাসরি স্টোরে এসে কেনাকাটা করার অনন্য আরামদায়ক অভিজ্ঞতা।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F7F9F5] p-5 rounded-3xl border border-[#E5ECE7] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5ECE7] text-[#21A366] flex items-center justify-center font-bold shadow-xs">
                  🌿
                </div>
                <h4 className="font-extrabold text-sm text-[#17251F]">লাইভ ফ্রেশ ভেজিটেবল বার</h4>
                <p className="text-xs text-[#64736B] leading-relaxed">
                  ভোরের আলো ফোটার সাথে সাথে কৃষকের ক্ষেত থেকে আনা তাজা শাকসবজি ও ফলমূল।
                </p>
              </div>

              <div className="bg-[#F7F9F5] p-5 rounded-3xl border border-[#E5ECE7] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5ECE7] text-[#21A366] flex items-center justify-center font-bold shadow-xs">
                  🛡️
                </div>
                <h4 className="font-extrabold text-sm text-[#17251F]">ফরমালিন ও কোয়ালিটি টেস্ট</h4>
                <p className="text-xs text-[#64736B] leading-relaxed">
                  স্টোর কাউন্টারে তাৎক্ষণিক কেমিক্যাল ও খাদ্য বিশুদ্ধতা পরীক্ষার সুযোগ।
                </p>
              </div>

              <div className="bg-[#F7F9F5] p-5 rounded-3xl border border-[#E5ECE7] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5ECE7] text-[#21A366] flex items-center justify-center font-bold shadow-xs">
                  🛢️
                </div>
                <h4 className="font-extrabold text-sm text-[#17251F]">কাঠের ঘানি ভাঙা খাঁটি তেল</h4>
                <p className="text-xs text-[#64736B] leading-relaxed">
                  চোখের সামনে কাঠের ঘানিতে ভাঙা খাঁটি সরিষা ও কালোজিরা তেল কেনার সুবিধা।
                </p>
              </div>

              <div className="bg-[#F7F9F5] p-5 rounded-3xl border border-[#E5ECE7] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5ECE7] text-[#21A366] flex items-center justify-center font-bold shadow-xs">
                  🚗
                </div>
                <h4 className="font-extrabold text-sm text-[#17251F]">কার্বসাইড এক্সপ্রেস পিকআপ</h4>
                <p className="text-xs text-[#64736B] leading-relaxed">
                  অনলাইনে অর্ডার দিয়ে স্টোরের গাড়ি পার্কিংয়ে এসে মাত্র ২ মিনিটে পার্সেল রিসিভ করুন।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COLD-CHAIN & ASSURANCE SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-[#071F15] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2.5 max-w-xl">
              <span className="text-xs font-black uppercase text-[#2EBD70] bg-[#2EBD70]/20 px-3 py-1 rounded-full">
                UNBROKEN COLD CHAIN GUARANTEE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                মাছ, মাংস ও ডেইরির জন্য ৪° সেলসিয়াস তাপমাত্রা নিশ্চিত
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
                আমাদের প্রতিটি হাব এবং ডেলিভারি বাইকে রয়েছে বিশেষ ক্যালিব্রেটেড থার্মাল কম্পার্টমেন্ট, যা ফসল থেকে রান্নাঘর পর্যন্ত খাদ্যের পুষ্টি ও স্বাদ পুরোপুরি ধরে রাখে।
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-center shrink-0">
              <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-3xl font-black text-[#2EBD70]">25 Mins</p>
                <p className="text-xs text-white/70 mt-1 font-bold">Average Delivery</p>
              </div>
              <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-xs text-white/70 mt-1 font-bold">Pure & Safe Guarantee</p>
              </div>
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
