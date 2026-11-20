'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  Heart,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Phone,
  MessageCircle,
  ArrowRight,
  UploadCloud,
  ThumbsUp,
  RotateCcw,
  Sparkles,
  Share2,
  Flame,
  Tag,
} from 'lucide-react';
import { SiteHeader } from '../../../components/site-header';
import { SiteFooter } from '../../../components/site-footer';
import { CartDrawer } from '../../../components/cart-drawer';
import { WishlistDrawer } from '../../../components/wishlist-drawer';
import { Modals } from '../../../components/modals';
import { ProductCard } from '../../../components/product-card';
import { useCart } from '../../../context/cart-context';
import { useToast } from '@ecobazar/ui';
import {
  getProductById,
  getProductsByCategorySlug,
  getHotDeals,
  getNewArrivals,
  ProductItem,
} from '../../../data/catalog';
import { useCatalog } from '../../../context/catalog-context';

interface ProductPageProps {
  params: {
    id: string;
  };
}

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { getProductById: dynamicGetProductById, products: dynamicProducts } = useCatalog();
  const product = dynamicGetProductById(params.id) || getProductById(params.id);

  if (!product) {
    notFound();
  }

  const { addToCart, wishlistMap, toggleWishlist, setIsCartDrawerOpen, setIsCheckoutModalOpen } =
    useCart();
  const { toast } = useToast();

  const isWishlisted = !!wishlistMap[product.id];
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<'description' | 'reviews'>('description');

  // Multi-image gallery thumbnails (dynamic from product images, no dummy banners)
  const imagesKey = React.useMemo(() => {
    const rawImages = (product as any)?.images;
    if (Array.isArray(rawImages)) {
      return rawImages.filter(Boolean).join('|');
    }
    return product?.image || '';
  }, [(product as any)?.images, product?.image]);

  const galleryImages = React.useMemo(() => {
    const list: string[] = [];
    if (Array.isArray((product as any)?.images) && (product as any).images.length > 0) {
      list.push(...(product as any).images.filter(Boolean));
    } else if (product?.image) {
      list.push(product.image);
    }
    if (product?.image && !list.includes(product.image)) {
      list.unshift(product.image);
    }
    return list.length > 0 ? list : ['/images/products/sundarban-honey.webp'];
  }, [imagesKey, product?.image]);

  const [selectedImage, setSelectedImage] = React.useState<string>(() => galleryImages[0]);

  // Keep user's chosen image active; only fallback if current selection is invalid or product changes
  React.useEffect(() => {
    setSelectedImage((current) => {
      if (current && galleryImages.includes(current)) {
        return current;
      }
      return galleryImages[0] || '';
    });
  }, [product?.id, galleryImages]);

  // Reviews state
  const [reviewsList, setReviewsList] = React.useState<ReviewItem[]>([
    {
      id: 'rev-1',
      author: 'Mohammad Rahim',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      date: '2 days ago',
      comment:
        'The aroma and natural texture are unmatched. Truly raw, pure, and chemical-free. Fast 25-minute delivery in Dhaka was impressive!',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Sharmin Akhter',
      location: 'Gulshan-2, Dhaka',
      rating: 5,
      date: '1 week ago',
      comment:
        'My whole family loves it with morning lemon water. Zero added sugar and authentic wild taste. ECOBAZAR is our trusted family grocery now.',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Tanvir Hossain',
      location: 'Uttara Sector 11',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Packaging is top-notch in hermetic glass jar. Will re-order regularly. 100% recommended!',
      verified: true,
    },
  ]);

  // Review Form state
  const [newRating, setNewRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [reviewerName, setReviewerName] = React.useState('');
  const [reviewerComment, setReviewerComment] = React.useState('');
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);

  // Top promotional slider in product details page
  const [activePromoSlide, setActivePromoSlide] = React.useState(0);
  const [isPromoPaused, setIsPromoPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPromoPaused) return;
    const timer = setInterval(() => {
      setActivePromoSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPromoPaused]);

  // Related products (from same category)
  const relatedProducts = React.useMemo(() => {
    const list = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : getProductsByCategorySlug(product.categorySlug);
    return list
      .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 5);
  }, [dynamicProducts, product.categorySlug, product.id]);

  // Hot deals for cross-marketing
  const hotDeals = React.useMemo(() => {
    const list = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : getHotDeals();
    return list
      .filter((p) => (p.isHotDeal || p.isOffer || (p.originalPrice && p.originalPrice > p.price)) && p.id !== product.id)
      .slice(0, 5);
  }, [dynamicProducts, product.id]);

  // Daily new arrivals for cross-marketing
  const newArrivals = React.useMemo(() => {
    const list = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : getNewArrivals();
    return list
      .filter((p) => p.id !== product.id)
      .slice(0, 5);
  }, [dynamicProducts, product.id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, undefined, quantity);
    setIsCartDrawerOpen(true);
    toast.success('Added to Cart', `${quantity}x ${product.name} added to your basket.`);
  };

  const handleBuyNow = () => {
    addToCart(product, undefined, quantity);
    setIsCheckoutModalOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const total = product.price * quantity;
    const message = encodeURIComponent(
      `Hello ECOBAZAR! I would like to order:\n\n*Product:* ${product.name}\n*Unit:* ${product.unit}\n*Quantity:* ${quantity}\n*Total Price:* ৳${total}\n\nPlease confirm availability and delivery to Dhaka.`
    );
    window.open(`https://wa.me/8801711223344?text=${message}`, '_blank');
  };

  const handleCallOrder = () => {
    window.location.href = 'tel:+8809612000000';
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      toast.error('Missing Fields', 'Please enter your name and review comment.');
      return;
    }
    setIsSubmittingReview(true);

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          author: reviewerName.trim(),
          rating: newRating,
          comment: reviewerComment.trim(),
          category: product.category,
          location: 'Dhaka',
        }),
      });
    } catch (err) {
      console.error('Failed to post review to backend:', err);
    }

    setTimeout(() => {
      const newRev: ReviewItem = {
        id: `rev-${Date.now()}`,
        author: reviewerName.trim(),
        location: 'Verified Buyer, Dhaka',
        rating: newRating,
        date: 'Just now',
        comment: reviewerComment.trim(),
        verified: true,
      };
      setReviewsList([newRev, ...reviewsList]);
      setReviewerName('');
      setReviewerComment('');
      setUploadedFiles([]);
      setIsSubmittingReview(false);
      toast.success('Review Submitted', 'Thank you for sharing your experience!');
    }, 400);
  };

  const handleImageUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles([...uploadedFiles, e.target.files[0].name]);
      toast.info('File Attached', 'Image ready for review submission.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      {/* Site Header */}
      <SiteHeader />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <section className="bg-white border-b border-[#E5ECE7]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs text-[#64736B]">
              <Link href="/" className="hover:text-[#21A366] transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link
                href={`/category/${product.categorySlug}`}
                className="hover:text-[#21A366] transition-colors font-medium"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#17251F] font-bold truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </span>
            </nav>
          </div>
        </section>

        {/* 1. TOP PRODUCT OVERVIEW & BUY BOX */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Gallery (Thumbnails + Main Image) */}
              <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
                {/* Thumbnails strip - ONLY show if there are 2 or more images */}
                {galleryImages.length > 1 && (
                  <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible w-full sm:w-20 shrink-0 pb-2 sm:pb-0">
                    {galleryImages.map((imgSrc, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(imgSrc)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-[#F7F9F5] shrink-0 ${
                          selectedImage === imgSrc
                            ? 'border-[#21A366] shadow-md ring-2 ring-[#21A366]/20'
                            : 'border-[#E5ECE7] hover:border-gray-300 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Large Image Display */}
                <div className="flex-1 relative w-full rounded-2xl sm:rounded-3xl bg-[#F7F9F5] border border-[#E5ECE7] p-6 sm:p-10 flex items-center justify-center overflow-hidden min-h-[340px] sm:min-h-[460px] group">
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#21A366] text-white shadow-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product, e)}
                    aria-label="Wishlist"
                    className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-500 shadow-md'
                        : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-rose-500 hover:bg-white shadow-sm'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Main Product Image with subtle hover zoom */}
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Prev/Next Image Navigation Arrows (only if multi-image) */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const idx = galleryImages.indexOf(selectedImage);
                          const cur = idx >= 0 ? idx : 0;
                          const prevIdx = (cur - 1 + galleryImages.length) % galleryImages.length;
                          setSelectedImage(galleryImages[prevIdx]);
                        }}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const idx = galleryImages.indexOf(selectedImage);
                          const cur = idx >= 0 ? idx : 0;
                          const nextIdx = (cur + 1) % galleryImages.length;
                          setSelectedImage(galleryImages[nextIdx]);
                        }}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Title, Price & Action Buttons */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17251F] leading-tight">
                    {product.name}
                  </h1>
                  {product.nameBn && (
                    <p className="text-sm font-bold text-[#21A366] mt-1">{product.nameBn}</p>
                  )}

                  {/* Rating & Stock row */}
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#E5ECE7]/60 text-xs">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-[#17251F]">{product.rating}</span>
                    <span className="text-[#64736B]">({product.reviews} Customer Reviews)</span>
                    <span className="text-[#21A366] font-bold bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                      ● In Stock
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 p-4 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7]/80">
                  <span className="text-3xl sm:text-4xl font-black text-[#D9531E]">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                      <span className="text-xs font-black bg-[#21A366]/15 text-[#21A366] px-2.5 py-1 rounded-full">
                        Save ৳{product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                  <span className="text-xs text-[#64736B] font-medium ml-auto">
                    {product.unit}
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#17251F]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#E5ECE7] rounded-xl overflow-hidden bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F9F5] text-[#17251F] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-black text-sm text-[#17251F]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F9F5] text-[#17251F] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 4 Primary Action Buttons (Exact Ghorerbazar Layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-[#F26522] hover:bg-[#D9531E] active:scale-95 text-white font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  {/* BUY NOW */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full bg-[#102A27] hover:bg-[#123C2D] active:scale-95 text-white font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    <span>BUY NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Order via WhatsApp */}
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] active:scale-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm hover:shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp</span>
                  </button>

                  {/* Call for Order */}
                  <button
                    type="button"
                    onClick={handleCallOrder}
                    className="w-full bg-[#1A3B8B] hover:bg-[#152E6D] active:scale-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm hover:shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call for Order</span>
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="pt-4 border-t border-[#E5ECE7]/60 space-y-2 text-xs text-[#64736B]">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#17251F]">Brand:</span>
                    <span className="bg-[#E5ECE7]/60 text-[#17251F] font-bold px-2 py-0.5 rounded-md">
                      {product.brand || 'ECOBAZAR Pure'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#17251F]">Origin:</span>
                    <span>{product.origin || 'Organic Certified, Bangladesh'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#17251F]">Category:</span>
                    <Link
                      href={`/category/${product.categorySlug}`}
                      className="text-[#21A366] hover:underline font-bold"
                    >
                      {product.category}
                    </Link>
                  </div>
                </div>

                {/* Value & Delivery Assurances */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E5ECE7]/60 text-xs">
                  <div className="flex items-center gap-2.5 bg-[#F7F9F5] p-3 rounded-xl border border-[#E5ECE7]">
                    <Truck className="w-4 h-4 text-[#21A366] shrink-0" />
                    <span className="font-bold text-[#17251F]">30-Min Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#F7F9F5] p-3 rounded-xl border border-[#E5ECE7]">
                    <ShieldCheck className="w-4 h-4 text-[#21A366] shrink-0" />
                    <span className="font-bold text-[#17251F]">100% Formalin Free</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#F7F9F5] p-3 rounded-xl border border-[#E5ECE7]">
                    <Sparkles className="w-4 h-4 text-[#F4A340] shrink-0" />
                    <span className="font-bold text-[#17251F]">Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#F7F9F5] p-3 rounded-xl border border-[#E5ECE7]">
                    <RotateCcw className="w-4 h-4 text-[#21A366] shrink-0" />
                    <span className="font-bold text-[#17251F]">7 Days Return Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MIDDLE TABBED SECTION (DESCRIPTION & REVIEWS) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl border border-[#E5ECE7] overflow-hidden shadow-xs">
            {/* Tab Buttons */}
            <div className="flex border-b border-[#E5ECE7] bg-[#F7F9F5]">
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 sm:px-8 font-black text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'description'
                    ? 'border-[#21A366] text-[#123C2D] bg-white'
                    : 'border-transparent text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 sm:px-8 font-black text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-[#21A366] text-[#123C2D] bg-white'
                    : 'border-transparent text-[#64736B] hover:text-[#17251F]'
                }`}
              >
                Customer Reviews ({reviewsList.length})
              </button>
            </div>

            {/* Tab 1 Content: Description */}
            {activeTab === 'description' && (
              <div className="p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-[#17251F]">
                {/* Product Details Header */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#17251F] pb-2 border-b-2 border-[#21A366] inline-block">
                    Product Details
                  </h2>
                  {product.description ? (
                    <p className="mt-4 text-[#64736B] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {product.description}
                    </p>
                  ) : (
                    <p className="mt-4 text-[#64736B] leading-relaxed">
                      Fresh and 100% authentic {product.name} sourced under unbroken quality assurance.
                    </p>
                  )}
                </div>

                {/* Key Features - ONLY if provided */}
                {Array.isArray(product.keyFeatures) && product.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#17251F] mb-3">
                      Key Features:
                    </h3>
                    <ul className="space-y-2.5 text-[#64736B]">
                      {product.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium text-xs sm:text-sm">
                            {feat.replace(/^[•\-\*]\s*/, '')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Health Benefits - ONLY if provided */}
                {Array.isArray(product.healthBenefits) && product.healthBenefits.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#17251F] mb-3">
                      Health Benefits:
                    </h3>
                    <ul className="space-y-2.5 text-[#64736B]">
                      {product.healthBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#21A366] shrink-0 mt-1.5" />
                          <span className="leading-relaxed font-medium text-xs sm:text-sm">
                            {benefit.replace(/^[•\-\*]\s*/, '')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How to Use / Recommended Usage - ONLY if provided */}
                {product.howToUse && product.howToUse.trim() ? (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#17251F] mb-3">
                      How to Use / Recommended Usage:
                    </h3>
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9F5] border border-[#E5ECE7] space-y-2.5">
                      {product.howToUse
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#64736B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#21A366] shrink-0 mt-2" />
                            <p className="leading-relaxed">{line.replace(/^[•\-\*]\s*/, '')}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}

                {/* Storage Instructions & Origin - ONLY if provided */}
                {(product.storageInstructions || product.origin || product.countryOfOrigin) && (
                  <div className="p-4 bg-[#F7F9F5] rounded-2xl border border-[#E5ECE7] space-y-2 text-xs">
                    {product.storageInstructions && (
                      <p>
                        <strong className="text-[#17251F]">Storage Instructions:</strong>{' '}
                        {product.storageInstructions}
                      </p>
                    )}
                    {(product.countryOfOrigin || product.origin) && (
                      <p>
                        <strong className="text-[#17251F]">Country of Origin:</strong>{' '}
                        {product.countryOfOrigin || 'Bangladesh'} {product.origin ? `(${product.origin})` : ''}
                      </p>
                    )}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                      <div className="pt-2 border-t border-[#E5ECE7] flex flex-wrap gap-4 text-[#17251F]">
                        {Object.entries(product.specifications).map(([k, v]) => (
                          <span key={k}>
                            <strong>{k}:</strong> {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2 Content: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="p-6 sm:p-10 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Overall Rating Breakdown */}
                  <div className="lg:col-span-5 bg-[#F7F9F5] rounded-2xl p-6 border border-[#E5ECE7] space-y-4">
                    <div className="text-center pb-4 border-b border-[#E5ECE7]">
                      <span className="text-5xl font-black text-[#17251F]">5.0</span>
                      <div className="flex items-center justify-center gap-1 text-amber-400 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-[#64736B] font-bold">
                        Average Rating based on {reviewsList.length} reviews
                      </p>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-2 text-xs">
                      {[
                        { stars: '5 Star', pct: '92%' },
                        { stars: '4 Star', pct: '8%' },
                        { stars: '3 Star', pct: '0%' },
                        { stars: '2 Star', pct: '0%' },
                        { stars: '1 Star', pct: '0%' },
                      ].map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                          <span className="w-12 text-[#64736B] font-bold">{item.stars}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: item.pct }}
                            />
                          </div>
                          <span className="w-8 text-right font-bold text-[#17251F]">{item.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Submit Your Review Form */}
                  <div className="lg:col-span-7">
                    <h3 className="text-lg font-black text-[#17251F] mb-1">Submit Your Review</h3>
                    <p className="text-xs text-[#64736B] mb-4">
                      Your email address will not be published. Required fields are marked *
                    </p>

                    <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                      {/* Star Rating Select */}
                      <div>
                        <label className="block font-bold text-[#17251F] mb-1">Your Rating *</label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 text-gray-300 hover:text-amber-400 transition-colors"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  (hoverRating || newRating) >= star
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block font-bold text-[#17251F] mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Farhan Chowdhury"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] focus:ring-1 focus:ring-[#21A366]"
                        />
                      </div>

                      {/* Review opinion */}
                      <div>
                        <label className="block font-bold text-[#17251F] mb-1">
                          Write your opinion about this product *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={reviewerComment}
                          onChange={(e) => setReviewerComment(e.target.value)}
                          placeholder="What did you like about the freshness, taste, and packaging?"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5ECE7] focus:outline-hidden focus:border-[#21A366] focus:ring-1 focus:ring-[#21A366]"
                        />
                      </div>

                      {/* Drag & drop upload box */}
                      <div>
                        <label className="block font-bold text-[#17251F] mb-1">
                          Upload Photos (Optional)
                        </label>
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E5ECE7] hover:border-[#21A366] rounded-2xl cursor-pointer bg-[#F7F9F5] transition-colors">
                          <UploadCloud className="w-8 h-8 text-[#21A366] mb-1" />
                          <span className="font-bold text-[#17251F]">
                            Drag & drop images here or click to browse files
                          </span>
                          <span className="text-[11px] text-[#64736B]">
                            Supports JPG, PNG (Max 5MB)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUploadSim}
                          />
                        </label>
                        {uploadedFiles.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {uploadedFiles.map((f, i) => (
                              <span
                                key={i}
                                className="bg-[#D8F3DC] text-[#123C2D] font-bold px-2 py-0.5 rounded text-[11px]"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="bg-[#123C2D] hover:bg-[#21A366] text-white font-black px-8 py-3 rounded-xl transition-all shadow-md active:scale-95"
                      >
                        {isSubmittingReview ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Existing Customer Reviews List */}
                <div className="pt-8 border-t border-[#E5ECE7] space-y-4">
                  <h3 className="text-base font-black text-[#17251F]">Verified Buyer Feedback</h3>
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl bg-[#F7F9F5] border border-[#E5ECE7] space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#17251F] text-sm">{rev.author}</span>
                            {rev.verified && (
                              <span className="inline-flex items-center gap-1 bg-[#D8F3DC] text-[#123C2D] px-2 py-0.5 rounded-full text-[10px] font-bold">
                                <Check className="w-3 h-3 text-[#21A366]" />
                                <span>Verified Buyer</span>
                              </span>
                            )}
                          </div>
                          <span className="text-gray-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-[#17251F] leading-relaxed font-medium">{rev.comment}</p>
                        <p className="text-[11px] text-[#64736B]">{rev.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================== */}
        {/* 3. HIGH-IMPACT PROMOTIONAL BANNER SECTION           */}
        {/* Top: 1 large 2-slide banner, Bottom: 2 side-by-side cards */}
        {/* ==================================================== */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Top Wide Card: 2-Slide Banner Slider */}
          <div
            className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#E5ECE7] min-h-[230px] sm:min-h-[270px] md:min-h-[300px] flex items-center justify-between"
            onMouseEnter={() => setIsPromoPaused(true)}
            onMouseLeave={() => setIsPromoPaused(false)}
          >
            {/* Slide 1 */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                activePromoSlide === 0 ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <img
                src="/images/banner-farm-to-table.jpg"
                alt="Direct Farm Harvest"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F15]/80 via-transparent to-black/20" />
            </div>

            {/* Slide 2 */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                activePromoSlide === 1 ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <img
                src="/images/banner-mustard-oil.jpg"
                alt="Cold Pressed Mustard Oil"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F15]/80 via-transparent to-black/20" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl text-white space-y-3">
              <span className="inline-block text-[10px] sm:text-xs font-black tracking-wider uppercase px-3.5 py-1 rounded-full bg-[#2EBD70] text-[#071F15] shadow-sm">
                {activePromoSlide === 0
                  ? 'ORGANIC FARMER CO-OP • 100% FORMALIN FREE'
                  : 'TRADITIONAL COLD-PRESSED • PURE GHANI OILS'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight drop-shadow-md">
                {activePromoSlide === 0
                  ? 'সরাসরি কৃষকের ক্ষেত থেকে নিরাপদ টাটকা খাবার'
                  : 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল ও খাঁটি মশলা'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-lg">
                {activePromoSlide === 0
                  ? 'বগুড়া ও রাজশাহীর ১২০+ সার্টিফাইড অর্গানিক খামার থেকে ভোরে সংগৃহীত সতেজ ফসল সরাসরি আপনার ঘরে।'
                  : 'কোনো কেমিক্যাল বা কৃত্রিম ঝাঁজ ছাড়া প্রাকৃতিক ঘ্রাণ ও পুষ্টিতে ভরপুর খাঁটি দেশি পণ্য।'}
              </p>
              <div className="pt-2">
                <Link
                  href={activePromoSlide === 0 ? '/category/fresh-fruits-vegetables' : '/category/spices-oils'}
                  className="inline-flex items-center gap-2 bg-[#21A366] hover:bg-[#123C2D] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <span>{activePromoSlide === 0 ? 'Explore Fresh Harvest' : 'Shop Spices & Oils'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={() => setActivePromoSlide((prev) => (prev === 0 ? 1 : 0))}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActivePromoSlide((prev) => (prev === 0 ? 1 : 0))}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#123C2D] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActivePromoSlide(0)}
                className={`transition-all duration-300 rounded-full ${
                  activePromoSlide === 0 ? 'w-6 h-2 bg-[#2EBD70]' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label="Slide 1"
              />
              <button
                type="button"
                onClick={() => setActivePromoSlide(1)}
                className={`transition-all duration-300 rounded-full ${
                  activePromoSlide === 1 ? 'w-6 h-2 bg-[#2EBD70]' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label="Slide 2"
              />
            </div>
          </div>

          {/* Bottom 2 Cards Side-by-Side: Full Card Background as Banner Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Card 1: Tasty Seafood Daily Series */}
            <Link
              href="/category/meat-fish"
              className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:border-[#21A366]/50 transition-all duration-300 min-h-[210px] sm:min-h-[240px] flex flex-col justify-end p-6"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/banner-seafood.jpg"
                  alt="Tasty Seafood Daily Series"
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F15]/95 via-[#0A261B]/50 to-transparent" />
              </div>
              <div className="relative z-10 text-white space-y-1.5">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F4A340] text-[#17251F] shadow-xs">
                  DAILY FRESH CATCH
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#D8F3DC] transition-colors drop-shadow-sm">
                  Tasty Seafood & River Fish Series
                </h3>
                <p className="text-xs text-white/90 font-medium line-clamp-1">
                  Fresh Padma Hilsha, giant tiger prawns & river Katla on fresh ice.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2EBD70] group-hover:text-white pt-1 transition-colors">
                  <span>Explore Meat & Fish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 2: Traditional Bogura Doi & Dairy */}
            <Link
              href="/category/dairy-eggs"
              className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E5ECE7] hover:border-[#21A366]/50 transition-all duration-300 min-h-[210px] sm:min-h-[240px] flex flex-col justify-end p-6"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/banner-bogura-doi.jpg"
                  alt="ঐতিহ্যবাহী বগুড়ার দই"
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F15]/95 via-[#0A261B]/50 to-transparent" />
              </div>
              <div className="relative z-10 text-white space-y-1.5">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#21A366] text-white shadow-xs">
                  AUTHENTIC SPECIALTY
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#D8F3DC] transition-colors drop-shadow-sm">
                  ঐতিহ্যবাহী বগুড়ার স্পেশাল সরার মিষ্টি দই
                </h3>
                <p className="text-xs text-white/90 font-medium line-clamp-1">
                  Pure clay-pot curd, artisan butter, farm eggs and cow milk.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A340] group-hover:text-white pt-1 transition-colors">
                  <span>Order Fresh Dairy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ==================================================== */}
        {/* 4. RELATED PRODUCTS SECTION                          */}
        {/* ==================================================== */}
        {relatedProducts.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5ECE7]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">Related Products</h2>
                  <p className="text-xs text-[#64736B] mt-0.5">
                    Customers also viewed these items in {product.category}
                  </p>
                </div>
                <Link
                  href={`/category/${product.categorySlug}`}
                  className="text-xs font-bold text-[#21A366] hover:text-[#123C2D] transition-colors flex items-center gap-1"
                >
                  <span>View All in {product.category.split(' ')[0]}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* 5. SPECIAL DEALS & OFFERS SECTION (CROSS-MARKETING) */}
        {/* ==================================================== */}
        {hotDeals.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5ECE7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 fill-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">
                      Special Deals & Hot Offers
                    </h2>
                    <p className="text-xs text-[#64736B] mt-0.5">
                      Limited time discounts on fresh produce, groceries & pantry essentials
                    </p>
                  </div>
                </div>
                <Link
                  href="/deals"
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1"
                >
                  <span>Explore All Deals</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {hotDeals.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* 6. DAILY FRESH HARVEST & NEW ARRIVALS (MARKETING)    */}
        {/* ==================================================== */}
        {newArrivals.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5ECE7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17251F]">
                      Daily Fresh Harvest & New Arrivals
                    </h2>
                    <p className="text-xs text-[#64736B] mt-0.5">
                      Harvested at sunrise from partner organic cooperatives across Dhaka & North Bengal
                    </p>
                  </div>
                </div>
                <Link
                  href="/new-arrivals"
                  className="text-xs font-bold text-[#21A366] hover:text-[#123C2D] transition-colors flex items-center gap-1"
                >
                  <span>View All New Arrivals</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {newArrivals.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Cart Drawer, Wishlist Drawer & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <Modals />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
