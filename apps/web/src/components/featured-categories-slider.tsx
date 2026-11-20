'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface FeaturedCategory {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  image: string;
  itemCount?: string;
}

const featuredCategories: FeaturedCategory[] = [
  {
    id: 'cat-organic',
    name: 'Organic',
    nameBn: 'অর্গানিক ফুড',
    slug: 'organic-wellness',
    image: '/images/products/coconut-oil.webp',
    itemCount: '48 items',
  },
  {
    id: 'cat-honey',
    name: 'Honey',
    nameBn: 'খাঁটি মধু',
    slug: 'organic-wellness',
    image: '/images/products/sundarban-honey.webp',
    itemCount: '16 items',
  },
  {
    id: 'cat-dates',
    name: 'Dates & Nuts',
    nameBn: 'খেজুর ও বাদাম',
    slug: 'snacks-beverages',
    image: '/images/products/kaju-badam.jpg',
    itemCount: '32 items',
  },
  {
    id: 'cat-spices',
    name: 'Spices',
    nameBn: 'খাঁটি মশলা',
    slug: 'spices-oils',
    image: '/images/products/holud-gura.avif',
    itemCount: '54 items',
  },
  {
    id: 'cat-nuts',
    name: 'Nuts & Seeds',
    nameBn: 'বাদাম ও বীজ',
    slug: 'snacks-beverages',
    image: '/images/products/almond-badam.jpg',
    itemCount: '28 items',
  },
  {
    id: 'cat-beverage',
    name: 'Beverage',
    nameBn: 'চা, কফি ও জুস',
    slug: 'snacks-beverages',
    image: '/images/products/tea-leaves.jpg',
    itemCount: '62 items',
  },
  {
    id: 'cat-rice',
    name: 'Rice',
    nameBn: 'চাল ও ডাল',
    slug: 'rice-pulses-grains',
    image: '/images/products/miniket-chal.jpg',
    itemCount: '40 items',
  },
  {
    id: 'cat-flours',
    name: 'Flours & Lentils',
    nameBn: 'আটা, ময়দা ও ডাল',
    slug: 'groceries-staples',
    image: '/images/products/chakki-ata.webp',
    itemCount: '38 items',
  },
  {
    id: 'cat-fruits',
    name: 'Fresh Fruits',
    nameBn: 'তাজা ফলমূল',
    slug: 'fresh-fruits-vegetables',
    image: '/images/products/red-apple.webp',
    itemCount: '85 items',
  },
  {
    id: 'cat-veggies',
    name: 'Fresh Veggies',
    nameBn: 'সবুজ শাকসবজি',
    slug: 'fresh-fruits-vegetables',
    image: '/images/products/red-tomato.jpg',
    itemCount: '92 items',
  },
  {
    id: 'cat-dairy',
    name: 'Dairy & Eggs',
    nameBn: 'দুধ, দই ও মাখন',
    slug: 'dairy-eggs',
    image: '/images/products/bogura-doi.jpg',
    itemCount: '46 items',
  },
  {
    id: 'cat-meat',
    name: 'Meat & Fish',
    nameBn: 'তাজা মাছ-মাংস',
    slug: 'meat-fish',
    image: '/images/products/hilsha-ilish.webp',
    itemCount: '58 items',
  },
  {
    id: 'cat-bakery',
    name: 'Bakery',
    nameBn: 'তাজা বেকারি',
    slug: 'bakery-fresh-snacks',
    image: '/images/products/butter-cross.webp',
    itemCount: '36 items',
  },
];

export const FeaturedCategoriesSlider: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Smooth Auto-slide effect every 3.2 seconds (pauses on hover or touch)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // If at or near the end, loop back smoothly to the beginning
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Step forward by card width (~180px)
        scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#FAFBF9] rounded-3xl border border-[#E8ECE7] p-5 sm:p-7 shadow-xs">
        {/* Header with Title and Circular Navigation Controls */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E5ECE7]/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EBF7F0] text-[#21A366]">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#17251F] tracking-tight">
                Featured Categories
              </h2>
            </div>
            <p className="text-xs text-[#64736B] mt-0.5">
              Explore 100% natural, lab-tested pantry staples and fresh organic harvest
            </p>
          </div>

          {/* Circular Orange Arrow Buttons matching reference design */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                canScrollLeft
                  ? 'bg-[#F2722B] hover:bg-[#E05E17] text-white hover:scale-105 active:scale-95 cursor-pointer shadow-orange-500/20'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
              }`}
              aria-label="Previous Categories"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                canScrollRight
                  ? 'bg-[#F2722B] hover:bg-[#E05E17] text-white hover:scale-105 active:scale-95 cursor-pointer shadow-orange-500/20'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
              }`}
              aria-label="Next Categories"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track with Auto-Slide on/off listeners */}
        <div
          className="relative mt-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center shrink-0 w-[125px] sm:w-[150px] md:w-[165px] focus:outline-hidden"
              >
                {/* Clean Rounded Card with Artwork */}
                <div className="w-full aspect-square bg-white rounded-3xl p-4 sm:p-5 border border-[#E5ECE7] shadow-xs group-hover:border-[#21A366] group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                  {/* Subtle inner background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F2FBF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-sm relative z-10"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/sundarban-honey.webp';
                    }}
                  />
                </div>

                {/* Category Name Underneath */}
                <span className="mt-3 text-xs sm:text-sm font-extrabold text-[#17251F] group-hover:text-[#21A366] transition-colors text-center line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#64736B] font-medium mt-0.5 line-clamp-1">
                  {cat.nameBn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
