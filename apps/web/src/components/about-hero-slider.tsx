'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AboutSlide {
  id: string;
  badge: string;
  icon: 'sparkles' | 'shield' | 'handshake';
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
}

const aboutSlides: AboutSlide[] = [
  {
    id: 'slide-mission',
    badge: "BANGLADESH'S PREMIER FRESH SUPERMARKET",
    icon: 'sparkles',
    title: 'Bringing Safe, Farm-Fresh Food to Every Family in Dhaka',
    subtitle:
      'Founded with a mission to bring transparency and uncompromised food purity to Bangladesh, ECOBAZAR connects organic farmers directly with urban households through a high-efficiency retail network.',
    primaryCtaText: 'Explore Our Story',
    primaryCtaLink: '#our-story',
    secondaryCtaText: 'Quality Standards',
    secondaryCtaLink: '#quality-standards',
    image: '/images/banner-farm-to-table.jpg',
  },
  {
    id: 'slide-farmers',
    badge: '120+ PARTNER FARMING COOPERATIVES',
    icon: 'handshake',
    title: 'Empowering Rural Growers with Dignity & Fair Prices',
    subtitle:
      'By eliminating exploitative middlemen, we provide fair, guaranteed income to farming families in Bogura, Rajshahi, and Sylhet while ensuring chemical-free harvest for our consumers.',
    primaryCtaText: 'Our Farm Journey',
    primaryCtaLink: '#our-story',
    secondaryCtaText: 'Explore Branches',
    secondaryCtaLink: '/branches',
    image: '/images/banner-farmers-coop.jpg',
  },
  {
    id: 'slide-purity',
    badge: '100% FORMALIN & PESTICIDE FREE GUARANTEE',
    icon: 'shield',
    title: 'Rigorous Multi-Stage Chemical Testing at Dawn',
    subtitle:
      'Every morning before sunrise, produce is collected from our partner hubs and lab-tested for chemical residue before transit in dedicated sub-4°C temperature-controlled vans.',
    primaryCtaText: 'Our Quality Pledge',
    primaryCtaLink: '#quality-standards',
    secondaryCtaText: 'Shop Fresh Produce',
    secondaryCtaLink: '/category/fresh-fruits-vegetables',
    image: '/images/banner-organic-harvest.jpg',
  },
];

export const AboutHeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const touchStartXRef = React.useRef<number | null>(null);

  // Autoplay every 5.5s
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const current = aboutSlides[currentSlide];

  return (
    <section
      className="relative w-full bg-[#071F15] overflow-hidden min-h-[480px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center pt-8 pb-16 sm:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with smooth cross-fade */}
      {aboutSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center sm:object-right transform scale-100 transition-transform duration-7000 ease-out"
          />
        </div>
      ))}

      {/* Multi-layered High-Contrast Gradient Backdrop */}
      {/* Ensures 100% sharp text readability while allowing the photo to shine through */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05170F]/95 via-[#082217]/85 sm:via-[#082217]/70 md:to-[#082217]/40 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061A12] via-transparent to-black/40 z-[1] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="max-w-2xl lg:max-w-3xl space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2EBD70] text-[#05170F] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
            {current.icon === 'sparkles' && <Sparkles className="w-4 h-4 text-[#05170F]" />}
            {current.icon === 'handshake' && <HeartHandshake className="w-4 h-4 text-[#05170F]" />}
            {current.icon === 'shield' && <ShieldCheck className="w-4 h-4 text-[#05170F]" />}
            <span>{current.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
            {current.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-50/95 leading-relaxed font-medium max-w-2xl drop-shadow-sm">
            {current.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Link
              href={current.primaryCtaLink}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#2EBD70] text-[#071F15] hover:text-[#05170F] px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group/btn"
            >
              <span>{current.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>

            <Link
              href={current.secondaryCtaLink}
              className="inline-flex items-center gap-2 bg-black/35 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md px-5 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95"
            >
              <span>{current.secondaryCtaText}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#21A366] text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl active:scale-90"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#21A366] text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl active:scale-90"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {aboutSlides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 bg-[#2EBD70] shadow-md'
                : 'w-2.5 bg-white/45 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
