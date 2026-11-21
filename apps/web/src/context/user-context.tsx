'use client';

import * as React from 'react';
import { useToast } from '@ecobazar/ui';

export type MembershipTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  recipientName: string;
  phone: string;
  address: string;
  area: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  memberSince: string;
  preferredBranch: string;
  points: number;
  savedAddresses: SavedAddress[];
}

export interface OrderItem {
  productId: string;
  name: string;
  nameBn?: string;
  price: number;
  quantity: number;
  unit: string;
  total: number;
  image: string;
}

export interface CustomerOrder {
  id: string;
  placedAt: string;
  formattedTime?: string;
  formattedDate?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryTimeSlot?: string;
  paymentMethod: string;
  branch: string;
  status: 'PENDING' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  grandTotal: number;
  trackingId?: string;
  riderName?: string;
  riderPhone?: string;
  etaTime?: string;
  items: OrderItem[];
}

export interface CouponOffer {
  id: string;
  code: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  discountType: 'PERCENT' | 'FLAT';
  discountValue: number;
  minSpend: number;
  expiresInDays: number;
  tierRequired?: MembershipTier;
  categorySlug?: string;
  badge?: string;
}

export interface MemberAnnouncement {
  id: string;
  targetTier: 'ALL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  targetCustomerId?: string | null;
  targetCustomerName?: string;
  type: 'VIP_REWARD' | 'RESTOCK_ALERT' | 'PROMO_COUPON' | 'MILESTONE_GIFT';
  title: string;
  titleBn: string;
  message: string;
  couponCode?: string;
  discountPercent?: number;
  discountFlat?: number;
  minSpend?: number;
  validUntil?: string;
  relatedProductId?: string;
  relatedProductName?: string;
  relatedProductPrice?: number;
  relatedProductImage?: string;
  branch?: string;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt?: string;
}

export interface MembershipInfo {
  tier: MembershipTier;
  title: string;
  titleBn: string;
  color: string;
  bgColor: string;
  borderColor: string;
  minSpend: number;
  nextTier: MembershipTier | null;
  nextTierSpend: number | null;
  progressPercent: number;
  spendNeededForNextTier: number;
  cashbackPercent: number;
  perks: string[];
  perksBn: string[];
}

interface UserContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  orders: CustomerOrder[];
  membership: MembershipInfo;
  lifetimeSpend: number;
  totalSaved: number;
  availableCoupons: CouponOffer[];
  announcements: MemberAnnouncement[];
  unreadAnnouncementsCount: number;
  dismissAnnouncement: (id: string) => void;
  refreshAnnouncements: () => Promise<void>;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<SavedAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  redeemPoints: (pointsToRedeem: number) => { success: boolean; couponCode?: string };
  refreshOrders: () => Promise<void>;
  selectedOrderForInvoice: CustomerOrder | null;
  setSelectedOrderForInvoice: (order: CustomerOrder | null) => void;
  activeOrderToTrack: CustomerOrder | null;
  setActiveOrderToTrack: (order: CustomerOrder | null) => void;
}

const defaultUser: UserProfile = {
  id: 'ECO-USR-8821',
  name: 'Raihan Ahmed',
  phone: '+880 1712-345678',
  email: 'raihan.ahmed@gmail.com',
  memberSince: 'March 2024',
  preferredBranch: 'Dhanmondi Branch #01 (Flagship)',
  points: 620,
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home',
      recipientName: 'Raihan Ahmed',
      phone: '+880 1712-345678',
      address: 'Flat 4B, House 12, Road 7/A',
      area: 'Dhanmondi, Dhaka - 1209',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office',
      recipientName: 'Raihan Ahmed',
      phone: '+880 1712-345678',
      address: 'Level 8, Concord Tower, 57 Kamal Ataturk Avenue',
      area: 'Banani, Dhaka - 1213',
      isDefault: false,
    },
  ],
};

const initialSampleOrders: CustomerOrder[] = [
  {
    id: 'ECO-DH-916615',
    placedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    formattedTime: '35 mins ago',
    formattedDate: 'Today, 21 Nov 2026',
    customerName: 'Raihan Ahmed',
    customerEmail: 'raihan.ahmed@gmail.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'Flat 4B, House 12, Road 7/A, Dhanmondi, Dhaka',
    deliveryTimeSlot: 'Express Delivery (25-30 Mins)',
    paymentMethod: 'bKash Online',
    branch: 'Dhanmondi Branch #01 (Flagship)',
    status: 'OUT_FOR_DELIVERY',
    subtotal: 1650,
    deliveryFee: 0,
    discountAmount: 150,
    grandTotal: 1500,
    trackingId: 'ECO-DH-916615',
    riderName: 'Farhan Shakil',
    riderPhone: '+880 1812-334455',
    etaTime: '15 mins',
    items: [
      {
        productId: 'fv-1',
        name: 'Crisp Red Gala Apples',
        nameBn: 'আমদানিকৃত লাল গালা আপেল',
        price: 90,
        quantity: 2,
        unit: '1 kg pack',
        total: 180,
        image: '/images/products/red-apple.webp',
      },
      {
        productId: 'gro-1',
        name: 'Premium Chakki Fresh Whole Wheat Atta 2kg',
        nameBn: 'চাক্কি ফ্রেশ লাল গমের আটা (২ কেজি)',
        price: 135,
        quantity: 2,
        unit: '2 kg sealed bag',
        total: 270,
        image: '/images/products/chakki-ata.webp',
      },
      {
        productId: 'mf-1',
        name: 'Fresh Premium Boneless Beef Cube',
        nameBn: 'তাজা প্রিমিয়াম হাড়ছাড়া গরুর মাংস',
        price: 950,
        quantity: 1,
        unit: '1 kg vacuum pack',
        total: 950,
        image: '/images/products/beef-cube.webp',
      },
      {
        productId: 'de-1',
        name: 'Farm Fresh Organic Brown Eggs (12 Pcs)',
        nameBn: 'ফার্ম ফ্রেশ দেশি লাল ডিম (১২টি)',
        price: 155,
        quantity: 1,
        unit: '12 pcs carton',
        total: 155,
        image: '/images/products/dairy-cream.png',
      },
      {
        productId: 'so-1',
        name: 'Cold-Pressed Pure Mustard Oil (1L Bottle)',
        nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার)',
        price: 95,
        quantity: 1,
        unit: '1 Liter PET bottle',
        total: 95,
        image: '/images/products/holud-gura.avif',
      },
    ],
  },
  {
    id: 'ECO-DH-772018',
    placedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    formattedTime: '2 days ago',
    formattedDate: '19 Nov 2026',
    customerName: 'Raihan Ahmed',
    customerEmail: 'raihan.ahmed@gmail.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'Flat 4B, House 12, Road 7/A, Dhanmondi, Dhaka',
    deliveryTimeSlot: 'Morning Slot (8:00 AM - 10:00 AM)',
    paymentMethod: 'Cash on Delivery',
    branch: 'Dhanmondi Branch #01 (Flagship)',
    status: 'DELIVERED',
    subtotal: 2450,
    deliveryFee: 0,
    discountAmount: 200,
    grandTotal: 2250,
    trackingId: 'ECO-DH-772018',
    items: [
      {
        productId: 'rpg-1',
        name: 'Premium Miniket Polish-Free Rice (5kg)',
        nameBn: 'প্রিমিয়াম মিনিকেট চাল (৫ কেজি)',
        price: 395,
        quantity: 2,
        unit: '5 kg bag',
        total: 790,
        image: '/images/products/miniket-chal.jpg',
      },
      {
        productId: 'mf-7',
        name: 'Fresh River Katla Fish Head & Steaks (1kg)',
        nameBn: 'তাজা কাতলা মাছ (১ কেজি)',
        price: 450,
        quantity: 2,
        unit: '1 kg pack',
        total: 900,
        image: '/images/products/chicken-nugs.jpg',
      },
      {
        productId: 'sb-1',
        name: 'Sreemangal Premium CTC Black Tea Leaves (400g)',
        nameBn: 'শ্রীমঙ্গল প্রিমিয়াম সিটিসি ব্ল্যাক চা পাতা (৪০০ গ্রাম)',
        price: 240,
        quantity: 1,
        unit: '400g airtight pouch',
        total: 240,
        image: '/images/products/tea-leaves.jpg',
      },
      {
        productId: 'hpc-1',
        name: 'Cold-Pressed Extra Virgin Coconut Oil (500ml)',
        nameBn: 'কোল্ড প্রেসড এক্সট্রা ভার্জিন নারিকেল তেল',
        price: 320,
        quantity: 1,
        unit: '500ml glass jar',
        total: 320,
        image: '/images/products/coconut-oil.webp',
      },
    ],
  },
  {
    id: 'ECO-DH-520194',
    placedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    formattedTime: '14 Nov 2026',
    formattedDate: '14 Nov 2026',
    customerName: 'Raihan Ahmed',
    customerEmail: 'raihan.ahmed@gmail.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'Flat 4B, House 12, Road 7/A, Dhanmondi, Dhaka',
    deliveryTimeSlot: 'Evening Slot (6:00 PM - 8:00 PM)',
    paymentMethod: 'Credit / Debit Card',
    branch: 'Dhanmondi Branch #01 (Flagship)',
    status: 'DELIVERED',
    subtotal: 4100,
    deliveryFee: 0,
    discountAmount: 410,
    grandTotal: 3690,
    trackingId: 'ECO-DH-520194',
    items: [
      {
        productId: 'gro-1',
        name: 'Premium Chakki Fresh Whole Wheat Atta 2kg',
        nameBn: 'চাক্কি ফ্রেশ লাল গমের আটা (২ কেজি)',
        price: 135,
        quantity: 4,
        unit: '2 kg sealed bag',
        total: 540,
        image: '/images/products/chakki-ata.webp',
      },
      {
        productId: 'so-1',
        name: 'Cold-Pressed Pure Mustard Oil (1L Bottle)',
        nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার)',
        price: 95,
        quantity: 4,
        unit: '1 Liter PET bottle',
        total: 380,
        image: '/images/products/holud-gura.avif',
      },
      {
        productId: 'mf-1',
        name: 'Fresh Premium Boneless Beef Cube',
        nameBn: 'তাজা প্রিমিয়াম হাড়ছাড়া গরুর মাংস',
        price: 950,
        quantity: 2,
        unit: '1 kg vacuum pack',
        total: 1900,
        image: '/images/products/beef-cube.webp',
      },
      {
        productId: 'bf-1',
        name: 'Organic Multigrain Baby Cereal Porridge (400g)',
        nameBn: 'অর্গানিক মাল্টিগ্রেইন বেবি সিরিয়াল (৪০০ গ্রাম)',
        price: 435,
        quantity: 2,
        unit: '400g pack',
        total: 870,
        image: '/images/products/baby-cereal.png',
      },
    ],
  },
  {
    id: 'ECO-DH-402911',
    placedAt: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    formattedTime: '03 Nov 2026',
    formattedDate: '03 Nov 2026',
    customerName: 'Raihan Ahmed',
    customerEmail: 'raihan.ahmed@gmail.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'Flat 4B, House 12, Road 7/A, Dhanmondi, Dhaka',
    deliveryTimeSlot: 'Express Delivery (25-30 Mins)',
    paymentMethod: 'bKash Online',
    branch: 'Dhanmondi Branch #01 (Flagship)',
    status: 'DELIVERED',
    subtotal: 5200,
    deliveryFee: 0,
    discountAmount: 500,
    grandTotal: 4700,
    trackingId: 'ECO-DH-402911',
    items: [
      {
        productId: 'rpg-1',
        name: 'Premium Miniket Polish-Free Rice (5kg)',
        nameBn: 'প্রিমিয়াম মিনিকেট চাল (৫ কেজি)',
        price: 395,
        quantity: 5,
        unit: '5 kg bag',
        total: 1975,
        image: '/images/products/miniket-chal.jpg',
      },
      {
        productId: 'fv-1',
        name: 'Crisp Red Gala Apples',
        nameBn: 'আমদানিকৃত লাল গালা আপেল',
        price: 90,
        quantity: 5,
        unit: '1 kg pack',
        total: 450,
        image: '/images/products/red-apple.webp',
      },
      {
        productId: 'bak-1',
        name: 'Artisan European Butter Croissant (4 Pcs Pack)',
        nameBn: 'আর্টিসান বাটার ক্রসেন্ট (৪টি)',
        price: 260,
        quantity: 2,
        unit: '4 pcs pack',
        total: 520,
        image: '/images/products/butter-cross.webp',
      },
      {
        productId: 'mf-1',
        name: 'Fresh Premium Boneless Beef Cube',
        nameBn: 'তাজা প্রিমিয়াম হাড়ছাড়া গরুর মাংস',
        price: 950,
        quantity: 2,
        unit: '1 kg vacuum pack',
        total: 1900,
        image: '/images/products/beef-cube.webp',
      },
    ],
  },
  {
    id: 'ECO-DH-310892',
    placedAt: new Date(Date.now() - 32 * 24 * 3600 * 1000).toISOString(),
    formattedTime: '20 Oct 2026',
    formattedDate: '20 Oct 2026',
    customerName: 'Raihan Ahmed',
    customerEmail: 'raihan.ahmed@gmail.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'Flat 4B, House 12, Road 7/A, Dhanmondi, Dhaka',
    deliveryTimeSlot: 'Afternoon Slot (2:00 PM - 4:00 PM)',
    paymentMethod: 'Cash on Delivery',
    branch: 'Dhanmondi Branch #01 (Flagship)',
    status: 'DELIVERED',
    subtotal: 6200,
    deliveryFee: 0,
    discountAmount: 600,
    grandTotal: 5600,
    trackingId: 'ECO-DH-310892',
    items: [
      {
        productId: 'mf-1',
        name: 'Fresh Premium Boneless Beef Cube',
        nameBn: 'তাজা প্রিমিয়াম হাড়ছাড়া গরুর মাংস',
        price: 950,
        quantity: 4,
        unit: '1 kg vacuum pack',
        total: 3800,
        image: '/images/products/beef-cube.webp',
      },
      {
        productId: 'gro-1',
        name: 'Premium Chakki Fresh Whole Wheat Atta 2kg',
        nameBn: 'চাক্কি ফ্রেশ লাল গমের আটা (২ কেজি)',
        price: 135,
        quantity: 4,
        unit: '2 kg sealed bag',
        total: 540,
        image: '/images/products/chakki-ata.webp',
      },
      {
        productId: 'so-1',
        name: 'Cold-Pressed Pure Mustard Oil (1L Bottle)',
        nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার)',
        price: 95,
        quantity: 4,
        unit: '1 Liter PET bottle',
        total: 380,
        image: '/images/products/holud-gura.avif',
      },
      {
        productId: 'hpc-1',
        name: 'Cold-Pressed Extra Virgin Coconut Oil (500ml)',
        nameBn: 'কোল্ড প্রেসড এক্সট্রা ভার্জিন নারিকেল তেল',
        price: 320,
        quantity: 2,
        unit: '500ml glass jar',
        total: 640,
        image: '/images/products/coconut-oil.webp',
      },
      {
        productId: 'sb-1',
        name: 'Sreemangal Premium CTC Black Tea Leaves (400g)',
        nameBn: 'শ্রীমঙ্গল প্রিমিয়াম সিটিসি ব্ল্যাক চা পাতা (৪০০ গ্রাম)',
        price: 240,
        quantity: 1,
        unit: '400g pouch',
        total: 240,
        image: '/images/products/tea-leaves.jpg',
      },
    ],
  },
];

const availableCouponsList: CouponOffer[] = [
  {
    id: 'c-gold',
    code: 'GOLDVIP10',
    title: '10% Extra VIP Discount',
    titleBn: '১০% অতিরিক্ত গোল্ড ভিআইপি ছাড়',
    description: 'Exclusive to Gold & Platinum VIP members on all fresh harvest & pantry essentials.',
    descriptionBn: 'সকল তাজা শাকসবজি ও মুদি পণ্যে গোল্ড ও প্লাটিনাম মেম্বারদের জন্য বিশেষ ছাড়।',
    discountType: 'PERCENT',
    discountValue: 10,
    minSpend: 999,
    expiresInDays: 14,
    tierRequired: 'GOLD',
    badge: 'VIP EXCLUSIVE',
  },
  {
    id: 'c-free-ship',
    code: 'FREESHIP',
    title: 'Unlimited Free Express Delivery',
    titleBn: 'আনলিমিটেড ফ্রি এক্সপ্রেস ডেলিভারি',
    description: 'Zero delivery fee for 30-min express dispatched from any local branch.',
    descriptionBn: 'ঢাকা সিটির যেকোনো ঠিকানায় ৩০ মিনিটে সম্পূর্ণ ফ্রি হোম ডেলিভারি।',
    discountType: 'FLAT',
    discountValue: 50,
    minSpend: 499,
    expiresInDays: 30,
    badge: 'MEMBER FAVORITE',
  },
  {
    id: 'c-beef',
    code: 'BEEF100',
    title: '৳100 Off Fresh Beef & Fish',
    titleBn: '৳১০০ ফ্ল্যাট ছাড় মাছ ও মাংসে',
    description: 'Flat ৳100 reduction on certified fresh meat, poultry and live river fish.',
    descriptionBn: '১০০% তাজা দেশি গরুর মাংস ও নদীর মাছে নূন্যতম ১২০০ টাকা অর্ডারে।',
    discountType: 'FLAT',
    discountValue: 100,
    minSpend: 1200,
    expiresInDays: 5,
    badge: 'WEEKEND SPECIAL',
  },
  {
    id: 'c-harvest',
    code: 'HARVEST15',
    title: '15% Off Organic Morning Harvest',
    titleBn: '১৫% ছাড় সকালের তাজা ফসলে',
    description: 'Special breakfast & sunrise crop coupon valid for fresh fruits and vegetables.',
    descriptionBn: 'রাসায়নিক ও ফরমালিনমুক্ত তাজা দেশি ফলমূল ও সবজি অর্ডারে।',
    discountType: 'PERCENT',
    discountValue: 15,
    minSpend: 600,
    expiresInDays: 7,
    badge: 'FARM FRESH',
  },
  {
    id: 'c-welcome',
    code: 'WELCOME200',
    title: '৳200 Flat Bonus Voucher',
    titleBn: '৳২০০ মেম্বার লয়্যালটি গিফট',
    description: 'Enjoy ৳200 gift discount on family mega monthly pantry stock orders.',
    descriptionBn: 'পারিবারিক মাসিক বাজার ও মেগা বাস্কেট অর্ডারে তাৎক্ষণিক ২০০ টাকা ছাড়।',
    discountType: 'FLAT',
    discountValue: 200,
    minSpend: 2500,
    expiresInDays: 21,
    badge: 'MEGA SAVINGS',
  },
];

function computeMembership(totalSpend: number): MembershipInfo {
  if (totalSpend >= 30000) {
    return {
      tier: 'PLATINUM',
      title: 'Platinum Elite Member',
      titleBn: 'প্লাটিনাম এলিট ভিআইপি',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10',
      borderColor: 'border-purple-300',
      minSpend: 30000,
      nextTier: null,
      nextTierSpend: null,
      progressPercent: 100,
      spendNeededForNextTier: 0,
      cashbackPercent: 8,
      perks: [
        '8% Lifetime Cashback Points on Every Order',
        'Unlimited Zero-Fee 30-Min Express Delivery (No Minimum)',
        'Quarterly Surprise Organic Farm Basket Gift Box',
        'Ultra-Priority 10-Min Cold-Chain Packing',
        '24/7 Dedicated Personal Grocery Concierge',
        'Exclusive Early Access to Import Fruits & Seasonal Treats',
      ],
      perksBn: [
        'প্রতি অর্ডারে ৮% লয়্যালটি ক্যাশব্যাক পয়েন্ট',
        'শর্তহীন সম্পূর্ণ ফ্রি ৩০-মিনিট এক্সপ্রেস ডেলিভারি',
        'ত্রৈমাসিক সারপ্রাইজ অর্গানিক ফার্ম গিফট হ্যাম্পার',
        '১০ মিনিটে কোল্ড-চেইন এক্সপ্রেস আল্ট্রা-প্যাকিং',
        '২৪/৭ ডেডিকেটেড পার্সোনাল সুপারমার্কেট এসিস্ট্যান্ট',
        'আমদানিকৃত দুর্লভ ফল ও স্পেশাল সিজনাল পণ্যে ফার্স্ট এক্সেস',
      ],
    };
  }

  if (totalSpend >= 15000) {
    const nextTierSpend = 30000;
    const progressPercent = Math.min(100, Math.round(((totalSpend - 15000) / 15000) * 100));
    return {
      tier: 'GOLD',
      title: 'Gold VIP Member',
      titleBn: 'গোল্ড ভিআইপি মেম্বার',
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10',
      borderColor: 'border-amber-300',
      minSpend: 15000,
      nextTier: 'PLATINUM',
      nextTierSpend,
      progressPercent,
      spendNeededForNextTier: nextTierSpend - totalSpend,
      cashbackPercent: 5,
      perks: [
        '5% Instant Cashback Reward Points on All Purchases',
        'Free Express Delivery on Orders Over ৳499',
        'Special Birthday Celebration Voucher & Hamper',
        'Priority Cold-Chain Delivery Slot Guarantee',
        'Gold Member Exclusive Weekend Secret Flash Sales',
      ],
      perksBn: [
        'সকল কেনাকাটায় ৫% ইনস্ট্যান্ট রিওয়ার্ড পয়েন্টস',
        '৳৪৯৯ এর অর্ডারে সম্পূর্ণ ফ্রি এক্সপ্রেস ডেলিভারি',
        'জন্মদিনের বিশেষ ডিসকাউন্ট ভাউচার ও গিফট হ্যাম্পার',
        'পিক আওয়ারেও প্রাইওরিটি ডেলিভারি স্লট গ্যারান্টি',
        'গোল্ড মেম্বারদের জন্য উইকেন্ড সিক্রেট ফ্ল্যাশ সেল',
      ],
    };
  }

  if (totalSpend >= 5000) {
    const nextTierSpend = 15000;
    const progressPercent = Math.min(100, Math.round(((totalSpend - 5000) / 10000) * 100));
    return {
      tier: 'SILVER',
      title: 'Silver Member',
      titleBn: 'সিলভার মেম্বার',
      color: 'text-slate-600',
      bgColor: 'bg-gradient-to-r from-slate-500/10 via-gray-400/10 to-slate-500/10',
      borderColor: 'border-slate-300',
      minSpend: 5000,
      nextTier: 'GOLD',
      nextTierSpend,
      progressPercent,
      spendNeededForNextTier: nextTierSpend - totalSpend,
      cashbackPercent: 3,
      perks: [
        '3% Cashback Reward Points on All Orders',
        'Free Delivery on Orders Over ৳799',
        'Access to Silver Member Monthly Discounts',
      ],
      perksBn: [
        'সকল অর্ডারে ৩% ক্যাশব্যাক পয়েন্টস',
        '৳৭৯৯ এর অর্ডারে ফ্রি ডেলিভারি সুবিধা',
        'সিলভার মেম্বারদের জন্য মাসিক স্পেশাল ডিসকাউন্ট',
      ],
    };
  }

  const nextTierSpend = 5000;
  const progressPercent = Math.min(100, Math.round((totalSpend / 5000) * 100));
  return {
    tier: 'BRONZE',
    title: 'Bronze Member',
    titleBn: 'ব্রোঞ্জ মেম্বার',
    color: 'text-amber-800',
    bgColor: 'bg-amber-800/10',
    borderColor: 'border-amber-200',
    minSpend: 0,
    nextTier: 'SILVER',
    nextTierSpend,
    progressPercent,
    spendNeededForNextTier: nextTierSpend - totalSpend,
    cashbackPercent: 1.5,
    perks: [
      '1.5% Reward Points on Every Purchase',
      'Free Delivery on Orders Over ৳999',
      'Digital Invoicing & 1-Click Order Tracking',
    ],
    perksBn: [
      'প্রতি কেনাকাটায় ১.৫% রিওয়ার্ড পয়েন্টস',
      '৳৯৯৯ বা তদূর্ধ্ব অর্ডারে ফ্রি ডেলিভারি',
      'ডিজিটাল ইনভয়েস ও ১-ক্লিকে রিয়েলটাইম ট্র্যাকিং',
    ],
  };
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = React.useState<UserProfile>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [orders, setOrders] = React.useState<CustomerOrder[]>(initialSampleOrders);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = React.useState<CustomerOrder | null>(null);
  const [activeOrderToTrack, setActiveOrderToTrack] = React.useState<CustomerOrder | null>(null);
  const [announcements, setAnnouncements] = React.useState<MemberAnnouncement[]>([]);
  const [dismissedIds, setDismissedIds] = React.useState<string[]>([]);

  // Load dismissed IDs
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('ecobazar_dismissed_announcements');
      if (saved) setDismissedIds(JSON.parse(saved));
    } catch {}
  }, []);

  // Load user & orders from localStorage on mount
  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ecobazar_user_profile');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedLogin = localStorage.getItem('ecobazar_user_logged_in');
      if (savedLogin !== null) {
        setIsLoggedIn(savedLogin === 'true');
      }
      const savedOrders = localStorage.getItem('ecobazar_user_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading user profile from storage:', e);
    }
  }, []);

  // Fetch latest orders from /api/orders and merge
  const refreshOrders = React.useCallback(async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          // Filter orders for this customer (by email or phone match or recent)
          const apiOrders: CustomerOrder[] = data.orders.map((o: any) => ({
            id: o.id,
            placedAt: o.placedAt || new Date().toISOString(),
            formattedTime: o.formattedTime || 'Just now',
            formattedDate: o.formattedDate || 'Today',
            customerName: o.customerName || user.name,
            customerEmail: o.customerEmail || user.email,
            customerPhone: o.customerPhone || user.phone,
            deliveryAddress: o.deliveryAddress,
            deliveryTimeSlot: o.deliveryTimeSlot,
            paymentMethod: o.paymentMethod === 'bkash' ? 'bKash Online' : o.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery',
            branch: o.branch || user.preferredBranch,
            status: o.status || 'PROCESSING',
            subtotal: o.subtotal || 0,
            deliveryFee: o.deliveryFee || 0,
            discountAmount: o.discountAmount || 0,
            grandTotal: o.grandTotal || 0,
            trackingId: o.trackingId || o.id,
            items: o.items || [],
          }));

          // Merge: ensure existing detailed sample orders are kept alongside API orders
          setOrders((prev) => {
            const map = new Map<string, CustomerOrder>();
            apiOrders.forEach((o) => map.set(o.id, o));
            prev.forEach((o) => {
              if (!map.has(o.id)) map.set(o.id, o);
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
            );
            try {
              localStorage.setItem('ecobazar_user_orders', JSON.stringify(merged));
            } catch (err) {}
            return merged;
          });
        }
      }
    } catch (err) {
      console.warn('Could not fetch /api/orders, relying on storage/mock:', err);
    }
  }, [user.name, user.email, user.phone, user.preferredBranch]);

  React.useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  // Compute lifetime spend ("A obdi koto ki kinche")
  const lifetimeSpend = React.useMemo(() => {
    return orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  }, [orders]);

  // Total saved
  const totalSaved = React.useMemo(() => {
    return orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + (o.discountAmount || 0), 0);
  }, [orders]);

  // Computed membership tier
  const membership = React.useMemo(() => {
    return computeMembership(lifetimeSpend);
  }, [lifetimeSpend]);

  const login = (phone: string, name?: string) => {
    const updated = {
      ...user,
      phone: phone.startsWith('+880') ? phone : `+880 ${phone.trim()}`,
      name: name ? name.trim() : user.name,
    };
    setUser(updated);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('ecobazar_user_profile', JSON.stringify(updated));
      localStorage.setItem('ecobazar_user_logged_in', 'true');
    } catch (e) {}
    toast.success('Logged In Successfully', `Welcome back, ${updated.name}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.setItem('ecobazar_user_logged_in', 'false');
    } catch (e) {}
    toast.info('Signed Out', 'You have been safely signed out of your account.');
  };

  // Fetch announcements for this user's tier
  const refreshAnnouncements = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/member-announcements?tier=${membership.tier}&customerId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.announcements && Array.isArray(data.announcements)) {
          setAnnouncements(data.announcements);
        }
      }
    } catch (e) {
      console.warn('Could not fetch member announcements:', e);
    }
  }, [membership.tier, user.id]);

  React.useEffect(() => {
    refreshAnnouncements();
  }, [refreshAnnouncements]);

  const activeAnnouncements = React.useMemo(() => {
    return announcements.filter((a) => !dismissedIds.includes(a.id));
  }, [announcements, dismissedIds]);

  const dismissAnnouncement = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    try {
      localStorage.setItem('ecobazar_dismissed_announcements', JSON.stringify(updated));
    } catch {}
    toast.info('Announcement Dismissed', 'You can review all store campaigns anytime in the Offers tab.');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      localStorage.setItem('ecobazar_user_profile', JSON.stringify(updated));
    } catch (e) {}
    toast.success('Profile Updated', 'Your personal account details have been saved.');
  };

  const addAddress = (addr: Omit<SavedAddress, 'id'>) => {
    const newAddress: SavedAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    const updatedAddresses = addr.isDefault
      ? user.savedAddresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
      : user.savedAddresses.concat(newAddress);

    updateProfile({ savedAddresses: updatedAddresses });
    toast.success('Address Added', `${newAddress.label} delivery location saved.`);
  };

  const removeAddress = (id: string) => {
    if (user.savedAddresses.length <= 1) {
      toast.error('Cannot Delete', 'You must maintain at least one delivery address.');
      return;
    }
    const updated = user.savedAddresses.filter((a) => a.id !== id);
    if (!updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    updateProfile({ savedAddresses: updated });
    toast.info('Address Removed', 'Delivery address removed from your account.');
  };

  const setDefaultAddress = (id: string) => {
    const updated = user.savedAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    updateProfile({ savedAddresses: updated });
    toast.success('Default Address Updated', 'Selected address is now your primary delivery destination.');
  };

  const redeemPoints = (pointsToRedeem: number): { success: boolean; couponCode?: string } => {
    if (user.points < pointsToRedeem) {
      toast.error('Insufficient Points', `You have ${user.points} points. Minimum required is ${pointsToRedeem}.`);
      return { success: false };
    }
    const updatedPoints = user.points - pointsToRedeem;
    const generatedCoupon = `POINTS${pointsToRedeem}`;
    updateProfile({ points: updatedPoints });
    toast.success('Points Converted!', `Redeemed ${pointsToRedeem} points for ৳${pointsToRedeem} coupon: ${generatedCoupon}`);
    return { success: true, couponCode: generatedCoupon };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        orders,
        membership,
        lifetimeSpend,
        totalSaved,
        availableCoupons: availableCouponsList,
        announcements: activeAnnouncements,
        unreadAnnouncementsCount: activeAnnouncements.length,
        dismissAnnouncement,
        refreshAnnouncements,
        login,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        redeemPoints,
        refreshOrders,
        selectedOrderForInvoice,
        setSelectedOrderForInvoice,
        activeOrderToTrack,
        setActiveOrderToTrack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
