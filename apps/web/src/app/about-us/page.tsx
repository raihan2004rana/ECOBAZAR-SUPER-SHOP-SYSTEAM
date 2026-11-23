'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Building2,
  Calendar,
  Target,
  Check,
  Quote,
  Leaf,
  Store,
  Compass,
  BadgeCheck,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { AboutHeroSlider } from '../../components/about-hero-slider';

export default function AboutUsPage() {
  const [activeLocationTab, setActiveLocationTab] = React.useState<string>('all');

  const stats = [
    { label: 'Happy Households in Dhaka', value: '45,000+', icon: Users },
    { label: 'Partner Organic Farmers', value: '120+', icon: HeartHandshake },
    { label: 'Active Physical Hubs', value: '3 Locations', icon: Building2 },
    { label: 'Average Express Delivery', value: '25-30 Mins', icon: Truck },
  ];

  const locations = [
    {
      id: 'dhanmondi',
      number: '01',
      name: 'Dhanmondi Flagship Superstore',
      nameBn: 'ধানমন্ডি ফ্ল্যাগশিপ সুপারস্টোর',
      badge: 'THE FOUNDING FLAGSHIP',
      established: 'October 2021',
      establishedBn: 'অক্টোবর ২০২১ (প্রতিষ্ঠাকালীন স্টোর)',
      address: 'House 42, Road 27, Dhanmondi, Dhaka-1209',
      image: '/images/branch-dhanmondi.jpg',
      hours: 'Daily: 7:00 AM – 11:30 PM',
      phone: '+880 9612-000001',
      coverage: 'Dhanmondi, Lalmatia, Kalabagan, Shukrabad, Mohammadpur',
      description:
        'ইকো বাজারের গৌরবময় সূতিকাগার। ২০২১ সালের অক্টোবরে ধানমন্ডি ২৭ নম্বর রোডে ৪,৫০০ বর্গফুটের দ্বিতল সুপরিসর ভবনে এই ফ্ল্যাগশিপ স্টোরটির যাত্রা শুরু হয়। এখানে রয়েছে গ্রামীণ কৃষকদের ভোরের ফসল, ওয়াক-ইন ফ্রুটস ডিসপ্লে, লাইভ অর্গানিক বেকারি ও চিল্ড কোল্ড-স্টোরেজ।',
      features: [
        '4,500 sq ft dual-level organic walk-in supermarket',
        'Live cold-pressed mustard oil ghani station',
        'Dedicated 25-minute express neighborhood delivery fleet',
        'In-store food purity and formalin verification counter',
      ],
    },
    {
      id: 'gulshan',
      number: '02',
      name: 'Gulshan-2 Premium Superstore',
      nameBn: 'গুলশান-২ প্রিমিয়াম সুপারস্টোর',
      badge: 'DIPLOMATIC ZONE HUB',
      established: 'March 2023',
      establishedBn: 'মার্চ ২০২৩ (নর্থ ঢাকা ফ্ল্যাগশিপ)',
      address: 'Plot 18, Road 113, Gulshan-2, Dhaka-1212',
      image: '/images/branch-gulshan.jpg',
      hours: 'Daily: 7:00 AM – 11:30 PM',
      phone: '+880 9612-000002',
      coverage: 'Gulshan 1 & 2, Banani, Baridhara, Niketan, Bashundhara R/A',
      description:
        'কূটনৈতিক ও প্রিমিয়াম আবাসিক এলাকার ক্রেতাদের সুবিধার্থে ২০২৩ সালের মার্চে গুলশান-২ এ প্রতিষ্ঠিত হয় এই অত্যাধুনিক ব্রাঞ্চ। আন্তর্জাতিক মানের গোরমেট অর্গানিক ফুড, সুন্দরবনের প্রাকৃতিক মধু, চিল্ড নদীর তাজা মাছ ও প্রিমিয়াম গ্রোসারির এক অনন্য ঠিকানা।',
      features: [
        'Full diplomatic zone chilled express delivery in 30 mins',
        'Exotic chemical-free fruits & imported organic grocery',
        'Clean temperature-controlled meat & live river fish bay',
        'Dedicated customer parking & express takeaway lane',
      ],
    },
    {
      id: 'uttara',
      number: '03',
      name: 'Uttara Express Mega Hub',
      nameBn: 'উত্তরা এক্সপ্রেস মেগা হাব',
      badge: 'NORTHERN DHAKA MEGA HUB',
      established: 'January 2024',
      establishedBn: 'জানুয়ারি ২০২৪ (হাইওয়ে ডিরেক্ট হাব)',
      address: 'Sector 7, Road 14, Uttara, Dhaka-1230',
      image: '/images/branch-uttara.jpg',
      hours: 'Daily: 7:00 AM – 11:30 PM',
      phone: '+880 9612-000003',
      coverage: 'Uttara Sectors 1–14, Airport, Dakshinkhan, Mirpur DOHS',
      description:
        'উত্তরবঙ্গ (বগুড়া, রাজশাহী, রংপুর) থেকে ভোরে আসা তাজা ফসলের কাফেলা সরাসরি রিসিভ করার জন্য ২০২৪ সালের শুরুতে উত্তরা মেগা হাব চালু হয়। এটি উত্তর ঢাকার সর্ববৃহৎ কোল্ড-চেইন ফুলফিলমেন্ট সেন্টার এবং ওয়াক-ইন ইকো সুপারমার্কেট।',
      features: [
        'Direct northern highway agricultural intake station',
        'Fleet of 40+ electric bikes with thermal insulated boxes',
        'Express fulfillment covering all 14 sectors of Uttara',
        'Spacious walk-in supermarket with daily dawn-harvest discounts',
      ],
    },
  ];

  const pillars = [
    {
      title: '100% সতেজ ও ফরমালিন মুক্ত (Chemical Free)',
      desc: 'প্রতিটি সকালের শাকসবজি ও ফলমূল মাঠ থেকে সংগ্রহের পর আধুনিক ল্যাব টেস্টের মাধ্যমে বিষাক্ত ফরমালিন ও কীটনাশকমুক্ত নিশ্চিত করা হয়।',
      icon: <ShieldCheck className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: 'সুলভ ও ন্যায্য মূল্য (Fair & Affordable Price)',
      desc: 'মধ্যস্বত্বভোগী সিন্ডিকেট ভেঙে সরাসরি কৃষকের কাছ থেকে সংগ্রহ করায় সাধারণ বাজারের চেয়েও সাশ্রয়ী ও সুলভ মূল্যে প্রিমিয়াম পণ্য পৌঁছে দেওয়া সম্ভব হয়।',
      icon: <HeartHandshake className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: '৪° সে. কোল্ড-চেইন পরিবহন (Active Cold-Chain)',
      desc: 'মাছ, মাংস, দুধ ও শাকসবজির সজীবতা অটুট রাখতে ঢাকার ৩টি হাব ও রাইডারদের থার্মাল ব্যাগে তাপমাত্রা ৪ ডিগ্রি সেলসিয়াসের নিচে রাখা হয়।',
      icon: <Truck className="w-6 h-6 text-[#21A366]" />,
    },
    {
      title: 'নিঃশর্ত রিপ্লেসমেন্ট গ্যারান্টি (Instant Replacement)',
      desc: 'কোনো পণ্য মনের মতো না হলে রাইডারকে সাথে সাথে ফেরত দেওয়ার সুবিধা অথবা এক ক্লিকেই সম্পূর্ণ মানিব্যাক নিশ্চয়তা।',
      icon: <Award className="w-6 h-6 text-[#21A366]" />,
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'যাত্রার শুরু ও ধানমন্ডি ফ্ল্যাগশিপ',
      subtitle: 'The Inception & First Superstore',
      desc: 'রায়হান হাসান রানা’র উদ্যোগে ধানমন্ডি ২৭ এ ইকো বাজারের প্রথম ফ্ল্যাগশিপ আউটলেট উদ্বোধন। ১৫টি প্রান্তিক কৃষক পরিবারের সাথে সরাসরি চুক্তি।',
    },
    {
      year: '2022',
      title: 'কৃষক নেটওয়ার্ক সম্প্রসারণ',
      subtitle: 'Farmer Collective Scaling',
      desc: 'বগুড়া ও রাজশাহীর ৬০+ ফার্মের সাথে পার্টনারশিপ এবং ঢাকায় প্রথম ভ্রাম্যমাণ কোল্ড-চেইন সাপ্লাই চেইন চালু।',
    },
    {
      year: '2023',
      title: 'গুলশান-২ প্রিমিয়াম ব্রাঞ্চ',
      subtitle: 'Gulshan-2 Superstore Launch',
      desc: 'কূটনৈতিক এলাকায় এক্সক্লুসিভ অর্গানিক মার্কেট চালু এবং ঢাকায় ৩০ মিনিটে এক্সপ্রেস ডেলিভারি সার্ভিসের সূচনা।',
    },
    {
      year: '2024',
      title: 'উত্তরা মেগা হাব ও ৪৫,০০০+ পরিবার',
      subtitle: 'Uttara Mega Hub & 45k Milestone',
      desc: 'উত্তরায় উত্তরবঙ্গ ডিরেক্ট ইনটেক হাব চালু। ঢাকার ৪৫,০০০-এর বেশি নিয়মিত পরিবারের বিশ্বস্ত ঠিকানায় রূপান্তর।',
    },
    {
      year: '2026',
      title: 'ওমনিচ্যানেল স্মার্ট সুপারমার্কেট',
      subtitle: 'Next-Gen Omni-Channel Future',
      desc: 'সরাসরি অ্যাপ, ওয়েবসাইট ও ৩টি ফিজিক্যাল স্টোরের সমন্বয়ে স্মার্ট লাইভ ট্র্যাকিং ও শতভাগ নিরাপদ খাদ্যের নিশ্চয়তা।',
    },
  ];

  const filteredLocations =
    activeLocationTab === 'all'
      ? locations
      : locations.filter((loc) => loc.id === activeLocationTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* 1. HERO SLIDER */}
        <AboutHeroSlider />

        {/* 2. STATS RIBBON */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-2 sm:p-3 flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center mb-2 shadow-xs">
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#123C2D] tracking-tight">{s.value}</p>
                <p className="text-xs text-[#64736B] font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FOUNDER & LEADERSHIP STORY SECTION */}
        <section id="our-story" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-10">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Founder Image Column */}
              <div className="lg:col-span-5 relative bg-[#071F15] flex flex-col justify-end overflow-hidden min-h-[420px] lg:min-h-[580px]">
                <img
                  src="/images/founder-raihan.jpg"
                  alt="Raihan Hasan Rana - Founder & CEO of ECOBAZAR"
                  className="w-full h-full object-cover object-top absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F15] via-[#071F15]/40 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#2EBD70] text-[#071F15] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Founder & CEO</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                    Raihan Hasan Rana
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200 font-bold">
                    রায়হান হাসান রানা • Founder & Managing Director, ECOBAZAR
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs text-white/80 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2EBD70]" />
                      <span>Founded: October 2021</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#2EBD70] font-bold">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Founder Story & Vision Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#D8F3DC] text-[#123C2D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                    <Compass className="w-4 h-4 text-[#21A366]" />
                    <span>THE FOUNDING VISION & PURPOSE</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17251F] leading-tight">
                    নিরাপদ ও সতেজ খাদ্যের অঙ্গীকার নিয়ে ইকো বাজারের জন্ম
                  </h2>

                  <p className="text-sm text-[#64736B] leading-relaxed mt-4 font-medium">
                    ২০২১ সালে ঢাকার শহুরে জীবনে খাদ্যে বিষাক্ত ফরমালিন, কার্বাইড ও ভেজালের উদ্বেগ থেকে মুক্তি দিতে এক দৃঢ় প্রত্যয় নিয়ে ইকো বাজারের ভিত্তি স্থাপন করেন তরুণ উদ্যোক্তা <strong>রায়হান হাসান রানা</strong>। তার স্বপ্ন ছিল একটাই—শহরের প্রতিটি পরিবারের ঘরে যেন পৌঁছায় গ্রামের দিগন্তজোড়া মাঠের টাটকা, সজীব ও সম্পূর্ণ বিষমুক্ত খাবার।
                  </p>

                  <p className="text-sm text-[#64736B] leading-relaxed mt-3 font-medium">
                    প্রথাগত আড়তদার ও মধ্যস্বত্বভোগীদের কৃত্রিম সিন্ডিকেট ভেঙে সরাসরি বগুড়া, রাজশাহী, রংপুর ও যশোরের ১২০টিরও বেশি কৃষক সমবায়ের সাথে চুক্তি গড়ে তোলেন তিনি। ফলে একদিকে কৃষকরা পাচ্ছেন তাদের ন্যায্য ঘামঝরা ফসলের মূল্য, আর অন্যদিকে নাগরিকরা পাচ্ছেন <strong>সুলভ ও সাশ্রয়ী মূল্যে ১০০% সতেজ অর্গানিক খাদ্য</strong>।
                  </p>

                  {/* 4 Core Founding Commitments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-4 border-t border-[#E5ECE7]">
                    <div className="flex items-start gap-3 bg-[#F7F9F5] p-3 rounded-2xl border border-[#E5ECE7]">
                      <div className="w-8 h-8 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#17251F]">১০০% সতেজ ও খাটি পণ্য</h4>
                        <p className="text-[11px] text-[#64736B] mt-0.5">ভোরের আলো ফোটার সাথে সাথেই সরাসরি মাঠ থেকে সংগ্রহ।</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#F7F9F5] p-3 rounded-2xl border border-[#E5ECE7]">
                      <div className="w-8 h-8 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#17251F]">সুলভ ও ন্যায্য মূল্য</h4>
                        <p className="text-[11px] text-[#64736B] mt-0.5">জিরো মধ্যস্বত্বভোগী তাই সাধারণ বাজারের চেয়েও সাশ্রয়ী।</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#F7F9F5] p-3 rounded-2xl border border-[#E5ECE7]">
                      <div className="w-8 h-8 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#17251F]">২৫-৩০ মিনিটে এক্সপ্রেস ডেলিভারি</h4>
                        <p className="text-[11px] text-[#64736B] mt-0.5">কোল্ড-চেইন বক্সে পুষ্টি ও স্বাদ সুরক্ষিত রেখে ডেলিভারি।</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#F7F9F5] p-3 rounded-2xl border border-[#E5ECE7]">
                      <div className="w-8 h-8 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#17251F]">কৃষকের ন্যায্য মূল্যায়ন</h4>
                        <p className="text-[11px] text-[#64736B] mt-0.5">১২০+ গ্রামীণ কৃষক পরিবারকে উপযুক্ত মূল্যে সহযোগিতা।</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Quote Card */}
                <div className="bg-[#071F15] text-white p-5 rounded-2xl relative shadow-md">
                  <Quote className="w-8 h-8 text-[#2EBD70]/30 absolute top-3 right-3" />
                  <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed italic font-medium">
                    "আমাদের লক্ষ্য শুধুই ব্যবসা পরিচালনা নয়, বরং আমাদের প্রতিটি শিশুর সুস্থ ও দীর্ঘজীবী ভবিষ্যৎ গড়ার জন্য একটি নিরাপদ ও বিষমুক্ত খাদ্য সংস্কৃতি তৈরি করা। সততা, সতেজতা ও সুলভ মূল্য—এই তিন স্তম্ভের ওপর দাঁড়িয়ে আছে ইকো বাজার।"
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-black text-[#2EBD70]">— রায়হান হাসান রানা</span>
                    <span className="text-white/60 text-[11px]">Founder & CEO, ECOBAZAR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OUR 3 SUPERMARKET LOCATIONS SECTION */}
        <section id="locations" className="bg-white py-16 border-y border-[#E5ECE7] scroll-mt-10">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3.5 py-1 rounded-full inline-block mb-2">
                  OUR SUPERMARKET HUBS
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#17251F] leading-tight">
                  ঢাকার ৩টি প্রাইম লোকেশনে ইকো বাজার ওয়াক-ইন সুপারস্টোর
                </h2>
                <p className="text-sm text-[#64736B] mt-2 max-w-2xl font-medium">
                  সরাসরি স্টোরে এসে স্বাচ্ছন্দ্যে সতেজ শাকসবজি ও গ্রোসারি কেনাকাটা করুন অথবা অর্ডার করুন মাত্র ২৫-৩০ মিনিটে দোরগোড়ায় পাওয়ার জন্য।
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-[#F7F9F5] p-1.5 rounded-2xl border border-[#E5ECE7] shrink-0 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeLocationTab === 'all'
                      ? 'bg-[#21A366] text-white shadow-xs'
                      : 'text-[#64736B] hover:text-[#17251F]'
                  }`}
                >
                  All 3 Hubs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('dhanmondi')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeLocationTab === 'dhanmondi'
                      ? 'bg-[#21A366] text-white shadow-xs'
                      : 'text-[#64736B] hover:text-[#17251F]'
                  }`}
                >
                  Dhanmondi #01
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('gulshan')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeLocationTab === 'gulshan'
                      ? 'bg-[#21A366] text-white shadow-xs'
                      : 'text-[#64736B] hover:text-[#17251F]'
                  }`}
                >
                  Gulshan-2 #02
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('uttara')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeLocationTab === 'uttara'
                      ? 'bg-[#21A366] text-white shadow-xs'
                      : 'text-[#64736B] hover:text-[#17251F]'
                  }`}
                >
                  Uttara #03
                </button>
              </div>
            </div>

            {/* Location Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-[#F7F9F5] rounded-3xl border border-[#E5ECE7] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Location Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="bg-[#2EBD70] text-[#071F15] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          {loc.badge}
                        </span>
                        <span className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#123C2D] font-black text-xs flex items-center justify-center shadow-md">
                          #{loc.number}
                        </span>
                      </div>

                      {/* Bottom Image Overlay Info */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-[11px] text-[#2EBD70] font-black flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Established: {loc.established}</span>
                        </p>
                        <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm mt-0.5">
                          {loc.name}
                        </h3>
                        <p className="text-xs text-emerald-100 font-medium">{loc.nameBn}</p>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-2.5 text-xs">
                        <MapPin className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-[#17251F]">{loc.address}</p>
                          <p className="text-[#64736B] text-[11px] mt-0.5">
                            Coverage: {loc.coverage}
                          </p>
                        </div>
                      </div>

                      {/* Timings & Helpline */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5ECE7] text-[11px]">
                        <div className="bg-white p-2.5 rounded-xl border border-[#E5ECE7] flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#21A366] shrink-0" />
                          <span className="text-[#17251F] font-bold">7 AM – 11:30 PM</span>
                        </div>
                        <a
                          href={`tel:${loc.phone}`}
                          className="bg-white hover:bg-emerald-50 p-2.5 rounded-xl border border-[#E5ECE7] flex items-center gap-2 text-[#123C2D] font-bold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#21A366] shrink-0" />
                          <span>{loc.phone}</span>
                        </a>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#64736B] leading-relaxed font-medium">
                        {loc.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <div className="space-y-1.5 pt-2 border-t border-[#E5ECE7]">
                        {loc.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-[#17251F] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#21A366] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href="/branches"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#21A366] text-[#17251F] hover:text-white py-3 rounded-2xl text-xs font-black border border-[#E5ECE7] hover:border-transparent transition-all shadow-xs active:scale-98"
                    >
                      <Store className="w-4 h-4" />
                      <span>স্টোরের বিস্তারিত ও দিকনির্দেশনা দেখুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. THE TIMELINE & MILESTONES (2021 – 2026) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3.5 py-1 rounded-full">
              OUR MILESTONES & GROWTH
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#17251F] mt-2">
              ইকো বাজারের এগিয়ে চলার ধারাবাহিক ইতিহাস (২০২১ – ২০২৬)
            </h2>
            <p className="text-xs sm:text-sm text-[#64736B] mt-2 font-medium">
              একটি স্বপ্ন থেকে আজ ঢাকার শীর্ষস্থানীয় সতেজ অর্গানিক সুপারমার্কেট ব্র্যান্ড।
            </p>
          </div>

          <div className="relative">
            {/* Timeline Center Line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 -ml-px w-0.5 h-full bg-[#E5ECE7]" />

            <div className="space-y-8 lg:space-y-12">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={m.year}
                    className={`relative flex flex-col lg:flex-row items-center ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    } gap-6`}
                  >
                    {/* Content Box */}
                    <div className="w-full lg:w-1/2">
                      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5ECE7] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="bg-[#123C2D] text-[#2EBD70] text-xs font-black px-3 py-1 rounded-full">
                            {m.year}
                          </span>
                          <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wider">
                            {m.subtitle}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#17251F]">
                          {m.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed mt-2 font-medium">
                          {m.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node Icon */}
                    <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#21A366] text-white items-center justify-center font-black text-xs shadow-md border-4 border-white z-10 shrink-0">
                      ✓
                    </div>

                    {/* Empty Space for alignment on desktop */}
                    <div className="hidden lg:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. QUALITY STANDARDS & THE 4 PILLARS */}
        <section id="quality-standards" className="bg-[#071F15] text-white py-16 scroll-mt-10">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase text-[#071F15] bg-[#2EBD70] px-3.5 py-1 rounded-full">
                QUALITY STANDARDS & INTEGRITY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
                ইকো বাজার বিশ্বস্ততার ৪টি মূলভিত্তি
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 font-medium">
                আমাদের প্রতিটি পদক্ষেপে গ্রাহকের সুস্বাস্থ্য ও সর্বোচ্চ মানের নিশ্চয়তা।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#123C2D] flex items-center justify-center shadow-md">
                    {p.icon}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{p.title}</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CALL TO ACTION (CTA) BANNER */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#123C2D] via-[#164B38] to-[#0A261B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-xl space-y-2">
              <span className="inline-block bg-[#2EBD70] text-[#071F15] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                FRESHNESS DELIVERED TO YOUR DOORSTEP
              </span>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                আজই অভিজ্ঞতা নিন মাঠের খাঁটি সতেজ খাবারের
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                ধানমন্ডি, গুলশান ও উত্তরার ৩টি আধুনিক স্টোর থেকে মাত্র ২৫-৩০ মিনিটে আপনার ঘরে পৌঁছে যাবে স্বাস্থ্যসম্মত অর্গানিক পণ্য।
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/deals"
                className="w-full sm:w-auto bg-[#2EBD70] hover:bg-white text-[#071F15] px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Shop Fresh Food</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/branches"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Find Nearest Store</span>
              </Link>
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
