'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, Eye, Plus, Minus, Check, ShoppingBag, Star } from 'lucide-react';
import { ProductItem } from '../data/catalog';
import { useCart } from '../context/cart-context';
import { Badge } from '@ecobazar/ui';

interface ProductCardProps {
  product: ProductItem;
  className?: string;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  compact = false,
}) => {
  const {
    addToCart,
    updateQuantity,
    cartItems,
    wishlistMap,
    toggleWishlist,
    setSelectedProductForModal,
    addedFeedback,
  } = useCart();

  const isWishlisted = !!wishlistMap[product.id];
  const isJustAdded = !!addedFeedback[product.id];

  const cartEntry = cartItems.find((item) => item.product.id === product.id);
  const cartQuantity = cartEntry ? cartEntry.quantity : 0;

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-[#E5ECE7] hover:border-[#21A366]/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden ${className}`}
    >
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span
              className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm ${
                product.badgeColor === 'red' || product.badge.includes('OFF')
                  ? 'bg-rose-500 text-white'
                  : product.badgeColor === 'orange'
                  ? 'bg-[#F4A340] text-white'
                  : 'bg-[#21A366] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => toggleWishlist(product, e)}
            aria-label="Save to wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-500 shadow-sm'
                : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-rose-500 hover:bg-white shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            aria-label="Quick view"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-[#21A366] hover:bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Image Area */}
      <div
        className="relative w-full pt-[75%] bg-[#F7F9F5] cursor-pointer overflow-hidden"
        onClick={() => setSelectedProductForModal(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-amber-500/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
            Only {product.stock} left!
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-xs text-[#64736B] mb-1">
            <span className="truncate max-w-[140px] font-medium">{product.subcategory || product.category}</span>
            <span className="text-[11px] bg-[#E5ECE7]/60 px-1.5 py-0.5 rounded text-[#17251F]/70">
              {product.unit}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProductForModal(product)}
            className="font-bold text-[#17251F] text-sm md:text-base leading-snug line-clamp-2 hover:text-[#21A366] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Bengali Name */}
          {product.nameBn && (
            <p className="text-xs text-[#64736B] font-medium mt-0.5 line-clamp-1">
              {product.nameBn}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-[#17251F]">{product.rating}</span>
            <span className="text-[11px] text-[#64736B]">({product.reviews})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#E5ECE7]/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#123C2D]">৳{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#64736B] block">Fresh stock</span>
          </div>

          {/* Action / Stepper */}
          <div>
            {cartQuantity > 0 ? (
              <div className="flex items-center bg-[#D8F3DC] border border-[#21A366]/30 rounded-xl overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, -1);
                  }}
                  className="w-7 h-8 flex items-center justify-center text-[#123C2D] hover:bg-[#21A366] hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-[#123C2D]">
                  {cartQuantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, 1);
                  }}
                  className="w-7 h-8 flex items-center justify-center text-[#123C2D] hover:bg-[#21A366] hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => addToCart(product, e)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${
                  isJustAdded
                    ? 'bg-[#2EBD70] text-white scale-95'
                    : 'bg-[#21A366] text-white hover:bg-[#123C2D] active:scale-95'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
