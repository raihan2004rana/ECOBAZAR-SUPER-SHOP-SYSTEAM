'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface FarmSlide {
  id: string;
  badge: string;
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
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div
        className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:shadow-xl transition-all duration-300 min-h-[180px] sm:min-h-[240px] md:min-h-[290px] lg:min-h-[320px] flex items-center bg-[#F7F9F5]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Clean Image Carousel (Full Artwork, No Text Overlay) */}
        {farmSlides.map((item, idx) => (
          <Link
            key={item.id}
            href={item.ctaLink}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.title || 'Promotional Banner'}
              className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-102 transition-transform duration-700"
            />
          </Link>
        ))}

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  ? 'w-7 bg-[#21A366] shadow-sm'
                  : 'w-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
