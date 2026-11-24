'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  Phone,
  Clock,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Truck,
  HelpCircle,
  ArrowRight,
  Flame,
  Tag,
  Home,
  LayoutGrid,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from '@ecobazar/ui';
import { useCart } from '../context/cart-context';
import { useUser } from '../context/user-context';
import { categoryDefinitions, categoryRealisticThumbnails, masterCatalogProducts, ProductItem } from '../data/catalog';
import { useCatalog } from '../context/catalog-context';
import { useLanguage } from '../context/language-context';

export const SiteHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const {
    totalCartCount,
    cartGrandTotal,
    wishlistProducts,
    isHydrated,
    setIsCartDrawerOpen,
    setIsWishlistDrawerOpen,
    setIsBranchModalOpen,
    setIsTrackingModalOpen,
    setIsAuthModalOpen,
    setSelectedProductForModal,
    selectedBranch,
  } = useCart();
  const { user, isLoggedIn, membership, unreadAnnouncementsCount } = useUser();
  const { products: dynamicProducts, categories: dynamicCategories, topBanner } = useCatalog();
  const allProducts = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : masterCatalogProducts;
  const categories = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : categoryDefinitions;

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<ProductItem[]>([]);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // Category dropdown state in nav
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);

  // Track scroll position so All Categories button only shows on scroll on HomePage (hero has its own sidebar)
  const isHomePage = pathname === '/';
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // When user scrolls past 380px, hero sidebar is no longer in view
      setIsScrolledPastHero(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showCategoryButton = !isHomePage || isScrolledPastHero;

  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Handle live search
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameBn && p.nameBn.includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      )
      .slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allProducts]);

  // Click outside search
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t('Home', 'হোম'), href: '/' },
    { label: t('Deals', 'ডিলস'), href: '/deals', badge: 'HOT' },
    { label: t('New Arrivals', 'নতুন পণ্য'), href: '/new-arrivals' },
    { label: t('Offers', 'অফার'), href: '/offers', badge: '10%' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR — Hidden on Mobile and Tablet for Clean Header, Shown on Desktop */}
      <div className="hidden xl:block bg-[#123C2D] text-white text-xs border-b border-[#21A366]/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Left helpline & banner */}
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#2EBD70]" />
              <span>{t('Need Support? Call:', 'প্রয়োজনে কল করুন:')}</span>
              <a
                href="tel:+8809612000000"
                className="font-bold text-white hover:text-[#D8F3DC] transition-colors"
              >
                +880 9612-000000
              </a>
            </div>
            <span className="hidden md:inline text-white/40">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-white/90">
              <span>{t('Free Express Delivery on orders over ৳1,000!', '৳১,০০০ টাকার বেশি অর্ডারে ফ্রি এক্সপ্রেস ডেলিভারি!')}</span>
            </div>
          </div>

          {/* Right quick actions */}
          <div className="flex items-center gap-4">
            {/* Top Language Toggle Switch */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#D8F3DC] transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full border border-white/20"
              title={language === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center gap-1 font-bold text-[#F4A340] hover:text-white transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{t('Track Order', 'অর্ডার ট্র্যাক')}</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              type="button"
              onClick={() => setIsBranchModalOpen(true)}
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2EBD70]" />
              <span className="hidden sm:inline font-medium">Dhaka:</span>
              <span className="font-bold text-white underline decoration-[#2EBD70] decoration-2 underline-offset-2">
                {selectedBranch.area.split(',')[0]}
              </span>
            </button>

            <span className="hidden sm:inline text-white/40">|</span>

            <Link
              href="/contact"
              className="hidden sm:inline text-white/90 hover:text-white transition-colors font-medium"
            >
              {t('Help & Contact', 'সাহায্য')}
            </Link>

            <span className="hidden sm:inline text-white/40">|</span>

            <Link
              href="/admin"
              className="hidden sm:inline text-emerald-300 hover:text-white transition-colors font-bold flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('Staff & Admin', 'এডমিন পোর্টাল')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Logo & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 -ml-1 text-[#17251F] hover:text-[#21A366] xl:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <Link href="/" className="flex items-center shrink-0">
              <Logo size="sm" className="sm:hidden" />
              <Logo size="md" className="hidden sm:inline-flex" />
            </Link>
          </div>

          {/* Search Autocomplete Bar - IN THE HEADER on tablet (md:) and desktop with spacious width */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-3xl mx-2 sm:mx-5 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t('Search fresh groceries, fruits, vegetables, dairy...', 'তাজা ফল, শাকসবজি, দুধ, মুদি পণ্য সার্চ করুন...')}
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    router.push(`/products/${searchResults[0].id}`);
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }
                }}
                className="w-full pl-10 sm:pl-11 pr-20 sm:pr-24 py-2 sm:py-2.5 bg-[#F7F9F5] hover:bg-white focus:bg-white text-xs sm:text-sm rounded-full border border-[#E5ECE7] focus:border-[#21A366] focus:ring-2 focus:ring-[#21A366]/20 transition-all text-[#17251F] placeholder:text-[#64736B]"
              />
              <Search className="w-4 h-4 text-[#64736B] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              <button
                type="button"
                onClick={() => {
                  if (searchResults.length > 0) {
                    router.push(`/products/${searchResults[0].id}`);
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold rounded-full transition-colors"
              >
                {t('Search', 'খুঁজুন')}
              </button>
            </div>

            {/* Dropdown Suggestions */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#E5ECE7] py-2 z-50 overflow-hidden">
                <div className="px-4 py-1.5 text-[11px] font-bold text-[#64736B] uppercase tracking-wider bg-[#F7F9F5]">
                  Found {searchResults.length} Products
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F7F9F5] cursor-pointer transition-colors border-b border-[#E5ECE7]/40 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#F7F9F5] border border-[#E5ECE7]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#17251F] truncate">{product.name}</p>
                      <p className="text-[11px] text-[#64736B]">{product.category} • {product.unit}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#123C2D]">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through block">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Header Controls: Branch, Account, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Branch Hub Selector */}
            <button
              type="button"
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#F7F9F5] hover:bg-white text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D8F3DC] text-[#21A366] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#64736B] uppercase font-bold leading-none">Branch Hub</p>
                <p className="text-xs font-extrabold text-[#17251F] leading-tight mt-0.5 truncate max-w-[110px]">
                  {selectedBranch.area.split(',')[0]}
                </p>
              </div>
            </button>

            {/* Language Switcher Pill (1-Click Toggle for EN / বাংলা) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#F7F9F5] hover:bg-white text-[11px] sm:text-xs font-bold text-[#17251F] transition-all cursor-pointer shadow-2xs shrink-0"
              title={language === 'en' ? 'বাংলায় দেখতে ক্লিক করুন' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#21A366]" />
              <span className={language === 'en' ? 'text-[#21A366] font-black' : 'text-neutral-400 font-medium'}>EN</span>
              <span className="text-neutral-300 font-normal">/</span>
              <span className={language === 'bn' ? 'text-[#21A366] font-black font-bangla' : 'text-neutral-400 font-bangla font-medium'}>বাং</span>
            </button>

            {/* Account / Profile Link */}
            {isLoggedIn ? (
              <Link
                href="/profile"
                className="hidden xl:flex items-center gap-2.5 p-1.5 px-2.5 rounded-xl text-[#17251F] hover:text-[#21A366] hover:bg-[#F2FBF6] border border-transparent hover:border-[#21A366]/20 transition-all group"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#EBF7F0] border border-[#21A366]/30 flex items-center justify-center text-[#21A366] font-black text-xs shadow-2xs group-hover:scale-105 transition-transform">
                    {user.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'RA'}
                  </div>
                  {unreadAnnouncementsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                      {unreadAnnouncementsCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold leading-tight truncate max-w-[100px] text-[#17251F]">
                      {user.name.split(' ')[0]}
                    </p>
                    <span className="text-[9px] bg-amber-500/15 text-amber-700 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      {membership.tier === 'PLATINUM' ? 'Platinum' : membership.tier === 'GOLD' ? 'Gold VIP' : 'Silver'}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#21A366] font-semibold leading-none mt-0.5">
                    {t('Profile & Orders', 'প্রোফাইল ও অর্ডার')}
                  </p>
                </div>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden xl:flex items-center gap-2 p-2 rounded-xl text-[#17251F] hover:text-[#21A366] hover:bg-[#F7F9F5] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#F7F9F5] border border-[#E5ECE7] flex items-center justify-center text-gray-700">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-[10px] text-[#64736B] leading-none">{t('Account', 'একাউন্ট')}</p>
                  <p className="text-xs font-bold leading-tight mt-0.5">{t('Sign In', 'লগইন')}</p>
                </div>
              </button>
            )}

            {/* Wishlist - Hidden on mobile top header */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="hidden md:flex relative p-2 rounded-xl text-[#17251F] hover:text-[#21A366] hover:bg-[#F7F9F5] transition-colors"
              aria-label="Wishlist"
            >
              <div className="w-9 h-9 rounded-full bg-[#F7F9F5] border border-[#E5ECE7] flex items-center justify-center text-gray-700">
                <Heart className="w-4 h-4" />
              </div>
              {isHydrated && wishlistProducts.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistProducts.length}
                </span>
              )}
            </button>

            {/* Desktop Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="hidden md:flex items-center gap-2.5 bg-[#21A366] hover:bg-[#123C2D] text-white px-3.5 py-2 rounded-xl font-bold transition-all shadow-sm"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {isHydrated && totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#F4A340] text-[#17251F] text-[10px] font-black flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block text-left text-xs leading-none">
                <p className="text-[10px] text-white/80 font-medium">Cart</p>
                <p className="font-extrabold text-white mt-0.5">৳{isHydrated ? cartGrandTotal : 0}</p>
              </div>
            </button>

            {/* Mobile-Only Clean Cart Icon with Badge (Compact, non-overflowing) */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-1.5 text-[#17251F] hover:text-[#21A366] md:hidden transition-colors shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {isHydrated && totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#F4A340] text-[#17251F] text-[9px] font-black flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden relative">
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search produce, dairy, groceries..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults.length > 0) {
                  router.push(`/products/${searchResults[0].id}`);
                  setIsSearchFocused(false);
                  setSearchQuery('');
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F5] text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] text-[#17251F]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Mobile Live Search Dropdown Suggestions */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#E5ECE7] py-2 z-50 max-h-72 overflow-y-auto">
              <div className="px-4 py-1.5 text-[10px] font-bold text-[#64736B] uppercase tracking-wider bg-[#F7F9F5]">
                Found {searchResults.length} Products
              </div>
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#F7F9F5] cursor-pointer transition-colors border-b border-[#E5ECE7]/40 last:border-b-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-9 h-9 rounded-lg object-cover bg-[#F7F9F5] border border-[#E5ECE7] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#17251F] truncate">{product.name}</p>
                    <p className="text-[10px] text-[#64736B] truncate">{product.category} • {product.unit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-[#123C2D]">৳{product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. SECONDARY NAVIGATION & DEPARTMENT BAR - Hidden on mobile and tablet for clean header */}
      <div className="hidden xl:block border-t border-[#E5ECE7] bg-[#F7F9F5]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* All Categories Dropdown Trigger - Shown on all pages, but on HomePage only when scrolled past Hero */}
            <div className="relative">
              {showCategoryButton ? (
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center gap-2.5 bg-[#123C2D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#21A366] transition-all duration-300 shadow-xs animate-in fade-in"
                >
                  <Menu className="w-4 h-4" />
                  <span>{t('All Categories', 'সকল ক্যাটাগরি')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                /* Elegant indicator on HomePage top to keep spacing consistent */
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#123C2D] bg-[#EBF7F0] px-3.5 py-1.5 rounded-xl border border-[#21A366]/20">
                  <span>{t('Fresh Express Supermarket', 'তাজা এক্সপ্রেস সুপারশপ')}</span>
                </div>
              )}

              {/* Mega Categories Dropdown */}
              {showCategoryButton && isCategoryDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E5ECE7] py-2 z-50 max-h-[480px] overflow-y-auto"
                >
                  <div className="px-4 py-2 text-[11px] font-bold text-[#64736B] uppercase tracking-wider border-b border-[#E5ECE7]/60">
                    {t('Explore 11 Departments', '১১ টি বিভাগ দেখুন')}
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="group flex items-center justify-between px-4 py-2 text-xs text-[#17251F] hover:bg-[#F2FBF6] hover:text-[#21A366] transition-colors font-medium border-b border-[#E5ECE7]/30 last:border-b-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 bg-[#F7F9F5] border border-neutral-200/80 group-hover:border-[#21A366] transition-all">
                          <img
                            src={categoryRealisticThumbnails[cat.slug] || '/images/products/red-apple.webp'}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold leading-tight truncate">{language === 'bn' ? cat.nameBn : cat.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 group-hover:text-[#21A366] transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs font-bold transition-colors py-2 ${
                      isActive
                        ? 'text-[#21A366]'
                        : 'text-[#17251F] hover:text-[#21A366]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 text-[9px] bg-rose-500 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#21A366] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 24/7 Fast Support Badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-[#2EBD70] animate-pulse" />
              <span className="text-[#64736B] font-medium">Delivery:</span>
              <span className="font-bold text-[#123C2D]">30 Mins in Dhaka</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MOBILE & TABLET DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5ECE7]">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Language Switcher Card */}
              <div className="my-3 p-3 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7] flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#E5ECE7] flex items-center justify-center text-[#21A366]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17251F]">Language / ভাষা</p>
                    <p className="text-[10px] text-[#64736B]">
                      {language === 'en' ? 'Currently in English' : 'বাংলায় প্রদর্শিত হচ্ছে'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
                >
                  {language === 'en' ? 'বাংলায় দেখুন' : 'Switch to EN'}
                </button>
              </div>

              {/* Login / User Profile Info inside Hamburger Menu (Tablet & Mobile) */}
              {isLoggedIn ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="my-3 p-3.5 bg-[#F2FBF6] rounded-2xl border border-[#21A366]/30 flex items-center justify-between gap-3 shadow-xs hover:bg-[#EBF7F0] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#21A366] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {user.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'RA'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-black text-[#17251F] truncate">{user.name}</p>
                        <span className="text-[9px] bg-amber-500/20 text-amber-700 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                          {membership.tier}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#21A366] font-semibold truncate mt-0.5">
                        {t('View Profile, Orders & Offers →', 'প্রোফাইল, অর্ডার ও অফার দেখুন →')}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#21A366] shrink-0" />
                </Link>
              ) : (
                <div className="my-3 p-3.5 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7] flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E5ECE7] flex items-center justify-center text-[#21A366] shrink-0 shadow-xs">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-[#17251F] truncate">{t('My Account', 'আমার একাউন্ট')}</p>
                      <p className="text-[10px] text-[#64736B] truncate">{t('Sign in for exclusive perks', 'অফারের জন্য লগইন করুন')}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors shadow-xs shrink-0"
                  >
                    {t('Sign In', 'লগইন')}
                  </button>
                </div>
              )}

              {/* Mobile Links */}
              <div className="py-4 space-y-1 border-b border-[#E5ECE7]">
                <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                  {t('Navigation', 'নেভিগেশন')}
                </p>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-bold text-[#17251F] hover:text-[#21A366]"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-emerald-700 hover:text-[#21A366] border-t border-[#E5ECE7]/60 mt-1"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t('Staff & Operations Hub', 'এডমিন ও স্টাফ পোর্টাল')}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">
                    HQ
                  </span>
                </Link>
              </div>

              {/* Categories */}
              <div className="py-4 space-y-2">
                <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                  {t('11 Categories', '১১ টি ক্যাটাগরি')}
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 text-xs text-[#17251F] hover:text-[#21A366] font-medium"
                  >
                    <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 bg-[#F7F9F5] border border-neutral-200/80 flex items-center justify-center shadow-2xs">
                      <img
                        src={categoryRealisticThumbnails[cat.slug] || '/images/products/red-apple.webp'}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <span>{language === 'bn' ? cat.nameBn : cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5ECE7] text-xs text-[#64736B]">
              <p className="font-bold text-[#17251F]">ECOBAZAR Helpline</p>
              <p>+880 9612-000000 (7 AM - 11 PM)</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* 5. MOBILE BOTTOM NAVIGATION BAR (Clean App-Like Experience like Ghorer Bazar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5ECE7] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-5 items-center text-center">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
              pathname === '/' ? 'text-[#21A366]' : 'text-[#64736B] hover:text-[#17251F]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">HOME</span>
          </Link>

          {/* 2. Menu */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-[#64736B] hover:text-[#17251F] transition-colors"
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">MENU</span>
          </button>

          {/* 3. Cart with badge */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-[#64736B] hover:text-[#17251F] transition-colors relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#21A366]" />
              {isHydrated && totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#F4A340] text-[#17251F] text-[9px] font-black flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black tracking-tight text-[#21A366]">CART</span>
          </button>

          {/* 4. Search */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const searchInput = document.getElementById('mobile-search-input');
              if (searchInput) searchInput.focus();
            }}
            className="flex flex-col items-center justify-center gap-1 py-1 text-[#64736B] hover:text-[#17251F] transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">SEARCH</span>
          </button>

          {/* 5. Account */}
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
              pathname === '/profile' ? 'text-[#21A366]' : 'text-[#64736B] hover:text-[#17251F]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">{t('ACCOUNT', 'একাউন্ট')}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
