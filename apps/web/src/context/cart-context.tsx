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
  addToCart: (product: ProductItem, e?: React.MouseEvent) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addedFeedback: Record<string, boolean>;

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
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        } else {
          // Default initial items
          setCartItems([
            { product: masterCatalogProducts[0], quantity: 2 },
            { product: masterCatalogProducts[1], quantity: 1 },
          ]);
        }
      } else {
        setCartItems([
          { product: masterCatalogProducts[0], quantity: 2 },
          { product: masterCatalogProducts[1], quantity: 1 },
        ]);
      }

      const storedWishlist = localStorage.getItem('ecobazar_wishlist_v4');
      if (storedWishlist) {
        setWishlistMap(JSON.parse(storedWishlist));
      }
    } catch {
      // Fallback
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

  // Totals
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon === 'ECO10' ? Math.round(cartSubtotal * 0.1) : 0;
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
    toast.error('Invalid Voucher', 'Code not recognized. Try "ECO10" or "FREESHIP".');
    return false;
  };

  const addToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.warning('Stock Limit', `Only ${product.stock} units available in stock.`);
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setAddedFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);

    toast.success('Added to Cart', `${product.name} (৳${product.price}) added.`);
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
            return { ...entry, quantity: Math.max(1, nextQty) };
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
    const orderNum = `ORD-202611-${Math.floor(1000 + Math.random() * 9000)}`;
    clearCart();
    setIsCheckoutModalOpen(false);
    setIsCartDrawerOpen(false);
    toast.success('Order Placed Successfully!', `Order #${orderNum} confirmed. Delivery in ~${selectedBranch.deliveryTime}.`);
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
