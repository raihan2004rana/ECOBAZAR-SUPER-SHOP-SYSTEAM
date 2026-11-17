'use client';

import * as React from 'react';
import { Drawer } from '@ecobazar/ui';
import { useCart } from '../context/cart-context';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    wishlistProducts,
    toggleWishlist,
    addToCart,
  } = useCart();

  return (
    <Drawer
      open={isWishlistDrawerOpen}
      onOpenChange={setIsWishlistDrawerOpen}
      position="right"
      size="md"
    >
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="p-4 border-b border-[#E5ECE7] flex items-center justify-between bg-[#F7F9F5]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#17251F] text-lg">My Saved Items</h2>
              <p className="text-xs text-[#64736B]">{wishlistProducts.length} items bookmarked</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 rounded-full bg-[#F7F9F5] border border-[#E5ECE7] flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-[#17251F] text-base mb-1">No saved items yet</h3>
              <p className="text-xs text-[#64736B] mb-6 max-w-xs mx-auto">
                Click the heart icon on any fresh produce or grocery item to save it for quick reordering.
              </p>
              <button
                type="button"
                onClick={() => setIsWishlistDrawerOpen(false)}
                className="inline-flex items-center gap-2 bg-[#21A366] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#123C2D] transition-colors"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5ECE7] hover:border-[#21A366]/30 transition-all shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#F7F9F5] border border-[#E5ECE7]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#17251F] truncate leading-tight">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#64736B] mt-0.5">{product.unit}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-[#123C2D]">৳{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Move to Cart */}
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-1 bg-[#21A366] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#123C2D] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={(e) => toggleWishlist(product, e)}
                  className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
};
