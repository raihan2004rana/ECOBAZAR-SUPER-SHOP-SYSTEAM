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
  const discountAmount =
    appliedCoupon === 'ECO10'
      ? Math.round(cartSubtotal * 0.1)
      : appliedCoupon === 'DHAKA25'
      ? Math.min(100, cartSubtotal)
      : 0;
  const deliveryFee = cartSubtotal >= 1000 || appliedCoupon === 'FREESHIP' ? 0 : 50;
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ECO10') {
      setAppliedCoupon('ECO10');
      toast.success('Coupon Applied!', '10% discount applied to your subtotal.');
      return true;
    }
    if (clean === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      toast.success('Coupon Applied!', 'Free delivery granted on this order.');
      return true;
    }
    if (clean === 'DHAKA25') {
      setAppliedCoupon('DHAKA25');
      toast.success('Coupon Applied!', '৳100 Instant Discount applied.');
      return true;
    }
    toast.error('Invalid Voucher', 'Code not recognized. Try "ECO10", "FREESHIP", or "DHAKA25".');
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
