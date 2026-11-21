'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Truck,
  Menu,
} from 'lucide-react';
import { useCatalog } from '../context/catalog-context';
import { categoryDefinitions } from '../data/catalog';
import { useLanguage } from '../context/language-context';

interface Slide {
  id: string;
  badge: string;
  badgeBn: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  ctaText: string;
  ctaTextBn: string;
  ctaLink: string;
  image: string;
  tag: string;
  tagBn: string;
}

const defaultSlides: Slide[] = [
  {
    id: 'slide-1',
    badge: '',
    badgeBn: '',
    title: '',
    titleBn: '',
    subtitle: '',
    subtitleBn: '',
    ctaText: 'Shop Now',
    ctaTextBn: 'অর্ডার করুন',
    ctaLink: '/deals',
    image: '/images/hero-quality-trust.webp',
    tag: '',
    tagBn: '',
  },
  {
    id: 'slide-2',
    badge: 'Up to 25% Off Daily Essentials',
    badgeBn: 'দৈনন্দিন নিত্যপণ্যে সর্বোচ্চ ২৫% ছাড়',
    title: 'Wholesale Kitchen Staples & Pantry Care',
    titleBn: 'পাইকারি মূল্যে খাঁটি চাল, ডাল ও নিত্যপণ্য',
    subtitle:
      'Unpolished Miniket rice, premium lentils, and pantry essentials sourced directly from rural farming cooperatives at fair prices.',
    subtitleBn:
      'সরাসরি কৃষকদের থেকে সংগৃহীত পুষ্টিকর মিনিকেট চাল, দেশি মসুর ডাল ও তেল ন্যায্য মূল্যে।',
    ctaText: 'Explore Groceries',
    ctaTextBn: 'মুদি পণ্য দেখুন',
    ctaLink: '/category/groceries-staples',
    image: '/images/banner-staples-deals.jpg',
    tag: '100% Pure & Laboratory Tested Quality',
    tagBn: '১০০% খাঁটি ও ল্যাব-পরীক্ষিত মান',
  },
  {
    id: 'slide-3',
    badge: 'Chilled Under 4°C Cold Chain',
    badgeBn: '৪° সে. কোল্ড-চেইনে সংরক্ষিত',
    title: 'Natural Farm Milk & Free-Range Dairy',
    titleBn: 'প্রাকৃতিক গরুর দুধ ও ফ্রেশ ডেইরি',
    subtitle:
      'Pasteurized pure cow milk, country brown eggs, and pure artisanal butter delivered refrigerated to your doorstep.',
    subtitleBn:
      'পাস্তুরিত খাঁটি তরল দুধ, দেশি ডিম ও খাঁটি মাখন রেফ্রিজারেটেড ভ্যানে আপনার দরজায়।',
    ctaText: 'Shop Dairy & Eggs',
    ctaTextBn: 'ডেইরি ও ডিম দেখুন',
    ctaLink: '/category/dairy-eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop&q=80',
    tag: 'Zero Formalin • Guaranteed Freshness',
    tagBn: 'ফরমালিনমুক্ত • শতভাগ সতেজতার নিশ্চয়তা',
  },
];

export const HeroSlider: React.FC = () => {
  const { language, t } = useLanguage();
  const { heroSlides, categories: dynamicCategories } = useCatalog();
  const categories = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : categoryDefinitions;

  // Adapt dynamic slides or fall back to default bilingual slides
  const activeSlides: Slide[] = React.useMemo(() => {
    if (heroSlides && heroSlides.length > 0) {
      return heroSlides.map((s, idx) => ({
        id: s.id || `dyn-slide-${idx}`,
        badge: s.badge || '100% Organic & Chemical-Free',
        badgeBn: '১০০% অর্গানিক ও কেমিক্যালমুক্ত',
        title: s.title || 'Fast Fresh Groceries Delivered Daily',
        titleBn: 'প্রতিদিন তাজা গ্রোসারি দ্রুত ডেলিভারি',
        subtitle: s.subtitle || 'Handpicked crisp fruits, daily greens, garden produce delivered with 30 minutes in Dhaka under cold storage.',
        subtitleBn: 'বাছাইকৃত তাজা ফলমূল, সবুজ শাকসবজি এবং কোল্ড-স্টোরেজে সংরক্ষিত ফার্মের ফ্রেশ পণ্য ৩০ মিনিটে আপনার দরজায়।',
        ctaText: s.ctaText || 'Shop Now',
        ctaTextBn: 'অর্ডার করুন',
        ctaLink: s.ctaLink || '/category/fresh-fruits-vegetables',
        image: s.image || '/images/hero-fruits-veggies.jpg',
        tag: s.tag || '30-Min Instant Delivery Across Dhaka',
        tagBn: 'ঢাকা জুড়ে ৩০ মিনিটে এক্সপ্রেস ডেলিভারি',
      }));
    }
    return defaultSlides;
  }, [heroSlides]);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const touchStartXRef = React.useRef<number | null>(null);

  // Autoplay
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const slide = activeSlides[currentSlide] || activeSlides[0];

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch">
        {/* ==================================================== */}
        {/* 1. LEFT SIDEBAR: BROWSE CATEGORIES (Desktop Fixed Width) */}
        {/* ==================================================== */}
        <div className="hidden lg:flex w-[260px] xl:w-[280px] shrink-0 flex-col bg-white rounded-3xl border border-[#E5ECE7] shadow-xs overflow-hidden justify-between">
          {/* Header */}
          <div className="bg-[#0D2E21] text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Menu className="w-4 h-4 text-[#2EBD70]" />
              <span className="font-extrabold text-sm tracking-wide">
                {t('Browse Categories', 'ক্যাটাগরি ব্রাউজ করুন')}
              </span>
            </div>
            <span className="text-[10px] bg-[#21A366] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t('11 DEPTS', '১১ বিভাগ')}
            </span>
          </div>

          {/* Department Items (Single Language clean typography - no bilingual clutter) */}
          <div className="flex-1 flex flex-col justify-between py-1.5 divide-y divide-neutral-100">
            {categories.slice(0, 11).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex items-center justify-between px-3.5 py-2 hover:bg-[#F2FBF6] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0 group-hover:scale-115 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-bold text-[#17251F] group-hover:text-[#21A366] transition-colors truncate">
                    {language === 'bn' ? cat.nameBn : cat.name}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#21A366] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          {/* Sidebar Footer Delivery Note */}
          <div className="p-3 bg-[#F8FAF7] border-t border-[#E5ECE7] flex items-center gap-2 text-[11px] font-semibold text-[#123C2D]">
            <Truck className="w-3.5 h-3.5 text-[#21A366] shrink-0" />
            <span className="truncate">{t('30-Min Fast Delivery', '৩০ মিনিটে দ্রুত ডেলিভারি')}</span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 2. RIGHT CONTAINER: 2-TIER HERO SECTION             */}
        {/*    TOP ROW: Large Wide Banner                        */}
        {/*    BOTTOM ROW: 3 Promo Cards                         */}
        {/* ==================================================== */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-4 lg:gap-5">
          {/* ------------------------------------------------ */}
          {/* ROW 1: LARGE WIDE HERO CAROUSEL BANNER           */}
          {/* ------------------------------------------------ */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E5ECE7] min-h-[300px] sm:min-h-[330px] lg:min-h-[350px] flex flex-col justify-between group bg-[#093522]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Visual: Image with smooth left gradient mask only if slide has title text */}
            <div className="absolute inset-0 z-0">
              <Link href={slide.ctaLink} className="block w-full h-full cursor-pointer">
                <img
                  src={slide.image}
                  alt={slide.title ? t(slide.title, slide.titleBn) : 'Quality You Can Trust'}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-100 group-hover:scale-102"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero-quality-trust.webp';
                  }}
                />
              </Link>
              {/* Only apply dark backdrop gradient if slide has title text */}
              {Boolean(slide.title) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08301E] via-[#08301E]/95 sm:via-[#08301E]/85 to-transparent sm:w-[70%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08301E] via-transparent to-transparent md:hidden" />
                </>
              )}
            </div>

            {/* Slide Text Content */}
            {Boolean(slide.title) ? (
              <div className="relative z-10 p-6 sm:p-9 lg:p-10 max-w-xl flex-1 flex flex-col justify-between">
                <div>
                  {/* Campaign badge */}
                  {slide.badge && (
                    <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-bold shadow-xs mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
                      <span>{t(slide.badge, slide.badgeBn)}</span>
                    </div>
                  )}

                  {/* Heading */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-black text-white leading-[1.15] tracking-tight mb-3 drop-shadow-sm">
                    {t(slide.title, slide.titleBn)}
                  </h1>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md font-medium mb-5 drop-shadow-2xs">
                      {t(slide.subtitle, slide.subtitleBn)}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-1.5 bg-[#21A366] hover:bg-[#2EBD70] text-white px-6 py-2.5 rounded-full font-black text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95"
                  >
                    <span>{t(slide.ctaText, slide.ctaTextBn)}</span>
                    <span className="text-sm font-normal">↗</span>
                  </Link>

                  <div className="flex items-center gap-2 text-white/95 text-xs font-semibold bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15">
                    <Truck className="w-3.5 h-3.5 text-[#2EBD70]" />
                    <span>{t('30-Min Fast Delivery', '৩০ মিনিটে দ্রুত ডেলিভারি')}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* When no extra text is specified (like Slide 1), show just the clean action button */
              <div className="relative z-10 p-5 sm:p-7 lg:p-8 flex-1 flex flex-col justify-end pointer-events-none">
                <div className="pointer-events-auto">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 bg-[#123C2D] hover:bg-[#21A366] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border border-white/20 backdrop-blur-xs"
                  >
                    <span>{language === 'bn' ? slide.ctaTextBn : slide.ctaText}</span>
                    <span className="text-xs sm:text-sm font-bold">↗</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={prevSlide}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="relative z-20 pb-4 flex items-center justify-center gap-1.5">
              {activeSlides.map((s, index) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'w-7 h-2 bg-[#2EBD70]'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* ROW 2: 3 PROMOTIONAL CARDS (Reference Design)     */}
          {/* ------------------------------------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-4">
            {/* CARD 1: SEAFOOD & FRESH CATCH */}
            <Link
              href="/category/meat-fish"
              className="group relative rounded-3xl overflow-hidden shadow-sm border border-[#E5ECE7] hover:border-[#0284C7]/50 transition-all duration-300 min-h-[190px] sm:min-h-[205px] flex flex-col justify-between p-5 bg-[#F0F9FF]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="/images/banner-seafood-clean.jpg"
                  alt="Tasty Seafood & Fresh Catch"
                  className="w-full h-full object-cover object-right group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/banner-seafood.jpg';
                  }}
                />
                {/* Gradient to ensure crisp readability on left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0F9FF]/95 via-[#F0F9FF]/85 to-transparent w-[70%]" />
              </div>

              {/* Top Title & Discount */}
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-[#0C4A6E] leading-tight">
                  {t('Fresh Seafood & Fish', 'তাজা মাছ ও সামুদ্রিক স্বাদ')}
                </h3>
                <div className="mt-1">
                  <span className="text-xl sm:text-2xl font-black text-[#0284C7] tracking-tight block leading-none">
                    {t('UPTO 28% OFF', 'সর্বোচ্চ ২৮% ছাড়')}
                  </span>
                  <p className="text-[10px] text-[#0369A1]/80 font-semibold mt-0.5 leading-tight max-w-[130px]">
                    {t('River Ilish & Giant Prawns!', 'পদ্মার ইলিশ ও গলদা চিংড়ি!')}
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="relative z-10 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#0369A1] group-hover:bg-[#0284C7] text-white px-3 py-1 rounded-full shadow-xs transition-colors">
                  <span>{t('Shop Fresh Catch', 'তাজা মাছ দেখুন')}</span>
                  <span className="text-xs">→</span>
                </span>
              </div>
            </Link>

            {/* CARD 2: PURE COLD-PRESSED MUSTARD OIL */}
            <Link
              href="/category/spices-oils"
              className="group relative rounded-3xl overflow-hidden shadow-sm border border-[#E5ECE7] hover:border-[#D97706]/50 transition-all duration-300 min-h-[190px] sm:min-h-[205px] flex flex-col justify-between p-5 bg-[#FFFDF5]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="/images/banner-oil-clean.jpg"
                  alt="Pure Cold-Pressed Mustard Oil"
                  className="w-full h-full object-cover object-right group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/banner-mustard-oil.jpg';
                  }}
                />
                {/* Gradient to ensure crisp readability on left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF5]/95 via-[#FFFDF5]/85 to-transparent w-[70%]" />
              </div>

              {/* Top Title & Discount */}
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-[#713F12] leading-tight">
                  {t('Organic Oils & Pure Ghee', 'খাঁটি ঘানির তেল ও ঘি')}
                </h3>
                <div className="mt-1">
                  <span className="text-xl sm:text-2xl font-black text-[#D97706] tracking-tight block leading-none">
                    {t('FLAT 25% OFF', 'ফ্ল্যাট ২৫% ছাড়')}
                  </span>
                  <p className="text-[10px] text-[#854D0E]/80 font-semibold mt-0.5 leading-tight max-w-[130px]">
                    {t('Wood-Pressed & 100% Pure!', 'কাঠের ঘানিতে ভাঙা খাঁটি পুষ্টি!')}
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="relative z-10 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#B45309] group-hover:bg-[#D97706] text-white px-3 py-1 rounded-full shadow-xs transition-colors">
                  <span>{t('Shop Pure Oils', 'ঘানির তেল কিনুন')}</span>
                  <span className="text-xs">→</span>
                </span>
              </div>
            </Link>

            {/* CARD 3: BEST DEALS & STAPLES */}
            <Link
              href="/deals"
              className="group relative rounded-3xl overflow-hidden shadow-sm border border-[#E5ECE7] hover:border-[#E8590C]/50 transition-all duration-300 min-h-[190px] sm:min-h-[205px] flex flex-col justify-between p-5 bg-[#FAF6F0]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="/images/banner-staples-deals.jpg"
                  alt="Best Deals & Staples"
                  className="w-full h-full object-cover object-right group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/banner-hot-deals.jpg';
                  }}
                />
                {/* Gradient to ensure crisp readability on left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBF5]/95 via-[#FFFBF5]/85 to-transparent w-[70%]" />
              </div>

              {/* Top Title & Discount */}
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-[#17251F] leading-tight">
                  {t('Best Deals & Staples', 'সেরা ডিল ও নিত্যপণ্য')}
                </h3>
                <div className="mt-1">
                  <span className="text-xl sm:text-2xl font-black text-[#E8590C] tracking-tight block leading-none">
                    {t('UPTO 42% OFF', 'সর্বোচ্চ ৪২% ছাড়')}
                  </span>
                  <p className="text-[10px] text-[#64736B] font-semibold mt-0.5 leading-tight max-w-[130px]">
                    {t('On Pantry Essentials & Staples!', 'নিত্যপ্রয়োজনীয় চাল, ডাল ও তেল সামগ্রীতে!')}
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="relative z-10 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#78350F] group-hover:bg-[#92400E] text-white px-3 py-1 rounded-full shadow-xs transition-colors">
                  <span>{t('Best Deals Only', 'সেরা ডিল দেখুন')}</span>
                  <span className="text-xs">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
