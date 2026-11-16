# ECOBAZAR — UI/UX & Functionality Comprehensive Audit Report

**Audit Date**: November 16, 2026  
**Auditor**: Principal Product Designer, Senior Full-Stack Engineer, UX Architect & QA Engineer  
**Scope**: Customer-Facing Storefront (`apps/web`), Enterprise Admin Dashboard (`apps/admin`), Design System (`packages/ui`), and Backend Integration (`apps/api`)

---

## 1. Executive Summary

This audit evaluates the real, interactive production state of the ECOBAZAR multi-branch supermarket and retail operating system. While Phase 01 established solid architectural foundations (Prisma models, dual-token JWT RBAC authentication, and design tokens), our inspection of the live applications identified critical functionality gaps, broken event handlers, non-persistent state, unhandled navigation links, and visual contrast defects that prevent ECOBAZAR from operating as a commercial-grade retail platform.

This document details all identified defects, isolates root causes, and outlines a prioritized execution plan to transform ECOBAZAR into a robust, high-performance retail platform.

---

## 2. Identified Issues & Defect Log

### 2.1. Customer Storefront (`apps/web`)

| ID | Module / Component | Severity | Description & User Impact | Root Cause |
| :--- | :--- | :--- | :--- | :--- |
| **ST-01** | Cart Drawer & Checkout | **Critical** | Clicking the header Cart button only displays item count; no slide-out drawer or cart page exists. Users cannot inspect items, adjust quantities, calculate delivery, or checkout. | Missing Cart Drawer/Modal component; cart state was purely scalar count rather than an itemized cart store. |
| **ST-02** | Cart Persistence | **High** | Refreshing the page wipes the entire cart and resets all counts. | State was held in transient React `useState` without `localStorage` synchronization or rehydration. |
| **ST-03** | Product Details Modal | **Critical** | Clicking any product card (image or title) performs no action. Shoppers cannot inspect nutritional info, batch dates, origin, or descriptions. | Missing Product Details view/modal and card click handlers were dead. |
| **ST-04** | Category Sidebar Filtering | **High** | Clicking sidebar categories only showed a toast notification and did not filter the product grid on the page. Subcategories were absent. | Product grid was only bound to horizontal tab state; sidebar clicks were disconnected from the main catalog state. |
| **ST-05** | Live Search Autocomplete | **Medium** | The header search input only captured text in local state without surfacing interactive live suggestions, price tags, or direct product jumps. | Missing dropdown popover for live search queries. |
| **ST-06** | Wishlist Drawer / Saved Items | **Medium** | Heart icons toggled local boolean state, but clicking the header Wishlist button showed nothing. Saved items could not be reviewed or transferred to cart. | Missing Wishlist drawer overlay component. |
| **ST-07** | Order Tracking (`Track Order`) | **Medium** | "Track Order" was an anchor link to `#track` with no interactive modal, tracking input, or delivery milestone timeline. | Missing Track Order lookup dialog with simulated courier GPS/stage progression. |
| **ST-08** | Customer Hub / Branch Selector | **Medium** | Delivery address was hardcoded to "Gulshan-2" with no interactive selector to switch hubs (Dhanmondi, Gulshan, Uttara) with localized delivery estimates. | Missing branch selector dropdown for customer storefront. |
| **ST-09** | Out-of-Stock / Quantity Limits | **High** | No stock ceiling checks on Add to Cart buttons. Out-of-stock items could still be added. | Missing stock quantity validation logic in `handleAddToCart`. |

---

### 2.2. Admin & POS Dashboard (`apps/admin`)

| ID | Module / Component | Severity | Description & User Impact | Root Cause |
| :--- | :--- | :--- | :--- | :--- |
| **AD-01** | Sidebar Navigation (26 Modules) | **Critical** | The sidebar lists 26 enterprise modules (`Products`, `Categories`, `Inventory`, `Expiry`, `Suppliers`, `PO`, `Orders`, `POS`, `Finance`, `Branches`, etc.), but clicking any link only updated route text while the main content area remained locked on the Executive Overview. | Missing dedicated view switch / module router in the admin shell. |
| **AD-02** | POS Terminal Launcher | **Critical** | The bottom "Launch POS Terminal" button only fired a toast notification without opening a functional POS register. | Missing POS register modal / view with barcode lookup, instant cart calculation, and cash/bKash payment checkout. |
| **AD-03** | Export Report | **High** | The "Export Report" button only fired an informational toast without generating or downloading any CSV or report document. | Missing CSV generator and client-side blob download trigger. |
| **AD-04** | ECOBAZAR Intelligence Contrast | **High** | The AI insights card had light green text over translucent dark green gradient, failing WCAG 2.2 AA contrast standards. | Low luminosity contrast between `text-emerald-100/90` and dark gradient surface. |
| **AD-05** | Functional Refresh Action | **Medium** | The "Refresh" button only showed a toast without actually reloading telemetry, rotating order timestamps, or simulating data re-fetch. | Missing active fetch handler and spinner loading state. |
| **AD-06** | Pending Operational Tasks | **Medium** | "Verify" and "Receive" buttons had no functional click handlers. | Unwired action callbacks. |
| **AD-07** | Global Search Command Palette (`Ctrl + K`) | **Medium** | The modal opened and listed modules, but clicking an item didn't switch to a dedicated module view. | Disconnected from active view router. |

---

### 2.3. Shared Interaction & Accessibility Defects (`packages/ui`)

| ID | Component | Severity | Description | Root Cause |
| :--- | :--- | :--- | :--- | :--- |
| **SH-01** | Button Component | **High** | Buttons could become permanently disabled if a parent set `isLoading={true}` or `disabled={true}` and failed to reset it in `finally`. `disabled:pointer-events-none` prevented all further clicks. | Lack of automatic safety timeout and missing error boundary resets. |
| **SH-02** | Focus Visibility | **Medium** | Several custom interactive elements (divs used as click targets) lacked keyboard `focus-visible` rings and `tabIndex={0}`. | Non-semantic containers lacking keyboard accessibility attributes. |

---

## 3. Prioritized Implementation Plan

### Phase 1: Shared Interaction Infrastructure & Cart Store
1. Create a persistent Cart Store with `localStorage` synchronization, itemized records, quantity steppers, subtotal calculation, discount codes, and delivery fee calculation.
2. Ensure buttons handle asynchronous operations with strict `try / catch / finally` blocks and never lock permanently.

### Phase 2: Customer Storefront Overhaul (`apps/web`)
1. **Interactive Header**:
   - Live product search autocomplete with thumbnails, prices, and instant selection.
   - Interactive Branch Selector (Dhanmondi, Gulshan-2, Uttara) with localized delivery time estimates.
   - Functional Slide-out **Shopping Cart Drawer** (item list, quantity +/- controls, delete button, voucher code input, subtotal, delivery fee, total BDT, and checkout button).
   - Functional **Wishlist Drawer** with item list and "Move to Cart" action.
   - Interactive **Track Order Modal** allowing customers to enter an Order ID and view live tracking milestones.
   - Customer **Account / Login Modal** with phone/email input and OTP verification flow.
2. **Category Sidebar**:
   - Complete interactive sidebar with expandable subcategories and direct filtering.
   - Clicking a category highlights the selected state and filters the product grid in real-time.
3. **Product Cards & Details**:
   - Consistent aspect ratios with high-res photography.
   - Clicking image or title opens a full **Product Details Modal** (gallery, description, specifications, nutritional details, batch date, stock level, quantity selector, and Add to Cart).
   - Card Add to Cart button provides instant feedback and transforms into an interactive quantity stepper `[- 1 +]`.

### Phase 3: Admin Dashboard Enterprise Upgrade (`apps/admin`)
1. **Modular Multi-View Architecture**:
   - Implement functional views for all 26 sidebar modules (Dashboard Overview, Analytics, Products Catalog, Categories Tree, Inventory & Batches, FEFO Expiry Management, Suppliers, Purchase Orders, Orders Ledger, POS Terminal, Branches Management, Finance, AI Intelligence, Roles, and Audit Logs).
2. **Interactive POS Terminal**:
   - Build a full Point of Sale interface with register selection, barcode search, fast cart tally, VAT calculation, discount, cash/bKash/card payment modal, and printable thermal receipt preview.
3. **Report Export**:
   - Implement real CSV file generation and browser download for executive sales reports and branch inventory summaries.
4. **Visual Contrast & Polish**:
   - Re-style the ECOBAZAR Intelligence panel with high-contrast text (`#FFFFFF` on `#123C2D` with high luminosity cards).
   - Implement functional Refresh action that updates telemetry and spins the refresh icon.
   - Wire all pending operational tasks (drawer verification, goods receiving).

### Phase 4: Verification, Responsive Checks & Build
1. Test across 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop).
2. Run `turbo run typecheck` across all 11 monorepo packages.
3. Run backend unit tests (`npm test --prefix apps/api`).
4. Stage, commit, and push to GitHub `origin main`.
