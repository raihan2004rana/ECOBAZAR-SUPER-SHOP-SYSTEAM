'use client';

import * as React from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@ecobazar/ui';
import { useCart } from '../context/cart-context';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartItems,
    totalCartCount,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    cartGrandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    setIsCheckoutModalOpen,
  } = useCart();

  const [couponInput, setCouponInput] = React.useState('');
  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  return (
    <Drawer
      open={isCartDrawerOpen}
      onOpenChange={setIsCartDrawerOpen}
      position="right"
      size="md"
    >
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="p-4 border-b border-[#E5ECE7] flex items-center justify-between bg-[#F7F9F5]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#21A366]/10 text-[#21A366] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#17251F] text-lg">My Shopping Cart</h2>
              <p className="text-xs text-[#64736B]">{totalCartCount} fresh items added</p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Free Delivery Goal Tracker */}
        <div className="px-4 py-2.5 bg-[#D8F3DC]/40 border-b border-[#D8F3DC] text-xs">
          {remainingForFreeShipping === 0 || appliedCoupon === 'FREESHIP' ? (
            <div className="flex items-center gap-1.5 text-[#123C2D] font-bold">
              <Sparkles className="w-4 h-4 text-[#21A366]" />
              <span>Congratulations! You unlocked FREE Delivery across Dhaka.</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between font-semibold text-[#17251F] mb-1">
                <span>Add ৳{remainingForFreeShipping} more for FREE Delivery!</span>
                <span className="text-[#21A366] font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E5ECE7] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#21A366] h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 rounded-full bg-[#F7F9F5] border border-[#E5ECE7] flex items-center justify-center mx-auto mb-4 text-gray-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-[#17251F] text-base mb-1">Your cart is currently empty</h3>
              <p className="text-xs text-[#64736B] mb-6 max-w-xs mx-auto">
                Explore our fresh daily harvest, groceries, fish, meat, and organic kitchen staples.
              </p>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="inline-flex items-center gap-2 bg-[#21A366] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#123C2D] transition-colors"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
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
                    <span className="text-sm font-black text-[#123C2D]">৳{product.price * quantity}</span>
                    <span className="text-[10px] text-[#64736B]">(৳{product.price} each)</span>
                  </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center bg-[#F7F9F5] border border-[#E5ECE7] rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-6 h-7 flex items-center justify-center text-gray-600 hover:bg-[#E5ECE7] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#17251F]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-6 h-7 flex items-center justify-center text-gray-600 hover:bg-[#E5ECE7] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout if items present */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-[#E5ECE7] bg-[#F7F9F5] space-y-3">
            {/* Voucher input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Voucher code (ECO10 or FREESHIP)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] bg-white font-medium uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#123C2D] text-white text-xs font-bold rounded-xl hover:bg-[#21A366] transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between bg-[#D8F3DC] text-[#123C2D] px-3 py-1.5 rounded-lg text-xs font-semibold">
                <span>Coupon Applied: {appliedCoupon}</span>
                <span className="text-[#21A366] font-bold">ACTIVE</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#64736B] pt-2 border-t border-[#E5ECE7]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#17251F]">৳{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount (10%):</span>
                  <span>- ৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Delivery Fee:</span>
                <span className="font-semibold text-[#17251F]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#21A366] font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `৳${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#123C2D] pt-2 border-t border-[#E5ECE7]">
                <span>Grand Total:</span>
                <span>৳{cartGrandTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#21A366] hover:bg-[#123C2D] text-white py-3 rounded-xl font-extrabold text-sm shadow-md transition-all active:scale-[0.99]"
            >
              <span>Proceed to Checkout (৳{cartGrandTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
