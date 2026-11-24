'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Store,
  Bike,
  PackageCheck,
  BarChart3,
  Users,
  Boxes,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  PhoneCall,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/language-context';

export default function AdminStaffPortalPage() {
  const { language } = useLanguage();
  const [activeRole, setActiveRole] = React.useState<'admin' | 'branch_manager' | 'cashier' | 'rider'>('admin');

  const roleDetails = {
    admin: {
      titleEn: 'Super Admin & Executive HQ',
      titleBn: 'সুপার অ্যাডমিন ও হেডকোয়ার্টার ম্যানেজমেন্ট',
      target: 'CEO, Founder, COO, Central Operations Director',
      badge: 'HQ Full Access',
      badgeColor: 'bg-emerald-600 text-white',
      descEn:
        'Unified management across all 7 regional superstore branches in Bangladesh. Real-time revenue analytics, supplier procurement, product master catalog, employee payroll, and automated cold-chain logistics.',
      descBn:
        'বাংলাদেশের সকল ৭টি রিজিওনাল সুপারস্টোর ব্রাঞ্চের সমন্বিত ড্যাশবোর্ড। রিয়েল-টাইম সেলস অ্যানালিটিক্স, সাপ্লায়ার প্রকিউরমেন্ট, মাস্টার প্রোডাক্ট ক্যাটালগ, কর্মীদের বেতন ও কোল্ড-চেইন স্টক ট্র্যাকিং।',
      features: [
        { en: 'Multi-Branch Sales & GMV Analytics', bn: 'সকল শাখার দৈনিক বিক্রয় ও জিএমভি অ্যানালিটিক্স' },
        { en: 'Central Inventory & Cold-Chain Expiry Control', bn: 'সেন্ট্রাল ইনভেন্টরি ও এক্সপায়ারি অ্যালার্ট সিস্টেম' },
        { en: 'Product Master Catalog & Live Pricing Sync', bn: 'প্রোডাক্ট ক্রিয়েশন স্টুডিও ও এক ক্লিকে লাইভ প্রাইস সিঙ্ক' },
        { en: 'Marketing Campaigns, Coupons & Ad Banners', bn: 'মার্কেটিং ক্যাম্পেইন, প্রমোশন ও কুপন ডিসকাউন্ট ম্যানেজমেন্ট' },
        { en: 'Financial Ledger, VAT & Automated Audit Trail', bn: 'আর্থিক হিসাব, ভ্যাট চালনা ও স্বয়ংক্রিয় অডিট ট্রেইল' },
      ],
      defaultTab: 'dashboard',
    },
    branch_manager: {
      titleEn: 'Store Branch Manager',
      titleBn: 'শাখা ব্যবস্থাপক (Branch Manager)',
      target: 'Dhanmondi, Gulshan, Uttara, Banani, Mirpur Branch In-Charge',
      badge: 'Branch Level Control',
      badgeColor: 'bg-blue-600 text-white',
      descEn:
        'Dedicated hub for each localized superstore branch. Manage local orders queue, stock transfers from central warehouse, local store staff, and shelf restocking.',
      descBn:
        'প্রতিটি নির্দিষ্ট সুপারস্টোর শাখার নিজস্ব কন্ট্রোল হাব। লোকাল অর্ডার কিউ, সেন্ট্রাল ওয়্যারহাউস থেকে স্টক ট্রান্সফার, স্টোর স্টাফ শিডিউল এবং শেলফে পণ্য রিস্টকিং পরিচালনা।',
      features: [
        { en: 'Local Branch Order Dispatch & Packing Queue', bn: 'ব্রাঞ্চ ভিত্তিক অর্ডার ডিসপ্যাচ ও দ্রুত প্যাকিং কিউ' },
        { en: 'Goods Received Notes (GRN) from Suppliers', bn: 'সাপ্লায়ার ও ওয়্যারহাউস থেকে পণ্য রিসিভ (GRN)' },
        { en: 'Inter-Branch Stock Transfer Requisitions', bn: 'এক ব্রাঞ্চ থেকে অন্য ব্রাঞ্চে দ্রুত স্টক ট্রান্সফার রিকোয়েস্ট' },
        { en: 'Local Cashier & Shelf Boy Performance Monitoring', bn: 'শাখার ক্যাশিয়ার ও কর্মীদের কর্মক্ষমতা পর্যবেক্ষণ' },
      ],
      defaultTab: 'branches',
    },
    cashier: {
      titleEn: 'In-Store POS Terminal Cashier',
      titleBn: 'ইন-স্টোর পিওএস (POS) ক্যাশিয়ার কাউন্টার',
      target: 'Supermarket Checkout Desk Cashiers & Floor Staff',
      badge: 'POS Terminal Fast Checkout',
      badgeColor: 'bg-amber-600 text-white',
      descEn:
        'High-speed point-of-sale checkout system designed for barcode scanners, weighing scales, split payments (Cash, bKash, Nagad, Visa/Mastercard), and instant thermal receipt printing.',
      descBn:
        'সুপারমার্কেটের ফিজিক্যাল কাউন্টারে বারকোড স্ক্যানার ও ওয়েয়িং স্কেলের সাথে দ্রুত বিলিং, ক্যাশ/বিকাশ/কার্ড স্প্লিট পেমেন্ট এবং তাৎক্ষণিক থার্মাল রিসিট প্রিন্টিং সুবিধা।',
      features: [
        { en: '1-Click Barcode Scanning & Auto-Weight Calculation', bn: 'বারকোড স্ক্যানিং ও ওজনের ওপর ভিত্তি করে স্বয়ংক্রিয় প্রাইসিং' },
        { en: 'Multi-Channel Tender (Cash, bKash, Card, Loyalty Points)', bn: 'নগদ, বিকাশ, কার্ড ও কাস্টমার লয়্যালটি পয়েন্ট রিডেম্পশন' },
        { en: 'Instant Thermal Paper Invoice & SMS Receipt', bn: 'ইনস্ট্যান্ট থার্মাল পেপার রিসিট এবং কাস্টমারকে এসএমএস ইনভয়েস' },
        { en: 'Shift Cash Reconciliation & End-of-Day Register Close', bn: 'শিফটভিত্তিক ক্যাশ মেলানো এবং দিন শেষের রেজিস্টার ক্লোজিং' },
      ],
      defaultTab: 'pos',
    },
    rider: {
      titleEn: 'Delivery Fleet & Express Riders',
      titleBn: 'ডেলিভারি বয় ও এক্সপ্রেস রাইডার ফ্লীট',
      target: 'Two-Wheeler Delivery Fleet, Pickers & Couriers',
      badge: '30-45 Min Express Fleet',
      badgeColor: 'bg-purple-600 text-white',
      descEn:
        'Mobile-first dispatch dashboard for delivery boys. Real-time delivery route navigation, customer contact, Cash-on-Delivery (COD) reconciliation, and OTP confirmation.',
      descBn:
        'ডেলিভারি বয়দের জন্য মোবাইল ফ্রেন্ডলি ডিসপ্যাচ ড্যাশবোর্ড। গুগল ম্যাপস নেভিগেশন, কাস্টমার ওয়ান-ট্যাপ কলিং, ক্যাশ-অন-ডেলিভারি (COD) হিসাব এবং ডেলিভারি ওটিপি ভেরিফিকেশন।',
      features: [
        { en: 'Assigned Orders List with Optimal GPS Route', bn: 'অ্যাসাইন হওয়া অর্ডারের তালিকা ও শর্টেস্ট গুগল ম্যাপস রুট' },
        { en: '1-Tap Customer Calling & Delivery Note', bn: 'এক ক্লিকে কাস্টমারকে ফোন কল ও স্পেশাল ডেলিভারি নোট দেখা' },
        { en: 'Secure Delivery OTP Handover Verification', bn: 'কাস্টমারের ওটিপি (OTP) সাবমিট করে নিরাপদ হ্যান্ডওভার' },
        { en: 'Daily Cash Collection & Tip Settlement Tracker', bn: 'দৈনিক ক্যাশ কালেকশন (COD) এবং টিপস সেটেলমেন্ট রেকর্ড' },
      ],
      defaultTab: 'orders',
    },
  };

  const currentRoleInfo = roleDetails[activeRole];

  return (
    <div className="min-h-screen bg-[#F7F9F5] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-[#64736B]">
            <Link href="/" className="hover:text-[#21A366] transition-colors">
              {language === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <span>/</span>
            <span className="font-bold text-[#17251F]">
              {language === 'bn' ? 'কর্মী ও ব্যবস্থাপনা পোর্টাল' : 'Staff & Operations Hub'}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-[#123C2D] text-xs font-bold border border-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Enterprise Multi-Tenant Super Shop System</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#123C2D] text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Role-Based Access Control (RBAC)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              {language === 'bn'
                ? 'সুপারশপ এডমিন, শাখা ব্যবস্থাপক ও ডেলিভারি রাইডার পোর্টাল'
                : 'Super Shop Admin, Branch Managers & Delivery Fleet Hub'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
              {language === 'bn'
                ? 'ইকোবাজার সুপারমার্কেটের পেছনে রয়েছে একটি স্বয়ংসম্পূর্ণ এন্টারপ্রাইজ সিস্টেম। এখানে সুপার এডমিন, প্রতিটি ব্রাঞ্চের ম্যানেজার, পিওএস ক্যাশিয়ার এবং ডেলিভারি বয়দের জন্য রয়েছে নির্ধারিত পৃথক রোল ও ফিচার।'
                : 'ECOBAZAR operates on an enterprise omnichannel architecture. Discover how Head Office Executives, Branch Managers, Cashiers, and Express Delivery Riders collaborate seamlessly in real time.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/raihan2004rana/ECOBAZAR-SUPER-SHOP-SYSTEAM"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#1b8a56] text-white text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{language === 'bn' ? 'অ্যাডমিন আর্কিটেকচার সোর্স কোড' : 'Admin Architecture Repo'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
              >
                <span>{language === 'bn' ? 'কাস্টমার প্রোফাইল দেখুন' : 'Switch to Customer View'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative Background Circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-10 top-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        </div>

        {/* 4 Roles Interactive Tab Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            {
              id: 'admin',
              icon: ShieldCheck,
              nameEn: 'Super Admin / HQ',
              nameBn: 'সুপার এডমিন (HQ)',
              subtitleEn: 'CEO & Full Management',
              subtitleBn: 'কেন্দ্রীয় নিয়ন্ত্রণ',
              color: 'text-emerald-700 bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20',
            },
            {
              id: 'branch_manager',
              icon: Building2,
              nameEn: 'Branch Manager',
              nameBn: 'শাখা ব্যবস্থাপক',
              subtitleEn: 'Dhanmondi, Gulshan, Uttara',
              subtitleBn: 'নির্দিষ্ট শাখা ও স্টক',
              color: 'text-blue-700 bg-blue-50 border-blue-300 ring-2 ring-blue-500/20',
            },
            {
              id: 'cashier',
              icon: Store,
              nameEn: 'POS Cashier',
              nameBn: 'পিওএস ক্যাশিয়ার',
              subtitleEn: 'In-Store Physical Counter',
              subtitleBn: 'কাউন্টার দ্রুত বিলিং',
              color: 'text-amber-700 bg-amber-50 border-amber-300 ring-2 ring-amber-500/20',
            },
            {
              id: 'rider',
              icon: Bike,
              nameEn: 'Delivery Rider',
              nameBn: 'ডেলিভারি বয় / রাইডার',
              subtitleEn: '30-Min Dispatch Fleet',
              subtitleBn: 'ডেলিভারি ও ম্যাপ রুট',
              color: 'text-purple-700 bg-purple-50 border-purple-300 ring-2 ring-purple-500/20',
            },
          ].map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? role.color
                    : 'bg-white border-[#E5ECE7] hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white shadow-xs' : 'bg-[#F7F9F5] text-neutral-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="font-black text-sm text-[#17251F] leading-tight mb-1">
                  {language === 'bn' ? role.nameBn : role.nameEn}
                </h3>
                <p className="text-[11px] text-[#64736B]">
                  {language === 'bn' ? role.subtitleBn : role.subtitleEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detailed Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-sm mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5ECE7]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${currentRoleInfo.badgeColor}`}>
                  {currentRoleInfo.badge}
                </span>
                <span className="text-xs text-[#64736B] font-medium">
                  {currentRoleInfo.target}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">
                {language === 'bn' ? currentRoleInfo.titleBn : currentRoleInfo.titleEn}
              </h2>
            </div>
          </div>

          {/* Description & Key Responsibilities */}
          <div className="py-6 space-y-4">
            <p className="text-xs sm:text-sm text-[#17251F] leading-relaxed">
              {language === 'bn' ? currentRoleInfo.descBn : currentRoleInfo.descEn}
            </p>

            <h3 className="text-xs font-black uppercase tracking-wider text-[#64736B] pt-2">
              {language === 'bn' ? 'প্রধান দায়িত্ব ও ফিচারসমূহ:' : 'Core Responsibilities & Capabilities:'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {currentRoleInfo.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F5] border border-[#E5ECE7]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-[#17251F]">
                    {language === 'bn' ? feature.bn : feature.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* How this is deployed in Vercel */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-[#123C2D] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'bn'
                    ? 'অ্যাডমিন প্যানেল ডিপ্লয়মেন্ট গাইড'
                    : 'Independent Admin App Deployment'}
                </span>
              </h4>
              <p className="text-[11px] text-[#123C2D]/80">
                {language === 'bn'
                  ? 'এই মোনোরিপোতে apps/admin আলাদা অ্যাপ হিসেবে রয়েছে। Vercel-এ আরেকটি প্রজেক্ট তৈরি করে Root Directory apps/admin সিলেক্ট করলে https://ecobazar-admin.vercel.app/ নামে ডেডিকেটেড ড্যাশবোর্ড লাইভ হয়ে যাবে।'
                  : 'In this monorepo, apps/admin is a standalone Next.js dashboard. Simply deploy a second project on Vercel with Root Directory "apps/admin" to launch https://ecobazar-admin.vercel.app/.'}
              </p>
            </div>

            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#123C2D] hover:bg-[#164B38] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
            >
              {language === 'bn' ? 'Vercel এ ডিপ্লয় করুন' : 'Deploy Admin on Vercel'}
            </a>
          </div>
        </div>

        {/* 3 Step Deployment / Workflow Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E5ECE7] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-black text-sm text-[#17251F]">
              {language === 'bn' ? 'কাস্টমার অর্ডার প্লেসমেন্ট' : 'Customer Order'}
            </h4>
            <p className="text-xs text-[#64736B] leading-relaxed">
              {language === 'bn'
                ? 'কাস্টমার ওয়েব বা মোবাইল অ্যাপে নিজের পছন্দমতো ব্রাঞ্চ সিলেক্ট করে অর্ডার প্লেস করেন।'
                : 'Customer chooses nearest store hub (Dhanmondi, Gulshan, etc.) and completes checkout.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5ECE7] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-black text-sm text-[#17251F]">
              {language === 'bn' ? 'ব্রাঞ্চ ও ওয়্যারহাউস প্যাকিং' : 'Branch Hub Dispatch'}
            </h4>
            <p className="text-xs text-[#64736B] leading-relaxed">
              {language === 'bn'
                ? 'ব্রাঞ্চ ম্যানেজারের ড্যাশবোর্ডে অর্ডার আসে, শেলফ থেকে কোল্ড-চেইন ফ্রেশ প্যাক হয় এবং রাইডারকে দেওয়া হয়।'
                : 'Branch Manager views live queue, verifies stock expiry, packs fresh bag and assigns rider.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5ECE7] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-black text-sm text-[#17251F]">
              {language === 'bn' ? 'রাইডার এক্সপ্রেস ডেলিভারি' : 'Express Delivery'}
            </h4>
            <p className="text-xs text-[#64736B] leading-relaxed">
              {language === 'bn'
                ? 'ডেলিভারি বয় গুগল ম্যাপস দেখে ৩০-৪৫ মিনিটে পৌঁছে যায় এবং ওটিপি দিয়ে ডেলিভারি সম্পন্ন করে।'
                : 'Rider navigates via GPS route, contacts customer, verifies delivery OTP and collects payment.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
