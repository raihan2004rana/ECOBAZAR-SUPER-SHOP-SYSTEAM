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
  ShieldCheck,
  Truck,
  Clock,
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
import { useCatalog } from '../../../context/catalog-context';

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

interface RibbonPoint {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const categoryRibbonMap: Record<string, RibbonPoint[]> = {
  'bakery-fresh-snacks': [
    {
      icon: Clock,
      title: 'Baked Fresh at 5:00 AM',
      subtitle: 'Oven-warm daily morning delivery in Dhaka',
    },
    {
      icon: ShieldCheck,
      title: '100% Unbleached Flour',
      subtitle: 'Zero chemical improvers, preservatives or trans-fat',
    },
    {
      icon: Truck,
      title: 'Artisanal Sourdough & Breads',
      subtitle: 'Cultured dairy butter & slow naturally fermented dough',
    },
  ],
  'rice-pulses-grains': [
    {
      icon: ShieldCheck,
      title: '100% Stone-Free Sorted',
      subtitle: 'Triple optical machine cleaned grains',
    },
    {
      icon: Sparkles,
      title: 'Aged Aromatic Harvest',
      subtitle: 'Naturally cured 12 months for royal aroma',
    },
    {
      icon: Truck,
      title: 'Zero Chemical Polish',
      subtitle: 'Unpolished pure grains from northern mills',
    },
  ],
  'fresh-fruits-vegetables': [
    {
      icon: Clock,
      title: 'Picked Today at 5:00 AM',
      subtitle: 'Zero cold storage dehydration guarantee',
    },
    {
      icon: ShieldCheck,
      title: '100% Pesticide Screened',
      subtitle: 'Certified chemical-free farm harvest',
    },
    {
      icon: Truck,
      title: 'Same Day Express Delivery',
      subtitle: '30-minute doorstep dispatch across Dhaka',
    },
  ],
  'dairy-eggs': [
    {
      icon: ShieldCheck,
      title: 'Sub-4°C Cold Chain',
      subtitle: 'Maintained chilled until your doorstep',
    },
    {
      icon: Sparkles,
      title: 'Grass-Fed Pure Cow Milk',
      subtitle: 'Pasteurized with zero water or starch added',
    },
    {
      icon: Truck,
      title: 'Free-Range Country Eggs',
      subtitle: 'Sourced daily from rural organic poultry farms',
    },
  ],
  'meat-fish': [
    {
      icon: ShieldCheck,
      title: '100% Halal Certified Meat',
      subtitle: 'Dressed & cleaned in sterile chilled facility',
    },
    {
      icon: Sparkles,
      title: 'Daily Dawn River Catch',
      subtitle: 'Padma Ilish, live Ruhit, Katla & bay prawns',
    },
    {
      icon: Truck,
      title: 'Ice-Box Chilled Delivery',
      subtitle: 'Strict sub-4°C temperature preserved in transit',
    },
  ],
  'spices-oils': [
    {
      icon: ShieldCheck,
      title: 'Wood Cold-Pressed Ghani Oil',
      subtitle: '100% pure mustard & black seed oil, zero heat',
    },
    {
      icon: Sparkles,
      title: 'Stone-Ground Whole Spices',
      subtitle: 'High curcumin turmeric & chili with zero artificial color',
    },
    {
      icon: Truck,
      title: 'Lab-Tested Food Purity',
      subtitle: 'BSTI verified 100% adulteration-free',
    },
  ],
  'snacks-beverages': [
    {
      icon: ShieldCheck,
      title: 'Healthy Snack Options',
      subtitle: 'Baked not fried, roasted seeds & cold drinks',
    },
    {
      icon: Sparkles,
      title: 'Zero Artificial Additives',
      subtitle: 'Real fruit pulps & whole wheat ingredients',
    },
    {
      icon: Truck,
      title: 'Chilled Refreshment Delivery',
      subtitle: 'Dispatched cool & ready to serve immediately',
    },
  ],
  'frozen-foods': [
    {
      icon: ShieldCheck,
      title: 'Quick-Freeze Freshness',
      subtitle: 'Locks in taste, vitamins & natural texture',
    },
    {
      icon: Sparkles,
      title: 'Ready in 5-10 Minutes',
      subtitle: 'Parathas, nuggets, samosas & marinated cuts',
    },
    {
      icon: Truck,
      title: 'Insulated Thermal Bags',
      subtitle: 'Guaranteed zero thawing during delivery',
    },
  ],
  'groceries-staples': [
    {
      icon: ShieldCheck,
      title: 'Daily Essential Staples',
      subtitle: 'Verified highest grade sugar, salt, atta & daal',
    },
    {
      icon: Sparkles,
      title: 'Bulk & Family Pack Savings',
      subtitle: 'Best value wholesale prices directly to home',
    },
    {
      icon: Truck,
      title: 'Express Doorstep Delivery',
      subtitle: 'Heavy grocery sacks carried right inside your home',
    },
  ],
  'health-personal-care': [
    {
      icon: ShieldCheck,
      title: '100% Authentic Brands',
      subtitle: 'Sourced directly from authorized distributors',
    },
    {
      icon: Sparkles,
      title: 'Dermatologically Tested',
      subtitle: 'Gentle organic herbal personal care items',
    },
    {
      icon: Truck,
      title: 'Discreet Express Packaging',
      subtitle: 'Delivered securely in sealed eco-friendly packs',
    },
  ],
  'baby-food-care': [
    {
      icon: ShieldCheck,
      title: 'Infant-Grade Certified Safe',
      subtitle: 'Zero harmful chemicals, phthalates or parabens',
    },
    {
      icon: Sparkles,
      title: 'Freshly Dated Stock Only',
      subtitle: 'Long expiry dates checked before every dispatch',
    },
    {
      icon: Truck,
      title: 'Care & Priority Handling',
      subtitle: 'Fast delivery for urgent infant diapers & foods',
    },
  ],
};

const defaultRibbonPoints: RibbonPoint[] = [
  {
    icon: ShieldCheck,
    title: '100% Farm Fresh Quality',
    subtitle: 'Directly sourced from trusted partner producers',
  },
  {
    icon: Sparkles,
    title: 'Guaranteed Purity & Safety',
    subtitle: 'Screened & inspected for zero adulteration',
  },
  {
    icon: Truck,
    title: 'Fast 30-Min Delivery',
    subtitle: 'Temperature controlled doorstep dispatch in Dhaka',
  },
];

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { getProductsByCategory, categories } = useCatalog();
  const category = (categories && categories.find((c) => c.slug === params.slug)) || getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const categoryBanner = categoryBannerMap[category.slug] || '/images/banner-farm-grocery.jpg';
  const ribbonPoints = categoryRibbonMap[category.slug] || defaultRibbonPoints;

  const dynamicCategoryProducts = getProductsByCategory(params.slug);
  const allCategoryProducts = dynamicCategoryProducts && dynamicCategoryProducts.length > 0
    ? dynamicCategoryProducts
    : getProductsByCategorySlug(params.slug);

  // Filter states
  const initialSubcategory = searchParams?.sub || 'all';
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>(initialSubcategory);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
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

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* B. CATEGORY BENEFITS RIBBON */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
          <div className="bg-white rounded-2xl border border-[#E5ECE7] p-4 sm:p-5 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {ribbonPoints.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-[#17251F]">{item.title}</p>
                  <p className="text-[#64736B]">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C. HOT DEALS IN THIS CATEGORY */}
        {hotDealsInCategory.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
                {hotDealsInCategory.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* D. CATEGORY FILTERS & PRODUCT LISTING */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
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
                    onClick={() => setVisibleCount((prev) => prev + 10)}
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
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#E5ECE7] hover:shadow-xl transition-all duration-300 min-h-[190px] sm:min-h-[230px] md:min-h-[260px] flex flex-col justify-end p-6 sm:p-8">
            {/* Full Background Banner Image */}
            <img
              src="/images/banner-farm-grocery.jpg"
              alt="ফার্ম ফ্রেশ গ্রোসারি"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            {/* Subtle bottom gradient to ensure action button pops */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Action Button */}
            <div className="relative z-10 flex items-center justify-end">
              <Link
                href="/category/fresh-fruits-vegetables"
                className="inline-flex items-center gap-2 bg-[#123C2D] hover:bg-[#21A366] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <span>ফার্ম ফ্রেশ গ্রোসারি কিনুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* F. RELATED CATEGORIES & CROSS-SELL */}
        {relatedCategories.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 shadow-xs">
              <h3 className="text-lg font-black text-[#17251F] mb-4">
                Customers Also Frequently Shop
              </h3>
              <div className={`grid grid-cols-1 ${relatedCategories.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4 sm:gap-6`}>
                {relatedCategories.map((rc) => (
                  <Link
                    key={rc.id}
                    href={`/category/${rc.slug}`}
                    className="p-5 sm:p-6 rounded-2xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#F7F9F5] hover:bg-white transition-all flex items-start justify-between gap-4 group shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon Tile with Breathing Room */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#E5ECE7] flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-xs group-hover:scale-105 group-hover:border-[#21A366]/40 transition-all">
                        {rc.icon}
                      </div>

                      {/* Text with Generous Leading and Spacing */}
                      <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
                        <h4 className="font-black text-sm sm:text-base text-[#17251F] group-hover:text-[#21A366] transition-colors leading-snug">
                          {rc.name}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#64736B] leading-relaxed line-clamp-3 font-normal">
                          {rc.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Icon Pill */}
                    <div className="shrink-0 pt-1.5 pl-2">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E5ECE7] flex items-center justify-center text-gray-400 group-hover:text-[#21A366] group-hover:border-[#21A366]/50 shadow-xs group-hover:translate-x-0.5 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
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
