'use client';

import * as React from 'react';
import Link from 'next/link';
import { FileText, Scale, RefreshCw, Truck, AlertCircle, CheckCircle2, ShieldAlert, Banknote, Clock, Award } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

export default function TermsAndConditionsPage() {
  const { language } = useLanguage();

  const termsSections = [
    {
      id: 'agreement',
      titleEn: '1. Acceptance of Terms & Retail Framework',
      titleBn: '১. শর্তাবলী সম্মতি ও খুচরা ফ্রেমওয়ার্ক',
      icon: Scale,
      pointsEn: [
        'By browsing, placing an order, or registering an account on ECOBAZAR, you enter into a binding agreement governed by the laws of Bangladesh and the Digital Commerce Operations Guidelines 2021.',
        'ECOBAZAR reserves the right to update these terms at any time with prior notice published on this page.',
      ],
      pointsBn: [
        'ইকোবাজার প্ল্যাটফর্মে ব্রাউজ, একাউন্ট তৈরি বা অর্ডার প্রদান করার মাধ্যমে আপনি গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন এবং ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১ মেনে চলার সম্মতি প্রদান করছেন।',
        'ইকোবাজার যেকোনো সময় এই শর্তাবলী হালনাগাদ করার অধিকার সংরক্ষণ করে এবং তা প্ল্যাটফর্মে প্রকাশের সাথে সাথেই কার্যকর হবে।',
      ],
    },
    {
      id: 'branches',
      titleEn: '2. Multi-Branch Operations & Stock Fulfillment',
      titleBn: '২. মাল্টি-ব্রাঞ্চ অপারেশন ও স্টক ফুলফিলমেন্ট',
      icon: Truck,
      pointsEn: [
        'Each order is matched and fulfilled strictly by your chosen regional store branch (e.g., Dhanmondi #01, Gulshan #02, Uttara #03, Banani Hub).',
        'Item pricing and stock availability reflect the real-time physical inventory of that specific branch hub.',
        'If a fresh perishable item becomes out-of-stock during packing, our branch manager will contact you immediately via phone or SMS for an approved fresh substitute or refund.',
      ],
      pointsBn: [
        'আপনার অর্ডারটি আপনার নির্বাচিত নিকটস্থ সুপারস্টোর শাখা (যেমন ধানমন্ডি, গুলশান, উত্তরা, বনানী ইত্যাদি) থেকে সরাসরি প্যাক ও ডেলিভারি করা হয়।',
        'পণ্যের মূল্য এবং স্টক প্রাপ্যতা সংশ্লিষ্ট ব্রাঞ্চের ফিজিক্যাল ইনভেন্টরির সাথে রিয়েল-টাইমে সিঙ্ক থাকে।',
        'প্যাকিংয়ের সময় যদি কোনো তাজা পণ্য স্টকে অপ্রতুল হয়, তবে আমাদের ব্রাঞ্চ ম্যানেজার তাৎক্ষণিক ফোন করে আপনার সম্মতি নিয়ে বিকল্প তাজা পণ্য দেবেন অথবা টাকা রিফান্ড করবেন।',
      ],
    },
    {
      id: 'freshness',
      titleEn: '3. Fresh Produce Weight Variances & BSTI Standards',
      titleBn: '৩. কাঁচা শাকসবজি-মাছের ওজন ও বিএসটিআই মান',
      icon: Award,
      pointsEn: [
        'Natural Perishables: Items sold by weight (e.g., whole chicken, hilsha fish, watermelon, fresh carrots, leafy vegetables) may possess natural variations of ±5% in final packing weight.',
        'Strict BSTI Certification: All packaged consumer goods (flour, edible oils, spices, dairy products) strictly adhere to Bangladesh Standards and Testing Institution (BSTI) regulations.',
        'Direct Farm Procurement: Fresh vegetables and fruits are sourced from contracted organic growers without carbide or toxic chemical ripening agents.',
      ],
      pointsBn: [
        'প্রাকৃতিক পণ্যের ওজন: ওজনের ভিত্তিতে বিক্রিত কাঁচা পণ্য (যেমন তাজা রুই মাছ, দেশি মুরগি, তরমুজ বা শাকসবজি)-তে প্রাকৃতিকভাবে ওজনের কিছুটা তারতম্য (±৫%) হতে পারে, যা নিখুঁত ডিজিটাল স্কেলে মেপে দাম সমন্বয় করা হয়।',
        'বিএসটিআই সনদ: প্যাকেটজাত সকল খাদ্যপণ্য (তেল, চাল, ডাল, ঘি, দুধ ইত্যাদি) বিএসটিআই অনুমোদিত মানসম্পন্ন।',
        'রাসায়নিকমুক্ত অঙ্গীকার: কোনো ক্ষতিকর ক্যালসিয়াম কার্বাইড বা ফর্মালিন ছাড়াই সরাসরি খামার থেকে কোল্ড-চেইন নেটওয়ার্কে খাদ্যপণ্য পৌঁছে দেওয়া হয়।',
      ],
    },
    {
      id: 'delivery',
      titleEn: '4. Delivery Slots, Cold-Chain Transit & Acceptance',
      titleBn: '৪. ডেলিভারি স্লট, কোল্ড-চেইন পরিবহন ও গ্রহণযোগ্যতা',
      icon: Clock,
      pointsEn: [
        'Express Delivery: Standard express orders are delivered within 30 to 60 minutes within branch delivery radius under normal weather and traffic conditions.',
        'Cold-Chain Temperature Control: Frozen poultry, fresh meat, and dairy are transported in insulated temperature-regulated bags.',
        'Doorstep Verification: Customers are strongly encouraged to inspect all perishable goods and count items in front of the delivery fleet prior to sharing the delivery OTP.',
      ],
      pointsBn: [
        'এক্সপ্রেস ডেলিভারি: স্বাভাবিক আবহাওয়া ও ট্রাফিকে ব্রাঞ্চের আওতাধীন এলাকায় ৩০ থেকে ৬০ মিনিটের মধ্যে এক্সপ্রেস ডেলিভারি সম্পন্ন করা হয়।',
        'কোল্ড-চেইন সুরক্ষা: হিমায়িত মাংস, তাজা মাছ ও দুগ্ধজাত পণ্য বিশেষ ইনসুলেটেড ব্যাগে নির্দিষ্ট তাপমাত্রায় ডেলিভারি করা হয়।',
        'দরজায় যাচাইকরণ: ডেলিভারি রাইডারের উপস্থিতিতে পণ্যের গুণগত মান ও সংখ্যা যাচাই করে সন্তুষ্ট হয়ে ডেলিভারি ওটিপি কনফার্ম করার অনুরোধ করা হচ্ছে।',
      ],
    },
    {
      id: 'returns',
      titleEn: '5. Instant Returns, Replacements & 100% Refunds',
      titleBn: '৫. তাৎক্ষণিক রিটার্ন, রিপ্লেসমেন্ট ও ১০০% রিফান্ড নীতি',
      icon: RefreshCw,
      pointsEn: [
        'Doorstep Return: If any fresh item does not meet your quality standards (e.g., bruised fruit or non-crisp vegetables), you can return that single item immediately to the delivery rider with zero cancellation fee.',
        '24-Hour Discovery Window: For packaged grocery goods with manufacturing defects, you have 24 hours from delivery to notify our Help Center via chatbot or phone (+880 9612-000000).',
        'Refund Processing: Prepayments via bKash/Nagad/Cards will be refunded back to the originating account within 24 to 72 business hours or immediately credited to your EcoWallet with 5% bonus points.',
      ],
      pointsBn: [
        'দরজায় তাৎক্ষণিক ফেরত: ডেলিভারির সময় কোনো কাঁচাবাজারে অসন্তোষ দেখা দিলে ডেলিভারি বয়কে কোনো অতিরিক্ত ফি ছাড়াই তৎক্ষণাৎ ফেরত দিতে পারবেন।',
        '২৪ ঘণ্টার সময়সীমা: প্যাকেটজাত পণ্যে কোনো ত্রুটি পাওয়া গেলে ডেলিভারির ২৪ ঘণ্টার মধ্যে আমাদের হটলাইন বা চ্যাটবটে জানালে দ্রুত সমাধান করা হবে।',
        'টাকা ফেরত: বিকাশ, নগদ বা কার্ডে অগ্রিম পরিশোধিত টাকা ২৪ থেকে ৭২ ঘণ্টার মধ্যে আপনার মূল একাউন্টে রিফান্ড হবে অথবা তাৎক্ষণিক ইকোপয়েন্ট বোনাসসহ ওয়ালেটে জমা হবে।',
      ],
    },
    {
      id: 'payments',
      titleEn: '6. Pricing, VAT & Invoicing Compliance',
      titleBn: '৬. পণ্যের মূল্য, ভ্যাট ও ইনভয়েস নীতি',
      icon: Banknote,
      pointsEn: [
        'All prices displayed on ECOBAZAR are inclusive of government applicable VAT as per the National Board of Revenue (NBR) directives.',
        'A comprehensive computerized electronic VAT invoice is generated with each fulfilled order, accessible from your customer profile and sent via SMS/Email.',
      ],
      pointsBn: [
        'ইকোবাজারে প্রদর্শিত প্রতিটি পণ্যের মূল্য জাতীয় রাজস্ব বোর্ডের (NBR) নিয়মানুযায়ী প্রযোজ্য ভ্যাটসহ নির্ধারিত।',
        'প্রতিটি ডেলিভারির সাথে সরকারি নিয়ম মেনে কম্পিউটারাইজড চালান/ইনভয়েস প্রদান করা হয়, যা আপনার প্রোফাইল হিস্ট্রিতেও সংরক্ষিত থাকে।',
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
            {language === 'bn' ? 'ব্যবহারের শর্তাবলী ও নিয়ম' : 'Terms & Conditions'}
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#123C2D] text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs">
              <Scale className="w-4 h-4" />
              <span>{language === 'bn' ? 'স্বচ্ছ ও নির্ভরযোগ্য নীতিমালা' : 'Fair Retail Standards'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              {language === 'bn' ? 'ইকোবাজার ব্যবহারের শর্তাবলী' : 'ECOBAZAR Terms & Conditions'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
              {language === 'bn'
                ? 'ইকোবাজার সুপারমার্কেটের সকল পণ্য ক্রয়, হোম ডেলিভারি, মূল্য পরিশোধ এবং রিটার্ন নীতিমালার বিস্তারিত নির্দেশিকা। আমাদের লক্ষ্য আপনার শতভাগ সন্তুষ্টি ও নির্ভেজাল বাজার নিশ্চিত করা।'
                : 'Clear, transparent consumer guidelines governing multi-branch order fulfillment, cold-chain fresh produce standards, express delivery, and our 100% money-back guarantee.'}
            </p>
            <div className="text-[11px] text-emerald-300 font-bold">
              {language === 'bn' ? 'কার্যকর তারিখ: নভেম্বর ২০২৬ • ভোক্তা অধিকার আইন ২০০৯ অনুযায়ী' : 'Effective: November 2026 • Consumer Rights Protection Act Compliant'}
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? '১০০% তাজা গ্যারান্টি' : '100% Freshness Guarantee'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'দরজায় দেখে নেওয়ার পূর্ণ সুযোগ' : 'Doorstep inspection before payment'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? 'সহজ ও ফ্রি রিটার্ন' : 'Hassle-Free Returns'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'অসন্তুষ্টিতে তাৎক্ষণিক পণ্য ফেরত' : 'Zero penalty instant replacements'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5ECE7] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">
                {language === 'bn' ? 'বিএসটিআই সার্টিফাইড' : 'BSTI Grade Verified'}
              </h4>
              <p className="text-[11px] text-[#64736B]">
                {language === 'bn' ? 'সরকারি মান ও ভ্যাট অনুমোদিত' : 'Full compliance with national rules'}
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-10">
          {termsSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-[#E5ECE7] p-6 shadow-xs hover:border-[#21A366]/40 transition"
              >
                <h3 className="text-base sm:text-lg font-black text-[#17251F] mb-4 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F9F5] text-[#21A366] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{language === 'bn' ? sec.titleBn : sec.titleEn}</span>
                </h3>
                <ul className="space-y-3">
                  {(language === 'bn' ? sec.pointsBn : sec.pointsEn).map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17251F]/90 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer Support Notice */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5ECE7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-[#17251F]">
              {language === 'bn' ? 'কোনো শর্ত সম্পর্কে স্পষ্টীকরণ প্রয়োজন?' : 'Need Clarification on Any Clause?'}
            </h4>
            <p className="text-xs text-[#64736B]">
              {language === 'bn'
                ? 'আমাদের কাস্টমার কেয়ার প্রতিনিধিরা সকাল ৭টা থেকে রাত ১১টা পর্যন্ত সহায়তার জন্য প্রস্তুত।'
                : 'Our legal and customer experience teams are available daily from 7:00 AM to 11:30 PM.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/faq"
              className="px-4 py-2 rounded-xl bg-[#F7F9F5] hover:bg-[#E5ECE7] text-[#17251F] text-xs font-bold transition"
            >
              {language === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Browse FAQs'}
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-[#21A366] hover:bg-[#1b8a56] text-white text-xs font-bold transition shadow-xs"
            >
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Support'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
