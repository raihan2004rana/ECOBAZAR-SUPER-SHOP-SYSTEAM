'use client';

import * as React from 'react';
import initialCatalogData from '../data/live-catalog.json';
import { ProductItem, CategoryDef } from '../data/catalog';

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgGradient: string;
  tag: string;
  active?: boolean;
}

export interface TopBannerConfig {
  enabled: boolean;
  badgeText: string;
  title: string;
  subtitle: string;
  promoCode: string;
  discountPercent: number;
  buttonText: string;
  buttonLink: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  link: string;
  active?: boolean;
}

interface CatalogContextType {
  products: ProductItem[];
  categories: CategoryDef[];
  heroSlides: HeroSlide[];
  topBanner: TopBannerConfig;
  promoBanners: PromoBanner[];
  hotDeals: ProductItem[];
  newArrivals: ProductItem[];
  advertisedProducts: ProductItem[];
  specialOffers: ProductItem[];
  isLoading: boolean;
  refreshCatalog: () => Promise<void>;
  getProductById: (idOrSlug: string) => ProductItem | undefined;
  getProductsByCategory: (categorySlug: string) => ProductItem[];
}

const CatalogContext = React.createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = React.useState<ProductItem[]>(
    (initialCatalogData.products as unknown as ProductItem[]) || []
  );
  const [categories, setCategories] = React.useState<CategoryDef[]>(
    (initialCatalogData.categories as unknown as CategoryDef[]) || []
  );
  const [heroSlides, setHeroSlides] = React.useState<HeroSlide[]>(
    (initialCatalogData.heroSlides as unknown as HeroSlide[]) || []
  );
  const [topBanner, setTopBanner] = React.useState<TopBannerConfig>(
    (initialCatalogData.topBanner as unknown as TopBannerConfig) || {
      enabled: true,
      badgeText: 'VOUCHER SAVINGS',
      title: 'Save 10% on your entire basket with code ECO10',
      subtitle: 'Applies on all fresh produce, groceries, and staples.',
      promoCode: 'ECO10',
      discountPercent: 10,
      buttonText: 'Explore All Offers',
      buttonLink: '/offers',
    }
  );
  const [promoBanners, setPromoBanners] = React.useState<PromoBanner[]>(
    (initialCatalogData.promoBanners as unknown as PromoBanner[]) || []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const lastUpdatedRef = React.useRef<string>((initialCatalogData as any).lastUpdated || '');

  // Sync from /api/catalog
  const refreshCatalog = React.useCallback(async () => {
    try {
      const res = await fetch('/api/catalog', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.lastUpdated && data.lastUpdated === lastUpdatedRef.current) {
        return; // Skip re-setting state if catalog hasn't changed
      }
      if (data.lastUpdated) {
        lastUpdatedRef.current = data.lastUpdated;
      }
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
      if (data.heroSlides && Array.isArray(data.heroSlides)) {
        setHeroSlides(data.heroSlides);
      }
      if (data.topBanner) {
        setTopBanner(data.topBanner);
      }
      if (data.promoBanners && Array.isArray(data.promoBanners)) {
        setPromoBanners(data.promoBanners);
      }
    } catch {
      // fallback to initial state silently
    }
  }, []);

  // Poll for updates every 4 seconds or on window focus
  React.useEffect(() => {
    refreshCatalog();
    const interval = setInterval(refreshCatalog, 4000);
    const onFocus = () => refreshCatalog();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [refreshCatalog]);

  // Derived arrays
  const hotDeals = React.useMemo(() => {
    return products.filter((p) => p.isHotDeal || (p.badge && p.badge.includes('OFF')));
  }, [products]);

  const newArrivals = React.useMemo(() => {
    const explicitlyMarked = products.filter((p) => p.isNewArrival);
    if (explicitlyMarked.length >= 4) return explicitlyMarked;
    return products.slice(0, 16);
  }, [products]);

  const advertisedProducts = React.useMemo(() => {
    return products.filter((p) => (p as any).isAdvertisement || (p as any).isFeatured);
  }, [products]);

  const specialOffers = React.useMemo(() => {
    return products.filter(
      (p) =>
        (p as any).isOffer ||
        (p.badge && p.badge.includes('OFF')) ||
        (p.originalPrice && p.originalPrice > p.price)
    );
  }, [products]);

  const getProductById = React.useCallback(
    (idOrSlug: string): ProductItem | undefined => {
      if (!idOrSlug) return undefined;
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().trim();

      // 1. Exact ID match
      const byId = products.find((p) => p.id.toLowerCase() === decoded);
      if (byId) return byId;

      // 2. Exact slug match
      const bySlug = products.find((p) => {
        const slug = p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return slug === decoded;
      });
      if (bySlug) return bySlug;

      // 3. Partial slug match
      const byPartial = products.find((p) => {
        const slug = p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return slug.includes(decoded) || decoded.includes(slug);
      });
      if (byPartial) return byPartial;

      // 4. Token match
      const tokens = decoded.split('-').filter(Boolean);
      return products.find((p) => {
        const nameLower = p.name.toLowerCase();
        return tokens.length > 0 && tokens.every((t) => nameLower.includes(t));
      });
    },
    [products]
  );

  const getProductsByCategory = React.useCallback(
    (categorySlug: string): ProductItem[] => {
      if (!categorySlug) return [];
      const slug = categorySlug.toLowerCase().trim();
      return products.filter((p) => p.categorySlug.toLowerCase() === slug);
    },
    [products]
  );

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        heroSlides,
        topBanner,
        promoBanners,
        hotDeals,
        newArrivals,
        advertisedProducts,
        specialOffers,
        isLoading,
        refreshCatalog,
        getProductById,
        getProductsByCategory,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = React.useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
