'use client';

import * as React from 'react';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  Truck,
  Phone,
  ShieldCheck,
  ShoppingBag,
  RotateCcw,
  Plus,
  Check,
  MapPin,
  ExternalLink,
  CreditCard,
  Flame,
} from 'lucide-react';
import { useCart } from '../context/cart-context';
import { useCatalog } from '../context/catalog-context';
import { useLanguage } from '../context/language-context';
import { ProductItem } from '../data/catalog';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  products?: ProductItem[];
  actionType?: 'track' | 'whatsapp' | 'call' | 'deals';
}

export const HelpCenterChatbot: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart, setIsTrackingModalOpen, selectedBranch } = useCart();
  const { products } = useCatalog();

  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [addedItemMap, setAddedItemMap] = React.useState<Record<string, boolean>>({});

  // Initialize greeting on first load or language toggle
  React.useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        sender: 'bot',
        text:
          language === 'bn'
            ? `আসসালামু আলাইকুম! আমি ECOBAZAR ভার্চুয়াল অ্যাসিস্ট্যান্ট। তাজা শাকসবজি, ফলমূল, সুপারশপ অফার বা অর্ডার সংক্রান্ত যেকোনো তথ্য জানতে আমাকে প্রশ্ন করতে পারেন।`
            : `Hello! Welcome to ECOBAZAR Supermarket Help Center. How can I assist you with fresh groceries, deals, or your order today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialGreeting]);
    }
  }, [language]);

  // Auto-scroll to bottom of messages
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Intelligent Supermarket Query Matcher
  const generateBotReply = (userQuery: string): Omit<ChatMessage, 'id' | 'time' | 'sender'> => {
    const q = userQuery.toLowerCase().trim();

    // 1. Delivery & Timing
    if (
      q.includes('delivery') ||
      q.includes('ডেলিভারি') ||
      q.includes('সময়') ||
      q.includes('time') ||
      q.includes('charge') ||
      q.includes('চার্জ') ||
      q.includes('কখন')
    ) {
      return {
        text:
          language === 'bn'
            ? `আমাদের এক্সপ্রেস ডেলিভারি মাত্র ২৫-৩০ মিনিটে আপনার দরজায় পৌঁছে যায়। আপনার নিকটস্থ হাব: "${selectedBranch.name}"। ৫০ টাকার নামমাত্র ডেলিভারি ফি, এবং ১,৫০০ টাকার অধিক অর্ডারে সম্পূর্ণ ফ্রি এক্সপ্রেস ডেলিভারি!`
            : `We provide 25-30 minute express delivery directly from your nearest hub: "${selectedBranch.name}". Standard delivery fee is ৳50, and free delivery on orders above ৳1,500!`,
        actionType: 'track',
      };
    }

    // 2. Order Tracking
    if (
      q.includes('track') ||
      q.includes('ট্র্যাক') ||
      q.includes('অর্ডার') ||
      q.includes('order status') ||
      q.includes('কোথায়')
    ) {
      return {
        text:
          language === 'bn'
            ? `আপনার অর্ডারের বর্তমান অবস্থা জানতে নিচের বাটনে ক্লিক করে অর্ডার আইডি প্রদান করুন:`
            : `To track your live delivery status, please click the button below and enter your Order ID:`,
        actionType: 'track',
      };
    }

    // 3. Deals & Offers / Discounts
    if (
      q.includes('deal') ||
      q.includes('অফার') ||
      q.includes('discount') ||
      q.includes('ছাড়') ||
      q.includes('offer') ||
      q.includes('coupon') ||
      q.includes('কুপন')
    ) {
      const dealProducts = products.filter((p) => p.isHotDeal || (p.badge && p.badge.includes('OFF'))).slice(0, 3);
      return {
        text:
          language === 'bn'
            ? `আজকের সেরা কয়েকটি অফার ও স্পেশাল ডিসকাউন্ট পণ্য নিচে দেওয়া হলো। আপনি সরাসরি চ্যাট থেকেই ব্যাগে যোগ করতে পারেন:`
            : `Here are today's top featured deals with high savings. You can add them directly to your cart:`,
        products: dealProducts,
        actionType: 'deals',
      };
    }

    // 4. Return & Formalin Policy
    if (
      q.includes('return') ||
      q.includes('ফেরত') ||
      q.includes('রিফান্ড') ||
      q.includes('refund') ||
      q.includes('formalin') ||
      q.includes('ফরমালিন') ||
      q.includes('তাজা') ||
      q.includes('নষ্ট')
    ) {
      return {
        text:
          language === 'bn'
            ? `আমাদের ১০০% ফরমালিন-মুক্ত ও কেমিক্যাল-মুক্ত নিশ্চয়তা রয়েছে। ডেলিভারির সময় পণ্য অপছন্দ হলে বা গুণগত মান সন্তোষজনক না হলে দরজাতেই রাইডারকে কোনো চার্জ ছাড়াই তাৎক্ষণিক ফেরত দিতে পারবেন।`
            : `We guarantee 100% formalin-free & chemical-free produce. If you are unsatisfied with freshness upon delivery, you can return it instantly to our rider at your doorstep with zero return fee.`,
      };
    }

    // 5. Payment Methods
    if (
      q.includes('payment') ||
      q.includes('পেমেন্ট') ||
      q.includes('টাকা') ||
      q.includes('bkash') ||
      q.includes('বিকাশ') ||
      q.includes('cod') ||
      q.includes('cash') ||
      q.includes('card')
    ) {
      return {
        text:
          language === 'bn'
            ? `আমরা ক্যাশ অন ডেলিভারি (Cash on Delivery), বিকাশ (bKash Direct), নগদ (Nagad) এবং ভিসা/মাস্টারকার্ড সহ যেকোনো ব্যাংক কার্ড সমর্থন করি। পণ্য হাতে পেয়ে দেখে পরিশোধ করতে পারবেন।`
            : `We support Cash on Delivery (COD), bKash, Nagad, and Visa/Mastercard credit & debit cards. You can pay conveniently after inspecting your fresh produce.`,
      };
    }

    // 6. Branch / Location / Outlets
    if (
      q.includes('branch') ||
      q.includes('ব্রাঞ্চ') ||
      q.includes('দোকান') ||
      q.includes('আউটলেট') ||
      q.includes('outlet') ||
      q.includes('address') ||
      q.includes('ঠিকানা')
    ) {
      return {
        text:
          language === 'bn'
            ? `ঢাকা শহরের ধানমন্ডি, গুলশান, উত্তরা, বনানী এবং মিরপুরে আমাদের সেন্ট্রাল কোল্ড-চেইন এক্সপ্রেস আউটলেট রয়েছে। প্রতিদিন সকাল ৭:০০ টা থেকে রাত ১১:৩০ টা পর্যন্ত ডেলিভারি সচল থাকে।`
            : `We have express cold-chain retail hubs in Dhanmondi, Gulshan, Uttara, Banani, and Mirpur. Our delivery hubs operate from 7:00 AM to 11:30 PM daily.`,
      };
    }

    // 7. Human Agent / Helpline
    if (
      q.includes('agent') ||
      q.includes('মানবধর্মী') ||
      q.includes('representative') ||
      q.includes('কথা') ||
      q.includes('প্রতিনিধি') ||
      q.includes('call') ||
      q.includes('phone') ||
      q.includes('whatsapp')
    ) {
      return {
        text:
          language === 'bn'
            ? `আমাদের ডেডিকেটেড কাস্টমার সাপোর্ট টিমের সাথে সরাসরি হোয়াটসঅ্যাপে চ্যাট করতে বা হেল্পলাইনে কল করতে নিচের অপশন ব্যবহার করুন:`
            : `To speak directly with our human support representative, choose WhatsApp chat or call our 24/7 helpline:`,
        actionType: 'whatsapp',
      };
    }

    // 8. Product Search in Live Catalog
    // Check if the query matches any product name, category, or subcategory
    const matched = products
      .filter((p) => {
        const pName = p.name.toLowerCase();
        const pNameBn = (p.nameBn || '').toLowerCase();
        const pCat = (p.category || '').toLowerCase();
        return (
          pName.includes(q) ||
          pNameBn.includes(q) ||
          pCat.includes(q) ||
          q.includes(pName) ||
          (pNameBn && q.includes(pNameBn))
        );
      })
      .slice(0, 3);

    if (matched.length > 0) {
      return {
        text:
          language === 'bn'
            ? `আপনার সন্ধানের সাথে সম্পর্কিত তাজা পণ্যগুলো পাওয়া গেছে (${matched.length}টি)। পছন্দের পণ্যটি কার্টে যোগ করতে পারেন:`
            : `Found ${matched.length} fresh product(s) matching your request. You can add them directly to your order:`,
        products: matched,
      };
    }

    // Fallback general guidance
    return {
      text:
        language === 'bn'
          ? `ধন্যবাদ! আপনি যেকোনো পণ্যের নাম (যেমন: ডিম, দুধ, মধু, চাল, টমেটো), আজকের অফার, ডেলিভারি বা পেমেন্ট সংক্রান্ত প্রশ্ন করতে পারেন। অথবা সরাসরি আমাদের হেল্পলাইনে কল করতে পারেন।`
          : `Thank you for reaching out! You can ask about any product (e.g. honey, rice, vegetables, fish), today's special deals, delivery timings, or connect with our support helpline.`,
      actionType: 'whatsapp',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate intelligent bot thought delay
    setTimeout(() => {
      const replyData = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: replyData.products,
        actionType: replyData.actionType,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleAddToCartFromChat = (product: ProductItem, e: React.MouseEvent) => {
    addToCart(product, e);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const quickPrompts = [
    { label: language === 'bn' ? 'আজকের অফার' : "Today's Deals", icon: Flame },
    { label: language === 'bn' ? 'ডেলিভারি চার্জ ও সময়' : 'Delivery Times', icon: Truck },
    { label: language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order', icon: MapPin },
    { label: language === 'bn' ? 'রিটার্ন পলিসি' : 'Return Policy', icon: ShieldCheck },
    { label: language === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'WhatsApp Support', icon: Phone },
  ];

  return (
    <>
      {/* FLOATING CHATBOT LAUNCHER BUTTON (Positioned cleanly above mobile bottom nav bar) */}
      {!isOpen && (
        <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 animate-in fade-in zoom-in duration-300">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 p-2.5 sm:px-4 sm:py-3 rounded-full bg-[#123C2D] text-white shadow-2xl hover:bg-[#164B38] border-2 border-[#2EBD70]/70 transition-all active:scale-95 cursor-pointer"
            aria-label="Open Help Center"
          >
            {/* Pulsing Green Online Indicator */}
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EBD70] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#2EBD70]"></span>
            </span>

            <MessageSquare className="w-5 h-5 text-[#2EBD70] transition-transform group-hover:scale-110" />

            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-white leading-none">
                {language === 'bn' ? 'হেল্প সেন্টার ও চ্যাট' : 'Help Center & Chat'}
              </p>
              <p className="text-[10px] text-[#A7F3D0] mt-0.5 font-medium leading-none">
                {language === 'bn' ? 'লাইভ অনলাইন সাপোর্ট' : 'Live Online Assistant'}
              </p>
            </div>
          </button>
        </div>
      )}

      {/* CHATBOT WINDOW DIALOG */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[400px] h-[520px] max-h-[75vh] sm:max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#123C2D] text-white px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-emerald-600/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2EBD70] to-[#16A36A] flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5 text-[#071F15]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2EBD70] border-2 border-[#123C2D]"></span>
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-1.5 leading-tight">
                  <span>{language === 'bn' ? 'ECOBAZAR হেল্প ডেস্ক' : 'ECOBAZAR Help Desk'}</span>
                </h3>
                <p className="text-[11px] text-[#A7F3D0] font-medium leading-none mt-1">
                  {language === 'bn' ? 'তাৎক্ষণিক উত্তর • ২৪/৭ সচল' : 'Instant Replies • 24/7 Supermarket'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([])}
                title={language === 'bn' ? 'চ্যাট ক্লিয়ার করুন' : 'Clear Chat'}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="bg-[#F7F9F5] px-3 py-2 border-b border-neutral-200/60 overflow-x-auto flex items-center gap-1.5 shrink-0">
            {quickPrompts.map((chip, idx) => {
              const IconComp = chip.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip.label)}
                  className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 hover:border-[#21A366] hover:text-[#21A366] whitespace-nowrap shrink-0 transition shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <IconComp className="w-3 h-3 text-[#21A366]" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FBFDFB]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#123C2D] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Interactive Action Cards */}
                  {msg.actionType === 'track' && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsTrackingModalOpen(true);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#21A366] hover:bg-[#1a8553] text-white font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{language === 'bn' ? 'অর্ডার ট্র্যাকিং ওপেন করুন' : 'Open Order Tracker'}</span>
                      </button>
                    </div>
                  )}

                  {msg.actionType === 'whatsapp' && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex flex-wrap gap-2">
                      <a
                        href="https://wa.me/8801700000000?text=Hello%20ECOBAZAR%20Support"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex items-center gap-1.5 transition"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp (01700-000000)</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                      <a
                        href="tel:09612326229"
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-[11px] flex items-center gap-1.5 transition"
                      >
                        <span>📞 09612-ECOBAZAR</span>
                      </a>
                    </div>
                  )}

                  {/* Embedded Products Recommendation */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 space-y-2">
                      {msg.products.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-neutral-50 border border-neutral-200/70"
                        >
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-white shrink-0 border border-neutral-200/50">
                            <img
                              src={prod.image || '/images/products/sundarban-honey.webp'}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-[11px] text-neutral-900 truncate">
                              {language === 'bn' ? prod.nameBn || prod.name : prod.name}
                            </p>
                            <p className="text-[10px] text-[#21A366] font-extrabold mt-0.5">
                              ৳{prod.price}{' '}
                              {prod.originalPrice && (
                                <span className="text-neutral-400 line-through font-normal">
                                  ৳{prod.originalPrice}
                                </span>
                              )}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleAddToCartFromChat(prod, e)}
                            className="px-2.5 py-1 rounded-lg bg-[#21A366] hover:bg-[#1a8553] text-white font-bold text-[10px] shrink-0 flex items-center gap-1 transition shadow-2xs cursor-pointer"
                          >
                            {addedItemMap[prod.id] ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>{language === 'bn' ? 'যোগ হয়েছে' : 'Added'}</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>{language === 'bn' ? 'ব্যাগে নিন' : 'Add'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-neutral-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white p-2.5 rounded-2xl w-24 border border-neutral-200/60 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-neutral-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'কী জানতে চান লিখুন (যেমন: ডেলিভারি, রুই মাছ)...'
                  : 'Ask anything (e.g. delivery, honey, deals)...'
              }
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-neutral-100 border border-transparent focus:border-[#21A366] focus:bg-white focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-8 w-8 rounded-xl bg-[#123C2D] text-white flex items-center justify-center transition disabled:opacity-40 hover:bg-[#1a5540] active:scale-95 cursor-pointer shrink-0"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
