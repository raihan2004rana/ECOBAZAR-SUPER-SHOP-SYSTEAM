'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FarmSlide {
  id: string;
  badge: string;
  badgeIcon?: 'shield' | 'sparkles';
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const farmSlides: FarmSlide[] = [
  {
    id: 'slide-farm-to-table',
    badge: 'ORGANIC FARMER CO-OP',
    badgeIcon: 'sparkles',
    title: 'Direct From Farm to Your Dining Table',
    subtitle:
      'We partner with 120+ certified organic farms across Bogura, Rajshahi, and Sylhet. No middlemen, zero harmful chemicals, harvest-to-home freshness.',
    ctaText: 'Our Farm Story',
    ctaLink: '/about-us',
    image: '/images/banner-farm-to-table.jpg',
  },
  {
    id: 'slide-lab-screened',
    badge: '100% CHEMICAL & FORMALIN FREE',
    badgeIcon: 'shield',
    title: 'Lab-Screened Daily Freshness at Dawn',
    subtitle:
      'Harvested at sunrise and multi-stage screened for formalin and pesticides before express dispatch in sub-4°C refrigerated vans.',
    ctaText: 'Explore Quality Standards',
    ctaLink: '/about-us',
    image: '/images/banner-organic-harvest.jpg',
  },
];

export const FarmToTableSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const touchStartXRef = React.useRef<number | null>(null);

  // Auto-advance slides every 5.5 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % farmSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + farmSlides.length) % farmSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % farmSlides.length);
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

  const slide = farmSlides[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div
        className="group relative rounded-3xl overflow-hidden shadow-lg border border-emerald-900/20 min-h-[250px] sm:min-h-[290px] md:min-h-[310px] flex items-center bg-[#0C2B1F]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image Carousel with cross-fade */}
        {farmSlides.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-right sm:object-center transform scale-100 group-hover:scale-102 transition-transform duration-1000"
            />
          </div>
        ))}

        {/* High-Contrast Gradient Backdrop Overlay */}
        {/* Dark emerald gradient on the left ensures 100% crystal-clear readability for title/subtitle/buttons while revealing table/produce on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A12]/95 via-[#0B2A1E]/85 sm:via-[#0B2A1E]/75 md:to-transparent z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-[1] pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl lg:max-w-2xl space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#2EBD70] text-[#082216] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md">
              {slide.badgeIcon === 'shield' ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md leading-tight">
              {slide.title}
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-emerald-50/95 font-medium leading-relaxed drop-shadow-sm max-w-lg">
              {slide.subtitle}
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#2EBD70] text-[#0B2A1E] hover:text-[#061A12] px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group/btn border border-white/60"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#123C2D] text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#123C2D] text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {farmSlides.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-7 bg-[#2EBD70] shadow-sm'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
