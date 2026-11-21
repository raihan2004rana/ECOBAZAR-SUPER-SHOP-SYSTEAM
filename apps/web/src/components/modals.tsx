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
  CreditCard,
  Building2,
  Copy,
  Check,
  User,
  Mail,
  Banknote,
} from 'lucide-react';

const BkashLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="14" fill="#E2136E" />
    <path
      d="M32 13L46 30H36L44 46L24 33L17 38L21 27L13 24L32 13Z"
      fill="#FFFFFF"
    />
  </svg>
);

const NagadLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="14" fill="#F7941D" />
    <circle cx="32" cy="32" r="18" fill="#ED1C24" />
    <path
      d="M26 38C26 30 38 30 38 22C38 17 33 16 29 19"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="4.5" fill="#FFFFFF" />
  </svg>
);

const CardLogo: React.FC = () => (
  <div className="flex items-center gap-1 shrink-0">
    <span className="bg-[#1A1F71] text-white font-black text-[9px] tracking-wider px-1.5 py-0.5 rounded shadow-2xs italic font-serif">
      VISA
    </span>
    <div className="flex -space-x-1.5 items-center">
      <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block shadow-2xs" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/95 inline-block shadow-2xs" />
    </div>
  </div>
);

const CodLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <div className={`${className} rounded-xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center font-bold shrink-0`}>
    <Banknote className="w-4 h-4" />
  </div>
);

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
  const [customerPhone, setCustomerPhone] = React.useState('1712-345678');
  const [customerEmail, setCustomerEmail] = React.useState('raihan2004rana@gmail.com');
  const [deliveryAddress, setDeliveryAddress] = React.useState('Flat 4B, House 12, Road 7/A, Dhanmondi');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = React.useState('Express Delivery (25-30 Mins)');
  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [isSubmittingOrder, setIsSubmittingOrder] = React.useState(false);
  const [checkoutStep, setCheckoutStep] = React.useState<'form' | 'success'>('form');
  const [placedOrderInfo, setPlacedOrderInfo] = React.useState<any>(null);
  const [copiedId, setCopiedId] = React.useState(false);

  const handleCopyTrackingId = (id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      toast.info('Tracking ID Copied', `${id} copied to clipboard.`);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const getEstimatedDeliveryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 28);
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleOpenCheckoutChange = (open: boolean) => {
    setIsCheckoutModalOpen(open);
    if (!open) {
      setTimeout(() => {
        setCheckoutStep('form');
      }, 300);
    }
  };

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
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim() || !deliveryAddress.trim()) {
      toast.error('Missing Details', 'Please provide your name, phone number, email address, and delivery location.');
      return;
    }
    setIsSubmittingOrder(true);

    const itemsPayload = cartItems.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      nameBn: item.product.nameBn,
      price: item.product.price,
      quantity: item.quantity,
      unit: item.product.unit || '1 unit',
      total: item.product.price * item.quantity,
      image: item.product.image,
    }));

    setTimeout(async () => {
      const orderId = handlePlaceOrder();
      const etaTime = getEstimatedDeliveryTime();
      const placedAt = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

      // Persist order to backend and update live inventory & sales counter
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            customerName: customerName.trim(),
            customerEmail: customerEmail.trim(),
            customerPhone: `+880 ${customerPhone.trim()}`,
            deliveryAddress: deliveryAddress.trim(),
            deliveryTimeSlot,
            paymentMethod,
            subtotal: cartSubtotal,
            deliveryFee,
            discountAmount,
            grandTotal: cartGrandTotal,
            branch: selectedBranch.name,
            items: itemsPayload,
          }),
        });
      } catch (err) {
        console.error('Failed to persist order to backend:', err);
      }

      const snapshot = {
        orderId,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        deliveryTimeSlot,
        paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee,
        discountAmount,
        grandTotal: cartGrandTotal,
        itemsCount: cartItems.length,
        branch: selectedBranch.name,
        distance: '2.4 km',
        eta: selectedBranch.deliveryTime || '25-30 Mins',
        estimatedDeliveryTime: etaTime,
        riderName: 'Tanvir Ahmed',
        riderPhone: '+880 1812-998877',
        placedAt,
      };

      setPlacedOrderInfo(snapshot);
      setTrackingId(orderId);
      setTrackedOrder({
        id: orderId,
        date: `Today, ${placedAt}`,
        status: 'Rider on the Way',
        step: 3,
        riderName: 'Tanvir Ahmed',
        riderPhone: '+880 1812-998877',
        eta: selectedBranch.deliveryTime || '25-30 mins',
        branch: selectedBranch.name,
        address: deliveryAddress,
      });

      setIsSubmittingOrder(false);
      setCheckoutStep('success');

      if (paymentMethod === 'cod') {
        toast.success(
          'ক্যাশ অন ডেলিভারি নিশ্চিত হয়েছে!',
          `অর্ডার #${orderId} সফলভাবে গ্রহণ করা হয়েছে। পণ্য হাতে পেয়ে দেখে মূল্য দিন।`
        );
      } else {
        toast.success(
          'Order Placed Successfully! 🎉',
          `Order #${orderId} confirmed. Estimated delivery in ${selectedBranch.deliveryTime || '25-30 mins'}.`
        );
      }
    }, 700);
  };

  return (
    <>
      {/* 1. PRODUCT DETAIL QUICK-VIEW MODAL */}
      <Dialog
        open={!!selectedProductForModal}
        onOpenChange={(open) => !open && setSelectedProductForModal(null)}
        size="lg"
        className="bg-white text-neutral-900 border border-neutral-200 shadow-2xl"
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

                  <h2 className="text-xl font-black text-[#17251F] leading-tight mb-4">
                    {selectedProductForModal.name}
                  </h2>

                  {/* Rating (Only shown when explicitly enabled for a specific product) */}
                  {selectedProductForModal.showReviews && (
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
                  )}

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
                      addToCart(selectedProductForModal, undefined, modalQty);
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
        className="bg-white text-neutral-900 border border-neutral-200 shadow-2xl"
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
        className="bg-white text-neutral-900 border border-neutral-200 shadow-2xl"
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
        className="bg-white text-neutral-900 border border-neutral-200 shadow-2xl"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <User className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-neutral-900 tracking-tight">
              {authStep === 'phone' ? 'Welcome to ECOBAZAR' : 'Verify Mobile OTP'}
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto leading-relaxed">
              {authStep === 'phone'
                ? 'Sign in or create account with your mobile number for 1-click checkout'
                : `Enter the 4-digit verification code sent to ${phoneInput}`}
            </p>
          </div>

          {authStep === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                  Mobile Number (Bangladesh)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center gap-1.5 px-3 bg-neutral-100 text-xs font-bold text-neutral-800 rounded-l-xl border border-r-0 border-neutral-300 shrink-0">
                    <span>🇧🇩</span>
                    <span>+880</span>
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="1712-345678"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-xs rounded-r-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-medium transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 border-t border-neutral-100">
                <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-500 font-medium text-center">
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <p className="font-bold text-emerald-700">🚀 30-Min Fast</p>
                    <p>Express Delivery</p>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <p className="font-bold text-emerald-700">🥬 100% Organic</p>
                    <p>Formalin-Free Farm</p>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5 text-center">
                  Enter 4-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  autoFocus
                  placeholder="• • • •"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center tracking-[0.6em] text-2xl font-black py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-mono transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Verify & Continue</span>
                <Check className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setAuthStep('phone')}
                className="w-full text-center text-xs text-neutral-500 hover:text-emerald-700 font-medium py-1 cursor-pointer transition-colors"
              >
                ← Change Phone Number
              </button>
            </form>
          )}
        </div>
      </Dialog>

      {/* 5. CHECKOUT & ORDER SUCCESS / TRACKING MODAL */}
      <Dialog
        open={isCheckoutModalOpen}
        onOpenChange={handleOpenCheckoutChange}
        size="xl"
        className="bg-white text-neutral-900 border border-neutral-200 shadow-2xl"
      >
        <div className="max-h-[84vh] overflow-y-auto pr-1">
          {checkoutStep === 'form' ? (
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">Complete Your Order</h2>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                        অর্ডার সম্পন্ন করুন
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-neutral-700">⚡ Hub:</span>
                      <span className="font-extrabold text-emerald-700">{selectedBranch.name}</span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded text-[11px] shadow-2xs">
                        🚀 Express Delivery {selectedBranch.deliveryTime || '25-30 Mins'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onConfirmCheckout} className="mt-4 space-y-4">
                {/* Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-neutral-900 block mb-1.5">
                      Customer Full Name <span className="text-rose-500 font-black">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-900 block mb-1.5">
                      Contact Phone Number <span className="text-rose-500 font-black">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center gap-1 px-2.5 bg-neutral-100 text-xs font-bold text-neutral-800 rounded-l-xl border border-r-0 border-neutral-300 shrink-0">
                        <span>🇧🇩</span>
                        <span>+880</span>
                      </span>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="1712-345678"
                        className="flex-1 px-3 py-2.5 text-xs rounded-r-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address for Order Confirmation & Digital Invoice */}
                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1.5">
                    Email Address (অর্ডার রসিদ ও ইনভয়েস প্রাপ্তির জন্য) <span className="text-rose-500 font-black">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. raihan@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-[#21A366] font-semibold mt-1">
                    ✓ অর্ডারের পণ্যের তালিকা ও ডিজিটাল মেমো তাৎক্ষণিকভাবে এই ইমেইলে পাঠিয়ে দেওয়া হবে।
                  </p>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1.5">
                    Delivery Street Address <span className="text-rose-500 font-black">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 text-neutral-400 pointer-events-none">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Flat No, House No, Road No, Area / Landmark in Dhaka"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Delivery Slot */}
                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1.5">
                    Preferred Delivery Slot
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    >
                      <option value="Express Delivery (25-30 Mins)">🚀 Express Delivery (~25-30 Mins)</option>
                      <option value="Today Afternoon (2:00 PM - 5:00 PM)">Today Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Today Evening (6:00 PM - 9:00 PM)">Today Evening (6:00 PM - 9:00 PM)</option>
                      <option value="Tomorrow Morning (8:00 AM - 11:00 AM)">Tomorrow Morning (8:00 AM - 11:00 AM)</option>
                    </select>
                  </div>
                </div>

                {/* PAYMENT METHODS SECTION WITH LOGOS */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Select Payment Method (পেমেন্ট পদ্ধতি)</span>
                    </label>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      100% Secure Checkout
                    </span>
                  </div>

                  {/* 4 Responsive Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* 1. Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/30'
                          : 'border-neutral-200 bg-white hover:border-emerald-500 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CodLogo className="w-8 h-8" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            paymentMethod === 'cod'
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {paymentMethod === 'cod' && '✓'}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-xs text-neutral-900 mt-1.5">Cash on Del.</p>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">হাতে পেয়ে দিন</p>
                      </div>
                      <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-1 self-start">
                        Pay on Arrival
                      </span>
                    </button>

                    {/* 2. bKash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] cursor-pointer ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E2136E] bg-pink-50/70 shadow-sm ring-2 ring-[#E2136E]/30'
                          : 'border-neutral-200 bg-white hover:border-[#E2136E]/40 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <BkashLogo className="w-8 h-8" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            paymentMethod === 'bkash'
                              ? 'border-[#E2136E] bg-[#E2136E] text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {paymentMethod === 'bkash' && '✓'}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-xs text-neutral-900 mt-1.5">bKash</p>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">বিকাশ পেমেন্ট</p>
                      </div>
                      <span className="text-[9px] font-black uppercase text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded mt-1 self-start">
                        0% Fee Instant
                      </span>
                    </button>

                    {/* 3. Nagad */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] cursor-pointer ${
                        paymentMethod === 'nagad'
                          ? 'border-[#F7941D] bg-orange-50/70 shadow-sm ring-2 ring-[#F7941D]/30'
                          : 'border-neutral-200 bg-white hover:border-[#F7941D]/40 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <NagadLogo className="w-8 h-8" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            paymentMethod === 'nagad'
                              ? 'border-[#F7941D] bg-[#F7941D] text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {paymentMethod === 'nagad' && '✓'}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-xs text-neutral-900 mt-1.5">Nagad</p>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">নগদ ওয়ালেট</p>
                      </div>
                      <span className="text-[9px] font-black uppercase text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded mt-1 self-start">
                        0% Extra Fee
                      </span>
                    </button>

                    {/* 4. Visa / Mastercard / Cards */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#1A1F71] bg-blue-50/70 shadow-sm ring-2 ring-[#1A1F71]/30'
                          : 'border-neutral-200 bg-white hover:border-[#1A1F71]/40 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CardLogo />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            paymentMethod === 'card'
                              ? 'border-[#1A1F71] bg-[#1A1F71] text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {paymentMethod === 'card' && '✓'}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-xs text-neutral-900 mt-1.5">Visa / Cards</p>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">কার্ড পেমেন্ট</p>
                      </div>
                      <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded mt-1 self-start">
                        256-Bit SSL
                      </span>
                    </button>
                  </div>

                  {/* Dynamic Explanatory Banner for Selected Method */}
                  <div className="mt-3">
                    {paymentMethod === 'cod' && (
                      <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5">
                        <span className="text-base shrink-0 mt-0.5">💵</span>
                        <div className="leading-relaxed">
                          <strong className="font-bold text-emerald-900">Cash on Delivery (ক্যাশ অন ডেলিভারি):</strong>{' '}
                          পণ্য আপনার দরজায় পৌঁছালে ভালো করে দেখে ডেলিভারি রাইডারকে ক্যাশে অথবা রাইডারের বিকাশ/নগদ কিউআর কোডে টাকা দিতে পারবেন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bkash' && (
                      <div className="bg-pink-50 border border-pink-200/80 rounded-xl p-3 text-xs text-pink-950 flex items-start gap-2.5">
                        <span className="text-base shrink-0 mt-0.5">📱</span>
                        <div className="leading-relaxed">
                          <strong className="font-bold text-pink-900">bKash Direct Checkout (বিকাশ পেমেন্ট):</strong>{' '}
                          বিকাশ নিরাপদ পেমেন্ট গেটওয়ের মাধ্যমে সরাসরি আপনার একাউন্ট থেকে পেমেন্ট সম্পন্ন করতে পারবেন। ০% অতিরিক্ত চার্জ, সম্পূর্ণ সুরক্ষিত ও ইন্সট্যান্ট কনফার্মেশন।
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'nagad' && (
                      <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-3 text-xs text-orange-950 flex items-start gap-2.5">
                        <span className="text-base shrink-0 mt-0.5">🔥</span>
                        <div className="leading-relaxed">
                          <strong className="font-bold text-orange-900">Nagad Instant Pay (নগদ পেমেন্ট):</strong>{' '}
                          আপনার নগদ ওয়ালেট থেকে সহজে ও দ্রুত পেমেন্ট করুন। শূন্য শতাংশ ফি, কোনো হিডেন চার্জ নেই।
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-950 flex items-start gap-2.5">
                        <span className="text-base shrink-0 mt-0.5">💳</span>
                        <div className="leading-relaxed">
                          <strong className="font-bold text-blue-900">Visa / Mastercard / Amex / NexusPay:</strong>{' '}
                          SSLCommerz 256-bit ব্যাংকিং সিকিউরিটি এনক্রিপ্টেশনের মাধ্যমে যেকোনো ব্যাংক কার্ড দিয়ে নিশ্চিন্তে নিরাপদ পেমেন্ট করুন।
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bill Summary */}
                <div className="bg-neutral-50/90 p-4 rounded-2xl border border-neutral-200 space-y-2 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({cartItems.length} items):</span>
                    <span className="font-bold text-neutral-900">৳{cartSubtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount:</span>
                      <span>- ৳{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery Fee:</span>
                    <span className="font-bold text-neutral-900">
                      {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `৳${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-neutral-900 pt-2.5 border-t border-neutral-200">
                    <span>Total Amount Due:</span>
                    <span className="text-lg text-emerald-700 font-black">৳{cartGrandTotal}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingOrder || cartItems.length === 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmittingOrder ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order (৳{cartGrandTotal})</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: ORDER PLACED SUCCESSFULLY & LIVE TRACKING DASHBOARD */
            placedOrderInfo && (
              <div className="space-y-4 pt-1">
                {/* Celebratory Icon & Heading */}
                <div className="text-center pt-1">
                  <div className="w-16 h-16 rounded-full bg-[#D8F3DC] text-[#21A366] flex items-center justify-center mx-auto mb-3 shadow-inner animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight">
                    🎉 Order Placed Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#21A366] font-extrabold mt-1">
                    ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে এবং প্রসেসিং শুরু হয়েছে
                  </p>
                </div>

                {/* SPECIAL CASH ON DELIVERY (OR OTHER PAYMENT) MESSAGE */}
                {placedOrderInfo.paymentMethod === 'cod' ? (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#21A366] text-white flex items-center justify-center shrink-0 shadow-sm text-lg font-bold">
                      💵
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-emerald-950 text-sm">
                          ক্যাশ অন ডেলিভারি নিশ্চিত হয়েছে! (Cash on Delivery)
                        </span>
                        <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          COD Active
                        </span>
                      </div>
                      <p className="text-emerald-900 leading-relaxed font-medium">
                        আমাদের এক্সপ্রেস ডেলিভারি রাইডার আপনার দরজায় পৌঁছালে পণ্যগুলো ভালো করে দেখে নিন এবং মোট{' '}
                        <strong className="font-black text-emerald-950 text-sm underline underline-offset-2">
                          ৳{placedOrderInfo.grandTotal}
                        </strong>{' '}
                        টাকা ক্যাশ অথবা রাইডারের কাছে থাকা কিউআর কোডে পরিশোধ করুন। কোনো অগ্রিম ফি দিতে হবে না।
                      </p>
                    </div>
                  </div>
                ) : placedOrderInfo.paymentMethod === 'bkash' ? (
                  <div className="bg-pink-50 border-2 border-pink-300 rounded-2xl p-4 text-xs text-pink-950 flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#E2136E] text-white flex items-center justify-center shrink-0 shadow-sm text-lg font-bold">
                      📱
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-pink-950 text-sm">
                          bKash পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে!
                        </span>
                        <span className="bg-pink-200 text-pink-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          Paid ৳{placedOrderInfo.grandTotal}
                        </span>
                      </div>
                      <p className="text-pink-900 leading-relaxed font-medium">
                        আপনার বিকাশ একাউন্ট থেকে মোট ৳{placedOrderInfo.grandTotal} পেমেন্ট ভেরিফাইড হয়েছে। ডেলিভারির সময় অতিরিক্ত কোনো ফি দিতে হবে না।
                      </p>
                    </div>
                  </div>
                ) : placedOrderInfo.paymentMethod === 'nagad' ? (
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 text-xs text-orange-950 flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#F7941D] text-white flex items-center justify-center shrink-0 shadow-sm text-lg font-bold">
                      🔥
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-orange-950 text-sm">
                          Nagad পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!
                        </span>
                        <span className="bg-orange-200 text-orange-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          Paid ৳{placedOrderInfo.grandTotal}
                        </span>
                      </div>
                      <p className="text-orange-900 leading-relaxed font-medium">
                        আপনার নগদ ওয়ালেট থেকে মোট ৳{placedOrderInfo.grandTotal} সফলভাবে গ্রহণ করা হয়েছে। ডেলিভারিম্যান সরাসরি আপনার দরজায় পণ্য পৌঁছে দিবে।
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-xs text-blue-950 flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#1A1F71] text-white flex items-center justify-center shrink-0 shadow-sm text-lg font-bold">
                      💳
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-blue-950 text-sm">
                          Card পেমেন্ট নিশ্চিত হয়েছে!
                        </span>
                        <span className="bg-blue-200 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          256-Bit SSL
                        </span>
                      </div>
                      <p className="text-blue-900 leading-relaxed font-medium">
                        256-bit সুরক্ষিত ব্যাংকিং চ্যানেলের মাধ্যমে ৳{placedOrderInfo.grandTotal} পেমেন্ট নিশ্চিত করা হয়েছে। ডেলিভারির সময় কোনো পেমেন্ট ঝামেলা নেই।
                      </p>
                    </div>
                  </div>
                )}

                {/* TRACKING ID CARD WITH 1-CLICK COPY */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-[#21A366] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                  <div className="text-center sm:text-left">
                    <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wider block">
                      আপনার অর্ডার ট্র্যাকিং আইডি (Order Tracking ID)
                    </span>
                    <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#123C2D] tracking-wider">
                        {placedOrderInfo.orderId}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#D8F3DC] text-[#123C2D] text-[10px] font-black px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] animate-ping" />
                        Live Active
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64736B] mt-0.5">
                      এই ট্র্যাকিং আইডি দিয়ে যেকোনো সময় পণ্যের লাইভ অবস্থান দেখতে পারবেন।
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyTrackingId(placedOrderInfo.orderId)}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2.5 rounded-xl text-xs font-black border border-neutral-300 transition-all active:scale-95 shrink-0 cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-4 h-4 text-[#21A366]" />
                        <span className="text-[#21A366]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LIVE ETA & DISTANCE DASHBOARD */}
                <div className="bg-[#071F15] text-white rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                  {/* Status & ETA Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-emerald-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Status: Express Delivery On the Way
                      </span>
                      <h4 className="font-black text-base text-white mt-0.5">
                        আনুমানিক পৌঁছানোর সময় (Estimated Delivery)
                      </h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-block bg-[#2EBD70] text-[#071F15] font-black text-sm px-3 py-1 rounded-full shadow-md">
                        ~{placedOrderInfo.eta || '25-30 Mins'} (আজ {placedOrderInfo.estimatedDeliveryTime} এর মধ্যে)
                      </span>
                    </div>
                  </div>

                  {/* Hub & Rider Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-white/60 text-[10px] block">পণ্য এখন কোথায় আছে (Current Location)</span>
                        <span className="font-extrabold text-white text-xs">{placedOrderInfo.branch}</span>
                        <span className="text-emerald-400 font-bold block text-[11px]">
                          📍 ~{placedOrderInfo.distance} দূরে (আপনার ঠিকানা থেকে)
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-white/60 text-[10px] block">ডেলিভারি হিরো (Assigned Rider)</span>
                        <span className="font-extrabold text-white text-xs">{placedOrderInfo.riderName} (Rider #104)</span>
                        <a
                          href={`tel:${placedOrderInfo.riderPhone}`}
                          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px] mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{placedOrderInfo.riderPhone}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 4-Stage Visual Progress Tracker */}
                  <div className="pt-1">
                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs">
                      <div>
                        <div className="w-7 h-7 rounded-full bg-[#2EBD70] text-[#071F15] font-black flex items-center justify-center mx-auto mb-1 shadow-sm">
                          ✓
                        </div>
                        <span className="font-bold text-white block">অর্ডার গৃহীত</span>
                        <span className="text-white/50 text-[9px] block">Confirmed</span>
                      </div>

                      <div>
                        <div className="w-7 h-7 rounded-full bg-[#2EBD70] text-[#071F15] font-black flex items-center justify-center mx-auto mb-1 shadow-sm">
                          ✓
                        </div>
                        <span className="font-bold text-white block">প্যাকিং সম্পন্ন</span>
                        <span className="text-white/50 text-[9px] block">Cold-Chain</span>
                      </div>

                      <div>
                        <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center mx-auto mb-1 shadow-sm animate-pulse">
                          3
                        </div>
                        <span className="font-black text-amber-300 block">রাইডার পথে</span>
                        <span className="text-amber-300/80 text-[9px] block">~15 Mins</span>
                      </div>

                      <div className="opacity-60">
                        <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold flex items-center justify-center mx-auto mb-1">
                          4
                        </div>
                        <span className="font-medium text-white block">ডেলিভারি</span>
                        <span className="text-white/40 text-[9px] block">Doorstep</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details Accordion / Summary */}
                <div className="bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7] p-4 text-xs space-y-2">
                  <div className="flex justify-between items-center text-[#17251F]">
                    <span className="text-[#64736B]">গ্রাহকের নাম:</span>
                    <span className="font-bold">{placedOrderInfo.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#17251F]">
                    <span className="text-[#64736B]">মোবাইল নম্বর:</span>
                    <span className="font-bold">{placedOrderInfo.customerPhone}</span>
                  </div>
                  {placedOrderInfo.customerEmail && (
                    <div className="flex justify-between items-center text-[#17251F]">
                      <span className="text-[#64736B]">ইমেইল রসিদ:</span>
                      <span className="font-bold text-[#21A366]">{placedOrderInfo.customerEmail}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-start text-[#17251F]">
                    <span className="text-[#64736B] shrink-0">ডেলিভারি ঠিকানা:</span>
                    <span className="font-bold text-right ml-4">{placedOrderInfo.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#17251F] pt-2 border-t border-[#E5ECE7]">
                    <span className="text-[#64736B]">মোট পরিশোধযোগ্য:</span>
                    <span className="font-black text-sm text-[#123C2D]">৳{placedOrderInfo.grandTotal}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setIsTrackingModalOpen(true);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-[#21A366] hover:bg-[#123C2D] text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>লাইভ ট্র্যাকার খুলুন (Live Tracker)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-white hover:bg-[#F7F9F5] text-[#17251F] border border-[#E5ECE7] shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue Shopping (আরও কেনাকাটা)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </Dialog>
    </>
  );
};
