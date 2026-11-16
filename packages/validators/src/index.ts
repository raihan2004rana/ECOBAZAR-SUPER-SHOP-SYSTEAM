import { z } from 'zod';
import { PAYMENT_METHODS } from '@ecobazar/constants';

// Authentication
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const phoneOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Must be a valid Bangladesh mobile number'),
});

export type PhoneOtpInput = z.infer<typeof phoneOtpSchema>;

export const verifyOtpSchema = phoneOtpSchema.extend({
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

// Products & Variants
export const createProductSchema = z.object({
  organizationId: z.string().uuid(),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().optional(),
  nameEn: z.string().min(2, 'English name is required'),
  nameBn: z.string().min(2, 'Bangla name is required'),
  skuBase: z.string().min(2, 'Base SKU is required'),
  vatPercentage: z.number().min(0).max(100).default(5),
  isPerishable: z.boolean().default(false),
  shelfLifeDays: z.number().int().positive().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// POS Checkout
export const posCheckoutItemSchema = z.object({
  variantId: z.string().uuid(),
  batchId: z.string().uuid().optional(), // If omitted, backend FEFO engine allocates
  quantity: z.number().positive('Quantity must be greater than zero'),
});

export const posCheckoutSchema = z.object({
  sessionId: z.string().uuid(),
  branchId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  items: z.array(posCheckoutItemSchema).min(1, 'At least one item is required'),
  paymentMethod: z.enum([
    PAYMENT_METHODS.CASH,
    PAYMENT_METHODS.BKASH,
    PAYMENT_METHODS.NAGAD,
    PAYMENT_METHODS.CARD,
    PAYMENT_METHODS.LOYALTY_POINTS,
  ]),
  paidAmount: z.number().positive(),
  idempotencyKey: z.string().uuid(),
});

export type PosCheckoutInput = z.infer<typeof posCheckoutSchema>;

// Stock Adjustment
export const stockAdjustmentSchema = z.object({
  branchId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  variantId: z.string().uuid(),
  batchId: z.string().uuid(),
  quantityDelta: z.number(), // Can be positive (found stock) or negative (damaged)
  reason: z.string().min(5, 'A clear reason for stock adjustment is required'),
});

export type StockAdjustmentInput = z.infer<typeof stockAdjustmentSchema>;
