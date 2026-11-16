import {
  UserRole,
  OrderStatus,
  OrderChannel,
  PaymentMethod,
  PaymentStatus,
  BatchStatus,
  StockMovementType,
} from '@ecobazar/constants';

// Re-export constants types
export * from '@ecobazar/constants';

// API Response Envelopes
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T = unknown> {
  success: true;
  statusCode: number;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
  timestamp: string;
  path: string;
  traceId?: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: ApiError;
}

// Authentication & Identity
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  orgId: string;
  branchId?: string | null;
  roles: UserRole[];
  permissions: string[];
  sessionId: string;
  iat?: number;
  exp?: number;
}

export interface AuthSession {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string;
  branchId?: string | null;
  roles: UserRole[];
  permissions: string[];
  accessToken: string;
}

// Core Entity Interfaces
export interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  defaultCurrency: string;
  defaultTimezone: string;
}

export interface BranchSummary {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  city: string;
  division: string;
  phone: string;
  isMainBranch: boolean;
  isActive: boolean;
}

export interface CategorySummary {
  id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
  imageUrl?: string | null;
  displayOrder: number;
}

export interface ProductSummary {
  id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
  skuBase: string;
  vatPercentage: number;
  isPerishable: boolean;
  category?: CategorySummary;
  variants?: ProductVariantSummary[];
}

export interface ProductVariantSummary {
  id: string;
  productId: string;
  nameEn: string;
  nameBn: string;
  sku: string;
  primaryBarcode: string;
  mrp: number;
  defaultSellingPrice: number;
  weightValue?: number | null;
}

export interface ProductBatchSummary {
  id: string;
  variantId: string;
  batchNumber: string;
  manufacturingDate?: string | null;
  expiryDate: string;
  costPrice: number;
  sellingPrice: number;
  quantityAvailable: number;
  status: BatchStatus;
}

export interface InventoryLevelSummary {
  id: string;
  variantId: string;
  batchId: string;
  branchId?: string | null;
  warehouseId?: string | null;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  binLocation?: string | null;
}

export interface OrderItemSummary {
  id: string;
  orderId: string;
  variantId: string;
  batchId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderSummary {
  id: string;
  organizationId: string;
  branchId: string;
  orderNumber: string;
  orderChannel: OrderChannel;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotalAmount: number;
  discountAmount: number;
  vatAmount: number;
  deliveryFee: number;
  totalPayable: number;
  createdAt: string;
  items?: OrderItemSummary[];
}
