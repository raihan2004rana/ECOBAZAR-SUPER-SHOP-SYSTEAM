/**
 * ECOBAZAR System Constants & Brand Configurations
 */

export const SYSTEM_DEFAULTS = {
  CURRENCY_CODE: 'BDT',
  CURRENCY_SYMBOL: '৳',
  TIMEZONE: 'Asia/Dhaka',
  PRIMARY_LOCALE: 'en',
  SECONDARY_LOCALE: 'bn',
  TAX_RATE_DEFAULT: 0.05, // 5% VAT
  PAGINATION_LIMIT_DEFAULT: 20,
  PAGINATION_LIMIT_MAX: 100,
} as const;

export const BRAND_COLORS = {
  FOREST_GREEN: '#123C2D',
  PRIMARY_GREEN: '#21A366',
  MINT: '#D8F3DC',
  OFF_WHITE: '#F7F9F5',
  ACCENT_ORANGE: '#F4A340',
  SUCCESS: '#21A366',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  DISABLED: '#94A3B8',
  NEUTRAL: '#64748B',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  OWNER: 'OWNER',
  BRANCH_MANAGER: 'BRANCH_MANAGER',
  INVENTORY_MANAGER: 'INVENTORY_MANAGER',
  CASHIER: 'CASHIER',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  ACCOUNTANT: 'ACCOUNTANT',
  STAFF: 'STAFF',
  WAREHOUSE_STAFF: 'WAREHOUSE_STAFF',
  DELIVERY_PERSONNEL: 'DELIVERY_PERSONNEL',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const PERMISSIONS = {
  PRODUCTS_READ: 'products.read',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_UPDATE: 'products.update',
  PRODUCTS_DELETE: 'products.delete',
  INVENTORY_READ: 'inventory.read',
  INVENTORY_ADJUST: 'inventory.adjust',
  INVENTORY_TRANSFER: 'inventory.transfer',
  ORDERS_READ: 'orders.read',
  ORDERS_MANAGE: 'orders.manage',
  SALES_CREATE: 'sales.create',
  SALES_REFUND: 'sales.refund',
  PURCHASES_CREATE: 'purchases.create',
  CAMPAIGNS_MANAGE: 'campaigns.manage',
  REPORTS_READ: 'reports.read',
  BRANCHES_MANAGE: 'branches.manage',
  USERS_MANAGE: 'users.manage',
  SETTINGS_MANAGE: 'settings.manage',
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ORDER_CHANNELS = {
  POS_STORE: 'POS_STORE',
  ONLINE_WEB: 'ONLINE_WEB',
  ONLINE_APP: 'ONLINE_APP',
} as const;

export type OrderChannel = (typeof ORDER_CHANNELS)[keyof typeof ORDER_CHANNELS];

export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export const PAYMENT_METHODS = {
  CASH: 'CASH',
  BKASH: 'BKASH',
  NAGAD: 'NAGAD',
  CARD: 'CARD',
  LOYALTY_POINTS: 'LOYALTY_POINTS',
  GIFT_VOUCHER: 'GIFT_VOUCHER',
} as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_STATUSES = {
  UNPAID: 'UNPAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];

export const BATCH_STATUSES = {
  ACTIVE: 'ACTIVE',
  NEAR_EXPIRY: 'NEAR_EXPIRY',
  EXPIRED: 'EXPIRED',
  EXHAUSTED: 'EXHAUSTED',
  QUARANTINED: 'QUARANTINED',
} as const;

export type BatchStatus = (typeof BATCH_STATUSES)[keyof typeof BATCH_STATUSES];

export const STOCK_MOVEMENT_TYPES = {
  PURCHASE_RECEIPT: 'PURCHASE_RECEIPT',
  POS_SALE: 'POS_SALE',
  ONLINE_SALE: 'ONLINE_SALE',
  INTER_BRANCH_TRANSFER_OUT: 'INTER_BRANCH_TRANSFER_OUT',
  INTER_BRANCH_TRANSFER_IN: 'INTER_BRANCH_TRANSFER_IN',
  CUSTOMER_RETURN: 'CUSTOMER_RETURN',
  DAMAGE_WASTE: 'DAMAGE_WASTE',
  STOCK_AUDIT_ADJUSTMENT: 'STOCK_AUDIT_ADJUSTMENT',
} as const;

export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[keyof typeof STOCK_MOVEMENT_TYPES];
