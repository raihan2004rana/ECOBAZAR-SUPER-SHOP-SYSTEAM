# ECOBAZAR — Design System & UI/UX Architecture

## 1. Brand Identity & Personality

ECOBAZAR represents a new standard of modern grocery retail in Bangladesh. The design language conveys:
- **Fresh & Organic**: Emphasizing farm-to-shelf freshness, clean living, and environmental responsibility.
- **Trustworthy & Reliable**: Clear pricing, transparent batch expiry indicators, and bulletproof checkout clarity.
- **Intelligent & Efficient**: Fast navigation, zero-clutter POS workflows, and smart predictive search.
- **Bilingual Inclusivity**: Equal visual hierarchy and typography harmony across English and Bangla scripts.

---

## 2. Design Tokens

### 2.1. Color System

```css
/* ECOBAZAR Master Palette */
:root {
  /* Brand Core */
  --ecobazar-forest-green: #123C2D;  /* Primary Brand, Deep Headers, Dark Base */
  --ecobazar-primary-green: #21A366; /* Interactive Action, Buttons, In-Stock Badges */
  --ecobazar-mint: #D8F3DC;          /* Soft Accents, Card Highlights, Pill Backdrops */
  --ecobazar-off-white: #F7F9F5;     /* Page Backgrounds, Crisp Clean Surface */
  --ecobazar-accent-orange: #F4A340; /* CTAs, Discounts, Flash Sales, Near-Expiry Badges */

  /* Neutral Slate Palette */
  --slate-50:  #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-300: #cbd5e1;
  --slate-400: #94a3b8;
  --slate-500: #64748b;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-800: #1e293b;
  --slate-900: #0f172a;
  --slate-950: #020617;

  /* Semantic Feedback */
  --success: #21A366;
  --warning: #F59E0B;
  --destructive: #EF4444;
  --info: #3B82F6;
}
```

### 2.2. Typography System
- **English Font**: `Inter`, with fallback to `system-ui`.
- **Bangla Font**: `Hind Siliguri`, loaded via `@next/font/google` for optimal web font performance without layout shift.
- **Financial Figures**: `font-variant-numeric: tabular-nums;` to guarantee numeric alignment in invoices, carts, and POS ledgers.

| Scale Token | Font Size | Line Height | Weight | Intended Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `display` | 48px (3.0rem) | 1.15 | 800 (Extrabold) | Hero Marketing Headlines |
| `h1` | 36px (2.25rem) | 1.25 | 700 (Bold) | Page Titles |
| `h2` | 30px (1.875rem) | 1.30 | 700 (Bold) | Section Headers |
| `h3` | 24px (1.5rem) | 1.35 | 600 (Semibold) | Product Grouping Headers |
| `h4` | 20px (1.25rem) | 1.40 | 600 (Semibold) | Card Titles, Modal Headers |
| `body-lg` | 18px (1.125rem) | 1.50 | 400 / 500 | Hero Subtext, Featured Content |
| `body-base`| 16px (1.0rem) | 1.50 | 400 / 500 | Default Paragraphs, Inputs |
| `body-sm` | 14px (0.875rem) | 1.40 | 400 / 500 | Metadata, Secondary Captions |
| `caption` | 12px (0.75rem) | 1.35 | 500 / 600 | Badges, Table Headers, Microcopy |

### 2.3. Spacing & Elevation (8pt Spatial System)
- `space-1`: 4px | `space-2`: 8px | `space-3`: 12px | `space-4`: 16px
- `space-6`: 24px | `space-8`: 32px | `space-12`: 48px | `space-16`: 64px
- **Border Radii**: Small elements: `rounded-md` (6px); Cards & Dialogs: `rounded-xl` (12px); Buttons & Pills: `rounded-full` (9999px) or `rounded-lg` (8px).
- **Shadows**:
  - `shadow-sm`: Subtle border lift for product cards.
  - `shadow-md`: Hover elevation on interactive tiles.
  - `shadow-xl`: Modal sheets and floating cart sidebars.

---

## 3. Shared Component Architecture (`packages/ui`)

Components are built on headless primitives from **Radix UI** and styled with **Tailwind CSS** using `class-variance-authority` (CVA):

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button/              # Primary, Outline, Ghost, Danger variants
│   │   ├── badge/               # Stock status, Batch expiry countdown badge
│   │   ├── card/                # Standard card container with header/body/footer
│   │   ├── dialog/              # Accessible modal dialog
│   │   ├── drawer/              # Slide-over cart & mobile navigation
│   │   ├── input/               # Text, number, barcode-optimized input
│   │   ├── select/              # Dropdown selector with search
│   │   ├── table/               # Data-dense enterprise table with sorting
│   │   ├── price-display/       # BDT ৳ currency formatter with discount strike
│   │   └── expiry-indicator/    # Color-coded indicator: Fresh (Green), Near (Amber), Expired (Red)
│   └── styles/
│       └── globals.css          # CSS Variables & Tailwind utilities
```

---

## 4. Application Interface Layouts

### 4.1. Customer Storefront (`apps/web`)

```
+-------------------------------------------------------------------+
| Topbar: Delivery to: [Gulshan-2 ▾] | Contact: 16XXX | বাংলা / EN  |
+-------------------------------------------------------------------+
| ECOBAZAR [Search fresh vegetables, rice, spices...  🔍] [Cart 🛒(3)]|
+-------------------------------------------------------------------+
| Categories: [Vegetables] [Dairy] [Meat] [Rice & Grains] [Snacks]  |
+-------------------------------------------------------------------+
| Hero Banner: "Fresh Daily Catch & Organic Produce Delivered in 1h"|
+-------------------------------------------------------------------+
| Daily Flash Sales (Expires in 04:12:30)                           |
| [ Product Card 1 ]  [ Product Card 2 ]  [ Product Card 3 ]        |
+-------------------------------------------------------------------+
| Shop by Category Grid                                             |
| [ Category 1 ] [ Category 2 ] [ Category 3 ] [ Category 4 ]       |
+-------------------------------------------------------------------+
| Footer: Store Locations | Customer Support | Policies | Mobile App|
+-------------------------------------------------------------------+
```

### 4.2. Admin & Management Dashboard (`apps/admin`)

```
+-------------------------------------------------------------------+
| ECOBAZAR Admin  | Branch: [Dhanmondi Branch #02 ▾] | User: Karim (Mgr)
+-----------+-------------------------------------------------------+
| Dashboard | Monthly Revenue: ৳ 4,850,200 | Today's In-Store: ৳ 142,500
| Catalog   | ───────────────────────────────────────────────────────
| Inventory | Low Stock Alerts: 14 items   | Near Expiry (30d): 8 Batches
| Purchasing| ───────────────────────────────────────────────────────
| POS Store | [ Sales Velocity Chart ]     | [ Branch Comparison ]
| Orders    | ───────────────────────────────────────────────────────
| Customers | Recent Orders Table:
| Financials| #ORD-1092 | Online | ৳ 1,450 | Processing | [Inspect]
| Audit Logs| #POS-8841 | In-Store| ৳  680 | Completed  | [Receipt]
+-----------+-------------------------------------------------------+
```

### 4.3. High-Speed Point of Sale (POS) Interface (`apps/admin/pos`)

The POS interface is optimized for cashier speed, minimal mouse usage, and continuous barcode scanning:

```
+-------------------------------------------------------------------+
| POS #01 | Cashier: Rahim | Reg: OPEN | F1: Help | F2: Hold | F12: Pay
+----------------------------------------+--------------------------+
| Barcode Scan / Search (Autofocused)    | Current Cart Summary     |
| [ ||||||||||||||||||||||||||||||||| ]  | Items: 4 | Subtotal: ৳850|
+----------------------------------------+ VAT (5%):          ৳42.50|
| Line Items:                            | Discount:         -৳50.00|
| 1. Aromatic Rice 1kg   x 2  =  ৳ 240   | TOTAL PAYABLE:    ৳842.50|
|    (Batch: #B-2026-11 | Exp: 2027-04)  +--------------------------+
| 2. Organic Mustard Oil x 1  =  ৳ 380   | Quick Tender Buttons:    |
| 3. Farm Eggs (12 pcs)  x 1  =  ৳ 150   | [৳1000] [৳500] [Exact]   |
| 4. Fresh Mint Leaves   x 1  =  ৳  30   | [ bKash / Nagad QR ]     |
|                                        | [ Cash (F10) ]           |
| [ F4: Edit Qty ]  [ F8: Apply Coupon ] | [ F12: COMPLETE SALE ]   |
+----------------------------------------+--------------------------+
```

### 4.4. Mobile Application Navigation (`apps/mobile`)
- **Bottom Navigation Bar**:
  - `Home`: Personalized product recommendations, flash deals, category carousels.
  - `Categories`: Visual grocery taxonomy drill-down.
  - `Scan`: In-store barcode scanner (checks price and adds to self-checkout bag).
  - `Orders`: Real-time order tracker with live rider location on Google Maps / Barikoi.
  - `Profile`: Saved delivery addresses, bKash wallet link, loyalty points balance.
- **Rider / Staff Switcher**: Authenticated staff can toggle from Customer View to Delivery Dispatch or In-Store Picker mode seamlessly with role authorization.
