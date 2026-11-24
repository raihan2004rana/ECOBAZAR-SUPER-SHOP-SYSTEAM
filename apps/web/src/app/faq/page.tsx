'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Truck,
  CreditCard,
  RefreshCw,
  Sparkles,
  MapPin,
  PhoneCall,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/language-context';

interface FAQItem {
  id: string;
  category: 'delivery' | 'payment' | 'returns' | 'quality' | 'branches';
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'delivery',
    questionEn: 'How fast is ECOBAZAR express delivery?',
    questionBn: 'ইকোবাজার এক্সপ্রেস ডেলিভারি পেতে কতক্ষণ সময় লাগে?',
    answerEn:
      'Standard orders within our branch delivery radius (Dhanmondi, Gulshan, Uttara, Banani, Mirpur) arrive within 30 to 45 minutes. You can track your assigned rider and live cold-chain transit directly using our Order Tracking tool.',
    answerBn:
      'আমাদের ব্রাঞ্চ সমূহের (ধানমন্ডি, গুলশান, উত্তরা, বনানী, মিরপুর) আওতাধীন এলাকায় মাত্র ৩০ থেকে ৪৫ মিনিটের মধ্যে এক্সপ্রেস ডেলিভারি পৌঁছে দেওয়া হয়। আপনি সাইটের "Track Order" অপশন থেকে লাইভ রাইডার অবস্থান ও সময় দেখতে পারবেন।',
  },
  {
    id: '2',
    category: 'delivery',
    questionEn: 'What are the delivery charges and minimum order limit?',
    questionBn: 'ডেলিভারি চার্জ কত এবং সর্বনিম্ন কত টাকার অর্ডার করা যায়?',
    answerEn:
      'Standard delivery charge is ৳40 within Dhaka metropolitan areas. Orders above ৳1,000 enjoy 100% Free Express Delivery! There is no minimum order amount—you can order even a single kg of organic carrots.',
    answerBn:
      'ঢাকা শহরের ভেতরে সাধারণ ডেলিভারি চার্জ মাত্র ৪০ টাকা। তবে ১,০০০ টাকার বেশি অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! কোনো সর্বনিম্ন অর্ডারের বাধ্যবাধকতা নেই—আপনি চাইলে মাত্র ১ কেজি গাজরও অর্ডার করতে পারেন।',
  },
  {
    id: '3',
    category: 'payment',
    questionEn: 'What payment methods are supported? Can I pay Cash on Delivery?',
    questionBn: 'কী কী মাধ্যমে মূল্য পরিশোধ করা যায়? ক্যাশ অন ডেলিভারি কি আছে?',
    answerEn:
      'Yes, Cash on Delivery (COD) is available for all orders across Dhaka. Additionally, we support bKash, Nagad, Visa, Mastercard, American Express, and EcoWallet loyalty points with instant digital receipts.',
    answerBn:
      'হ্যাঁ, সম্পূর্ণ ঢাকায় ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে—পণ্য হাতে পেয়ে টাকা দিতে পারবেন। এছাড়া বিকাশ, নগদ, ভিসা, মাস্টারকার্ড, অ্যামেক্স এবং ওয়ালেট পয়েন্টের মাধ্যমেও তাৎক্ষণিক পেমেন্ট করা যায়।',
  },
  {
    id: '4',
    category: 'returns',
    questionEn: 'What is your return and refund policy for fresh vegetables and fish?',
    questionBn: 'কাঁচা শাকসবজি বা মাছের ক্ষেত্রে রিটার্ন ও রিফান্ড পলিসি কী?',
    answerEn:
      'We offer an instant Doorstep Quality Check. If any vegetable, fruit, fish, or dairy item does not meet your quality expectations, you can hand it right back to the delivery rider with zero return fee. Prepayments are refunded to your bKash/Card within 24 hours or instantly credited with 5% bonus to your EcoWallet.',
    answerBn:
      'আমাদের রয়েছে দরজায় পণ্য যাচাই করার শতভাগ স্বাধীনতা। ডেলিভারির সময় কোনো শাকসবজি, ফল বা মাছ পছন্দ না হলে ডেলিভারি বয়কে তৎক্ষণাৎ ফেরত দিতে পারবেন, কোনো চার্জ কাটা হবে না। অগ্রিম পরিশোধিত টাকা ২৪ ঘণ্টার মধ্যে আপনার বিকাশ/কার্ডে ফেরত দেওয়া হবে অথবা ৫% বোনাসসহ ওয়ালেটে জমা হবে।',
  },
  {
    id: '5',
    category: 'quality',
    questionEn: 'Are the vegetables and fruits genuinely organic and chemical-free?',
    questionBn: 'শাকসবজি ও ফলমূল কি সত্যিই শতভাগ বিষমুক্ত ও ফরমালিনহীন?',
    answerEn:
      'Absolutely. ECOBAZAR contracts directly with verified farmer collectives in Bogura, Jessore, and Sylhet. We maintain an unbroken cold-chain logistics network without utilizing calcium carbide, formalin, or artificial ripening agents. Packaged food items are BSTI grade certified.',
    answerBn:
      'একদমই তাই। ইকোবাজার সরাসরি বগুড়া, যশোর ও সিলেটের নিবন্ধিত জৈব কৃষকদের থেকে পণ্য সংগ্রহ করে। কোনো ক্যালসিয়াম কার্বাইড, ফরমালিন বা কৃত্রিম পাকানো রাসায়নিক ছাড়াই নিজস্ব কোল্ড-চেইনে পরিবহন করা হয়। সকল প্যাকেটজাত পণ্য বিএসটিআই সনদপ্রাপ্ত।',
  },
  {
    id: '6',
    category: 'branches',
    questionEn: 'Which areas and branches do you currently operate in?',
    questionBn: 'আপনাদের বর্তমানে কোন কোন এলাকায় শাখা বা আউটলেট রয়েছে?',
    answerEn:
      'We currently operate 7 full-scale physical superstores in Dhaka: Dhanmondi Flagship (#01), Gulshan Avenue (#02), Uttara Sector 3 (#03), Banani Hub (#04), Mirpur 10 (#05), Basundhara (#06), and Mohakhali DOHS (#07). You can select your branch from the header to see real-time shelf stock.',
    answerBn:
      'বর্তমানে ঢাকায় আমাদের ৭টি ফিজিক্যাল সুপারস্টোর ব্রাঞ্চ রয়েছে: ধানমন্ডি রোড ২৭ (#০১), গুলশান এভিনিউ (#০২), উত্তরা সেক্টর ৩ (#০৩), বনানী হাব (#০৪), মিরপুর ১০ (#০৫), বসুন্ধরা আর/এ (#০৬) এবং মহাখালী (#০৭)। হেডারের ড্রপডাউন থেকে আপনার নিকটস্থ ব্রাঞ্চ নির্বাচন করলেই ওই ব্রাঞ্চের লাইভ ইনভেন্টরি দেখতে পাবেন।',
  },
  {
    id: '7',
    category: 'payment',
    questionEn: 'How do EcoPoints loyalty rewards and coupon codes work?',
    questionBn: 'ইকোপয়েন্ট (EcoPoints) লয়্যালটি ও ডিসকাউন্ট কুপন কীভাবে ব্যবহার করব?',
    answerEn:
      'For every ৳100 spent, you earn 2 EcoPoints. 100 EcoPoints equals ৳50 discount on your subsequent grocery orders. You can apply active coupon codes (such as ECOFRESH10 or GREENFRIDAY) in the cart drawer before checkout for instant bill deductions.',
    answerBn:
      'প্রতি ১০০ টাকার ক্রয়ে আপনি পাবেন ২টি ইকোপয়েন্ট। ১০০ পয়েন্ট জমা হলে পরবর্তী অর্ডারে ৫০ টাকা ইনস্ট্যান্ট ছাড় পাবেন। এছাড়া কার্ট ড্রয়ারে কুপন কোড (যেমন: ECOFRESH10 বা SAVE50) লিখে এক ক্লিকে অতিরিক্ত ছাড় উপভোগ করতে পারেন।',
  },
  {
    id: '8',
    category: 'quality',
    questionEn: 'What if a packaged grocery item arrives with a damaged seal?',
    questionBn: 'প্যাকেটজাত পণ্যের সিল খোলা বা নষ্ট থাকলে কী করব?',
    answerEn:
      'In the rare event of damaged packaging, take a quick photo and contact us through the Help Center Chatbot or call our hotline (+880 9612-000000). Our nearest branch will send a brand-new replacement sealed item within 30 minutes free of charge.',
    answerBn:
      'অত্যন্ত বিরল ক্ষেত্রে প্যাকেটের সিল কাটা বা ত্রুটিযুক্ত থাকলে একটি ছবি তুলে আমাদের চ্যাটবটে জানান অথবা হটলাইনে (+৮৮০ ৯৬১২-০০০০০০) কল করুন। নিকটস্থ ব্রাঞ্চ থেকে ৩০ মিনিটের মধ্যে সম্পূর্ণ ফ্রিতে নতুন ইনট্যাক্ট প্যাকেট রিপ্লেস করে দেওয়া হবে।',
  },
];

export default function FAQPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [expandedId, setExpandedId] = React.useState<string | null>('1');

  const categories = [
    { id: 'all', labelEn: 'All Questions', labelBn: 'সকল প্রশ্ন' },
    { id: 'delivery', labelEn: 'Delivery & Timing', labelBn: 'ডেলিভারি ও সময়' },
    { id: 'payment', labelEn: 'Payments & bKash', labelBn: 'পেমেন্ট ও বিকাশ' },
    { id: 'returns', labelEn: 'Returns & Refunds', labelBn: 'রিটার্ন ও রিফান্ড' },
    { id: 'quality', labelEn: 'Quality & Cold-Chain', labelBn: 'পণ্যের মান ও কোল্ড চেইন' },
    { id: 'branches', labelEn: 'Branches & Hubs', labelBn: 'শাখা ও লোকেশন' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      faq.questionEn.toLowerCase().includes(q) ||
      faq.questionBn.toLowerCase().includes(q) ||
      faq.answerEn.toLowerCase().includes(q) ||
      faq.answerBn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64736B] mb-6">
          <Link href="/" className="hover:text-[#21A366] transition-colors">
            {language === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="font-bold text-[#17251F]">
            {language === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#123C2D] text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden text-center sm:text-left">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-xs">
              <HelpCircle className="w-4 h-4" />
              <span>{language === 'bn' ? '২৪/৭ কাস্টমার হেল্প সেন্টার' : '24/7 Knowledge Base & Support'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              {language === 'bn' ? 'আপনাকে কীভাবে সাহায্য করতে পারি?' : 'How Can We Help You Today?'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
              {language === 'bn'
                ? 'ইকোবাজার সুপারমার্কেটের অর্ডার, দ্রুত ডেলিভারি, বিকাশ পেমেন্ট, পণ্যের মান ও রিটার্ন পলিসি সম্পর্কিত সকল প্রশ্নের তাৎক্ষণিক উত্তর।'
                : 'Browse quick, verified answers on branch dispatch times, organic sourcing, bKash payments, returns, and loyalty perks.'}
            </p>

            {/* Live Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: ডেলিভারি সময়, বিকাশ, রিটার্ন, শাকসবজি...'
                    : 'Search questions e.g. delivery time, bKash, refund, organic...'
                }
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-[#17251F] text-xs sm:text-sm placeholder-gray-400 font-medium shadow-lg border-2 border-transparent focus:border-emerald-400 outline-hidden transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#123C2D] text-white shadow-md'
                    : 'bg-white text-[#64736B] hover:text-[#17251F] border border-[#E5ECE7] hover:border-[#21A366]/40'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-10">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#21A366] shadow-md ring-1 ring-[#21A366]/20'
                      : 'border-[#E5ECE7] hover:border-emerald-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-black text-xs sm:text-sm text-[#17251F] leading-snug">
                      {language === 'bn' ? faq.questionBn : faq.questionEn}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-emerald-100 text-[#21A366]' : 'bg-[#F7F9F5] text-gray-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#17251F]/80 leading-relaxed border-t border-[#F7F9F5] animate-in fade-in-50 duration-200">
                      {language === 'bn' ? faq.answerBn : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E5ECE7] p-8">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#17251F] mb-1">
                {language === 'bn' ? 'কোনো প্রশ্নোত্তর পাওয়া যায়নি' : 'No matching questions found'}
              </h3>
              <p className="text-xs text-[#64736B] mb-4">
                {language === 'bn'
                  ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ দিয়ে সার্চ করুন অথবা সরাসরি আমাদের হটলাইনে যোগাযোগ করুন।'
                  : 'Try searching with different keywords or get in touch with our live support.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#21A366] text-white text-xs font-bold hover:bg-[#1b8a56] transition"
              >
                {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Search Filters'}
              </button>
            </div>
          )}
        </div>

        {/* Contact Support Hub Card */}
        <div className="bg-[#123C2D] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-black tracking-tight">
              {language === 'bn' ? 'কাঙ্ক্ষিত উত্তর খুঁজে পাননি?' : 'Still Have Questions?'}
            </h3>
            <p className="text-xs text-white/80 max-w-md">
              {language === 'bn'
                ? 'আমাদের কাস্টমার রিলেশন টিম সকাল ৭টা থেকে রাত ১১টা পর্যন্ত সরাসরি ফোনে ও চ্যাটে সহায়তা দিতে প্রস্তুত।'
                : 'Our support specialists are standing by 7 days a week to assist you with active orders, accounts, or corporate orders.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+8809612000000"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#123C2D] text-xs font-black hover:bg-emerald-50 transition shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#21A366]" />
              <span>+880 9612-000000</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              <Mail className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'যোগাযোগ পেজ' : 'Contact Form'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
