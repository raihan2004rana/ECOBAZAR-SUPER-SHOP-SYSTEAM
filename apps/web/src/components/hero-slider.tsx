'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Flame,
} from 'lucide-react';
import { useCatalog } from '../context/catalog-context';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgGradient: string;
  tag: string;
}

const slides: Slide[] = [
  {
    id: 'slide-1',
    badge: '100% Organic & Chemical-Free',
    title: 'Fast Fresh Groceries Delivered Daily',
    subtitle:
      'Handpicked crisp fruits, daily greens, and garden produce dispatched within 30 minutes in Dhaka under unbroken cold storage.',
    ctaText: 'Shop Fresh Produce',
    ctaLink: '/category/fresh-fruits-vegetables',
    image: '/images/hero-fruits-veggies.jpg',
    bgGradient: 'from-[#123C2D] via-[#123C2D]/95 to-[#1a4a38]',
    tag: '30-Min Instant Delivery Across Dhaka',
  },
  {
    id: 'slide-2',
    badge: 'Up to 25% Off Daily Essentials',
    title: 'Wholesale Kitchen Staples & Pantry Care',
    subtitle:
      'Unpolished Miniket rice, premium lentils, and pantry essentials sourced directly from rural farming cooperatives at fair prices.',
    ctaText: 'Explore Groceries',
    ctaLink: '/category/groceries-staples',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-[#17382B] via-[#123C2D] to-[#21A366]/40',
    tag: '100% Pure & Laboratory Tested Quality',
  },
  {
    id: 'slide-3',
    badge: 'Chilled Under 4°C Cold Chain',
    title: 'Natural Farm Milk & Free-Range Dairy',
    subtitle:
      'Pasteurized pure cow milk, country brown eggs, and pure artisanal butter delivered refrigerated to your doorstep.',
    ctaText: 'Shop Dairy & Eggs',
    ctaLink: '/category/dairy-eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-[#0e2f23] via-[#123C2D] to-[#1c5c40]',
    tag: 'Zero Formalin • Guaranteed Freshness',
  },
];

export const HeroSlider: React.FC = () => {
  const { heroSlides } = useCatalog();
  const activeSlides = (heroSlides && heroSlides.length > 0 ? heroSlides : slides);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const touchStartXRef = React.useRef<number | null>(null);

  // Autoplay
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  // Touch Handlers for mobile swipe
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        {/* ==================================================== */}
        {/* MAIN HERO CAROUSEL (Left & Center, 8 cols on desktop) */}
        {/* ==================================================== */}
        <div
          className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] sm:min-h-[480px] lg:min-h-[510px] flex flex-col justify-between group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-100 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/hero-fruits-veggies.jpg';
              }}
            />
            {/* Multi-stage dark green backdrop gradient for crystal-clear readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#123C2D]/95 via-[#123C2D]/85 to-transparent sm:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D] via-transparent to-transparent md:hidden" />
          </div>

          {/* Slide Text Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl flex-1 flex flex-col justify-between">
            <div>
              {/* Campaign badge */}
              <div className="inline-flex items-center gap-2 bg-[#21A366]/30 border border-[#2EBD70]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
                <span>{slide.badge}</span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-4 drop-shadow-md">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md font-medium mb-6 drop-shadow-sm">
                {slide.subtitle}
              </p>
            </div>

            {/* Bottom Actions & Tag */}
            <div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 bg-[#21A366] hover:bg-[#2EBD70] text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2 text-white/90 text-xs font-semibold bg-white/10 backdrop-blur-md px-3.5 py-3 rounded-2xl border border-white/10">
                  <Truck className="w-4 h-4 text-[#2EBD70]" />
                  <span>30-Min Fast Delivery</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/70 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2EBD70]" />
                <span>{slide.tag}</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
            <button
              type="button"
              onClick={prevSlide}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 -ml-1 sm:ml-0"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 -mr-1 sm:mr-0"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="relative z-20 pb-5 flex items-center justify-center gap-2">
            {activeSlides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2.5 bg-[#2EBD70]'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* RIGHT PROMOTIONAL BANNERS (2 Vertically Stacked, 4 cols) */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-4 justify-between">
          {/* BANNER 1: Fish & Seafood Promotional Banner (Supplied Seafood Image) */}
          <Link
            href="/category/meat-fish"
            className="group relative flex-1 rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:border-[#21A366]/50 transition-all duration-300 min-h-[210px] sm:min-h-[235px] flex flex-col justify-end p-5"
          >
            {/* Background image using user's exact supplied image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/images/banner-seafood.jpg"
                alt="Tasty Seafood Daily Series"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D]/90 via-[#123C2D]/40 to-transparent" />
            </div>

            {/* Banner overlay text */}
            <div className="relative z-10 text-white">
              <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F4A340] text-[#17251F] mb-1.5 shadow-xs">
                DAILY FRESH CATCH
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-1 group-hover:text-[#D8F3DC] transition-colors drop-shadow-sm">
                Tasty Seafood Daily Series
              </h3>
              <p className="text-xs text-white/90 line-clamp-1 mb-2 font-medium">
                Fresh Hilsha, King Prawns & Coral Fish every day.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2EBD70] group-hover:text-white transition-colors">
                <span>Explore Meat & Fish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* BANNER 2: Spices & Oils Promotional Banner (Supplied Mustard Oil Image) */}
          <Link
            href="/category/spices-oils"
            className="group relative flex-1 rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:border-[#21A366]/50 transition-all duration-300 min-h-[210px] sm:min-h-[235px] flex flex-col justify-end p-5"
          >
            {/* Background image using user's exact supplied image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/images/banner-mustard-oil.jpg"
                alt="কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D]/90 via-[#123C2D]/35 to-transparent" />
            </div>

            {/* Banner overlay text */}
            <div className="relative z-10 text-white">
              <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#21A366] text-white mb-1.5 shadow-xs">
                100% PURE & ORGANIC
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-1 group-hover:text-[#D8F3DC] transition-colors drop-shadow-sm">
                কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল
              </h3>
              <p className="text-xs text-white/90 line-clamp-1 mb-2 font-medium">
                Traditional cold-pressed mustard oil & organic spices.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A340] group-hover:text-white transition-colors">
                <span>Shop Spices & Oils</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
