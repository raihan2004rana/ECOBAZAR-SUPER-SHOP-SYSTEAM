'use client';

import * as React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Button,
  useToast,
} from '@ecobazar/ui';
import { useCart } from '../context/cart-context';
import { storeBranches, StoreBranch } from '../data/catalog';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  ArrowRight,
  Sparkles,
  CreditCard,
  Building2,
} from 'lucide-react';

export const Modals: React.FC = () => {
  const { toast } = useToast();
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    isBranchModalOpen,
    setIsBranchModalOpen,
    selectedBranch,
    setSelectedBranch,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cartItems,
    cartGrandTotal,
    deliveryFee,
    cartSubtotal,
    discountAmount,
    handlePlaceOrder,
  } = useCart();

  // Modal local state
  const [modalQty, setModalQty] = React.useState(1);
  React.useEffect(() => {
    setModalQty(1);
  }, [selectedProductForModal]);

  // Auth local state
  const [authStep, setAuthStep] = React.useState<'phone' | 'otp'>('phone');
  const [phoneInput, setPhoneInput] = React.useState('');
  const [otpInput, setOtpInput] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Tracking local state
  const [trackingId, setTrackingId] = React.useState('ORD-202611-992');
  const [trackedOrder, setTrackedOrder] = React.useState<any>({
    id: 'ORD-202611-992',
    date: 'Today, 11:20 AM',
    status: 'Out for Delivery',
    step: 3,
    riderName: 'Shakil Hossain',
    riderPhone: '+880 1700-112233',
    eta: '18 mins',
    branch: 'Dhanmondi Flagship Store #01',
    address: 'House 42, Road 27, Dhanmondi, Dhaka',
  });

  // Checkout local state
  const [customerName, setCustomerName] = React.useState('Raihan Ahmed');
  const [customerPhone, setCustomerPhone] = React.useState('+880 1712-345678');
  const [deliveryAddress, setDeliveryAddress] = React.useState('Flat 4B, House 12, Road 7/A, Dhanmondi');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = React.useState('Express (25-30 Mins)');
  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'bkash' | 'card'>('cod');
  const [isSubmittingOrder, setIsSubmittingOrder] = React.useState(false);

  // Auth Handlers
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length < 10) {
      toast.error('Invalid Phone', 'Please enter a valid 11-digit Bangladesh phone number.');
      return;
    }
    setAuthStep('otp');
    toast.info('OTP Sent', `Verification code sent to ${phoneInput} (Demo code: 1234)`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === '1234' || otpInput.length === 4) {
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setAuthStep('phone');
      setOtpInput('');
      toast.success('Welcome Back!', 'Logged in as Raihan Ahmed (Premium Member).');
    } else {
      toast.error('Invalid Code', 'Please enter demo code "1234".');
    }
  };

  // Tracking Search
  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    toast.success('Order Located', `Found details for order #${trackingId.toUpperCase()}`);
    setTrackedOrder({
      id: trackingId.toUpperCase(),
      date: 'Today, 10:45 AM',
      status: 'Out for Delivery',
      step: 3,
      riderName: 'Farhan Shakil',
      riderPhone: '+880 1711-998877',
      eta: '22 mins',
      branch: selectedBranch.name,
      address: 'House 14, Road 5, Dhaka',
    });
  };

  // Checkout Submit
  const onConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);
    setTimeout(() => {
      const orderId = handlePlaceOrder();
      setIsSubmittingOrder(false);
      setTrackingId(orderId);
    }, 800);
  };

  return (
    <>
      {/* 1. PRODUCT DETAIL QUICK-VIEW MODAL */}
      <Dialog
        open={!!selectedProductForModal}
        onOpenChange={(open) => !open && setSelectedProductForModal(null)}
        size="lg"
      >
        {selectedProductForModal && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Product Image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#F7F9F5] border border-[#E5ECE7]">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="w-full h-80 object-cover"
                />
                {selectedProductForModal.badge && (
                  <span className="absolute top-3 left-3 bg-[#21A366] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {selectedProductForModal.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#64736B] mb-1">
                    <span className="font-semibold text-[#21A366]">
                      {selectedProductForModal.category}
                    </span>
                    <span className="bg-[#E5ECE7] px-2 py-0.5 rounded text-[#17251F]">
                      {selectedProductForModal.origin}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-[#17251F] leading-tight mb-1">
                    {selectedProductForModal.name}
                  </h2>
                  {selectedProductForModal.nameBn && (
                    <p className="text-sm font-semibold text-[#64736B] mb-3">
                      {selectedProductForModal.nameBn}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <span className="text-sm font-bold text-[#17251F]">
                      {selectedProductForModal.rating}
                    </span>
                    <span className="text-xs text-[#64736B]">
                      ({selectedProductForModal.reviews} verified reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4 p-3 bg-[#F7F9F5] rounded-xl border border-[#E5ECE7]">
                    <span className="text-2xl font-black text-[#123C2D]">
                      ৳{selectedProductForModal.price}
                    </span>
                    {selectedProductForModal.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ৳{selectedProductForModal.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-[#64736B] ml-auto font-medium">
                      Unit: {selectedProductForModal.unit}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#64736B] leading-relaxed mb-4">
                    {selectedProductForModal.description}
                  </p>

                  {/* Specifications Table */}
                  <div className="bg-[#F7F9F5] rounded-xl p-3 text-xs mb-4 space-y-1">
                    <h4 className="font-bold text-[#17251F] text-[11px] uppercase tracking-wider mb-1">
                      Product Highlights
                    </h4>
                    {Object.entries(selectedProductForModal.specifications || {}).map(
                      ([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-[#E5ECE7]/60 pb-1">
                          <span className="text-[#64736B]">{key}:</span>
                          <span className="font-semibold text-[#17251F]">{val}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5ECE7]">
                  <div className="flex items-center bg-[#F7F9F5] border border-[#E5ECE7] rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-10 flex items-center justify-center text-gray-600 hover:bg-[#E5ECE7]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-[#17251F]">{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => Math.min(selectedProductForModal.stock, q + 1))}
                      className="w-9 h-10 flex items-center justify-center text-gray-600 hover:bg-[#E5ECE7]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      for (let i = 0; i < modalQty; i++) {
                        addToCart(selectedProductForModal);
                      }
                      setSelectedProductForModal(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#21A366] hover:bg-[#123C2D] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {modalQty} to Cart (৳{selectedProductForModal.price * modalQty})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* 2. BRANCH SELECTOR MODAL */}
      <Dialog
        open={isBranchModalOpen}
        onOpenChange={setIsBranchModalOpen}
        size="md"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#21A366]/10 text-[#21A366] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#17251F]">Select Delivery Branch Hub</h2>
              <p className="text-xs text-[#64736B]">
                Orders are freshly dispatched from your nearest temperature-controlled hub.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {storeBranches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranch(branch);
                    toast.success('Branch Changed', `Switched to ${branch.name} (${branch.deliveryTime} ETA)`);
                    setIsBranchModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#21A366] bg-[#D8F3DC]/30 shadow-xs'
                      : 'border-[#E5ECE7] hover:border-[#21A366]/40 hover:bg-[#F7F9F5]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-extrabold text-sm text-[#17251F]">{branch.name}</h4>
                    <span className="text-[11px] font-bold text-[#21A366] bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                      {branch.deliveryTime}
                    </span>
                  </div>
                  <p className="text-xs text-[#64736B] mb-2">{branch.address}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] bg-white border border-[#E5ECE7] text-[#17251F] px-2 py-0.5 rounded-md"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsBranchModalOpen(false)}
            className="w-full bg-[#123C2D] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#21A366] transition-colors"
          >
            Confirm Store Selection
          </button>
        </div>
      </Dialog>

      {/* 3. TRACK ORDER MODAL */}
      <Dialog
        open={isTrackingModalOpen}
        onOpenChange={setIsTrackingModalOpen}
        size="md"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#21A366]/10 text-[#21A366] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#17251F]">Live Order Tracking</h2>
              <p className="text-xs text-[#64736B]">
                Track your chilled grocery shipment in real-time from hub to door.
              </p>
            </div>
          </div>

          {/* Search box */}
          <form onSubmit={handleTrackSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-202611-992)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] uppercase font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#21A366] text-white font-bold text-xs rounded-xl hover:bg-[#123C2D] transition-colors"
            >
              Track
            </button>
          </form>

          {/* Active order card */}
          {trackedOrder && (
            <div className="bg-[#F7F9F5] border border-[#E5ECE7] rounded-xl p-4 space-y-4">
              <div className="flex justify-between items-start border-b border-[#E5ECE7] pb-3">
                <div>
                  <span className="text-[11px] font-bold text-[#21A366] uppercase tracking-wider block">
                    Active Delivery
                  </span>
                  <h3 className="font-extrabold text-sm text-[#17251F]">{trackedOrder.id}</h3>
                  <span className="text-[11px] text-[#64736B]">{trackedOrder.branch}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-[#D8F3DC] text-[#123C2D] font-extrabold px-2.5 py-1 rounded-full inline-block">
                    ETA: {trackedOrder.eta}
                  </span>
                  <span className="text-[11px] text-[#64736B] block mt-1">{trackedOrder.date}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3 pt-1">
                {[
                  { step: 1, title: 'Order Confirmed', time: '11:00 AM', done: true },
                  { step: 2, title: 'Cold-Chain Packed & Quality Checked', time: '11:12 AM', done: true },
                  { step: 3, title: 'Rider on the Way (Express)', time: '11:25 AM', done: true, current: true },
                  { step: 4, title: 'Delivered to Doorstep', time: '~11:45 AM', done: false },
                ].map((m) => (
                  <div key={m.step} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        m.done
                          ? 'bg-[#21A366] text-white'
                          : 'bg-[#E5ECE7] text-[#64736B]'
                      }`}
                    >
                      {m.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : m.step}
                    </div>
                    <div className="flex-1 flex justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          m.current ? 'text-[#21A366] font-bold' : m.done ? 'text-[#17251F]' : 'text-gray-400'
                        }`}
                      >
                        {m.title}
                      </span>
                      <span className="text-[11px] text-gray-400">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rider Contact */}
              <div className="bg-white p-3 rounded-lg border border-[#E5ECE7] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#17251F]">{trackedOrder.riderName}</p>
                  <p className="text-[11px] text-[#64736B]">Express Delivery Partner</p>
                </div>
                <a
                  href={`tel:${trackedOrder.riderPhone}`}
                  className="flex items-center gap-1.5 bg-[#D8F3DC] text-[#123C2D] font-bold px-3 py-1.5 rounded-lg hover:bg-[#21A366] hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      {/* 4. LOGIN / OTP MODAL */}
      <Dialog
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        size="sm"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-[#17251F]">
              {authStep === 'phone' ? 'Welcome to ECOBAZAR' : 'Verify Mobile OTP'}
            </h2>
            <p className="text-xs text-[#64736B] mt-1">
              {authStep === 'phone'
                ? 'Sign in or create account with your mobile number'
                : `Enter the 4-digit code sent to ${phoneInput}`}
            </p>
          </div>

          {authStep === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">
                  Mobile Number (Bangladesh)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-[#E5ECE7] text-xs font-bold text-[#17251F] rounded-l-xl border border-r-0 border-[#E5ECE7]">
                    +880
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="1712345678"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-xs rounded-r-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">
                  4-Digit OTP Code (Use: 1234)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1 2 3 4"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-black py-2.5 rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setAuthStep('phone')}
                className="w-full text-center text-xs text-[#64736B] hover:text-[#17251F] font-medium"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </Dialog>

      {/* 5. CHECKOUT MODAL */}
      <Dialog
        open={isCheckoutModalOpen}
        onOpenChange={setIsCheckoutModalOpen}
        size="lg"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#21A366]/10 text-[#21A366] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#17251F]">Complete Your Order</h2>
              <p className="text-xs text-[#64736B]">
                Delivering from <span className="font-semibold text-[#21A366]">{selectedBranch.name}</span>
              </p>
            </div>
          </div>

          <form onSubmit={onConfirmCheckout} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#17251F] block mb-1">Delivery Street Address</label>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Flat / House / Road / Area in Dhaka"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">Delivery Slot</label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] bg-white font-medium"
                >
                  <option value="Express (25-30 Mins)">Express Delivery (25-30 Mins)</option>
                  <option value="Today Evening (5:00 PM - 7:00 PM)">Today Evening (5:00 PM - 7:00 PM)</option>
                  <option value="Tomorrow Morning (8:00 AM - 10:00 AM)">Tomorrow Morning (8:00 AM - 10:00 AM)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Del.' },
                    { id: 'bkash', label: 'bKash / Nagad' },
                    { id: 'card', label: 'Visa / Card' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all ${
                        paymentMethod === pm.id
                          ? 'border-[#21A366] bg-[#D8F3DC] text-[#123C2D]'
                          : 'border-[#E5ECE7] text-[#64736B] hover:bg-gray-50'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-[#F7F9F5] p-3.5 rounded-xl border border-[#E5ECE7] space-y-1.5 text-xs text-[#64736B]">
              <div className="flex justify-between">
                <span>Items Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold text-[#17251F]">৳{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>- ৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Delivery Fee:</span>
                <span className="font-semibold text-[#17251F]">
                  {deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#123C2D] pt-2 border-t border-[#E5ECE7]">
                <span>Total Amount Due:</span>
                <span>৳{cartGrandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingOrder}
              className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-3.5 rounded-xl font-black text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmittingOrder ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (৳{cartGrandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};
