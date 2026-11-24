'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, Server, UserCheck, PhoneCall, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  const sections = [
    {
      id: 'collection',
      titleEn: '1. Information We Collect',
      titleBn: '১. আমরা যেসব তথ্য সংগ্রহ করি',
      contentEn: [
        'Personal Identity: Name, mobile phone number, email address, and delivery addresses within Bangladesh.',
        'Location Data: Your approximate district, neighborhood, or GPS coordinates to match and route orders to the closest ECOBAZAR branch (e.g., Dhanmondi, Gulshan, Uttara).',
        'Transaction History: Items ordered, delivery timestamps, selected payment method (e.g., bKash, Nagad, Cash on Delivery), and promotional coupon usage.',
        'Technical Diagnostics: Device type, browser cookies, and session logs solely used for site performance and cart persistence.',
      ],
      contentBn: [
        'ব্যক্তিগত পরিচিতি: আপনার নাম, সক্রিয় মোবাইল নম্বর, ইমেইল এবং বাংলাদেশের সুনির্দিষ্ট ডেলিভারি ঠিকানা।',
        'লোকেশন তথ্য: আপনার এলাকা বা জিপিএস লোকেশন, যার মাধ্যমে নিকটস্থ ইকোবাজার ব্রাঞ্চ (যেমন ধানমন্ডি, গুলশান, উত্তরা) থেকে দ্রুততম কোল্ড-চেইন ডেলিভারি নিশ্চিত করা হয়।',
        'লেনদেনের তথ্য: অর্ডারের পণ্যের তালিকা, ডেলিভারি সময়, পেমেন্ট মাধ্যম (বিকাশ, নগদ, ক্যাশ অন ডেলিভারি) এবং কুপন হিস্ট্রি।',
        'কারিগরি তথ্য: ব্রাউজার কুকিজ ও সেশন ডেটা, যা আপনার কার্ট ও পছন্দের ভাষা সংরক্ষণ করতে ব্যবহৃত হয়।',
      ],
    },
    {
      id: 'usage',
      titleEn: '2. How We Use Your Information',
      titleBn: '২. আপনার তথ্যের ব্যবহার',
      contentEn: [
        'Order Fulfillment: Routing your grocery basket to the nearest store hub, dispatching delivery riders, and sending real-time SMS status alerts.',
        'Freshness Guarantee: Monitoring cold-chain transit times from farm-to-table to maintain optimal shelf quality.',
        'Account & Loyalty Perks: Accruing EcoPoints, custom anniversary vouchers, and personalized nutritional recommendations.',
        'Security & Fraud Prevention: Verifying high-value orders and preventing unauthorized transactions or duplicate fake bookings.',
      ],
      contentBn: [
        'অর্ডার প্রসেসিং: আপনার পণ্য নিকটস্থ ব্রাঞ্চে প্যাকিং, রাইডার অ্যাসাইন এবং ফোনে রিয়েল-টাইম এসএমএস আপডেট পাঠানো।',
        'তাজা পণ্যের মান নিশ্চিতকরণ: খামার থেকে বাসা পর্যন্ত কোল্ড-চেইন ডেলিভারির সময় পর্যবেক্ষণ।',
        'লয়্যালটি ও ডিসকাউন্ট: ইকোপয়েন্ট জমা রাখা, মেম্বারশিপ বেনিফিট ও বিশেষ ছাড়ের কুপন পাঠানো।',
        'নিরাপত্তা ও জালিয়াতি রোধ: উচ্চ মূল্যের অর্ডার ভেরিফিকেশন এবং ভুয়া বুকিং প্রতিরোধ।',
      ],
    },
    {
      id: 'payments',
      titleEn: '3. Payment & Banking Security',
      titleBn: '৩. পেমেন্ট ও ব্যাংকিং নিরাপত্তা',
      contentEn: [
        'PCI-DSS Compliant Gateways: All digital payments (bKash, Nagad, Visa, Mastercard, American Express) are handled exclusively via Bangladesh Bank licensed, encrypted payment gateways.',
        'Zero Card Storage: ECOBAZAR never stores or logs your credit/debit card numbers, CVV codes, or mobile financial service PINs on its servers.',
        'Cash-on-Delivery (COD): You are free to inspect your package at your doorstep before handing cash to our verified delivery fleet.',
      ],
      contentBn: [
        'বাংলাদেশ ব্যাংক অনুমোদিত গেটওয়ে: সকল অনলাইন লেনদেন (বিকাশ, নগদ, ভিসা, মাস্টারকার্ড) সর্বোচ্চ ২৫৬-বিট এনক্রিপশনের মাধ্যমে সরাসরি গেটওয়েতে সম্পন্ন হয়।',
        'কার্ডের তথ্য সংরক্ষণ না করা: ইকোবাজারের সার্ভারে কোনো ব্যাংক কার্ড নম্বর, সিভিভি (CVV) কোড বা এমএফএস পিন সংরক্ষিত হয় না।',
        'ক্যাশ অন ডেলিভারি (COD): বাসায় পণ্য বুঝে পেয়ে সন্তুষ্ট হয়ে আমাদের ভেরিফায়েড রাইডারের কাছে নগদ মূল্য পরিশোধ করার পূর্ণ স্বাধীনতা রয়েছে।',
      ],
    },
    {
      id: 'sharing',
      titleEn: '4. Third-Party Sharing & Zero-Spam Policy',
      titleBn: '৪. তৃতীয় পক্ষের সাথে তথ্য আদান-প্রদান ও জিরো-স্প্যাম নীতি',
      contentEn: [
        'No Data Selling: We strictly never sell, rent, or trade your personal information to third-party advertisers or telemarketers.',
        'Authorized Delivery Partners: Rider dispatch systems only receive the necessary address, recipient name, and masked phone number to complete the physical delivery.',
        'Legal Compliance: Information will only be disclosed if required by the laws of Bangladesh (e.g., Digital Security Act, Consumer Rights Protection Act).',
      ],
      contentBn: [
        'তথ্য বিক্রয় সম্পূর্ণ নিষিদ্ধ: আমরা কখনোই কোনো বিজ্ঞাপনদাতা বা টেলিমার্কেটারের কাছে আপনার ব্যক্তিগত তথ্য বা ফোন নম্বর বিক্রি বা লিজ দিই না।',
        'ডেলিভারি রাইডার অংশীদার: ডেলিভারি সম্পন্ন করার জন্য শুধু প্রয়োজনীয় নাম, ঠিকানা এবং যোগাযোগের নম্বর রাইডারের অ্যাপে সরবরাহ করা হয়।',
        'আইনি বাধ্যবাধকতা: গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন (যেমন ভোক্তা অধিকার সংরক্ষণ আইন ও ডিজিটাল কমার্স পরিচালনা নির্দেশিকা) অনুযায়ী আইন প্রয়োগকারী সংস্থার যথাযথ রিকুইজিশন ব্যতীত কোনো তথ্য উন্মুক্ত করা হয় না।',
      ],
    },
    {
      id: 'rights',
      titleEn: '5. Your Rights & Account Deletion',
      titleBn: '৫. আপনার অধিকার ও একাউন্ট মুছে ফেলা',
      contentEn: [
        'Profile Edit: You can update your phone number, saved delivery addresses, or language preference at any time from your Account Profile.',
        'Marketing Opt-out: You can unsubscribe from promotional SMS or newsletters with a single click or reply STOP.',
        'Account Removal: To permanently purge your account and transactional history, contact privacy@ecobazar.com.bd and your request will be processed within 48 business hours.',
      ],
      contentBn: [
        'প্রোফাইল সংশোধন: আপনার একাউন্ট প্রোফাইল থেকে যেকোনো সময় ডেলিভারি ঠিকানা, ইমেইল বা প্রিফারেন্স পরিবর্তন করতে পারবেন।',
        'এসএমএস বন্ধ করার সুবিধা: যেকোনো প্রমোশনাল এসএমএস বন্ধ করতে চাইলে এক ক্লিকে অপ্ট-আউট করতে পারবেন।',
        'একাউন্ট ডিলিট: আপনার একাউন্ট ও অতীতের ডেটা চিরতরে মুছে ফেলতে চাইলে privacy@ecobazar.com.bd এ মেইল করুন; ৪৮ কর্মঘণ্টার মধ্যে তা কার্যকর করা হবে।',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9F5] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64736B] mb-6">
          <Link href="/" className="hover:text-[#21A366] transition-colors">
            {language === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="font-bold text-[#17251F]">
            {language === 'bn' ? 'গোপনীয়তা ও প্রাইভেসী নীতি' : 'Privacy Policy'}
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#123C2D] text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'bn' ? 'তথ্য সুরক্ষা ও বিশ্বাসযোগ্যতা' : 'Data Protection & Trust'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              {language === 'bn' ? 'ইকোবাজার প্রাইভেসী পলিসি' : 'ECOBAZAR Privacy Policy'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
              {language === 'bn'
                ? 'আপনার ব্যক্তিগত তথ্যের পূর্ণ নিরাপত্তা এবং ডিজিটাল গোপনীয়তা রক্ষা করা আমাদের সর্বোচ্চ অগ্রাধিকার। বাংলাদেশের ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১ অনুযায়ী আমাদের নীতি বর্ণিত হয়েছে।'
                : 'Your personal privacy and financial data security are paramount. This policy explains transparently how ECOBAZAR collects, safeguards, and utilizes your information across our website and mobile platforms.'}
            </p>
            <div className="text-[11px] text-emerald-300 font-bold">
              {language === 'bn' ? 'সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬ • সংস্করণ ৩.২' : 'Last Updated: November 2026 • Version 3.2'}
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* 3 Quick Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? '২৫৬-বিট SSL এনক্রিপশন' : '256-Bit SSL Encryption'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'প্রতিটি ট্রানজেকশন সম্পূর্ণ নিরাপদ' : 'All browser communications secured'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? 'জিরো স্প্যাম প্রতিশ্রুতি' : 'Zero Spam Guarantee'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'কোনো থার্ড পার্টির কাছে তথ্য বিক্রয় নয়' : 'Never sold to third-party telemarketers'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? 'পূর্ণ কাস্টমার নিয়ন্ত্রণ' : 'Full Customer Control'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'যেকোনো সময় ডেটা পরিবর্তন বা অপসারণ' : 'Edit profile or purge data on request'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-6 mb-10">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-[#E5ECE7] p-6 shadow-xs transition hover:border-[#21A366]/40"
            >
              <h3 className="text-base sm:text-lg font-black text-[#17251F] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#21A366] shrink-0" />
                <span>{language === 'bn' ? section.titleBn : section.titleEn}</span>
              </h3>
              <ul className="space-y-2.5">
                {(language === 'bn' ? section.contentBn : section.contentEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17251F]/90 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Protection Officer Contact */}
        <div className="bg-white rounded-2xl border border-[#E5ECE7] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-[#17251F] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#21A366]" />
              <span>{language === 'bn' ? 'গোপনীয়তা বিষয়ক সহায়তা ও প্রশ্ন' : 'Privacy Concerns & Data Inquiries'}</span>
            </h4>
            <p className="text-xs text-[#64736B]">
              {language === 'bn'
                ? 'আপনার তথ্যের নিরাপত্তা সম্পর্কিত যেকোনো প্রশ্ন বা আপত্তির জন্য আমাদের কমপ্লায়েন্স টিমের সাথে যোগাযোগ করুন।'
                : 'For any queries regarding your privacy rights, data export, or terms, contact our dedicated compliance desk.'}
            </p>
          </div>
          <a
            href="mailto:privacy@ecobazar.com.bd"
            className="px-5 py-2.5 rounded-xl bg-[#123C2D] hover:bg-[#164B38] text-white text-xs font-bold transition shrink-0"
          >
            privacy@ecobazar.com.bd
          </a>
        </div>
      </div>
    </div>
  );
}
