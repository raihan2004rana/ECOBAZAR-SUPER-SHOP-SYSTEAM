'use client';

import * as React from 'react';
import { ProductItem, StoreBranch, storeBranches, masterCatalogProducts } from '../data/catalog';
import { useToast } from '@ecobazar/ui';

export interface CartEntry {
  product: ProductItem;
  quantity: number;
}

interface CartContextType {
  cartItems: CartEntry[];
  totalCartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  deliveryFee: number;
  cartGrandTotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  addToCart: (product: ProductItem, e?: React.MouseEvent, quantityToAdd?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  reorderProducts: (items: Array<{ productId: string; name: string; price: number; quantity: number; unit?: string; image?: string }>) => void;
  addedFeedback: Record<string, boolean>;
  isHydrated: boolean;

  // Wishlist
  wishlistMap: Record<string, boolean>;
  wishlistProducts: ProductItem[];
  toggleWishlist: (product: ProductItem, e?: React.MouseEvent) => void;

  // Overlays & Modals
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  selectedProductForModal: ProductItem | null;
  setSelectedProductForModal: (product: ProductItem | null) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isBranchModalOpen: boolean;
  setIsBranchModalOpen: (open: boolean) => void;
  selectedBranch: StoreBranch;
  setSelectedBranch: (branch: StoreBranch) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  handlePlaceOrder: () => string;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [cartItems, setCartItems] = React.useState<CartEntry[]>([]);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = React.useState<Record<string, boolean>>({});

  const [wishlistMap, setWishlistMap] = React.useState<Record<string, boolean>>({});

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = React.useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = React.useState<ProductItem | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<StoreBranch>(storeBranches[0]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = React.useState(false);

  // Rehydrate on client mount
  React.useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ecobazar_cart_v4');
      if (storedCart !== null) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }

      const storedWishlist = localStorage.getItem('ecobazar_wishlist_v4');
      if (storedWishlist !== null) {
        const parsedWish = JSON.parse(storedWishlist);
        if (parsedWish && typeof parsedWish === 'object') {
          setWishlistMap(parsedWish);
        }
      }

      const storedBranchId = localStorage.getItem('ecobazar_branch_v4');
      if (storedBranchId) {
        const found = storeBranches.find((b) => b.id === storedBranchId);
        if (found) setSelectedBranch(found);
      }
    } catch {
      // Fallback safely
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync Cart
  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('ecobazar_cart_v4', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems, isHydrated]);

  // Sync Wishlist
  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('ecobazar_wishlist_v4', JSON.stringify(wishlistMap));
    } catch {}
  }, [wishlistMap, isHydrated]);

  // Sync Branch
  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('ecobazar_branch_v4', selectedBranch.id);
    } catch {}
  }, [selectedBranch, isHydrated]);

  // Totals
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = React.useMemo(() => {
    if (!appliedCoupon) return 0;
    const clean = appliedCoupon.toUpperCase();
    if (clean === 'GOLDSECRET15') return Math.round(cartSubtotal * 0.15);
    if (clean === 'VIPGIFT300') return Math.min(300, cartSubtotal);
    if (clean === 'KATLA10') return Math.round(cartSubtotal * 0.1);
    if (clean === 'ECO10' || clean === 'GOLDVIP10') return Math.round(cartSubtotal * 0.1);
    if (clean === 'HARVEST15') return Math.round(cartSubtotal * 0.15);
    if (clean === 'DHAKA25' || clean === 'BEEF100') return Math.min(100, cartSubtotal);
    if (clean === 'WELCOME200') return Math.min(200, cartSubtotal);
    if (clean.startsWith('POINTS')) {
      const pts = parseInt(clean.replace('POINTS', ''), 10);
      if (!isNaN(pts)) return Math.min(pts, cartSubtotal);
    }
    // General numeric pattern match (e.g. VIP20 -> 20%)
    if (clean.includes('20')) return Math.round(cartSubtotal * 0.2);
    if (clean.includes('15')) return Math.round(cartSubtotal * 0.15);
    if (clean.includes('10')) return Math.round(cartSubtotal * 0.1);
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  const deliveryFee = cartSubtotal >= 1000 || appliedCoupon === 'FREESHIP' || appliedCoupon === 'VIPFREESHIP' ? 0 : 50;
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOLDSECRET15') {
      setAppliedCoupon('GOLDSECRET15');
      toast.success('Secret VIP Coupon Applied!', '15% Gold VIP exclusive discount deducted.');
      return true;
    }
    if (clean === 'KATLA10') {
      setAppliedCoupon('KATLA10');
      toast.success('Fish Special Applied!', '10% discount on fresh catch applied.');
      return true;
    }
    if (clean === 'VIPGIFT300') {
      setAppliedCoupon('VIPGIFT300');
      toast.success('VIP Milestone Gift Applied!', '৳300 flat credit deducted.');
      return true;
    }
    if (clean === 'ECO10' || clean === 'GOLDVIP10') {
      setAppliedCoupon(clean);
      toast.success('VIP Coupon Applied!', '10% discount applied to your order.');
      return true;
    }
    if (clean === 'HARVEST15') {
      setAppliedCoupon('HARVEST15');
      toast.success('Coupon Applied!', '15% Farm Harvest discount applied.');
      return true;
    }
    if (clean === 'FREESHIP' || clean === 'VIPFREESHIP') {
      setAppliedCoupon(clean);
      toast.success('Coupon Applied!', 'Free Express Delivery granted on this order.');
      return true;
    }
    if (clean === 'DHAKA25' || clean === 'BEEF100') {
      setAppliedCoupon(clean);
      toast.success('Coupon Applied!', '৳100 Instant Discount applied.');
      return true;
    }
    if (clean === 'WELCOME200') {
      setAppliedCoupon('WELCOME200');
      toast.success('Bonus Applied!', '৳200 Mega Voucher discount applied.');
      return true;
    }
    if (clean.startsWith('POINTS')) {
      setAppliedCoupon(clean);
      const pts = parseInt(clean.replace('POINTS', ''), 10);
      toast.success('Points Voucher Applied!', `৳${pts} deducted from subtotal.`);
      return true;
    }
    // Generic VIP or promotional code handler
    if (clean.startsWith('VIP') || clean.startsWith('GOLD') || clean.startsWith('ECO')) {
      setAppliedCoupon(clean);
      toast.success('Promotional Code Applied!', 'Member special discount applied.');
      return true;
    }
    toast.error('Invalid Voucher', 'Code not recognized. Check your Profile for active vouchers.');
    return false;
  };

  const addToCart = (product: ProductItem, e?: React.MouseEvent, quantityToAdd: number = 1) => {
    if (e) e.stopPropagation();

    const qty = Math.max(1, quantityToAdd);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const targetQty = existing.quantity + qty;
        if (targetQty > product.stock) {
          toast.warning('Stock Limit', `Only ${product.stock} units available in stock.`);
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: product.stock } : item
          );
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: targetQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, qty) }];
    });

    setAddedFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);

    toast.success(
      'Added to Cart',
      `${qty > 1 ? `${qty}x ` : ''}${product.name} (৳${product.price * qty}) added.`
    );
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) => {
          if (entry.product.id === productId) {
            const nextQty = entry.quantity + delta;
            if (nextQty > entry.product.stock) {
              toast.warning('Stock Limit', `Maximum available stock is ${entry.product.stock}`);
              return entry;
            }
            return { ...entry, quantity: nextQty };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info('Item Removed', 'Product removed from your cart.');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart Cleared', 'All items removed from your shopping cart.');
  };

  const toggleWishlist = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const curr = wishlistMap[product.id] || false;
    const next = !curr;
    setWishlistMap((prev) => ({ ...prev, [product.id]: next }));
    if (next) {
      toast.success('Wishlist Updated', `${product.name} added to saved items.`);
    } else {
      toast.info('Wishlist Updated', `${product.name} removed from saved items.`);
    }
  };

  const wishlistProducts = masterCatalogProducts.filter((p) => wishlistMap[p.id]);

  const reorderProducts = (
    items: Array<{ productId: string; name: string; price: number; quantity: number; unit?: string; image?: string }>
  ) => {
    if (!items || items.length === 0) return;

    setCartItems((prev) => {
      const nextCart = [...prev];
      items.forEach((item) => {
        const foundProduct = masterCatalogProducts.find((p) => p.id === item.productId);
        const productToAdd: ProductItem = foundProduct || {
          id: item.productId,
          name: item.name,
          nameBn: item.name,
          category: 'Groceries & Staples',
          categorySlug: 'groceries-staples',
          brand: 'ECOBAZAR Pure',
          origin: 'Bangladesh',
          price: item.price,
          unit: item.unit || '1 unit',
          stock: 50,
          image: item.image || '/images/products/red-apple.webp',
          rating: 4.9,
          reviews: 120,
          description: item.name,
          specifications: {},
        };

        const existingIdx = nextCart.findIndex((c) => c.product.id === productToAdd.id);
        if (existingIdx >= 0) {
          nextCart[existingIdx] = {
            ...nextCart[existingIdx],
            quantity: nextCart[existingIdx].quantity + item.quantity,
          };
        } else {
          nextCart.push({ product: productToAdd, quantity: item.quantity });
        }
      });
      return nextCart;
    });

    setIsCartDrawerOpen(true);
    toast.success('Items Added to Cart', `${items.length} items from previous order loaded into your cart.`);
  };

  const handlePlaceOrder = (): string => {
    const orderNum = `ECO-DH-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    setIsCartDrawerOpen(false);
    return orderNum;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartCount,
        cartSubtotal,
        discountAmount,
        deliveryFee,
        cartGrandTotal,
        appliedCoupon,
        applyCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        reorderProducts,
        addedFeedback,
        isHydrated,
        wishlistMap,
        wishlistProducts,
        toggleWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isBranchModalOpen,
        setIsBranchModalOpen,
        selectedBranch,
        setSelectedBranch,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        handlePlaceOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
