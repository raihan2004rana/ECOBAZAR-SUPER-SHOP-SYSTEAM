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
  Sparkles,
  Truck,
  HelpCircle,
  ArrowRight,
  Flame,
  Tag,
} from 'lucide-react';
import { Logo } from '@ecobazar/ui';
import { useCart } from '../context/cart-context';
import { categoryDefinitions, masterCatalogProducts, ProductItem } from '../data/catalog';
import { useCatalog } from '../context/catalog-context';

export const SiteHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
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
    { label: 'Home', href: '/' },
    { label: 'Deals', href: '/deals', badge: 'HOT' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Offers', href: '/offers', badge: '10%' },
    { label: 'Branches', href: '/branches', badge: '3 Live' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR — Solid Forest Green with High-Contrast Text */}
      <div className="bg-[#123C2D] text-white text-xs border-b border-[#21A366]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Left helpline & banner */}
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#2EBD70]" />
              <span>Need Support? Call:</span>
              <a
                href="tel:+8809612000000"
                className="font-bold text-white hover:text-[#D8F3DC] transition-colors"
              >
                +880 9612-000000
              </a>
            </div>
            <span className="hidden md:inline text-white/40">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Free Express Delivery on orders over ৳1,000!</span>
            </div>
          </div>

          {/* Right quick actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center gap-1 font-bold text-[#F4A340] hover:text-white transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
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
              Help & Contact
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#17251F] hover:text-[#21A366] lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center shrink-0">
              <Logo size="md" />
            </Link>
          </div>

          {/* Search Autocomplete Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for fresh fruits, vegetables, dairy, rice, spices..."
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
                className="w-full pl-11 pr-24 py-2.5 bg-[#F7F9F5] hover:bg-white focus:bg-white text-sm rounded-full border border-[#E5ECE7] focus:border-[#21A366] focus:ring-2 focus:ring-[#21A366]/20 transition-all text-[#17251F] placeholder:text-[#64736B]"
              />
              <Search className="w-4 h-4 text-[#64736B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              <button
                type="button"
                onClick={() => {
                  if (searchResults.length > 0) {
                    router.push(`/products/${searchResults[0].id}`);
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold rounded-full transition-colors"
              >
                Search
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
          <div className="flex items-center gap-2 sm:gap-4">
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

            {/* Account / Login */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-2 rounded-xl text-[#17251F] hover:text-[#21A366] hover:bg-[#F7F9F5] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#F7F9F5] border border-[#E5ECE7] flex items-center justify-center text-gray-700">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] text-[#64736B] leading-none">Account</p>
                <p className="text-xs font-bold leading-tight mt-0.5">Sign In</p>
              </div>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="relative p-2 rounded-xl text-[#17251F] hover:text-[#21A366] hover:bg-[#F7F9F5] transition-colors"
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

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 bg-[#21A366] hover:bg-[#123C2D] text-white px-3.5 py-2 rounded-xl font-bold transition-all shadow-sm"
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
              <div className="hidden sm:block text-left text-xs leading-none">
                <p className="text-[10px] text-white/80 font-medium">Cart</p>
                <p className="font-extrabold text-white mt-0.5">৳{isHydrated ? cartGrandTotal : 0}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
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
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9F5] text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 3. SECONDARY NAVIGATION & DEPARTMENT BAR */}
      <div className="border-t border-[#E5ECE7] bg-[#F7F9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* All Categories Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2.5 bg-[#123C2D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#21A366] transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega Categories Dropdown */}
              {isCategoryDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E5ECE7] py-2 z-50 max-h-[480px] overflow-y-auto"
                >
                  <div className="px-4 py-2 text-[11px] font-bold text-[#64736B] uppercase tracking-wider border-b border-[#E5ECE7]/60">
                    Explore 11 Departments
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-[#17251F] hover:bg-[#D8F3DC]/40 hover:text-[#21A366] transition-colors font-medium border-b border-[#E5ECE7]/30 last:border-b-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{cat.icon}</span>
                        <div>
                          <p className="font-bold leading-tight">{cat.name}</p>
                          <p className="text-[10px] text-[#64736B]">{cat.nameBn}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">→</span>
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

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
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

              {/* Mobile Links */}
              <div className="py-4 space-y-1 border-b border-[#E5ECE7]">
                <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                  Navigation
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
              </div>

              {/* Categories */}
              <div className="py-4 space-y-2">
                <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                  11 Categories
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 text-xs text-[#17251F] hover:text-[#21A366] font-medium"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
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
    </header>
  );
};
