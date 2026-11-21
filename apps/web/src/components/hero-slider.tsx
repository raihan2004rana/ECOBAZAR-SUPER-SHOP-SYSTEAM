'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
  Menu,
} from 'lucide-react';
import { useCatalog } from '../context/catalog-context';
import { categoryDefinitions } from '../data/catalog';
import { useLanguage } from '../context/language-context';

interface Slide {
  id: string;
  ctaText: string;
  ctaTextBn: string;
  ctaLink: string;
  image: string;
}

const defaultSlides: Slide[] = [
  {
    id: 'hero-1',
    ctaText: 'Shop Now',
    ctaTextBn: 'অর্ডার করুন',
    ctaLink: '/deals',
    image: '/images/hero-1.jpg',
  },
  {
    id: 'hero-2',
    ctaText: 'Shop Now',
    ctaTextBn: 'অর্ডার করুন',
    ctaLink: '/category/groceries-staples',
    image: '/images/hero-2.webp',
  },
  {
    id: 'hero-3',
    ctaText: 'Shop Now',
    ctaTextBn: 'অর্ডার করুন',
    ctaLink: '/category/dairy-eggs',
    image: '/images/hero-3.webp',
  },
];

export const HeroSlider: React.FC = () => {
  const { language, t } = useLanguage();
  const { heroSlides, categories: dynamicCategories } = useCatalog();
  const categories = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : categoryDefinitions;

  // Adapt dynamic slides or fall back to user hero images
  const activeSlides: Slide[] = React.useMemo(() => {
    if (heroSlides && heroSlides.length > 0) {
      return heroSlides.map((s, idx) => ({
        id: s.id || `dyn-slide-${idx}`,
        ctaText: s.ctaText || 'Shop Now',
        ctaTextBn: (s as any).ctaTextBn || 'অর্ডার করুন',
        ctaLink: s.ctaLink || '/deals',
        image: s.image || defaultSlides[idx % defaultSlides.length].image,
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

          {/* Department Items (Single Language clean typography) */}
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
        {/*    TOP ROW: Large Wide Banner (hero-1, hero-2, hero-3) */}
        {/*    BOTTOM ROW: 2 Promo Cards (promotion-1, promotion-2) */}
        {/* ==================================================== */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-4 lg:gap-5">
          {/* ------------------------------------------------ */}
          {/* ROW 1: LARGE WIDE HERO CAROUSEL BANNER           */}
          {/* ------------------------------------------------ */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E5ECE7] aspect-[2.4/1] min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] xl:min-h-[350px] flex flex-col justify-between group bg-[#111827]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Visual: Full Banner Image, no extra overlay text */}
            <div className="absolute inset-0 z-0">
              <Link href={slide.ctaLink} className="block w-full h-full cursor-pointer">
                <img
                  src={slide.image}
                  alt="Hero Banner"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-102"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero-1.jpg';
                  }}
                />
              </Link>
            </div>

            {/* CTA Button: Just the button per user requirement */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex-1 flex flex-col justify-end pointer-events-none">
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

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={prevSlide}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {activeSlides.map((s, index) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'w-6 h-2 bg-[#2EBD70]'
                      : 'w-2 h-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* ROW 2: 2 PROMOTIONAL CARDS (promotion-1, promotion-2) */}
          {/* ------------------------------------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {/* CARD 1: PROMOTION 1 (Desi Mart Grand Offer) */}
            <Link
              href="/deals"
              className="group relative rounded-3xl overflow-hidden shadow-xs border border-[#E5ECE7] hover:border-[#21A366]/50 hover:shadow-lg transition-all duration-300 bg-[#FAF4EA] flex items-center justify-center min-h-[190px] sm:min-h-[220px] lg:min-h-[240px]"
            >
              <img
                src="/images/promotion-1.jpg"
                alt="Desi Mart Grand Offer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/banner-staples-deals.jpg';
                }}
              />
            </Link>

            {/* CARD 2: PROMOTION 2 (bKash Grocery Cashback) */}
            <Link
              href="/offers"
              className="group relative rounded-3xl overflow-hidden shadow-xs border border-[#E5ECE7] hover:border-[#21A366]/50 hover:shadow-lg transition-all duration-300 bg-white flex items-center justify-center min-h-[190px] sm:min-h-[220px] lg:min-h-[240px]"
            >
              <img
                src="/images/promotion-2.jpg"
                alt="Online Grocery Cashback Offer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/banner-farm-grocery.jpg';
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
