'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Flame,
  Filter,
  ArrowUpDown,
  Sparkles,
  ArrowRight,
  Tag,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { SiteHeader } from '../../../components/site-header';
import { SiteFooter } from '../../../components/site-footer';
import { ProductCard } from '../../../components/product-card';
import { CartDrawer } from '../../../components/cart-drawer';
import { WishlistDrawer } from '../../../components/wishlist-drawer';
import { Modals } from '../../../components/modals';
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  categoryDefinitions,
  ProductItem,
} from '../../../data/catalog';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    sub?: string;
  };
}

const categoryBannerMap: Record<string, string> = {
  'fresh-fruits-vegetables': '/images/banner-organic-harvest.jpg',
  'groceries-staples': '/images/banner-farm-to-table.jpg',
  'dairy-eggs': '/images/banner-bogura-doi.jpg',
  'snacks-beverages': '/images/banner-hot-deals.jpg',
  'meat-fish': '/images/banner-seafood.jpg',
  'bakery-fresh-snacks': '/images/banner-farm-to-table.jpg',
  'rice-pulses-grains': '/images/banner-farmers-coop.jpg',
  'spices-oils': '/images/banner-mustard-oil.jpg',
  'frozen-foods': '/images/banner-hot-deals.jpg',
  'health-personal-care': '/images/banner-farm-grocery.jpg',
  'baby-food-care': '/images/banner-farm-grocery.jpg',
};

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const categoryBanner = categoryBannerMap[category.slug] || '/images/banner-farm-grocery.jpg';

  const allCategoryProducts = getProductsByCategorySlug(params.slug);

  // Filter states
  const initialSubcategory = searchParams?.sub || 'all';
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>(initialSubcategory);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [promoSlideIndex, setPromoSlideIndex] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(8);

  // Sync if searchParams changes
  React.useEffect(() => {
    if (searchParams?.sub) {
      setSelectedSubcategory(searchParams.sub);
    }
  }, [searchParams?.sub]);

  // Reset pagination when filter criteria change
  React.useEffect(() => {
    setVisibleCount(8);
  }, [selectedSubcategory, selectedPriceRange, sortBy]);

  // Promo slider autoplay
  React.useEffect(() => {
    if (category.promoSlides.length <= 1) return;
    const interval = setInterval(() => {
      setPromoSlideIndex((prev) => (prev + 1) % category.promoSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [category.promoSlides.length]);

  // Filtered & sorted products
  const filteredProducts = React.useMemo(() => {
    let result = [...allCategoryProducts];

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Price range filter
    if (selectedPriceRange === 'under100') {
      result = result.filter((p) => p.price < 100);
    } else if (selectedPriceRange === '100to300') {
      result = result.filter((p) => p.price >= 100 && p.price <= 300);
    } else if (selectedPriceRange === '300to600') {
      result = result.filter((p) => p.price > 300 && p.price <= 600);
    } else if (selectedPriceRange === 'above600') {
      result = result.filter((p) => p.price > 600);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allCategoryProducts, selectedSubcategory, selectedPriceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hotDealsInCategory = allCategoryProducts.filter((p) => p.isHotDeal || (p.badge && p.badge.includes('OFF'))).slice(0, 4);

  // Related categories
  const relatedCategories = categoryDefinitions.filter((c) =>
    category.relatedCategorySlugs.includes(c.slug)
  );

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
  };

  const activeFiltersCount =
    (selectedSubcategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* A. BREADCRUMBS & CATEGORY HERO BANNER */}
        <section className="relative bg-[#071F15] text-white pt-6 pb-12 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={categoryBanner}
              alt={category.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/75 to-[#0A261B]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F15] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/80 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#2EBD70] font-bold">{category.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2EBD70] text-[#071F15] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md">
                  <span className="text-base">{category.icon}</span>
                  <span>{category.nameBn}</span>
                  <span className="text-[#071F15]/50">•</span>
                  <span>{allCategoryProducts.length} Items Available</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                  {category.name}
                </h1>
                <p className="text-sm sm:text-base text-emerald-50/90 mt-2 max-w-xl font-medium leading-relaxed drop-shadow-sm">
                  {category.tagline}
                </p>
              </div>

              {/* Delivery Promise Card */}
              <div className="bg-[#0A261B]/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs space-y-1.5 shrink-0 shadow-xl">
                <div className="flex items-center gap-2 text-[#2EBD70] font-black">
                  <Sparkles className="w-4 h-4" />
                  <span>30-Min Fast Dispatch</span>
                </div>
                <p className="text-white/90">Temperature-controlled cold storage pack</p>
                <p className="text-white/70">100% Quality checked prior to shipping</p>
              </div>
            </div>
          </div>
        </section>

        {/* B. CATEGORY PROMOTIONAL SLIDER */}
        {category.promoSlides.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-900/30 min-h-[160px] sm:min-h-[180px] bg-[#071F15]">
              {category.promoSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    promoSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={categoryBanner}
                    alt={slide.title}
                    className="w-full h-full object-cover object-right sm:object-center"
                  />
                  {/* Dark emerald gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/75 md:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-lg">
                      <span className="text-xs font-black uppercase tracking-wider bg-[#2EBD70] text-[#071F15] px-3 py-1 rounded-full shadow-sm inline-block">
                        {slide.discountText}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">{slide.title}</h3>
                      <p className="text-xs sm:text-sm text-emerald-50/90 font-medium drop-shadow-sm">{slide.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPriceRange('all');
                        setSelectedSubcategory('all');
                      }}
                      className="inline-flex items-center gap-2 bg-white hover:bg-[#2EBD70] text-[#071F15] px-6 py-3 rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 shrink-0 self-start sm:self-auto"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Slider Dots */}
              {category.promoSlides.length > 1 && (
                <div className="absolute bottom-3 right-5 z-20 flex gap-1.5">
                  {category.promoSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPromoSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        promoSlideIndex === idx ? 'w-6 bg-[#2EBD70]' : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* C. HOT DEALS IN THIS CATEGORY */}
        {hotDealsInCategory.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5ECE7]">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-rose-50 text-rose-500">
                    <Flame className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </span>
                  <h3 className="font-extrabold text-lg text-[#17251F]">
                    Hot Deals in {category.name}
                  </h3>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  Special Savings
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {hotDealsInCategory.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* D. CATEGORY FILTERS & PRODUCT LISTING */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-6 shadow-xs">
            {/* Filter Controls Header */}
            <div className="space-y-4 pb-5 border-b border-[#E5ECE7]">
              {/* Subcategories Filter Chips */}
              <div>
                <p className="text-xs font-bold text-[#64736B] uppercase tracking-wider mb-2">
                  Subcategories:
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategory('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSubcategory === 'all'
                        ? 'bg-[#123C2D] text-white shadow-xs'
                        : 'bg-[#F7F9F5] hover:bg-[#E5ECE7] text-[#17251F]'
                    }`}
                  >
                    All Items ({allCategoryProducts.length})
                  </button>
                  {category.subcategories.map((sub) => {
                    const count = allCategoryProducts.filter((p) => p.subcategory === sub).length;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedSubcategory === sub
                            ? 'bg-[#21A366] text-white shadow-xs'
                            : 'bg-[#F7F9F5] hover:bg-[#E5ECE7] text-[#17251F]'
                        }`}
                      >
                        {sub} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Tier & Sort By */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E5ECE7]/60">
                {/* Price range pills */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#64736B]">Price:</span>
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under100', label: '< ৳100' },
                    { id: '100to300', label: '৳100 - ৳300' },
                    { id: '300to600', label: '৳300 - ৳600' },
                    { id: 'above600', label: '> ৳600' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedPriceRange(tier.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedPriceRange === tier.id
                          ? 'bg-[#D8F3DC] text-[#123C2D] border border-[#21A366]/40'
                          : 'bg-[#F7F9F5] text-[#64736B] hover:text-[#17251F]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#64736B]">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#F7F9F5] border border-[#E5ECE7] text-xs font-bold text-[#17251F] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#21A366]"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Active Filter summary */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#64736B] pt-2">
                  <span>Filtered:</span>
                  {selectedSubcategory !== 'all' && (
                    <span className="bg-[#D8F3DC] text-[#123C2D] font-bold px-2 py-0.5 rounded-md">
                      Subcategory: {selectedSubcategory}
                    </span>
                  )}
                  {selectedPriceRange !== 'all' && (
                    <span className="bg-[#D8F3DC] text-[#123C2D] font-bold px-2 py-0.5 rounded-md">
                      Price: {selectedPriceRange}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-rose-500 hover:text-rose-700 font-bold ml-2 underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="pt-6">
              {displayedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-base font-bold text-[#17251F] mb-1">
                    No products match your selected filters
                  </p>
                  <p className="text-xs text-[#64736B] mb-4">
                    Try adjusting your subcategory or price range filter.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#21A366] text-white text-xs font-bold rounded-xl hover:bg-[#123C2D] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Load More Button if more items exist */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center pt-8">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="bg-[#123C2D] hover:bg-[#21A366] text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs"
                  >
                    Load More Products ({filteredProducts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* E. CATEGORY CAMPAIGN BANNER CARD */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="rounded-3xl bg-gradient-to-r from-[#123C2D] via-[#1a4e3b] to-[#21A366] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider bg-[#F4A340] text-[#17251F] px-3 py-1 rounded-full">
                VOUCHER SAVINGS
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Save 10% on your entire basket with code ECO10
              </h3>
              <p className="text-xs text-white/80 max-w-lg">
                Applies on all fresh produce, groceries, and staples. Free delivery included for orders above ৳1,000.
              </p>
            </div>
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 bg-white text-[#123C2D] hover:bg-[#D8F3DC] px-5 py-3 rounded-xl font-black text-xs transition-colors shrink-0"
            >
              <span>Explore All Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* F. RELATED CATEGORIES & CROSS-SELL */}
        {relatedCategories.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 shadow-xs">
              <h3 className="text-lg font-black text-[#17251F] mb-4">
                Customers Also Frequently Shop
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedCategories.map((rc) => (
                  <Link
                    key={rc.id}
                    href={`/category/${rc.slug}`}
                    className="p-4 rounded-2xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#F7F9F5] hover:bg-white transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {rc.icon}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#17251F] group-hover:text-[#21A366] transition-colors">
                          {rc.name}
                        </h4>
                        <p className="text-xs text-[#64736B]">{rc.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#21A366] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <CartDrawer />
      <WishlistDrawer />
      <Modals />
      <SiteFooter />
    </div>
  );
}
