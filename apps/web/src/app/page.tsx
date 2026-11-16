import React from 'react';
import { Button, Badge, Card, CardHeader, CardTitle, CardContent, CardFooter, PriceDisplay } from '@ecobazar/ui';
import { ShoppingBag, Sparkles, MapPin, Search } from 'lucide-react';

export default function HomePage() {
  const featuredCategories = [
    { nameEn: 'Fresh Vegetables', nameBn: 'তাজা শাকসবজি', count: '45+ items' },
    { nameEn: 'Dairy & Eggs', nameBn: 'দুধ ও ডিম', count: '28+ items' },
    { nameEn: 'Aromatic Rice', nameBn: 'সুগন্ধি চাল', count: '18+ items' },
    { nameEn: 'Pure Cooking Oil', nameBn: 'খাঁটি তেল', count: '12+ items' },
  ];

  const featuredProducts = [
    {
      id: '1',
      nameEn: 'Organic Red Tomatoes',
      nameBn: 'অর্গানিক পাকা টমেটো (১ কেজি)',
      sellingPrice: 85,
      originalPrice: 100,
      badge: 'Fresh Daily',
    },
    {
      id: '2',
      nameEn: 'Premium Nazirshail Rice (5kg)',
      nameBn: 'প্রিমিয়াম নাজিরশাইল চাল (৫ কেজি)',
      sellingPrice: 420,
      originalPrice: 450,
      badge: 'Best Seller',
    },
    {
      id: '3',
      nameEn: 'Cold Pressed Mustard Oil (1L)',
      nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার)',
      sellingPrice: 340,
      badge: 'Organic',
    },
    {
      id: '4',
      nameEn: 'Farm Fresh Brown Eggs (12 pcs)',
      nameBn: 'ফার্মের তাজা লাল ডিম (১২ টি)',
      sellingPrice: 145,
      originalPrice: 155,
      badge: 'Daily Essential',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ecobazar-off-white">
      {/* Top Banner */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-ecobazar-forest-green flex items-center justify-center text-white font-bold text-xl shadow-md">
              E
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-ecobazar-forest-green">
                ECO<span className="text-ecobazar-primary-green">BAZAR</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Supermarket & POS
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <MapPin className="h-3.5 w-3.5 text-ecobazar-primary-green" />
            <span>Delivering to: <strong className="text-slate-900">Gulshan-2, Dhaka</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a href="/design-system">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5 border-emerald-300 text-emerald-800 hover:bg-emerald-50">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Design System</span>
              </Button>
            </a>
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex gap-1.5">
              <span>বাংলা / EN</span>
            </Button>
            <Button variant="forest" size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Cart (0)</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-900 to-ecobazar-forest-green text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <Badge variant="mint" className="px-3 py-1 text-xs">
            🌱 100% Fresh & Authentic Supermarket
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Fresh Produce & Daily Essentials Delivered in 1 Hour
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-light">
            Directly sourced from trusted local farmers and brand partners across Bangladesh. Complete batch freshness & transparent pricing.
          </p>

          <div className="max-w-xl mx-auto pt-4">
            <div className="flex items-center bg-white rounded-xl p-1.5 shadow-xl text-slate-800">
              <Search className="h-5 w-5 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search rice, fresh vegetables, spices, dairy..."
                className="w-full px-3 py-2 text-sm bg-transparent outline-none placeholder:text-slate-400"
              />
              <Button variant="default" size="default" className="rounded-lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Popular Categories</h2>
            <p className="text-xs text-slate-500">জনপ্রিয় বিভাগসমূহ</p>
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featuredCategories.map((cat, idx) => (
            <Card key={idx} className="hover:border-ecobazar-primary-green hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="p-4">
                <CardTitle className="text-base text-ecobazar-forest-green">{cat.nameEn}</CardTitle>
                <p className="text-xs font-bangla text-slate-500">{cat.nameBn}</p>
                <span className="text-[11px] text-emerald-600 font-medium">{cat.count}</span>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Daily Deals & Essentials</h2>
            <p className="text-xs text-slate-500">দৈনন্দিন প্রয়োজনীয় পণ্য</p>
          </div>
          <Badge variant="orange">Flash Sale</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <Card key={prod.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="mint" className="text-[10px]">
                    {prod.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base text-slate-900">{prod.nameEn}</CardTitle>
                <p className="text-xs font-bangla text-slate-500">{prod.nameBn}</p>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <PriceDisplay
                  amount={prod.sellingPrice}
                  originalAmount={prod.originalPrice}
                  size="lg"
                />
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button variant="default" className="w-full gap-2 text-xs">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <p>© 2026 ECOBAZAR Operating System. Multi-Branch Supermarket & E-Commerce Platform.</p>
        <p className="mt-1">Standard Currency: BDT (৳) | Timezone: Asia/Dhaka</p>
      </footer>
    </div>
  );
}
