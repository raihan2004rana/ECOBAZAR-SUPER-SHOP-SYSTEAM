'use client';

import * as React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  Check,
  Building2,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { storeBranches, StoreBranch } from '../../data/catalog';
import { useCart } from '../../context/cart-context';
import { useToast } from '@ecobazar/ui';

export default function BranchesPage() {
  const { selectedBranch, setSelectedBranch } = useCart();
  const { toast } = useToast();

  const handleSelectBranch = (branch: StoreBranch) => {
    setSelectedBranch(branch);
    toast.success('Store Selected', `${branch.name} is now your active store.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#123C2D] via-[#164332] to-[#21A366] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-bold mb-3">
                <Building2 className="w-4 h-4 text-[#F4A340]" />
                <span>3 STRATEGIC HUBS IN DHAKA</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                Our Supermarket Branches & Cold Storage Hubs
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-2 font-medium">
                Strategically positioned walk-in supermarkets and express fulfillment fulfillment centers guaranteeing fresh delivery across all Dhaka neighborhoods.
              </p>
            </div>
          </div>
        </section>

        {/* Branch Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storeBranches.map((branch) => {
              const isCurrent = selectedBranch.id === branch.id;

              return (
                <div
                  key={branch.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between shadow-xs transition-all ${
                    isCurrent
                      ? 'border-[#21A366] ring-2 ring-[#21A366]/20'
                      : 'border-[#E5ECE7] hover:border-[#21A366]/40 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#21A366] bg-[#D8F3DC] px-2.5 py-0.5 rounded-full">
                          {branch.deliveryTime} EXPRESS ETA
                        </span>
                        <h3 className="font-extrabold text-lg text-[#17251F] mt-2">
                          {branch.name}
                        </h3>
                      </div>
                      {isCurrent && (
                        <span className="text-xs bg-[#21A366] text-white font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs text-[#64736B] pt-2 border-t border-[#E5ECE7]/60">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                        <span className="text-[#17251F] font-medium">{branch.address}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#21A366] shrink-0" />
                        <span>{branch.hours}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#21A366] shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-[#21A366] font-semibold">
                          {branch.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#21A366] shrink-0" />
                        <span>Branch Manager: <strong className="text-[#17251F]">{branch.manager}</strong></span>
                      </div>
                    </div>

                    {/* Features Chips */}
                    <div className="pt-4 mt-4 border-t border-[#E5ECE7]/60">
                      <p className="text-[10px] font-bold text-[#64736B] uppercase tracking-wider mb-2">
                        Hub Capabilities
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {branch.features.map((feat) => (
                          <span
                            key={feat}
                            className="text-[11px] bg-[#F7F9F5] border border-[#E5ECE7] text-[#17251F] font-medium px-2 py-1 rounded-lg"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-4 border-t border-[#E5ECE7]/60">
                    <button
                      type="button"
                      onClick={() => handleSelectBranch(branch)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-[#D8F3DC] text-[#123C2D]'
                          : 'bg-[#21A366] hover:bg-[#123C2D] text-white shadow-xs'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Currently Selected Hub</span>
                        </>
                      ) : (
                        <span>Set as My Fulfillment Store</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Coverage Map Information */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#21A366] bg-[#D8F3DC] px-3 py-1 rounded-full">
                UNBROKEN COLD CHAIN
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#17251F]">
                Guaranteed Sub-4°C Transit for Meat, Fish & Dairy
              </h3>
              <p className="text-xs sm:text-sm text-[#64736B] max-w-xl">
                Every delivery motorcycle and van is outfitted with calibrated thermal insulation compartments to guarantee peak nutritional value from our farm shelves to your kitchen.
              </p>
            </div>
            <div className="flex items-center gap-6 text-center shrink-0">
              <div className="p-4 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7]">
                <p className="text-2xl font-black text-[#123C2D]">25 Mins</p>
                <p className="text-xs text-[#64736B]">Average Delivery</p>
              </div>
              <div className="p-4 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7]">
                <p className="text-2xl font-black text-[#21A366]">100%</p>
                <p className="text-xs text-[#64736B]">Freshness Guarantee</p>
              </div>
            </div>
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
