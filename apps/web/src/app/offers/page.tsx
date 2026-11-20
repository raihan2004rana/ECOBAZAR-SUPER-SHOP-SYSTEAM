'use client';

import * as React from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Copy, Check, ShoppingBag, ArrowRight, Gift, Percent } from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { useCart } from '../../context/cart-context';
import { masterCatalogProducts } from '../../data/catalog';
import { useToast } from '@ecobazar/ui';

export default function OffersPage() {
  const { applyCoupon, addToCart, setIsCartDrawerOpen } = useCart();
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const coupons = [
    {
      code: 'ECO10',
      title: 'Flat 10% Off Entire Basket',
      desc: 'Valid on all fresh organic produce, poultry, and daily pantry staples above ৳1,000.',
      expiry: 'Expires in 7 days',
      discount: '10% OFF',
      color: 'bg-emerald-600',
      image: '/images/banner-organic-harvest.jpg',
    },
    {
      code: 'FREESHIP',
      title: 'Free Express Cold-Chain Delivery',
      desc: 'Save ৳50 delivery charge on any express grocery order across all Dhaka branches.',
      expiry: 'Limited to today',
      discount: 'FREE DELIVERY',
      color: 'bg-[#123C2D]',
      image: '/images/hero-deliveryman.jpg',
    },
    {
      code: 'DHAKA25',
      title: 'bKash Special ৳100 Cashback',
      desc: 'Pay using bKash merchant gateway and receive ৳100 instant cashback on your wallet.',
      expiry: 'Active this month',
      discount: '৳100 CASHBACK',
      color: 'bg-rose-600',
      image: '/images/banner-hot-deals.jpg',
    },
  ];

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const bundles = [
    {
      id: 'bundle-veggies',
      title: 'Weekly Fresh Green Basket (Save ৳120)',
      desc: 'Tomatoes (1kg), Green Chilli (250g), Fresh Spinach, Red Amaranth & Crisp Cucumber.',
      price: 320,
      originalPrice: 440,
      savings: '27% Off',
      image: 'https://i.ibb.co.com/4gjhSSh9/Gemini-Generated-Image-zgrqmtzgrqmtzgrq.jpg',
      items: [masterCatalogProducts[0], masterCatalogProducts[1]],
    },
    {
      id: 'bundle-breakfast',
      title: 'Artisanal Breakfast Combo (Save ৳150)',
      desc: 'Grass-fed Cow Milk (1L), Free-range Farm Eggs (12 pcs), Whole Wheat Bread & Honey.',
      price: 490,
      originalPrice: 640,
      savings: '23% Off',
      image: 'https://i.ibb.co.com/LXW3pD94/Gemini-Generated-Image-83hhw683hhw683hh.jpg',
      items: [masterCatalogProducts[2], masterCatalogProducts[1]],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-[#071F15] text-white py-14 sm:py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/offer-hero.png"
              alt="Promotions & Coupons"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/70 to-[#0A261B]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F15] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#2EBD70] text-[#071F15] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md">
                <Gift className="w-4 h-4 text-[#071F15]" />
                <span>ACTIVE VOUCHERS & VALUE BUNDLES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white drop-shadow-md">
                Promotions & Coupon Vouchers
              </h1>
              <p className="text-sm sm:text-base text-emerald-50/90 mt-2 font-medium leading-relaxed drop-shadow-sm">
                Apply one-click coupon codes to enjoy instant discounts, free delivery, and curated combo savings.
              </p>
            </div>
          </div>
        </section>

        {/* Coupons List */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-xl font-black text-[#17251F] mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#21A366]" />
            <span>Available Voucher Codes</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-3xl border border-[#E5ECE7] p-5 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div>
                  {/* Coupon Header Banner Image */}
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-4 shrink-0 bg-[#071F15]">
                    <img
                      src={coupon.image}
                      alt={coupon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#071F15] bg-[#2EBD70] px-2.5 py-0.5 rounded-full shadow-sm">
                        {coupon.discount}
                      </span>
                      <span className="text-xs text-white/95 font-semibold drop-shadow-sm">{coupon.expiry}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <h3 className="font-extrabold text-base text-[#17251F]">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-[#64736B] leading-relaxed">
                      {coupon.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5ECE7]/60 flex items-center justify-between gap-3">
                  <div className="bg-[#F7F9F5] border border-dashed border-[#21A366] rounded-xl px-3 py-1.5 font-mono font-black text-sm text-[#123C2D]">
                    {coupon.code}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyAndApply(coupon.code)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#21A366] hover:bg-[#123C2D] text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy & Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Bundle Packs */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-xl font-black text-[#17251F] mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F4A340]" />
            <span>Curated Family Value Bundles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-white rounded-3xl border border-[#E5ECE7] p-6 shadow-xs flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full sm:w-44 h-44 rounded-2xl object-cover border border-[#E5ECE7]"
                />
                <div className="flex-1 space-y-2">
                  <span className="text-[11px] font-black uppercase text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    {bundle.savings}
                  </span>
                  <h3 className="font-extrabold text-base text-[#17251F] leading-tight">
                    {bundle.title}
                  </h3>
                  <p className="text-xs text-[#64736B] leading-relaxed">
                    {bundle.desc}
                  </p>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-2xl font-black text-[#123C2D]">৳{bundle.price}</span>
                    <span className="text-xs text-gray-400 line-through">৳{bundle.originalPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      bundle.items.forEach((item) => addToCart(item));
                      setIsCartDrawerOpen(true);
                      toast.success('Bundle Added!', `${bundle.title} items added to your cart.`);
                    }}
                    className="inline-flex items-center gap-2 bg-[#21A366] hover:bg-[#123C2D] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs mt-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Entire Bundle to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CartDrawer />
      <WishlistDrawer />
      <Modals />
      <SiteFooter />
    </div>
  );
}
