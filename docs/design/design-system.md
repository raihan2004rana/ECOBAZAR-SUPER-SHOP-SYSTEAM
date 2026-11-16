# ECOBAZAR — Enterprise Design System & Component Library

## 1. Brand Identity & Visual Philosophy

ECOBAZAR is a commercial-grade, multi-branch supermarket operating system and omnichannel retail platform engineered for Bangladesh.

### Brand Personality Attributes
- **Premium & Modern**: Sophisticated, clean layout with deliberate whitespace and refined typography.
- **Fresh & Eco-Conscious**: Rooted in organic farm freshness, sustainability, and quality assurance.
- **Trustworthy & Transparent**: Explicit batch expiry indicators, real-time stock levels, and precise BDT (৳) pricing with zero ambiguity.
- **Intelligent & Efficient**: Built for high-throughput retail operations — from instant POS barcode checkouts to deep multi-warehouse replenishment.
- **Bilingual Inclusivity**: First-class, balanced typography and layout support for both English and Bangla scripts.

---

## 2. Design Tokens

### 2.1. Brand Core Colors

| Token Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **Forest Green** | `#123C2D` | Master brand signature, deep header surfaces, hero sections, primary branding |
| **Primary Green** | `#21A366` | Primary action buttons, interactive controls, active pagination, in-stock badges |
| **Mint** | `#D8F3DC` | Subtle surface highlights, pill badge backdrops, table accenting, light tags |
| **Off White** | `#F7F9F5` | Canvas background, soft neutral card fill, high-contrast readable base |
| **Accent Orange** | `#F4A340` | Promotional callouts, flash sales, discount tags, near-expiry alerts |

### 2.2. Semantic Colors

| Semantic Role | Primary Shade | 50-Shade (Light BG) | Usage Scenarios |
| :--- | :--- | :--- | :--- |
| **Success** | `#21A366` / `#16A34A` | `#F0FDF4` | In-Stock, Payment Verified, Order Delivered, Active Branch |
| **Warning** | `#F59E0B` / `#D97706` | `#FFFBEB` | Low Stock Alert, Expiring within 7 Days, Pending Dual Approval |
| **Error / Danger** | `#EF4444` / `#DC2626` | `#FEF2F2` | Out of Stock, Transaction Failed, Inactive Branch, Session Revoked |
| **Information** | `#3B82F6` / `#2563EB` | `#EFF6FF` | Processing Status, System Audit Log, Warehouse Transfer in Transit |
| **Neutral** | `#64748B` / `#475569` | `#F8FAFC` | Subtitles, Secondary Metadata, Table Borders, Disabled Controls |

### 2.3. Typography System

- **English Font**: `Inter` / `Manrope`, with `sans-serif` system fallbacks.
- **Bangla Font**: `Hind Siliguri`, loaded via Next.js Google font optimization with zero layout shift.
- **Numeric Formatting**: `font-variant-numeric: tabular-nums;` across all monetary amounts, invoices, carts, and POS ledgers.

| Scale Token | Desktop Size | Mobile Size | Line Height | Weight | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | 48px / 3.0rem | 36px / 2.25rem | 1.15 | 800 (Extrabold) | Hero Marketing Headlines |
| `h1` | 36px / 2.25rem | 28px / 1.75rem | 1.25 | 700 (Bold) | Dashboard & Page Titles |
| `h2` | 30px / 1.875rem | 24px / 1.5rem | 1.30 | 700 (Bold) | Section Headers |
| `h3` | 24px / 1.5rem | 20px / 1.25rem | 1.35 | 600 (Semibold) | Category & Modal Headers |
| `h4` | 20px / 1.25rem | 18px / 1.125rem | 1.40 | 600 (Semibold) | Card Titles, Metric Blocks |
| `body-lg` | 18px / 1.125rem | 16px / 1.0rem | 1.50 | 400 / 500 | Hero Subtext, Featured Summaries |
| `body` | 16px / 1.0rem | 15px / 0.9375rem | 1.50 | 400 / 500 | Standard Body Text, Form Labels |
| `caption` | 14px / 0.875rem | 13px / 0.8125rem | 1.45 | 400 / 500 | Metadata, Secondary Labels |
| `small` | 12px / 0.75rem | 11px / 0.6875rem | 1.40 | 500 / 600 | Badges, Timestamp, Audit Tags |

---

## 3. Reusable UI Component Library (`@ecobazar/ui`)

All components reside in `packages/ui` and are built using React, TypeScript strict typing, Tailwind CSS, Class Variance Authority (`cva`), and Lucide icons.

### Component Index (24 Components)

| # | Component | Primary Responsibility | Key Props |
| :--- | :--- | :--- | :--- |
| 1 | `Button` | Interactive trigger with 8 visual variants, 4 sizes, icon slots, and animated spinner loading state | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon` |
| 2 | `Input` | Text/search input with labels, helper texts, error states, and left/right icon adornments | `label`, `error`, `helperText`, `leftIcon`, `rightIcon` |
| 3 | `Textarea` | Multi-line text field with dynamic character count, error display, and accessible labels | `label`, `error`, `helperText`, `showCharCount`, `maxLength` |
| 4 | `Select` | Dropdown selector with chevron icon, error messaging, and accessible label integration | `label`, `error`, `options`, `helperText` |
| 5 | `Checkbox` | Custom styled checkable control supporting checked, unchecked, indeterminate, and error states | `label`, `description`, `error`, `indeterminate` |
| 6 | `RadioGroup` & `Radio` | Accessible single-choice group with circular inner dot indicators and orientation modes | `orientation`, `label`, `error`, `description` |
| 7 | `Switch` | Smooth toggle switch supporting `sm`, `default`, `lg` sizes with accessible `role="switch"` | `label`, `description`, `size`, `checked` |
| 8 | `Badge` | Visual tags for statuses with 10 semantic variants, 3 sizes, and live pulsating dot indicators | `variant`, `size`, `dot` |
| 9 | `Avatar` | Identity component with image fallback, auto initials generator, and presence status indicators | `src`, `name`, `initials`, `size`, `status`, `shape` |
| 10 | `Tooltip` | Hover & focus accessible popover with 4 directional arrows (`top`, `bottom`, `left`, `right`) | `content`, `position`, `delayMs` |
| 11 | `Dropdown` | Accessible menu with `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator` | `align`, `width`, `variant="danger"` |
| 12 | `Dialog` / `Modal` | Centered modal with backdrop blur, keyboard `Escape` dismiss, scroll lock, and portal support | `open`, `onOpenChange`, `size` |
| 13 | `Drawer` | Slide-out sheet from `right`, `left`, `top`, or `bottom` with backdrop blur and header/body/footer | `open`, `onOpenChange`, `position`, `size` |
| 14 | `Tabs` | Tab navigation with `underline`, `pills`, and `enclosed` visual styles | `value`, `onValueChange`, `variant` |
| 15 | `Card` | Structured content container with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `className`, `children` |
| 16 | `DataTable` | Generic typed table with sortable columns, dense mode, zebra striping, and loading skeleton rows | `data`, `columns`, `keyExtractor`, `sortBy`, `sortDirection`, `onSort` |
| 17 | `Pagination` | Accessible pagination with smart ellipsis algorithm (`1, 2, ..., 10`), edge buttons, and count summary | `currentPage`, `totalPages`, `onPageChange`, `totalItems` |
| 18 | `Breadcrumb` | Trail navigation with customizable separators, icon slots, and `aria-current="page"` | `items`, `separator` |
| 19 | `Toast` & `ToastProvider` | Event-driven toast notifications (`success`, `warning`, `error`, `info`) with auto-dismiss and close buttons | `useToast().toast.success(...)`, `duration` |
| 20 | `Skeleton` | Pulse animated placeholder shapes (`text`, `circular`, `rectangular`, `card`) for async loading | `variant`, `width`, `height` |
| 21 | `LoadingSpinner` | Multi-size, multi-color SVG circular progress spinner | `size`, `variant` |
| 22 | `EmptyState` | Empty feedback container with icon slot, title, description, and primary/secondary CTA actions | `icon`, `title`, `description`, `action` |
| 23 | `ConfirmationDialog` | Danger/warning modal with intent icons, dual actions, and asynchronous button loading | `intent`, `title`, `description`, `onConfirm`, `isLoading` |
| 24 | `PriceDisplay` | Localized BDT (৳) financial formatter with original price strikethrough and size variations | `amount`, `originalAmount`, `currencySymbol`, `size` |

---

## 4. Customer Website vs. Admin Dashboard UI Philosophy

| Dimension | Customer Website (`apps/web`) | Admin & POS Dashboard (`apps/admin`) |
| :--- | :--- | :--- |
| **Atmosphere** | Warm, inviting, consumer-friendly grocery store | Professional, data-dense enterprise SaaS |
| **Color Density** | Generous Mint (`#D8F3DC`) and Off White (`#F7F9F5`) canvas | Crisp neutral slate borders with Forest Green accenting |
| **Data Layout** | Visual product cards, imagery, discount tags, ratings | Structured Data Tables, dense metrics, quick action menus |
| **Interactions** | Add-to-cart, filter drawers, localized search bar | Barcode scan input, batch selector, branch toggle, tab switching |
| **Typography** | Prominent bilingual headers and promotional badges | Compact tabular-numbers, monospaced SKUs and transaction IDs |

---

## 5. Accessibility & Motion Standards

### WCAG 2.1 AA Compliance
1. **Color Contrast**: All primary text maintains a minimum contrast ratio of 4.5:1 against surfaces (Forest Green `#123C2D` on white achieves >11:1).
2. **Keyboard Navigation**:
   - `Tab` & `Shift+Tab` across interactive elements.
   - `Escape` dismisses all active modals, drawers, and dropdown menus.
   - `Enter` / `Space` activates buttons, switches, and checkboxes.
3. **Focus Indicators**: Consistent `focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2` styling.
4. **ARIA Roles**: Explicit `role="dialog"`, `role="switch"`, `role="tablist"`, `role="tab"`, `role="alert"`, `aria-checked`, and `aria-current="page"`.

### Selective Motion Guidelines
- Standard transition duration: `150ms` to `200ms` with `ease-out`.
- Modal and drawer entrance: Subtle fade-in (`fade-in-0 zoom-in-95` or slide-in from screen edge).
- Micro-interactions: Button active scale down (`active:scale-[0.98]`).
- Screen reader accessibility: Motion respects `prefers-reduced-motion: reduce`.

---

## 6. Live Interactive Showcase

The design system can be visually inspected and tested by navigating to:
```
http://localhost:3000/design-system
```
This page includes live interactive tests for every component, color swatch, typography hierarchy, dialog trigger, drawer slide-over, data table sorting, pagination, and toast notification dispatches.
